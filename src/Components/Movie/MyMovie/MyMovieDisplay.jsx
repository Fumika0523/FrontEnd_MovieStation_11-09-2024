import { useEffect, useState, useCallback  } from "react"
import MovieCard from "../MovieCard"
import axios from "axios"
import { url } from "../../../utils/constant"
import { useDispatch } from "react-redux"
import {  useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import MovieActionButtons from "../MovieActionButtons"
import { useSelector } from "react-redux";
import {  FaRegHeart } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GiFilmSpool } from "react-icons/gi";
import { wishAddItem, wishRemoveItem, setWishlist } from "../../../utils/WishCartSlice";
import { cartAddItem, setCart } from "../../../utils/cartSlice";
import { MdRemoveShoppingCart } from "react-icons/md";


const MyMovieDisplay = ({ mode }) => {
  const navigate = useNavigate()
  const wishlist = useSelector(store => store.wishlist.wishItems);
  const cart = useSelector(store => store.cart.cartItems)
  const dispatch = useDispatch()
  const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value
  const [searchTerm, setSearchTearm] = useState("")
  const [orderData, setOrderData] = useState([]);
  const [userMovieData, setUserMovieData] = useState([])
  const token = sessionStorage.getItem('token')

  // Notifications
  const addWishNotify = () => toast.success('Added to Wishlist!', { autoClose: 1000, theme: "light" });
  const removeWishNotify = () => toast.error('Removed from Wishlist!', { autoClose: 1000 });
  const successNotify = () => toast.success('Added to the cart!', { autoClose: 1000 });
  const errorNotify = () => toast.error('Removed from the cart!', { autoClose: 1000 });


  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  //API calls 
  const getUserMovieData = async () => {
    let res = await axios.get(`${url}/specificmovie`, config)
    //console.log("userdata",res.data.getAddedMovie)
    setUserMovieData(res.data.getAddedMovie)
  }
  // useEffect(() => {
  //   getUserMovieData()
  // }, [])

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

  const removeCartItemFromServer = async (movieId) => {
  try {
    await axios.delete(`${url}/cart/remove/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error removing cart item:", error);
  }
};

  // Handle Add to Cart
  const handleAddCartItem = useCallback(
  async (element) => {
    // GUEST MODE: localStorage
    if (!token) {
      let localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const exists = localCart.some((item) => item._id === element._id);

      if (exists) {
        // Remove from guest cart
        localCart = localCart.filter((item) => item._id !== element._id);
        errorNotify()
      } else {
        // Add to guest cart
        localCart.push(element);
        successNotify()
      }
      localStorage.setItem("cart", JSON.stringify(localCart));
      dispatch(setCart(localCart));
      return;
    }

    // LOGGED-IN MODE
    const isInCartlist = cart?.some((cartItem) => cartItem._id === element._id);
    const isAlreadyPurchased = orderData?.some((order) =>
      order.movies?.some((movie) => movie._id === element._id)
    );

    if (isAlreadyPurchased) {
      toast.error("You've already purchased this movie.", { autoClose: 1000 });
      return;
    }

    if (isInCartlist) {
      // REMOVE from cart
      await removeCartItemFromServer(element._id);
      dispatch(setCart(cart.filter((item) => item._id !== element._id)));
      errorNotify();
    } else {
      // ADD to cart
      dispatch(cartAddItem(element));
      successNotify();
      await addCartItemToServer(element);
    }
    await getCartData();
  },
  [cart, orderData, dispatch, token]
);

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
    return userMovieData.filter(movie =>
      movie.moviename.toLowerCase().includes(term.toLowerCase())
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        const results = fetchData(searchTerm);
        setFilterMovieData(results);
      } else {
        setFilterMovieData(userMovieData);
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, userMovieData]);

  useEffect(() => {
    if (userMovieData) {
      setFilterMovieData(userMovieData);
    }
  }, [userMovieData]);

  // Initial data fetch
  useEffect(() => {
    getUserMovieData();
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
//while localStorage is partitioned by origin only, sessionStorage is partitioned by both origin and browser tabs (top-level browsing contexts). The data in sessionStorage is only kept for the duration of the page session.
  useEffect(() => {
  const syncCartAfterLogin = async () => {
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch(setCart(localCart));
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      for (const item of localCart) {
        await addCartItemToServer(item);
      }
      await getCartData();
      localStorage.removeItem("cart");
    }
  };
  syncCartAfterLogin();
}, [token]);

const deleteMovie = async (movieId) => {
  try {
    await axios.delete(`${url}/movie/${movieId}`, config);
    setUserMovieData(userMovieData.filter(movie => movie._id !== movieId));
    toast.success("Movie deleted successfully!");
  } catch (error) {
    console.error("Error deleting movie:", error);
    toast.error("Failed to delete movie.");
  }
};

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"end"}
      margin={2}
    >
       <h2 className="text-start d-flex flex-row align-items-center gap-1 me-auto ms-3 ">Movie Added by Me<GiFilmSpool className="text-primary fs-1"/></h2>
      <Grid container className=" d-flex justify-content-end" marginBottom={3} >
       
      <div className="mx-auto  row mb-3 d-flex justify-content-end w-100 flex-row align-items-center">

          <MovieActionButtons
            mode={mode}
            navigate={navigate}
            wishlistCount={wishlist?.length || 0}
            wishlist={wishlist}
            cartCount={cart?.length || 0}
            cart={cart}
          />
  
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
      </Grid>
      <Grid container display={"flex"} flexWrap={"wrap"} justifyContent={"start"} marginTop={2}>
        {
          filterMovieData?.map((element, index) => (
            <MovieCard {...element} key={index} setUserMovieData={setUserMovieData} userMovieData={userMovieData} element={element} mode={mode}
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
                      <MdRemoveShoppingCart className="fs-4 text-warning" /> :
                      <ShoppingCartIcon className="fs-4 text-warning" />
                    }
                  </span>
                </Tooltip>
               }
            WishBtn={
            <>
           <Tooltip title="Add to Wish List">
                  <span onClick={() => handleAddWishItem(element)}>
                    {orderData?.some(order =>
                      order.movies?.some(movie => movie._id === element._id)) ? null :
                      wishlist?.some(item => item._id === element._id) ?
                        <FavoriteIcon className="text-danger fs-4 ms-1" /> 
                        :
                        <FaRegHeart className="text-danger fs-4 ms-1" />
                    }
                  </span>
           </Tooltip>
           <ToastContainer />
            </>
            }
            />
          ))}
      </Grid>
    </Box>
  )
}

export default MyMovieDisplay