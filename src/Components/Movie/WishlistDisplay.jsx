import { url } from '../../utils/constant';
import axios from 'axios';
import MovieActionButtons from './MovieActionButtons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { Button, Col, Row} from "react-bootstrap"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import WishMovieCard from "../Movie/MyWishList/WishMovieCard"
import { useEffect, useState } from 'react';
import  {wishAddItem,wishRemoveItem} from "../../utils/WishCartSlice"

const WishlistDisplay = ({mode}) => {

const wishlist = useSelector(store => store.wishlist.wishItems); 
console.log("wishlist",wishlist) 
console.log("length",wishlist[0]?.length) 

const navigate = useNavigate();
   const token = sessionStorage.getItem('token');
    console.log(token,"from wish")

// Api calls
  // const addWishItemToServer = async (element) => {
  //   try {
  //     const token = sessionStorage.getItem('token');
  //     console.log("server",token)
  //     const response = await axios.post(
  //       `${url}/add-wish-list`,
  //       element,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log('Added to Wishlist:', response.data);
  //   } catch (error) {
  //     console.error('Error adding to wishlist:', error);
  //   }
  // };
  
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

  let config = {
    headers: {
    Authorization: `Bearer ${token}`
}}

  const dispatch = useDispatch()

const getWishData = async()=>{
    let res = await axios.get(`${url}/wish-list`,config)
    console.log("getWishData",res) //whwnever you get res from db, wish item will be saved to store
    console.log(res.data.wishData.length)
  dispatch(wishAddItem(res.data.wishData))
}
useEffect(()=>{
  getWishData()
},[])

  
  return (
    <>
     <Container fluid className="">
      <Row className="mt-5 mb-3 mx-auto   d-flex  px-md-5 justify-content-between flex-row align-items-center">
        <Col xs={6} className="text-start d-flex align-items-center text-nowrap fs-3"><FaHeart className="me-1 text-danger fs-2"/>My Wishlist
        </Col>
        <Col xs={6} >
        <MovieActionButtons
          mode={mode}
          navigate={navigate}
          wishlistCount={wishlist[0]?.length}
          />
        </Col>
      </Row>
    { 
        wishlist[0]?.length === 0?
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
    <>
    { wishlist[0]?.map((element, index) => (
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
            /> 
        )) }
    </> 
  }
    </Container>  
    </>
  )
}

export default WishlistDisplay

//if the user is logged in(token), wish list is added to store from wishlist icon then post the wishlist item(element) to db(server),

//if the user is not logged in, the wish items can added to store but when i direct to wishlist page, it will re-direct to signin page to store the wish items to db