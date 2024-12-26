import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import axios from "axios"
import { url } from "../../utils/constant"
import { useDispatch } from "react-redux"
import {addItem,removeItem} from "../../utils/cartSlice"
import { Button } from "@mui/material"
import { grey,amber,red,pink,blueGrey} from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function MovieDisplay({ mode, setMode, }) {
const greyColor = grey[900]; // #212121
const amberColor = amber[500];
const redColor = red[900];
const pinkColor = pink[900]
const darkGreyColor = grey[700];
const blueGreyColor = blueGrey[500]

const theme = createTheme({
    palette: {
      primary : {
        main:'#424242',
    },
    secondary:{
        main:'#ffc107',
    },
  },
});
  
const dispatch= useDispatch()
const [movieData, setMovieData] = useState([])
const [searchTerm, setSearchTearm] = useState("")//hold search value
const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value

// Check if the typed word is included to the all movie data
const filterData = (searchText, allmovies) => {
//console.log(searchText,allmovies)
let fData = allmovies.filter((element) => element.moviename.toLowerCase().includes(searchTerm.toLowerCase()))
return fData
}

let displayStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "2.7%",
    margin: "1% 4% 1% 4%",
    // backgroundColor: "black",
    position: "relative",
    // border:"1px solid red",
    cursor: "pointer",
}
//console.log(searchTerm)

const token = sessionStorage.getItem('token')
let config = {
    headers: {
    Authorization: `Bearer ${token}`
}}

const getMovieData = async () => {
    console.log("Movie Data is called.");
    let res = await axios.get(`${url}/movie`, config)//response in res.data >> moviedata
    console.log(res.data.movieData);
    console.log("movieData")
    setMovieData(res.data.movieData);
    setFilterMovieData(res.data.movieData)
    };
    useEffect(() => {
        getMovieData()
}, [])
//console.log(searchTerm)

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

<div className="mt-1 mb-1" >
    {/* Search*/}
    <div className="d-flex justify-content-end me-5 pe-3">
    <div className="iput-icons d-flex flex-row">
    {/* <i className="fas fa-search icon fs-5 pt-2 px-3 "></i> */}
    <input className="form-control me-2 ps-4 bg-dark text-white" type="search" aria-label="Search" name="" id="" placeholder="   Search movie"
    onChange={(e) => {
    //console.log(e.target.value)
    setSearchTearm(e.target.value)}} />
    <button className="btn px-3 mx-1 btn-outline-secondary" type="submit"
    onClick={() => {
    console.log("Button is cliecked,searchTerm")
    const data = filterData(searchTerm, movieData)//passing the data
    console.log(data)
    setFilterMovieData(data)
    }}>Search</button>
    </div>
    </div>
    
    {/* each movie card */}
    <div style={displayStyle} >

    {!searchTerm ? movieData?.map((element, index) => (
    <MovieCard mode={mode} setMode={setMode} {...element} key={index} setMovieData={setMovieData} element={element}
                        
    // Delete Button
    deleteBtn={
    <Button
    className='fs-6 bg-primary'
    onClick={()=> deleteMovie(element._id)}

    >
    <i className="fa-solid fa-trash"
    style={{color:mode=="light" ? "white":"red"}}></i>
    </Button>}
    
    // Redux
    reduxAddcartBtn={
    <Button
    className='fs-6 bg-primary'
    style={{color:mode=="light" ? greyColor:"white"}}
    onClick={()=>{handleAdditem(element)}}><i className="fa-solid fa-cart-shopping text-white"></i></Button>}
        
    /> //spread operator
    )) : filterMovieData?.map((element, index) => (
    <MovieCard {...element} key={index} setMovieData={setMovieData} element={element}
                            
    // Delete Button
    deleteBtn={
    <Button className="btn px-w " onClick={()=> deleteMovie(element._id)}><i className="fa-solid fa-trash" style={{color:mode=="light" ? greyColor:"white"}}></i></Button>}

    // Redux
    reduxAddcartBtn={
    <Button className="btn px-w " onClick={()=>{handleAdditem(element)}}><i className="fa-solid fa-cart-shopping" style={{color:mode=="light" ? greyColor:"white"}}></i></Button>}/>
    ))}
    </div>
   </div>
 </>
 )}
export default MovieDisplay