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

function MovieDisplay({mode}) 
{
console.log(mode)
// console.log(mode.mode)
const greyColor = grey[900]; // #212121
const amberColor = amber[700];
const redColor = red[900];
const redColor1 = red[600];
const pinkColor = pink[900]
const darkGreyColor = grey[700];
const blueGreyColor = blueGrey[500]

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

let displayStyle = {
    display: "flex",
    // flexWrap: "wrap",
    gap: "0%",
    margin: "1% 2%",
    // backgroundColor: "black",
    // position: "relative",
    border:"1px solid red",
    cursor: "pointer",
}
//console.log(searchTerm)

const token = sessionStorage.getItem('token')
let config = {
    headers: {
    Authorization: `Bearer ${token}`
}}
// ALL
const getMovieData = async () => {
    console.log("Movie Data is called.");
    let res = await axios.get(`${url}/movie`)//response in res.data >> moviedata
    // res.data. {object} 
    console.log(res.data)
    console.log(res.data.movieData)
    // console.log(res.data.movieData._id);
    console.log("movieData")
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
console.log("Specific Movie Data",specificMovieData)
// console.log("Specific ID",specificMovieData._id)
console.log("movieData",movieData)

const deleteMovie=async(_id)=>{
    console.log("Movie Deleted from the DB..")
    let res = await axios.delete(`${url}/deletemovie/${_id}`,config)
    console.log(res)
    getMovieData()
}
   
const getCartData=async()=>{
    let res = await axios.get(`${url}/cart`,config)//response in res.data >> moviedata
    console.log(res.data.cartData);
    if(res.data && res.data.cartData){
    dispatch(removeItem());//clearing existing cart items from store
    res.data.cartData.map((element)=>dispatch(addItem(element)))
}}

const handleAdditem=async(movieItem)=>{
    console.log(movieItem)
    // >> api call for updating the backend >> saving to the DB
    let res=await axios.post(`${url}/addcart`, movieItem,config)
    console.log(res)
    getCartData()
}

return (
<>
{/* <div className="mt-1 mb-1" > */}
<Box 
display="flex"
flexDirection={"column"}
  alignItems="center"
  justifyContent={"end"}
  margin={2}
  >
<Grid  container 
// style={displayStyle} 
>
    <Grid  justifyContent={"end"} display={"flex"} marginLeft={"auto"} >
    {/* Search*/}
    {/* <div className="d-flex justify-content-end "> */}
    <div className="iput-icons d-flex flex-row  border-danger me-5">
    {/* <i className="fas fa-search icon fs-5 pt-2 px-3 "></i> */}

    {
    token &&<Button variant="warning" onClick={()=>navigate('/usermovies')} className="text-nowrap me-3">My Movies</Button>
    }

    <input
    style={{color:mode=="light" ? "white":"white"}}
    className="form-control me-2 ps-4 bg-dark " type="search" aria-label="Search" name="" id="" placeholder="   Search movie"
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
    {/* </div> */}
    </Grid>
</Grid>

    {/* each movie card */}
    {/* <div style={displayStyle} > */}
<Grid container display={"flex"} flexWrap={"wrap"} justifyContent={"center"} marginTop={2}
   >
    {!searchTerm ? movieData?.map((element, index) => (
    <MovieCard {...element} key={index} setMovieData={setMovieData} movieData={movieData} element={element} mode={mode} 
                        
    // Delete Button
    deleteBtn={
    <Button
    className='fs-5'
    onClick={()=> deleteMovie(element._id)}
    style={{color:mode=="light" ? redColor1:redColor}}
    >
    <i className="fa-solid fa-trash"></i>
    </Button>}
    
    // Redux
    reduxAddcartBtn={
        <Button
        className='fs-5 px-3' variant="outline-secondary"
        style={{color:"	#FFC107"}}
        onClick={()=>{handleAdditem(element)}}>
        <i className="fa-solid fa-cart-shopping "></i></Button>}
        
    /> //spread operator
    )) : filterMovieData?.map((element, index) => (
    <MovieCard {...element} key={index} setMovieData={setMovieData}  element={element} mode={mode} 
                            
    // Delete Button
    deleteBtn={
    <Button className="btn px-w " onClick={()=> deleteMovie(element._id)}><i className="fa-solid fa-trash" 
    // style={{color:mode=="light" ? greyColor:"white"}}
    ></i></Button>}

    // Redux
    reduxAddcartBtn={
    <Button className="px-2" onClick={()=>{handleAdditem(element)}}><i className="fa-solid fa-cart-shopping" 
    // style={{color:mode=="light" ? greyColor:"white"}}
    ></i></Button>}/>
    ))}
</Grid>
</Box>
    {/* </div> */}
   {/* </div> */}
 </>
 )}
export default MovieDisplay