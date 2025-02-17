import axios from 'axios'
import { useState } from 'react'
import React, { useEffect } from 'react'
import { url } from '../../utils/constant'
import MovieCard from './MovieCard'
import { Button } from 'react-bootstrap'
import {addItem,removeItem} from "../../utils/cartSlice"

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

    return (
    // <div>UserMovies</div>
    <div style={displayStyle}>
        {
            userMovieData?.map((element,index)=>(
                <MovieCard {...element} key={index} setUserMovieData={setUserMovieData} userMovieData={userMovieData} mode={mode} 
                //Delete Button
                deleteBtn={
                    <Button className="fs-5"
                    onCLick={()=>deleteMovie(element._id)}
                    >    <i className="fa-solid fa-trash"></i></Button>}

                    //Reduc
                    reduxAddcartBtn={
                        <Button
                        className='fs-5'
                        onCLick={()=>{handleAdditem(element)}}></Button>}
                        /> 
                    ))

                
           
        }
    </div>

  )
}

export default UserMovies