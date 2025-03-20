import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import axios from "axios"
import { url } from "../../utils/constant"
import { useDispatch } from "react-redux"
import {addItem,removeItem} from "../../utils/cartSlice"
import { Button } from "react-bootstrap"
import { grey,amber,red,pink,blueGrey} from '@mui/material/colors';
import { Navigate, useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const UserMovies = ({mode}) => {
const navigate = useNavigate()
const dispatch= useDispatch()
const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value
const [specificMovieData,setSpecificMovieData] = useState([])
const [searchTerm, setSearchTearm] = useState("")
const [userMovieData,setUserMovieData] = useState([])
const token = sessionStorage.getItem('token')
let config = {
    headers: {
    Authorization: `Bearer ${token}`
}}

// Check if the typed word is included to the all movie data
const filterData = (searchText, allmovies) => {
    //console.log(searchText,allmovies)
    let fData = allmovies.filter((element) => element.moviename.toLowerCase().includes(searchTerm.toLowerCase()))
    return fData
    }
    //console.log(searchTerm)

const getUserMovieData = async()=>{
    console.log("Get Specific Movie Data......")
    let res = await axios.get(`${url}/specificmovie`,config)
    console.log(res.data.movieData)
    setUserMovieData(res.data.movieData)
}
useEffect(()=>{
    getUserMovieData()
    console.log("UserMovies")
},[])
console.log("UserMovieData",userMovieData)

const deleteMovie=async(_id)=>{
    console.log("Movie Deleted from the DB...")
    let res = await axios.delete(`${url}/deletemovie/${_id}`,config)
    console.log(res)
    getUserMovieData
}

const getCartData=async()=>{
    let res = await axios.get(`${url}/cart`,config) // response in res.data >> usermoviedata
    console.log(res.data.cartData)
    if(res.data && res.data.cartData){
        dispatch(removeItem()) // clearing existing cart items from store
        res.data.cartData.map((element)=>dispatch(addItem(element)))
    }
}
const handleAdditem=async(movieItem)=>{
    console.log(movieItem)
    // >> api call for updating the backend >> saving to the DB
    let res=await axios.post(`${url}/addcart`, movieItem,config)
    console.log(res)
    getCartData()
}
const redColor = red[900];
const redColor1 = red[600];

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
            {/* <div className="d-flex justify-content-end "> */}
            <div className="iput-icons  justify-content-end d-flex flex-row gap-3 border-4 border-danger">
            {/* <i className="fas fa-search icon fs-5 pt-2 px-3 "></i> */}
            {/* {
            token &&
            // <Button variant="warning" onClick={()=>navigate('/usermovies')} className="text-nowrap me-3">My Movies</Button>
            } */}
            <Button variant="secondary" onClick={()=>navigate('/allmovies')} className="text-nowrap me-3">Back to All Movies</Button>
           <input
            className="form-control  border-secondary ps-4" type="search" aria-label="Search" name="" id="" placeholder="Search movie"
            onChange={(e) => {
            //console.log(e.target.value)
            setSearchTearm(e.target.value)}} />
        
            <Button variant="outline-secondary" className="" type="submit"
            onClick={() => {
            console.log("Button is cliecked,searchTerm")
            const data = filterData(searchTerm, movieData)//passing the data
            console.log(data)
            setFilterMovieData(data)
            }}>Search</Button>
            </div>
            </Grid>
        </Grid>
        <Grid container display={"flex"} flexWrap={"wrap"} justifyContent={"center"} marginTop={2}
   >
        {
          userMovieData?.map((element,index)=>(
                <MovieCard {...element} key={index} setUserMovieData={setUserMovieData} userMovieData={userMovieData} element={element} mode={mode} 

                //Delete Button
                deleteBtn={
                    <IconButton  
                    onClick={()=> deleteMovie(element._id)}>
                    <DeleteIcon />
                </IconButton>
                }
                    
                // Redux
                reduxAddcartBtn={
                <IconButton   
                onClick={()=>{handleAdditem(element)}}>
                 <ShoppingCartIcon />
                </IconButton>
            }
     /> 
   ))}
   </Grid>
</Box>
  )
}

export default UserMovies