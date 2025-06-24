import { useEffect, useState } from "react"
import MovieCard from "../MovieCard"
import axios from "axios"
import { url } from "../../../utils/constant"
import { useDispatch } from "react-redux"
import {cartAddItem,removeAllItems} from "../../../utils/cartSlice"
import { Navigate, useNavigate } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import MovieActionButtons from "../MovieActionButtons"


const MyMoviesDisplay_Debounce = ({mode}) => {
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
    res.data.cartData.map((element)=>dispatch(cartAddItem(element)))
}}


const getwishMovieData=async()=>{
    let res = await axios.get(`${url}/add-my-wish-list`,config)
    console.log("getWishMovieData",res)
    // if(res.data && res.data.getwishMovieData){
    //     dispatch(removeItem())
    //     res.data.cartData.map((element)=>dispatch(addItem(element)))
    // }
}

const handleAddWishList = async(wishItem)=>{
    console.log("wishItem",wishItem)
    let res = await axios.post(`${url}/add-my-wish-list`,config)
    console.log("res",res.data.message)
    if(res.data.message == "Movie has been added successfully to wish List!"){
        successNotify()
    } else {
        return   errorNotify()
    }
    getwishMovieData()
}

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
            <MovieActionButtons/>
        </div>
    
    </>

  )
}

export default MyMoviesDisplay_Debounce