import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import axios from "axios"
import { url } from "../../utils/constant"
import { useDispatch } from "react-redux"
import {addItem,removeItem} from "../../utils/cartSlice"
import { Button} from "react-bootstrap"
import {  useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';


// cart item is added to the card >> green
//this movie is already purchased, please check the order history >> error
function MovieDisplay_Debounce({mode,movieData,setMovieData}) 
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
// const [movieData, setMovieData] = useState([])
const [searchTerm, setSearchTearm] = useState("")//initial value
const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value

const getMovieData = async () => {
    console.log("Movie Data is called.");
    let res = await axios.get(`${url}/movie`)//response in res.data >> moviedata
    // res.data. {object} 
    // console.log(res.data.movieData)
    // // console.log(res.data.movieData._id);
    setMovieData(res.data.movieData);
    };
    useEffect(()=>{
        getMovieData()
    },[])

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
console.log("filterMovieData",filterMovieData)

const token = sessionStorage.getItem('token')
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
    setFilterMovieData(movieData) //reset to all blogs if search is empty
    console.log("Re-render with searchTerm")
    //searchTerm >> search reupdated >> depenedency Array >> re-render whenever you are typing in seach box  >> blog data  will be updated >> filteration >> .filter
     }   
    },900)
return()=>{
    clearTimeout(timeoutId)
}
}, [searchTerm,movieData])
console.log("filtermoviedata",filterMovieData)
console.log("moviedata",movieData)

useEffect(()=>{
    if(movieData){
        setFilterMovieData(movieData)
        // getSpecificMovieData()
    }
    // getMovieData()
    // console.log("MovieDisplay")
},[movieData])

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

const [foundSearch,setFoundSearch] = useState(false)



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
    {/* Search*/}
    <div className="iput-icons flex-wrap justify-content-end d-flex flex-row gap-3 border-4 border-danger">

    {
        token &&
    <>
    {/* Wish List */}
    <Button variant="none" onClick={()=>navigate('/usermovies')} className="movieDisplayBtn">
    <FaHeart className="fs-5 iconHeart me-1" /><span className="d-md-block d-none">    
    My Wish List
    </span>
    </Button>

    {/* ADD MOVIE */}
    <Button variant="none" className="movieDisplayBtn" onClick={()=>navigate('/addmovie')} >
     <FaPlusCircle className="fs-5 me-1 addIcon"  /><span className="d-md-block d-none">Add Movie</span></Button>
    
    {/* My MOVIES */}
    <Button variant="none" onClick={()=>navigate('/usermovies')} className="movieDisplayBtn">
    <FaBookmark className="fs-5 me-1 myMovieIcon" /><span className="d-md-block d-none">My Movies</span> </Button>
    </>
    }
    <>
        {/* Debounce Search*/}
        <input style={{backgroundColor:"rgba(45, 45, 47, 0.52)",width:"180px",color:"white"}}
        className="form-control  border-0  ps-4 me-2" type="search" aria-label="Search" name="" id="" placeholder="Search movie"
            onChange={(e) => {
            console.log(e.target.value)
        setSearchTearm(e.target.value)}}/>
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
{filterMovieData?.map((element, index) => (
    <MovieCard {...element} key={index} setMovieData={setMovieData} movieData={movieData} element={element} mode={mode} 
                        
    // Delete Button
    deleteBtn={
    <Tooltip title="Delete">
        <DeleteIcon style={{cursor:"pointer"}}
           onClick={()=> deleteMovie(element._id)}
           className="text-secondary"/>
    </Tooltip>
}
    

    // Redux
    reduxAddcartBtn={
    <>
       <ShoppingCartIcon className="reduxIcon fs-3"
       onClick={()=>{handleAdditem(element)}} 
       />
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
        /> 
    )) }
</>
}
</Grid>
</Box>
</div>
 </>
 )}
export default MovieDisplay_Debounce