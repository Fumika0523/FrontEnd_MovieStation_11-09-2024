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
       setOrderData(res.data.orderData)
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
            {orderData.map((element)=>(
            <div key = {element._id} className="mb-4">
             <div className="mb-3 fs-5">Order ID: {element._id}</div>
             {element.movies.map((movie)=>(
             <OrderSummaryCard key={movie._id} {...movie}/>
             ))}
             <hr />
            </div>
            ))
            }
       </div>
        </>
    )
}
export default OrderSummary

//Order image round small image