import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import axios from "axios"
import { url } from "../../utils/constant"
import { useDispatch } from "react-redux"
import {cartAddItem,cartRemoveItem} from "../../utils/cartSlice"
import { Button } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";


// cart item is added to the card >> green
//this movie is already purchased, please check the order history >> error
function MovieDisplay({mode}) 
{

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
// STate valiable
const [movieData, setMovieData] = useState([])
const [searchTerm, setSearchTearm] = useState("")//hold search value
const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value
const [specificMovieData,setSpecificMovieData] = useState([])

// Check if the typed word is included to the all movie data
const filterData = (searchText, allmovies) => {
//console.log(searchText,allmovies)
let fData = allmovies.filter((element) => element.moviename.toLowerCase().includes(searchTerm.toLowerCase()))
return fData
}
//console.log(searchTerm)

const token = sessionStorage.getItem('token')
console.log("token",token)
let config = {
    headers: {
    Authorization: `Bearer ${token}`
}}

// ALL
const getMovieData = async () => {
    console.log("Movie Data is called.");
    let res = await axios.get(`${url}/movie`)//response in res.data >> moviedata
    // res.data. {object} 
    // console.log(res.data.movieData)
    // // console.log(res.data.movieData._id);
    setMovieData(res.data.movieData);
    setFilterMovieData(res.data.movieData)
    };
    useEffect(() => {
    getMovieData()
    getSpecificMovieData()
    console.log("MovieDisplay")
}, [])
//console.log(searchTerm)

// SPECIFIC
const getSpecificMovieData = async () =>{
    console.log("Specific Movie Data is called....")
    let res = await axios.get(`${url}/specificmovie`,config)
    console.log(res.data.movieData)
    setSpecificMovieData(res.data.movieData)
}
// console.log("Specific Movie Data",specificMovieData)
// console.log("Specific ID",specificMovieData._id)
// console.log("movieData",movieData)

const deleteMovie=async(_id)=>{
    console.log("Movie Deleted from the DB..")
    let res = await axios.delete(`${url}/deletemovie/${_id}`,config)
    // console.log(res)
    getMovieData()
}
   
const getCartData=async()=>{
    let res = await axios.get(`${url}/cart`,config)//response in res.data >> moviedata
    console.log("getCartData",res)
    if(res.data && res.data.cartData){
    dispatch(removeAllItems());//clearing existing cart items from store
    res.data.cartData.map((element)=>dispatch(cartAddItem(element)))
}}

const handleAdditem=async(movieItem)=>{
    // console.log("movieItem,",movieItem)
    // >> api call for updating the backend >> saving to the DB  
    // "=" << Assignment operator
    // "==" << condition comparison operator
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

return (
<>
<div>
<Box 
    display="flex"
    flexDirection={"column"}
    alignItems="center"
    justifyContent={"center"}
    margin={2} >
    <Grid  container  className="mx-auto d-flex justify-content-end flex-row align-items-center">
    {/* <Grid className=""  > */}
    {/* Search*/}
    <div className="iput-icons flex-wrap justify-content-end d-flex flex-row gap-3 border-4 border-danger">
    {/* <i className="fas fa-search icon fs-5 pt-2 px-3 "></i> */}
    {
    token &&
    <>
   
    <Button variant="success" className="text-nowrap me-1 d-flex align-items-center gap-1" onClick={()=>navigate('/addmovie')} >
     <FaPlusCircle className="fs-5 " /><span className="d-sm-block d-none">Add Movie</span></Button>
    
    <Button variant="warning" onClick={()=>navigate('/usermovies')} className=" text-nowrap me-1 d-flex align-items-center gap-1">
    <FaHeart className="fs-5" style={{ color: "red"}}/><span className="d-md-block d-none"  >My Movies</span> </Button>
    </>
    }
  {/* debounce */}
   <input
    className="form-control  border-secondary ps-4" type="search" aria-label="Search" name="" id="" placeholder="Search movie"
    style={{width:"180px"}}
    onChange={(e) => {
    console.log(e.target.value)
    setSearchTearm(e.target.value)}}
    />
    {/* Button is for to call 1 API */}
    <Button variant="outline-secondary" className="" type="submit"
    onClick={() => {
    console.log("Button is cliecked,searchTerm")
    const data = filterData(searchTerm, movieData) //passing the data
    console.log(data)
    setFilterMovieData(data)
    }}>Search</Button>


    </div>
    {/* </Grid> */}
    </Grid>

    {/* each movie card */}
    <Grid container display={"flex"} flexWrap={"wrap"} justifyContent={"start"} marginTop={2}>
    {!searchTerm ? movieData?.map((element, index) => (
    <MovieCard {...element} key={index} setMovieData={setMovieData} movieData={movieData} element={element} mode={mode} 
                        
    // Delete Button
    deleteBtn={
    <IconButton className=""
    onClick={()=> deleteMovie(element._id)}>
        <DeleteIcon className="text-secondary" />
    </IconButton>
}
    
    // Redux
    reduxAddcartBtn={
  <>
      <IconButton className="reduxIcon" onClick={()=>{handleAdditem(element)}}  >
        <ShoppingCartIcon />
      </IconButton>
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
        // transition={Bounce}
        />
  </>
        }
          

    /> //spread operator
    )) : filterMovieData?.map((element, index) => (
    <MovieCard {...element} key={index} setMovieData={setMovieData}  element={element} mode={mode} 
                            
    // Delete Button
    deleteBtn={
        <IconButton variant="primary"
        onClick={()=> deleteMovie(element._id)}
        style={{
            // backgroundColor:mode=="light" ? "transparent":"#3b3b3b",
            color:mode=="light" ? "rgb(66, 66, 66)":"white"}}>
        <i className="fa-solid text-secondary fs-5 fa-trash"></i>
        </IconButton>}

    // Redux
    reduxAddcartBtn={
        <>
        <Button
        className='fs-5 likeBtn px-3' variant=""
        style={{
            // backgroundColor:mode=="light" ? "transparent":"#3b3b3b",
            }}
        onClick={()=>{handleAdditem(element)}}
      ><i className="fa-solid fs-5 fa-cart-shopping text-warning "></i></Button>
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
        // transition={Bounce}
        /> </>
    }/>
    ))}
</Grid>
</Box>
</div>
 </>
 )}
export default MovieDisplay