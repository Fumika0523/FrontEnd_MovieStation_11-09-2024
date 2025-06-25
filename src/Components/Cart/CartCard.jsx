import React from "react";
import {cartRemoveItem} from "../../utils/cartSlice"
import {url} from "../../utils/constant"
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import {wishAddItem} from "../../utils/WishCartSlice"

function CartCard({ movieposter, moviename, amount,element }) {
      const token=sessionStorage.getItem('token')
    const wishlist = useSelector(store => store.wishlist.wishItems);
      let config={
        headers:{
          Authorization:`Bearer ${token}`
        }
      }

    const dispatch = useDispatch()
    const handleRemoveItem = async(movie)=>{
    console.log("HandleRemoveItem",movie._id)
    let res = await axios.delete(`${url}/delete-cart-item/${movie._id}`,config) //inside movie
    console.log(res)
    if(res.data){
       dispatch(cartRemoveItem(movie))
    }
}

  const addWishItemToServer = async (element) => {
    try {
      await axios.post(`${url}/add-wish-list`, element, config);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };


  const handleAddWishItem = async(element)=>{
  console.log("handleAddWishItem",element)
  try{
    if(element){
      dispatch(wishAddItem(element))
      await addWishItemToServer(element)
        await handleRemoveItem(element)
        await getWishData()
    }else
    {
      console.log("Element is undefined")
    }
  }catch(error){
    console.log("Error Moving to Cart",error)
  }
}

    return (
        <>
            <div className="d-flex  border-4 row mx-auto align-items-center justify-content-center pt-4 pb-2 ">
                <div className="col-12 mb-3 mx-auto col-lg-4 col-md-11 col-md-4">
                <img src={movieposter} className="rounded w-100" style={{minHeight:"160px"}} alt=""  />
                </div>
        
                <div className="text-start col-lg-8 col-12  d-flex flex-row justify-content-between mb-3 mb-md-0 align-items-center col-sm-11">
                {/* MOVIE NAME*/}
                <div className="fs-5" style={{width:"200px"}}>{moviename}</div> 

                {/* DELETE */}
                <Button variant="none" className="p-1" onClick={()=>{handleRemoveItem(element)}}>
                <DeleteIcon className="text-secondary fs-3 "/>
                </Button>
              
              {/* Move to WIsh */}
                <Button variant="none" className="p-1"
                onClick={()=>(handleAddWishItem(element))}>
                <FaHeart className="fs-3 text-danger" />
                </Button>
                <div className="fs-6 text-end text-secondary">${amount}</div>                  
                </div>
            </div>
     
        </>
    )
}
export default CartCard