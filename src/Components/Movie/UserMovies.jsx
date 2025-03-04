import axios from 'axios'
import { useState } from 'react'
import React, { useEffect } from 'react'
import { url } from '../../utils/constant'
import MovieCard from './MovieCard'
import { Button } from "@mui/material"
import {addItem,removeItem} from "../../utils/cartSlice"
import { grey,amber,red,pink,blueGrey} from '@mui/material/colors';

const UserMovies = ({mode}) => {

const [userMovieData,setUserMovieData] = useState([])
const token = sessionStorage.getItem('token')
let config = {
    headers: {
    Authorization: `Bearer ${token}`
}}
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
    <div style={displayStyle}>
        {
            userMovieData?.map((element,index)=>(
                <MovieCard {...element} key={index} setUserMovieData={setUserMovieData} userMovieData={userMovieData} element={element} mode={mode} 

                //Delete Button
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
        className='fs-5'
        style={{color:mode=="light" ? "black":"white"}}
        onClick={()=>{handleAdditem(element)}}>
        <i className="fa-solid fa-cart-shopping "></i></Button>}
                        
                /> 
   
                 )
                )
        }
    </div>

  )
}

export default UserMovies