import { useEffect, useState } from "react"
import MovieCard from './MovieCard'
import axios from "axios"
import { url } from "../../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import {addItem,removeItem} from "../../utils/cartSlice"
import { Button} from "react-bootstrap"
import {  useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import { FaRegHeart } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {wishAddItem,wishRemoveItem} from "../../utils/WishCartSlice"
import { useCallback } from "react"
import MovieActionButtons from './MovieActionButtons'; // path as per your structure


function MovieDisplay_Debounce({mode,movieData,setMovieData}) 
{

const navigate = useNavigate()
const dispatch= useDispatch()

// STate valiable
const [searchTerm, setSearchTearm] = useState("")//initial value
const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value
const token = sessionStorage.getItem('token')
const userId = sessionStorage.getItem
('userId')

let config = {
    headers: {
    Authorization: `Bearer ${token}`
}}

//conditionally done.
const successCartNotify = () => toast.success('Added to the cart!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
    });

const errorCartNotify = () => toast.error('This movie is already purchased, please check the order history', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
});      

const getMovieData = async () => {
    console.log("Movie Data is called.");
    let res = await axios.get(`${url}/movie`)//response in res.data >> moviedata
    // res.data. {object} 
    console.log(res)
    setMovieData(res.data.movieData);
    };
    useEffect(()=>{
        getMovieData()
    },[])

    useEffect(()=>{
    if(movieData){
        setFilterMovieData(movieData)
        // getSpecificMovieData()
    }
    // getMovieData()
    // console.log("MovieDisplay")
},[movieData])

const fetchData = (searchTerm)=>{
    console.log("searchTerm",searchTerm)
    //apil call
    const filterData=(searchText,allMovies)=>{
      return allMovies.filter((element)=>
        element.moviename.toLowerCase().includes(searchText.toLowerCase()) //searching by element.title >> JSON structure always review
      )
    }
    return filterData(searchTerm,movieData)
  }
// console.log("filterMovieData",filterMovieData)

   // ALL
    useEffect(() => {
    const timeoutId = setTimeout(()=>{
    if(searchTerm.trim()!==""){ //not empty
    const fData = fetchData(searchTerm)
     setFilterMovieData(fData)
    }else{ //empty
    setFilterMovieData(movieData) //reset to all blogs if search is empty
    console.log("Re-render with searchTerm")
    //searchTerm >> search reupdated >> depenedency Array >> re-render whenever you are typing in seach box  >> blog data  will be updated >> filteration >> .filter
     }   
    },900)
return()=>{
    clearTimeout(timeoutId)
}
}, [searchTerm,movieData])
// console.log("filtermoviedata",filterMovieData)
// console.log("moviedata",movieData)

const deleteMovie=async(_id)=>{
    // console.log("Movie Deleted from the DB..")
    let res = await axios.delete(`${url}/deletemovie/${_id}`,config)
    if(res){
    getMovieData()
    navigate(`/allmovies`)
    } 
}
   
const getCartData=async()=>{
    let res = await axios.get(`${url}/cart`)//response in res.data >> moviedata
    // console.log("getCartData",res)
    if(res.data && res.data.cartData){
    dispatch(removeItem());//clearing existing cart items from store
    res.data.cartData.map((element)=>dispatch(addItem(element)))
}}

// WISH
  const [wishData,setWishData]=useState([])

const wishlist = useSelector(store => store.wishlist.wishItems); 
console.log("wishlist",wishlist) 
console.log("length",wishlist[0]?.length) 


