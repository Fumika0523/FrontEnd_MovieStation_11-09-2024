import { useEffect, useState } from "react"
import MovieCard from "../MovieCard"
import axios from "axios"
import { url } from "../../../utils/constant"
import { useDispatch } from "react-redux"
import {addItem,removeItem} from "../../../utils/cartSlice"
import { Button} from "react-bootstrap"
import {  useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import { IoIosFilm } from "react-icons/io";
import WishMovieCard from "./WishMovieCard"
import { useSelector } from "react-redux"

function WishMovieDisplay_Debounce({mode}) 
{

  const [wishMovieData,setWishMovieData] = useState([])
  const [isHovered, setIsHovered] = useState(false);

  const divStyle = {
    color: !isHovered ? ' rgba(163, 162, 162, 0.648)' : 'white',
    cursor: 'pointer'
  };


//conditionally done.
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

const navigate = useNavigate()
const dispatch= useDispatch()
const [searchTerm, setSearchTearm] = useState("")//initial value
const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value


const fetchData = (searchTerm)=>{
    console.log("searchTerm",searchTerm)
    //apil call
    const filterData=(searchText,allMovies)=>{
      return allMovies.filter((element)=>
        element.moviename.toLowerCase().includes(searchText.toLowerCase()) //searching by element.title >> JSON structure always review
      )
    }
    return filterData(searchTerm,wishMovieData)
  }
console.log("filterMovieData",filterMovieData)

const token = sessionStorage.getItem('token')
const userId = sessionStorage.getItem
('userId')
console.log(userId)
// console.log("token",token)
let config = {
    headers: {
    Authorization: `Bearer ${token}`
}}

   // ALL
    useEffect(() => {
    const timeoutId = setTimeout(()=>{
    if(searchTerm.trim()!==""){ //not empty
    const fData = fetchData(searchTerm)
     setFilterMovieData(fData)
    }else{ //empty
    setFilterMovieData(wishMovieData)
    console.log("Re-render with searchTerm")
     }   
    },900)
return()=>{
    clearTimeout(timeoutId)
}
}, [searchTerm,wishMovieData])
console.log("filtermoviedata",filterMovieData)
console.log("wishMoviedata",wishMovieData)

useEffect(()=>{
    if(wishMovieData){
        setFilterMovieData(wishMovieData)
        // getSpecificMovieData()
    }
    // getMovieData()
    // console.log("MovieDisplay")
},[wishMovieData])

const deleteMovie=async(_id)=>{
    console.log("Movie Deleted from the DB..")
    let res = await axios.delete(`${url}/deletemovie/${_id}`,config)
    if(res){
    getMovieData()
    navigate(`/allmovies`)
    } 
}
   
const getCartData=async()=>{
    let res = await axios.get(`${url}/cart`,config)//response in res.data >> moviedata
    console.log("getCartData",res)
    if(res.data && res.data.cartData){
    dispatch(removeItem());//clearing existing cart items from store
    res.data.cartData.map((element)=>dispatch(addItem(element)))
}}


const handleAdditem=async(movieItem)=>{
     console.log("movieItem,",movieItem)
    if (token == null){
            navigate(`/signin`) 
    } else {
        let res=await axios.post(`${url}/addcart`, movieItem,config)
        console.log("res",res.data.message)
        if(res.data.message == "Cart has been added successfully!"){
            successNotify()
        } else {
            return   errorNotify()
        }
        getCartData()
    }}

      const addWishNotify = () => toast.success('Added to Wish List!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
      });

      
          const handleAddWishitem=async(movieItem)=>{
        // console.log("movieItem,",movieItem)
        // >> api call for updating the backend >> saving to the DB  
        // "=" << Assignment operator
        // "==" << condition comparison operator
        if (token == null){
                navigate(`/signin`) 
        } else {
            let res=await axios.post(`${url}/add-wish-list`, movieItem,config)
            console.log("res",res.data.message)
            if(res.data.message == "Wish Item has been added successfully!"){
                addWishNotify()
            }else{
                console.log("This movie is already added to wish list")
            }
            getCartData()
        }}

    const getWishData = async()=>{
    let res = await axios.get(`${url}/wish-list`,config)
    console.log("getWishData",getWishData)
    console.log("res",res)
    setWishMovieData(res.data.wishData)
}
    useEffect(()=>{
    getWishData()
       },[]) 

const wishlist = useSelector(store => store.wishlist.wishItems); 
console.log("wishlist",wishlist) 

return (
<>
<div>
    <Box display="flex" flexDirection={"column"} 
        alignItems="center" justifyContent={"center"}
        margin={2} border={2} >
        <Grid container className=" mx-auto d-flex justify-content-between flex-row align-items-center">

        <div className="text-start d-flex align-items-center ms-2 fs-3"><FaHeart className="me-1 text-danger fs-2"/>My Wishlist</div>
        {/* Search*/}
        <div className="iput-icons flex-wrap justify-content-end d-flex flex-row gap-3 border-4 ">
      
        {
            token &&
        <>
        {/* All Movie */}
        <Button variant="none" onClick={()=>navigate('/allmovies')} className="movieDisplayBtn d-flex"
        style={{
    backgroundColor: mode === "light" ? "white" : " rgba(45, 45, 47, 0.52)",border:mode === "light"? "1px solid rgba(199, 199, 203, 0.52)"  : " none",  color:mode==="light"? "black":"rgba(209, 209, 213, 0.63)"
  }}
        >
        <IoIosFilm className="fs-4 movieIcon me-1" />
        <span className="d-md-block d-none">All Movies</span>
        </Button>
        </>
        }
        <>
        
        {/* Debounce Search*/}
        <input style={{backgroundColor:"rgba(45, 45, 47, 0.52)",width:"180px",color:"white"}}
        className="form-control  border-0  ps-4 me-2" type="search" aria-label="Search" name="" id="" placeholder="Search movie"
        onChange={(e) => {
        // console.log(e.target.value)
        setSearchTearm(e.target.value)}}/>
        </>
    </div>
    </Grid>
        {/* each movie card */}
        <Grid container display={"flex"} flexWrap={"wrap"} justifyContent={"start"} marginTop={2} border={2}>

    {/* { 
        filterMovieData?.length === 0?
    <>

    <div className="position-relative mt-2 border-4" 
    style={{width:"100%"}} >
        <img src="https://img.freepik.com/premium-photo/black-clapperboard-clap-board-movie-slate-use-video-production-film-cinema-industry-black-background_335640-1294.jpg" alt="" className=" border-primary  border-4 w-100" style={{filter:"brightness(50%)",objectFit:"cover",maxHeight:"430px", width:"100%"}} />
        <h4 className="text-white opacity-75 border-4 border-danger text-center  col-7 col-md-5 mx-auto" style={{position:"absolute",right:"5%",bottom:"10%"}}>
        <span className="text-warning">Your Wishlist is Empty </span><br />
        </h4>
    </div>

    </>
        :
    <> */}
    {filterMovieData?.map((element, index) => (
        <WishMovieCard {...element} key={index} setWishMovieData={setWishMovieData} wishMovieData={wishMovieData} element={element} mode={mode} 
                            
        // Delete Button
        deleteBtn={
        <Tooltip title="Delete">
            <DeleteIcon style={{cursor:"pointer"}}
            onClick={()=> deleteMovie(element._id)}
            className="me-1 deleteBtn  fs-4"/>
        </Tooltip>
    }

        // Redux
        reduxAddcartBtn={
        <>    
        <Tooltip title="Add to Cart">
        <ShoppingCartIcon className="reduxIcon fs-3"
        onClick={()=>{handleAdditem(element)}} />
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


        // WishBtn={
        // <>
        //  <Tooltip title="Add to Wish List">
        //  <FavoriteIcon
        //  onClick={()=>{handleAddWishitem(element)}} 
        //      style={divStyle}
        //   onMouseOver={() => setIsHovered(true)}
        //   onMouseOut={() => setIsHovered(false)}

        //   className=""/>
        // </Tooltip>
        // <ToastContainer
        //     position="top-right"
        //     autoClose={5000}
        //     hideProgressBar={false}
        //     newestOnTop={false}
        //     closeOnClick={false}
        //     rtl={false}
        //     pauseOnFocusLoss
        //     draggable
        //     pauseOnHover
        //     theme="light" 
        //     />
        // </>
        // }
        
            /> 
        )) }
    {/* </> 
  } */}
    </Grid>
    </Box>
</div>
 </>
 )}
export default WishMovieDisplay_Debounce