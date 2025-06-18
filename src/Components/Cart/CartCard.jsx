import React from "react";
import {cartRemoveItem} from "../../utils/cartSlice"
import { useDispatch } from "react-redux";
import {url} from "../../utils/constant"
import axios from "axios";



function CartCard({ movieposter, moviename, amount,element }) {
      const token=sessionStorage.getItem('token')
  
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

    return (
        <>
        {/* <div className="d-flex row mx-auto border border-4 border-danger "> */}
            <div className="d-flex  border-4 row mx-auto align-items-center justify-content-center pt-4 pb-2 ">
                <div className="col-sm-5 col-12 mb-3 mx-auto col-lg-4 col-md-4">
                <img src={movieposter} className="rounded w-100" style={{height:"160px"}} alt=""  />
                </div>
            {/* </div>
            <div> */}
                <div className="text-start col-lg-8 col-12  d-flex flex-row justify-content-between align-items-center col-sm-7 ">
                    <div className="fs-5">{moviename}</div> 
                    <button onClick={()=>{handleRemoveItem(element)}}>Delete</button>

                    <button>Moving to wishlist</button>
                    <div className="fs-6 text-end text-secondary">${amount}</div>                  
                </div>

                {/* Price & Qty */}
                {/* <div className=" col-4 col-lg-2 border"> */}
                    
                {/* </div> */}
            </div>
            {/* </div> */}
        </>
    )
}
export default CartCard