// Api calls
  const addWishItemToServer = async (element) => {
    try {
      const token = sessionStorage.getItem('token');
      console.log("server",token)
      const response = await axios.post(
        `${url}/add-wish-list`,
        element,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Added to Wishlist:', response.data);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  
  const removeWishItemFromServer = async (element) => {
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(
        `${url}/delete-wish-item/${element._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Removed from Wishlist:', response.data);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const [isInWishlist, setIsInWishlist] = useState({}) 

const getWishData = async()=>{
    let res = await axios.get(`${url}/wish-list`,config)
    console.log("getWishData",res) //whwnever you get res from db, wish item will be saved to store
    console.log(res.data.wishData.length)
  dispatch(wishAddItem(res.data.wishData))
}
useEffect(()=>{
  getWishData()
},[])


// CART
const cart = useSelector(store => store.cart.cartItems); 
console.log("Cart",cart[0]?.length) 
console.log("Redux Store from Cart:", useSelector(store => store.cart));

return (
<>
<div >
<Box display="flex"
    flexDirection={"column"}
    alignItems="center"
    justifyContent={"center"}
    margin={2} >

    <Grid  container  className="mx-auto mb-3 d-flex justify-content-end flex-row align-items-center">
    
    {/* Search*/}
    <div className="iput-icons flex-wrap justify-content-end d-flex flex-row gap-3 border-4 border-danger">

    <MovieActionButtons
    mode={mode}
    navigate={navigate}
    wishlistCount={wishlist[0]?.length}
/>

{/* Conditionally rendered buttons for logged-in users */}
      {token && (
        <>
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

         
        </>
      )}

    <>
    {/* Debounce Search*/}
    <input style={{
  backgroundColor: mode === "light" ? "white" : " rgba(45, 45, 47, 0.52)",border:mode === "light"? "1px solid rgba(199, 199, 203, 0.52)"  : " none",color:mode==="light"? "black":"rgba(209, 209, 213, 0.63)",
    width:"200px",margin:"0px 10px"}}
    className="form-control  ps-4 " type="search" aria-label="Search" name="" id="" placeholder="Search movie"
    onChange={(e) => {
    console.log(e.target.value)
    setSearchTearm(e.target.value)}}
   />
    </>
  </div>
</Grid>
  
  {/* each movie card */}
    <Grid container display={"flex"} flexWrap={"wrap"} justifyContent={"start"} marginTop={2}>

{ 
    filterMovieData?.length === 0?
  <>
    <div className="position-relative mt-2 border-4" 
 style={{maxHeight:"390px", width:"100%"}} >
     <img src="https://img.freepik.com/premium-photo/black-clapperboard-clap-board-movie-slate-use-video-production-film-cinema-industry-black-background_335640-1294.jpg" alt="" className=" border-primary  border-4 w-100" style={{filter:"brightness(50%)",objectFit:"cover"}} />
     <h4 className="text-white opacity-75 border-4 border-danger  text-center  col-7 col-md-5 mx-auto" style={{position:"absolute",right:"5%",bottom:"0%"}}>
     <span className="text-warning">The Movie is Not Found. </span><br />
     Explore other movies,and please check next week for "inception"</h4>
    </div>
  </>
    :
  <>
  {
    filterMovieData?.map((element, index) => (
    <MovieCard {...element} key={index}  setMovieData={setMovieData} movieData={movieData} element={element} mode={mode}                 
    // Delete Button
    deleteBtn={
    <Tooltip title="Delete">
      <DeleteIcon style={{cursor:"pointer"}}
      onClick={()=> deleteMovie(element._id)}
      className="deleteBtn  border-sucess fs-3"/>
    </Tooltip>
  }

    // Redux
    reduxAddcartBtn={
    <>    
    <Tooltip title="Add to Cart">
       <ShoppingCartIcon className="reduxIcon fs-3"
       />
    </Tooltip>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light" />
    </>
    }

    WishBtn={
    <>
      <Tooltip title="Add to Wish List">
        <span className="d-flex align-items-center"
             onClick={()=>{handleAddWishItem(element)}}  >
              {/* is there is a data in isInWishlist */}
          {isInWishlist[element._id] ? (
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

     <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" 
      />
    </>
 }
 /> ))
  }
</>
}
</Grid>
</Box>
</div>
 </>
 )}
export default MovieDisplay_Debounce