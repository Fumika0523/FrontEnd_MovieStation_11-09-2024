import { useDispatch } from "react-redux"
import {addItem,removeItem} from "../../../utils/cartSlice"
import { useEffect, useState } from "react"
import MovieCard from "../MovieCard"
import axios from "axios"
import { url } from "../../../utils/constant"
import Container from 'react-bootstrap/Container';

import { Button, Col, Row} from "react-bootstrap"
import { Box, Grid } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import { IoIosFilm } from "react-icons/io";
import WishMovieCard from "./WishMovieCard"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const WishlistDisplay = ({mode}) => {
  const navigate=useNavigate()
    const token = sessionStorage.getItem('token');
    console.log(token,"from wish")
    const wishlist = useSelector(store => store.wishlist.wishItems); 
    console.log("wishlist",wishlist) 

  const addWishItemToServer = async (element) => {
    try {
      const token = sessionStorage.getItem('token');
      console.log("server",token)
      const response = await axios.post(
        `${url}/add-wish-list`,
        element,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Added to Wishlist:', response.data);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  
  const removeWishItemFromServer = async (element) => {
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(
        `${url}/delete-wish-item/${element._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Removed from Wishlist:', response.data);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
  
  
  return (
    <Container fluid className="border border-4 border-warning">
      <Row  className="border mx-auto d-flex justify-content-between flex-row align-items-center">
        <Col md={6} className="border mb-3 mb-md-0 text-start d-flex align-items-center fs-3"><FaHeart className="me-1 text-danger fs-2"/>My Wishlist</Col>
        {/* Search*/}
        <Col md={6} className="iput-icons flex-wrap justify-content-end d-flex flex-row gap-3 border border-4 border-danger">
        
      
        {
            token &&
        <>
        {/* All Movie */}
        <Button variant="none" onClick={()=>navigate('/allmovies')} className="movieDisplayBtn d-flex"
        style={{
    backgroundColor: mode === "light" ? "white" : " rgba(45, 45, 47, 0.52)",border:mode === "light"? "1px solid rgba(199, 199, 203, 0.52)"  : " none",  color:mode==="light"? "black":"rgba(209, 209, 213, 0.63)"
  }}
        >
        <IoIosFilm className="fs-4 movieIcon me-1" />
        <span className="d-md-block d-none">All Movies</span>
        </Button>
        </>
        }
        <>
        
        {/* Debounce Search*/}
        <input style={{backgroundColor:"rgba(45, 45, 47, 0.52)",width:"180px",color:"white"}}
        className="form-control  border-0  ps-4 me-2" type="search" aria-label="Search" name="" id="" placeholder="Search movie"
        onChange={(e) => {
        // console.log(e.target.value)
        setSearchTearm(e.target.value)}}/>
        </>
        </Col>
         </Row>
   
        {/* each movie card */}
        <Row className="border">

    {/* { 
        filterMovieData?.length === 0?
    <>

    <div className="position-relative mt-2 border-4" 
    style={{width:"100%"}} >
        <img src="https://img.freepik.com/premium-photo/black-clapperboard-clap-board-movie-slate-use-video-production-film-cinema-industry-black-background_335640-1294.jpg" alt="" className=" border-primary  border-4 w-100" style={{filter:"brightness(50%)",objectFit:"cover",maxHeight:"430px", width:"100%"}} />
        <h4 className="text-white opacity-75 border-4 border-danger text-center  col-7 col-md-5 mx-auto" style={{position:"absolute",right:"5%",bottom:"10%"}}>
        <span className="text-warning">Your Wishlist is Empty </span><br />
        </h4>
    </div>

    </>
        :
    <> */}
    {wishlist?.map((element, index) => (
        <WishMovieCard {...element} key={index} element={element} mode={mode} 
                            
        // Delete Button
        deleteBtn={
        <Tooltip title="Delete">
            <DeleteIcon style={{cursor:"pointer"}}
            onClick={()=> deleteMovie(element._id)}
            className="me-1 deleteBtn  fs-4"/>
        </Tooltip>
    }

        // Redux
        reduxAddcartBtn={
        <>    
        <Tooltip title="Add to Cart">
        <ShoppingCartIcon className="reduxIcon fs-3"
        onClick={()=>{handleAdditem(element)}} />
        </Tooltip>
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


        // WishBtn={
        // <>
        //  <Tooltip title="Add to Wish List">
        //  <FavoriteIcon
        //  onClick={()=>{handleAddWishitem(element)}} 
        //      style={divStyle}
        //   onMouseOver={() => setIsHovered(true)}
        //   onMouseOut={() => setIsHovered(false)}

        //   className=""/>
        // </Tooltip>
        // <ToastContainer
        //     position="top-right"
        //     autoClose={5000}
        //     hideProgressBar={false}
        //     newestOnTop={false}
        //     closeOnClick={false}
        //     rtl={false}
        //     pauseOnFocusLoss
        //     draggable
        //     pauseOnHover
        //     theme="light" 
        //     />
        // </>
        // }
        
            /> 
        )) }
    {/* </> 
  } */}
        </Row>
    </Container>
  )
}

export default WishlistDisplay