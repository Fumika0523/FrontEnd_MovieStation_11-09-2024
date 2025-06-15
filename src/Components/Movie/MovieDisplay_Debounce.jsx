import { useEffect, useState, useCallback } from "react";
import MovieCard from './MovieCard';
import axios from "axios";
import { url } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../utils/cartSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaPlusCircle, FaRegHeart } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast } from 'react-toastify';
import { wishAddItem, wishRemoveItem,setWishlist } from "../../utils/WishCartSlice";
import MovieActionButtons from './MovieActionButtons';

function MovieDisplay_Debounce({ mode, movieData, setMovieData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTearm] = useState("");
  const [filterMovieData, setFilterMovieData] = useState([]);
  const wishlist = useSelector(store => store.wishlist.wishItems);

  const token = sessionStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const successNotify = () => toast.success('Added to the cart!', { autoClose: 3000 });
  const errorNotify = () => toast.error('Already purchased. Check order history.', { autoClose: 3000 });
  const addWishNotify = () => toast.success('Added to Wishlist!', { autoClose: 1000 });
  const removeWishNotify = () => toast.error('Removed from Wishlist!', { autoClose: 2000 });

  const getMovieData = async () => {
    const res = await axios.get(`${url}/movie`);
    setMovieData(res.data.movieData);
  };

  const getCartData = async () => {
    const res = await axios.get(`${url}/cart`);
    if (res.data?.cartData) {
      dispatch(removeItem());
      res.data.cartData.forEach(item => dispatch(addItem(item)));
    }
  };

  const getWishData = async () => {
    const res = await axios.get(`${url}/wish-list`, config);
    // dispatch(wishAddItem(res.data.wishData));
    dispatch(setWishlist(res.data.wishData))
  };

  const addWishItemToServer = async (element) => {
    try {
      await axios.post(`${url}/add-wish-list`, element, config);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeWishItemFromServer = async (element) => {
    try {
      await axios.delete(`${url}/delete-wish-item/${element._id}`, config);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddWishItem = useCallback(async (element) => {
    const isInWishlist = wishlist?.some(item => item._id === element._id);
    if (isInWishlist) {
      dispatch(wishRemoveItem(element));
      removeWishNotify();
      await removeWishItemFromServer(element);
    } else {
      dispatch(wishAddItem(element));
      addWishNotify();
      await addWishItemToServer(element);
    }
    await getWishData(); // Refresh to sync
  }, [dispatch, wishlist]);

  const fetchData = (term) => {
    return movieData.filter(movie =>
      movie.moviename.toLowerCase().includes(term.toLowerCase())
    );
  };

  useEffect(() => {
    getMovieData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        const results = fetchData(searchTerm);
        setFilterMovieData(results);
      } else {
        setFilterMovieData(movieData);
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, movieData]);

  useEffect(() => {
    if (movieData) {
      setFilterMovieData(movieData);
    }
  }, [movieData]);

  useEffect(() => {
    if (token) getWishData();
  }, [token]);

  const deleteMovie = async (_id) => {
    await axios.delete(`${url}/deletemovie/${_id}`, config);
    getMovieData();
    navigate(`/allmovies`);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" margin={2}>
        <Grid container className="mx-auto mb-3 d-flex justify-content-end flex-row align-items-center">
          <div className="iput-icons flex-wrap justify-content-end d-flex flex-row gap-3 border-4 border-danger">
            <MovieActionButtons
              mode={mode}
              navigate={navigate}
              wishlistCount={wishlist?.length || 0}
            />
            {token && (
              <Button
                variant="none"
                className="movieDisplayBtn"
                onClick={() => navigate('/addmovie')}
                style={{
                  backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47, 0.52)",
                  border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
                  color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
                }}
              >
                <FaPlusCircle className="fs-5 me-md-1 addIcon" />
                <span className="d-md-block d-none">Add Movie</span>
              </Button>
            )}
            <input
              style={{
                backgroundColor: mode === "light" ? "white" : " rgba(45, 45, 47, 0.52)",
                border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
                color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
                width: "200px", margin: "0px 10px"
              }}
              className="form-control ps-4"
              type="search"
              placeholder="Search movie"
              onChange={(e) => setSearchTearm(e.target.value)}
            />
          </div>
        </Grid>

        <Grid container display="flex" flexWrap="wrap" justifyContent="start" marginTop={2}>
          {filterMovieData?.length === 0 ? (
            <div className="position-relative mt-2 border-4" style={{ maxHeight: "390px", width: "100%" }}>
              <img
                src="https://img.freepik.com/premium-photo/black-clapperboard-clap-board-movie-slate-use-video-production-film-cinema-industry-black-background_335640-1294.jpg"
                alt=""
                className="border-primary border-4 w-100"
                style={{ filter: "brightness(50%)", objectFit: "cover" }}
              />
              <h4 className="text-white opacity-75 border-4 border-danger text-center col-7 col-md-5 mx-auto"
                style={{ position: "absolute", right: "5%", bottom: "0%" }}>
                <span className="text-warning">The Movie is Not Found. </span><br />
                Explore other movies,and please check next week for "Inception"
              </h4>
            </div>
          ) : (
            filterMovieData.map((element, index) => (
              <MovieCard
                {...element}
                key={index}
                setMovieData={setMovieData}
                movieData={movieData}
                element={element}
                mode={mode}
                deleteBtn={
                  <Tooltip title="Delete">
                    <DeleteIcon style={{ cursor: "pointer" }}
                      onClick={() => deleteMovie(element._id)}
                      className="deleteBtn border-sucess fs-3"
                    />
                  </Tooltip>
                }
                reduxAddcartBtn={
                  <Tooltip title="Add to Cart">
                    <ShoppingCartIcon className="reduxIcon fs-3" />
                  </Tooltip>
                }
                WishBtn={
                  <>
                    <Tooltip title="Add to Wish List">
                      <span className="d-flex align-items-center" onClick={() => handleAddWishItem(element)}>
                        {wishlist?.some(item => item._id === element._id) ? (
                          <FavoriteIcon
                            className="text-danger border-primary"
                            style={{ fontSize: "25px", margin: "1.5px" }}
                          />
                        ) : (
                          <FaRegHeart
                            className="text-danger border-warning p-0"
                            style={{ fontSize: "28px" }}
                          />
                        )}
                      </span>
                    </Tooltip>
                    <ToastContainer />
                  </>
                }
              />
            ))
          )}
        </Grid>
      </Box>
    </>
  );
}

export default MovieDisplay_Debounce;
