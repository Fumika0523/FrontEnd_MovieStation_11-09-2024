import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import axios from "axios"
import { url } from "../../utils/constant"
import { useDispatch } from "react-redux"
import {addItem,removeItem} from "../../utils/cartSlice"
import { Button } from "react-bootstrap"
import { IoChevronBackOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';

const UserMovies = ({mode}) => {
const navigate = useNavigate()
const dispatch= useDispatch()
const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value
const [searchTerm, setSearchTearm] = useState("")
const [userMovieData,setUserMovieData] = useState([])
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
}}

const getUserMovieData = async()=>{
    let res = await axios.get(`${url}/specificmovie`,config)
    setUserMovieData(res.data.movieData)
}
useEffect(()=>{
    getUserMovieData()
},[])

const fetchData = (searchTerm)=>{
    console.log("Searching in my favourite movies..",searchTerm)
    const filterData = (searchText,allMovies)=>{
        return allMovies.filter((element)=>
            element.moviename.toLowerCase().includes(searchText.toLowerCase())
        )
    }
    return filterData(searchTerm,userMovieData)
}

useEffect(()=>{
    getUserMovieData()
    const timeoutId = setTimeout(()=>{
    if(searchTerm.trim()!==""){
        const fData = fetchData(searchTerm)
        setFilterMovieData(fData)
    }
    },900)
    return()=>{
    clearTimeout(timeoutId)
}
},[searchTerm,userMovieData])
useEffect(()=>{
    setFilterMovieData(userMovieData)
    // getMovieData()
},[userMovieData])

const deleteMovie=async(_id)=>{
    console.log("Movie Deleted from the DB...")
    let res = await axios.delete(`${url}/deletemovie/${_id}`,config)
    // console.log(res)
    if(res){
        getUserMovieData()
        navigate(`/usermovies`)
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

    return (
    // <div>UserMovies</div>
    <Box 
    display="flex"
    flexDirection={"column"}
      alignItems="center"
      justifyContent={"end"}
      margin={2}
      >
        <Grid  container  className=" border-4"
        // style={displayStyle} 
        >
        <Grid className=" border-4 me-2" justifyContent={"end"} display={"flex"} marginLeft={"auto"}  >
        {/* Search*/}

       <div className="iput-icons  justify-content-end d-flex flex-row gap-3 border-4 border-danger">

            <Button variant="secondary" onClick={()=>navigate('/allmovies')} className="text-nowrap me-3"><IoChevronBackOutline className="fs-4"/>Back to All Movies</Button>

            {/* Search Box */}
           <input  className="form-control  border-secondary ps-4" type="search" aria-label="Search" name="" id="" placeholder="Search movie"
            onChange={(e) => {
            setSearchTearm(e.target.value)}} />
       </div>
       </Grid>

        </Grid>
        <Grid container display={"flex"} flexWrap={"wrap"} justifyContent={"start"} marginTop={2}
   >
        {
          filterMovieData?.map((element,index)=>(
                <MovieCard {...element} key={index} setUserMovieData={setUserMovieData} userMovieData={userMovieData} element={element} mode={mode} 

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
        <IconButton className="reduxIcon" 
        onClick={()=>{handleAdditem(element)}}  >
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
        theme="light" />
        </>
                  }
     /> 
   ))}
   </Grid>
</Box>
  )
}

export default UserMovies