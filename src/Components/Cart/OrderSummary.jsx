import axios from "axios"
import { url } from "../../utils/constant"
import * as React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import OrderSummaryCard from "./OrderSummaryCard";


function OrderSummary(){
    const [orderData,setOrderData] = useState([])

    const token=sessionStorage.getItem('token')

   let config={
      headers:{
        Authorization:`Bearer ${token}`
      }}

    const handleGetOrder=async()=>{
        let res = await axios.get(`${url}/order`,config)
        console.log(res.data.orderData)
       setOrderData(res.data.orderData[0])
        }
// Calling API call for handlegetorder
    useEffect(()=>{
        handleGetOrder()
    },[])
    console.log(orderData)

    return(
        <>
        <div className="container border my-5 p-5" style={{width:"70%"}}>
            <h1 className="pb-3 fs-2">Order Summary</h1>
            <div className="mb-3 fs-5">Order ID: {orderData._id}</div>
            {/* <div className="d-flex">
            <img src={cartItems?.movieposter} alt="" style={{width:"18%"}}/>
            <div className="fs-5 ms-3 my-5">
            <div className="pb-1">Delivered on Jul14</div>
            <div>{cartItems?.moviename}</div>
            </div>
            </div> */}
            {
                orderData.movies?.map((element,)=>
                    <OrderSummaryCard {...element}/>
                )
            }
           
       </div>
        </>
    )
}
export default OrderSummary