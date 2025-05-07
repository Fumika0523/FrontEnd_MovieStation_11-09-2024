import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import axios from "axios"
import { url } from "../../utils/constant"
import { useDispatch } from "react-redux"
import {addItem,removeItem} from "../../utils/cartSlice"
import { Button, ButtonGroup } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import AboutUs_ImageBanner from "../AboutUs_page/AboutUs_ImageBanner"
import { TbShoppingBagPlus } from "react-icons/tb";


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
    {/* <i className="fas fa-search icon fs-5 pt-2 px-3 "></i> */}
    {
        token &&
    <>
    {/* ADD MOVIE */}
    <Button variant="success" className="text-nowrap me-1 d-flex align-items-center gap-1" onClick={()=>navigate('/addmovie')} >
     <FaPlusCircle className="fs-5 " /><span className="d-md-block d-none">Add Movie</span></Button>
    
    {/* My MOVIES */}
    <Button variant="warning" onClick={()=>navigate('/usermovies')} className=" text-nowrap me-1 d-flex align-items-center gap-1">
    <FaHeart className="fs-5" style={{ color: "red"}}/><span className="d-md-block d-none"  >My Movies</span> </Button>
    </>
    }
  
    <>
        {/* Debounce Search*/}
        <input
        className="form-control  border-secondary ps-4" type="search" aria-label="Search" name="" id="" placeholder="Search movie"
            style={{width:"180px"}}
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
 {/* <h1 className="text-white">NOT FOUND</h1> */}
 <div className="w-100 row position-relative" >
    <div className="col-md-11 col-10 mx-auto">
    <h1 className="text-white" style={{position:"absolute",left:"40%",top:"50%"}}>
    The Movie is Not Found. Explore other movies, please check next week for "inception"</h1>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAA9lBMVEX///8B//8AAP7MzMz/P/wB/wH9JB///wEAAAAtRpgGPllcXFw/Pz9sbGyXl5fIyNb5+iLw/wC4jbj/Nv//JBniIEEC/7jI09jQ1ecAMVAbO5RpaWklQZpVVVWNjY2nr88GP1Ht/v7t/+3t7f79AACiotoBxwHHevxQT+/S08kEK6QfMGr/7/7/7+7HxwFf0f7GHRjZ2dleVVX//+3+uf4/p6asrKwAACi4L7YmJiYEKz7m5uZLS0szMzMBuLcfR5SSQ8QfnsX/Hv/gAC2fn+PDwyO9yAZFzbiRk7e0IDq+F7YSKCQfHx/KheFuPaQfKGUfeqQmN5YqyoA5AAAB+0lEQVR4nO3a6U4TURyH4VFR0baA4EZLEXFfQMEFkIoK7uDS+78ZQfwwEGF+jiQN4Xkv4GT+z5xzkkmmKCRJ0jHoWdjNsNms4nHWXNitqOJM0uj5rEunsq6ezRpfn4i6nbVxOio0GRuQycRQ1Lmoy1eYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMGHChAkTJkyYMMlNso7Y5E7S+w/zUR+fZH26m/X5XtbTrC/3o4qMbmk4K3yvX8Pl1sJ9Fy63+SDqiE2y4z+0PBiTlYXopmDChAkTJkyYMGHChAmTv1T18TdYk63Q5GHU5Ku9vTyg54f37e1u3x9F/fj5brcXFTV3WinV7JVqdP7U2n7CVnXFTNTFfRX1utF+87sLYVPtqZ36rcXDa2zXbZbqlmecHikVbKdi/7RZtU1Sjb00rUZ1B5p0mDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmDBhwoQJEyZMmJwgk8la1TXpt+vU73Sr670u1euU+meTa7WqabJ6vV4L/9VqueR/e0mSNNB+ASj/pPAOQG03AAAAAElFTkSuQmCC" alt="" className=" mx-auto" style={{width:"100%",height:"80%",filter:"brightness(50%)"}} />
    </div>

 </div>

 </>
    :
<>
{filterMovieData?.map((element, index) => (
    <MovieCard {...element} key={index} setMovieData={setMovieData} movieData={movieData} element={element} mode={mode} 
                        
    // Delete Button
    deleteBtn={
    <IconButton variant="none" className="movieDeleteBtn"
    onClick={()=> deleteMovie(element._id)}>
        <DeleteIcon />
    </IconButton>
}
    
    // Redux
    reduxAddcartBtn={
    <>
    {/* <IconButton className="reduxIcon"  */}
    {/* <Button size="sm" variant="warning" className="reduxIcon"
     > */}
       <ShoppingCartIcon className="reduxIcon fs-3"
       onClick={()=>{handleAdditem(element)}} 
       />
       {/* </Button> */}
    {/* </IconButton> */}
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