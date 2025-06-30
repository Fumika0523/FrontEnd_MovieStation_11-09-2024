import { useEffect, useState, useCallback } from "react";
import MovieCard from './MovieCard';
import axios from "axios";
import { url } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { cartAddItem, cartRemoveItem,setCart } from "../../utils/cartSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {  FaRegHeart } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast } from 'react-toastify';
import { wishAddItem, wishRemoveItem,setWishlist } from "../../utils/WishCartSlice";
import MovieActionButtons from './MovieActionButtons';
import { MdRemoveShoppingCart } from "react-icons/md";
import { Bounce } from 'react-toastify';

//once movie is added to the cart, change icon to <MdRemoveShoppingCart/>
//MdRemoveShoppingCart

function MovieDisplay_Debounce({ mode, movieData, setMovieData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTearm] = useState("");
  const [filterMovieData, setFilterMovieData] = useState([]);
  const wishlist = useSelector(store => store.wishlist.wishItems);
  const cart = useSelector(store =>store.cart.cartItems)
  console.log("cart",cart)
  console.log(cart?.length)
  const [orderData, setOrderData] = useState([])
  const [sortedData, setSortedData] =useState("createdAt:desc") //default
  console.log("sortedData",sortedData)
  console.log("orderData",orderData)
  /// when you not login, wish goes to store >> when you login from store to db
  //when you login >> Db >> Store <<<< If you store to store first, the data will be gone after the refreshing
 // useState > within 1 component, need to be passed to use in other components
 //Store is to store temporary in Browser, useSelector to use again again
 //

  const token = sessionStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const successNotify = () => toast.success('Added to the cart!', { autoClose: 3000 });
  const errorNotify = () => toast.error('Already added to cart, check your carrt!', { autoClose: 3000 });
  const addWishNotify = () => { toast.success('Added to Wishlist!', { 
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })};
  const removeWishNotify = () => toast.error('Removed from Wishlist!', { autoClose: 2000 });

  const getMovieData = async () => {
    const res = await axios.get(`${url}/movie`);
   setMovieData(res.data.movieData);
  };

  const getCartData = async () => {
    const res = await axios.get(`${url}/cart`,config);
    console.log("cartData",res.data.cartData)
     dispatch(setCart(res.data.cartData)) 
  };

  const getWishData = async () => {
    const res = await axios.get(`${url}/wish-list`, config);
    dispatch(setWishlist(res.data.wishData)) //
  };
    
  // ADD TO Wish
  const addWishItemToServer = async (element) => {
    try {
      await axios.post(`${url}/add-wish-list`, element, config);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  // ADD TO CART
  const addCartItemToServer = async (element)=>{
    try{
      await axios.post(`${url}/addcart`, element, config);
    }catch(error){
      console.error('Error adding to wishlist:', error);
    }
  }

  // WISH LIST 
  const removeWishItemFromServer = async (element) => {
    try {
      await axios.delete(`${url}/delete-wish-item/${element._id}`, config);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  //CART Server
  const handleAddCartItem = useCallback(async(element)=>{
    console.log("1234567",element)
    const isInCartlist = cart?.some(cartItem => cartItem._id === element._id);
    if(isInCartlist){
      console.log("ErrorNotify")
      errorNotify()
    }else{
      dispatch(cartAddItem(element))
      successNotify()
      await addCartItemToServer(element)
    }
    await getCartData()
  },[dispatch, cart])

  //Wish Server
  const handleAddWishItem = useCallback(async (element) => {
    const isInWishlist = wishlist?.some(item => item._id === element._id);
    if (isInWishlist) {
      dispatch(wishRemoveItem(element)); // Remove from Redux store - Dispatches an action to remove the item from Redux.
      removeWishNotify(); 
      await removeWishItemFromServer(element); // Remove from server
    } else {
         dispatch(wishAddItem(element));
          addWishNotify();
          console.log("addwishnotify")
         await addWishItemToServer(element);
    }
    //await getWishData(); // Refresh to sync
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

      useEffect(()=>{
    const getCartData=async()=>{
      try{
        let response = await axios.get(`${url}/cart`,{
        headers:{Authorization:`Bearer ${token}`}
        })
        console.log(response.data.cartData)
        if(response.data.cartData){
          dispatch(setCart(response.data.cartData))
          console.log("cart",response.data)
        } else{
          dispatch(setCart([]))
        }
      }catch(error){
        console.error("Failed to load Cart",error);
        dispatch(setCart([]))
      }
    }

    if(token){
      getCartData()
    }
  },[dispatch,token])

  const getOrderData = async()=>{
        // /order?sortBy=createdAt:asc
        const res = await axios.get(`${url}/order`,config)
        console.log(`res`,res)
        // setOrderData(res.data.orderData)
        // console.log("orderData from my movie",res.data.orderData)
      useEffect(() => {
      getOrderData();
      }, [])};
        
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" margin={2}>
        <div className="mx-auto  row mb-3 d-flex justify-content-end w-100 flex-row align-items-center">
          {/* <div className="border  border-4 border-danger"> */}
            <MovieActionButtons
              mode={mode}
              navigate={navigate}
              wishlistCount={wishlist?.length || 0}
              wishlist={wishlist}
              cartCount={cart?.length || 0}
              cart={cart}
            />
              {/* </div> */}
              {/* Search */}
              <div className="flex-wrap justify-content-end  d-flex pt-3 flex-row  border-4 border-danger">
               <input 
              style={{
                backgroundColor: mode === "light" ? "white" : " rgba(45, 45, 47, 0.52)",
                border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
                color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
                width: "190px", margin: "0px 10px"
              }}
              className="form-control  ps-3"
              type="search"
              placeholder="Search movie"
              onChange={(e) => setSearchTearm(e.target.value)}
            />
            </div>
      
        </div>

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
                  className="deleteBtn border-sucess fs-3 ms-2"
                    />
                  </Tooltip>
                }
                
          reduxAddcartBtn={
          <Tooltip title="Add to Cart">
            <span onClick={()=>handleAddCartItem(element)} >
            {
              cart?.some(cartItem => cartItem._id === element._id) ?
              (
                <MdRemoveShoppingCart className="fs-3 reduxIcon"/>
              )
              :
              (
                <ShoppingCartIcon 
            className="reduxIcon fs-3" />
              )
            }
            </span>
            </Tooltip>
                }
                WishBtn={
                  <>
                    <Tooltip title="Add to Wish List">
                      <span className="d-flex align-items-center" onClick={() => handleAddWishItem(element)}>
                      {/* searches for element._id in the wishlist array. >> True/false item._id > wishlist, element._id > movie._id*/}
                        {wishlist?.some(item => item._id === element._id) ? (
                        <FavoriteIcon
                        className="text-danger border-primary"
                        style={{ fontSize: "25px", margin: "1.5px" }}
                        />
                        ) : (
                        <FaRegHeart
                        className="text-danger border-warning p-0 ms-2"
                        style={{ fontSize: "25px" }}
                        />
                        )}
                      </span>
                    </Tooltip>
                    <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce} />
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
