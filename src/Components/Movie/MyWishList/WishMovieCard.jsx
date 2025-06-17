import React from "react";
import { Button } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { wishRemoveItem,setWishlist } from "../../../utils/WishCartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../../../utils/constant";
import { IoEyeSharp } from "react-icons/io5";


function WishMovieCard({ movieposter, moviename,rating,_id,element}) {
const dispatch = useDispatch();
console.log(movieposter, moviename,rating,_id,element)
  const token = sessionStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const navigate = useNavigate()
const ratNum = { rating }
  const starNum = ratNum.rating / 2
  const removeWishItemFromServer = async (element) => {
    try {
      await axios.delete(`${url}/delete-wish-item/${element._id}`, config);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

 const getWishData = async () => {
    const res = await axios.get(`${url}/wish-list`, config);
    // dispatch(wishAddItem(res.data.wishData));
    dispatch(setWishlist(res.data.wishData)) //- dispatch(setWishlist(res.data.wishData)) sends the data to Redux, replacing the existing wishlist with the new data.

    // why not wishAddItem ?

  };

const handleRemoveWishItem = async(element)=>{
      if (!element) {
    console.error("Element is undefined! Ensure it's passed correctly.");
    return;
  }


    try{
        dispatch(wishRemoveItem(element))
        await removeWishItemFromServer(element)
        await getWishData()
    }catch(error){
        console.error("Error Removing wish Item:",error)
    }
}

//  trailer

    return (
        <>
        <div className="d-flex  px-md-3 row mx-auto align-items-center justify-content-center pt-4 pb-2 ">
          <div className="row mx-auto  d-flex align-items-center justify-content-center">
                {/* Movie Poster */}
            <div className="col-12  col-lg-3 col-md-3 col-sm-10 mx-auto ps-md-4 mb-sm-3">
                <img src={movieposter} className="mx-auto w-100 text-center d-flex justify-content-center rounded" style={{objectFit:"cover"}} alt=""  />
            </div>

                {/* TITLE */}
            <div className="d-md-flex align-items-start col-lg-4 col-md-5 flex-column col-sm-5 justify-content-start ps-md-5">
                    <div className="fs-5 ">{moviename}</div>
                    <Rating size="small" readOnly name="half-rating" defaultValue={starNum.toFixed(1)} precision={0.5} style={{
                    paddingBottom: "5px",color: "rgb(242, 154, 3)"}} />
            </div>

            {/* Trailer */}
            <div className="text-start   gap-5 col-lg-5  col-md-4 col-sm-5  d-flex flex-row pe-md-5  justify-content-end align-items-center ">
              <Button variant="" 
             onClick={() => navigate(`/movietrailer/${_id}`)}>
            <IoEyeSharp style={{color:"rgb(124, 164, 87)"}} className="fs-3 "/>
            </Button>
      
            {/* Delete */}
            <Button key={_id} variant="" style={{backgroundColor:"rgb(42, 40, 49)"}}  onClick={() => handleRemoveWishItem(element)}>
            <DeleteIcon style={{color:"rgb(181, 180, 183)"}} className="fs-3" />
            </Button>               

            {/* Add Cart */}
            <Button variant="" className="d-flex gap-1 align-items-center" style={{backgroundColor:"rgb(238, 161, 7)"}}>
                <span className="d-none d-lg-block">Move to Cart</span><ShoppingCartIcon className="fs-3"
                style={{color:"rgb(0, 0, 0)"}}/></Button>               
            </div>            
            </div>
        </div>
        </>
    )
}
export default WishMovieCard