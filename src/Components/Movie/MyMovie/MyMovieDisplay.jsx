import { useEffect, useState } from "react"
import MovieCard from "../MovieCard"
import axios from "axios"
import { url } from "../../../utils/constant"
import { useDispatch } from "react-redux"
import { cartAddItem, cartRemoveItem, setCart } from "../../../utils/cartSlice"
import { Button } from "react-bootstrap"
import { IoChevronBackOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import MovieActionButtons from "../MovieActionButtons"
import { useSelector } from "react-redux";
import {  FaRegHeart } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GiFilmSpool } from "react-icons/gi";

const MyMovieDisplay = ({ mode }) => {
  const navigate = useNavigate()
  const wishlist = useSelector(store => store.wishlist.wishItems);
  const cart = useSelector(store => store.cart.cartItems)
  const dispatch = useDispatch()
  const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value
  const [searchTerm, setSearchTearm] = useState("")
  const [userMovieData, setUserMovieData] = useState([])
  const token = sessionStorage.getItem('token')

  const successNotify = () => toast.success('Added to the cart!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
  });

  const errorNotify = () => toast.error('This movie is already purchased, please check the order history', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
  });

  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const getUserMovieData = async () => {
    let res = await axios.get(`${url}/specificmovie`, config)
    console.log("userdata",res.data.getAddedMovie)
    setUserMovieData(res.data.getAddedMovie)
  }
  useEffect(() => {
    getUserMovieData()
  }, [])

  // const fetchData = (searchTerm)=>{
  //     console.log("Searching in my favourite movies..",searchTerm)
  //     const filterData = (searchText,allMovies)=>{
  //         return allMovies.filter((element)=>
  //             element.moviename.toLowerCase().includes(searchText.toLowerCase())
  //         )
  //     }
  //     return filterData(searchTerm,userMovieData)
  // }
  // useEffect(()=>{
  //     getUserMovieData()
  //     const timeoutId = setTimeout(()=>{
  //     if(searchTerm.trim()!==""){
  //         const fData = fetchData(searchTerm)
  //         setFilterMovieData(fData)
  //     }
  //     },900)
  //     return()=>{
  //     clearTimeout(timeoutId)
  // }
  // },[searchTerm,userMovieData])
  // useEffect(()=>{
  //     setFilterMovieData(userMovieData)
   //getMovieData()
// },[userMovieData])

  // const deleteMovie=async(_id)=>{
  //     console.log("Movie Deleted from the DB...")
  //     let res = await axios.delete(`${url}/deletemovie/${_id}`,config)
  //     // console.log(res)
  //     if(res){
  //         getUserMovieData()
  //         navigate(`/my-movie`)
  //     }
  // }

  // const getCartData=async()=>{
  //     let res = await axios.get(`${url}/cart`,config)//response in res.data >> moviedata
  //     console.log("getCartData",res)
  //     if(res.data && res.data.cartData){
  //     dispatch(removeItem());//clearing existing cart items from store
  //     res.data.cartData.map((element)=>dispatch(addItem(element)))
  // }}


  // const getwishMovieData=async()=>{
  //     let res = await axios.get(`${url}/add-my-wish-list`,config)
  //     console.log("getWishMovieData",res)
  //     // if(res.data && res.data.getwishMovieData){
  //     //     dispatch(removeItem())
  //     //     res.data.cartData.map((element)=>dispatch(addItem(element)))
  //     // }
  // }

  // const handleAddWishList = async(wishItem)=>{
  //     console.log("wishItem",wishItem)
  //     let res = await axios.post(`${url}/add-my-wish-list`,config)
  //     console.log("res",res.data.message)
  //     if(res.data.message == "Movie has been added successfully to wish List!"){
  //         successNotify()
  //     } else {
  //         return   errorNotify()
  //     }
  //     getwishMovieData()
  // }

  // const handleAdditem=async(movieItem)=>{
  //     // console.log("movieItem,",movieItem)
  //     // >> api call for updating the backend >> saving to the DB  
  //     // "=" << Assignment operator
  //     // "==" << condition comparison operator
  //     if (token == null){
  //             navigate(`/signin`)
  //     } else {
  //         let res=await axios.post(`${url}/addcart`, movieItem,config)
  //         console.log("res",res.data.message)
  //         if(res.data.message == "Cart has been added successfully!"){
  //             successNotify()
  //         } else {
  //             return   errorNotify()
  //         }
  //         getCartData()
  //     }}

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
          userMovieData?.map((element, index) => (
            <MovieCard {...element} key={index} setUserMovieData={setUserMovieData} userMovieData={userMovieData} element={element} mode={mode}
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
                className="reduxIcon fs-2" />
                )}
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
            style={{ fontSize: "25px" }} />
            )}
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