import { useEffect, useState, useCallback } from "react";
import MovieCard from './MovieCard';
import axios from "axios";
import { url } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { cartAddItem, setCart } from "../../utils/cartSlice";
import { Box, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaRegHeart } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { wishAddItem, wishRemoveItem, setWishlist } from "../../utils/WishCartSlice";
import MovieActionButtons from './MovieActionButtons';
import { MdRemoveShoppingCart } from "react-icons/md";

function MovieDisplay_Debounce({ mode, movieData, setMovieData }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(store => store.wishlist.wishItems);
  const cart = useSelector(store => store.cart.cartItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMovieData, setFilterMovieData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const token = sessionStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Notifications
  const addWishNotify = () => toast.success('Added to Wishlist!', { autoClose: 1000, theme: "light" });
  const removeWishNotify = () => toast.error('Removed from Wishlist!', { autoClose: 2000 });
  const successNotify = () => toast.success('Added to the cart!', { autoClose: 3000 });
  const errorNotify = () => toast.error('Already added to cart!', { autoClose: 3000 });

  // API Calls
  const getMovieData = async () => {
    const res = await axios.get(`${url}/movie`);
    setMovieData(res.data.movieData);
  };

  const getCartData = async () => {
    const res = await axios.get(`${url}/cart`, config);
    dispatch(setCart(res.data.cartData));
  };

  const getWishData = async () => {
    const res = await axios.get(`${url}/wish-list`, config);
    dispatch(setWishlist(res.data.wishData));
  };

  const getOrderData = async () => {
    try {
      const res = await axios.get(`${url}/order`, config);
      setOrderData(res.data.orderData || []);
    } catch (e) {
      console.error("Failed to fetch order data:", e);
    }
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

  const addCartItemToServer = async (element) => {
    try {
      await axios.post(`${url}/addcart`, element, config);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Handle Add to Cart
  const handleAddCartItem = useCallback(async (element) => {
    const isInCartlist = cart?.some(cartItem => cartItem._id === element._id);
    const isAlreadyPurchased = orderData?.some(order =>
      order.movies?.some(movie => movie._id === element._id)
    );

    if (isAlreadyPurchased) {
      toast.error("You've already purchased this movie.");
      return;
    }

    if (isInCartlist) {
      errorNotify();
    } else {
      dispatch(cartAddItem(element));
      successNotify();
      await addCartItemToServer(element);
    }
    await getCartData();
  }, [cart, orderData, dispatch]);

  // Handle Add to Wishlist
  const handleAddWishItem = useCallback(async (element) => {
    if (!token) {
      // Guest user - localStorage
      let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const exists = localWishlist.some(item => item._id === element._id);

      if (exists) {
        localWishlist = localWishlist.filter(item => item._id !== element._id);
        removeWishNotify();
      } else {
        localWishlist.push(element);
        addWishNotify();
      }
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));
      dispatch(setWishlist(localWishlist));
      return;
    }

    // Logged-in user - server
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
    await getWishData();
  }, [dispatch, wishlist, token]);

  // Search filtering with debounce
  const fetchData = (term) => {
    return movieData.filter(movie =>
      movie.moviename.toLowerCase().includes(term.toLowerCase())
    );
  };

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

  // Initial data fetch
  useEffect(() => {
    getMovieData();
    getOrderData();
  }, []);

  // Sync wishlist when token changes
  useEffect(() => {
    const syncWishlistAfterLogin = async () => {
      if (!token) {
        const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        dispatch(setWishlist(localWishlist));
      } else {
        const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        // Push local wishlist to server
        for (const item of localWishlist) {
          await addWishItemToServer(item);
        }

        // Fetch updated wishlist from server
        await getWishData();

        // Clear localStorage wishlist after sync
        localStorage.removeItem("wishlist");
      }
    };

    syncWishlistAfterLogin();
  }, [token]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" margin={2}>
      <div className="mx-auto row mb-3 d-flex justify-content-end w-100 flex-row align-items-center">
        <MovieActionButtons
          mode={mode}
          wishlistCount={wishlist?.length || 0}
          cartCount={cart?.length || 0}
        />
        {/* Search */}
        <div className="flex-wrap justify-content-end d-flex pt-3 flex-row">
          <input
            style={{
              backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47, 0.52)",
              border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
              color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
              width: "190px", margin: "0px 10px"
            }}
            className="form-control ps-3"
            type="search"
            placeholder="Search movie"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Grid container display="flex" flexWrap="wrap" justifyContent="start" marginTop={2}>
        {filterMovieData?.length === 0 ? (
          <div className="position-relative mt-2" style={{ maxHeight: "390px", width: "100%" }}>
            <img
              src="https://img.freepik.com/premium-photo/black-clapperboard-clap-board-movie-slate-use-video-production-film-cinema-industry-black-background_335640-1294.jpg"
              alt=""
              className="w-100"
              style={{ filter: "brightness(50%)", objectFit: "cover" }}
            />
            <h4 className="text-white opacity-75 text-center col-7 col-md-5 mx-auto"
              style={{ position: "absolute", right: "5%", bottom: "0%" }}>
              <span className="text-warning">The Movie is Not Found.</span><br />
              Explore other movies, and check back later.
            </h4>
          </div>
        ) : (
          filterMovieData?.map((element, index) => (
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
                  />
                </Tooltip>
              }
              reduxAddcartBtn={
                <Tooltip title="Add to Cart">
                  <span onClick={() => handleAddCartItem(element)}>
                    {cart?.some(cartItem => cartItem._id === element._id) ||
                      orderData?.some(order =>
                        order.movies?.some(movie => movie._id === element._id)) ?
                      <MdRemoveShoppingCart className="fs-4" /> :
                      <ShoppingCartIcon className="fs-4" />
                    }
                  </span>
                </Tooltip>
              }
              WishBtn={
                <Tooltip title="Add to Wish List">
                  <span onClick={() => handleAddWishItem(element)}>
                    {orderData?.some(order =>
                      order.movies?.some(movie => movie._id === element._id)) ? null :
                      wishlist?.some(item => item._id === element._id) ?
                        <FavoriteIcon className="text-danger fs-4 ms-1" /> :
                        <FaRegHeart className="text-danger fs-4 ms-1" />
                    }
                  </span>
                </Tooltip>
              }
            />
          ))
        )}
      </Grid>
      <ToastContainer transition={Bounce} />
    </Box>
  );
}

export default MovieDisplay_Debounce;
