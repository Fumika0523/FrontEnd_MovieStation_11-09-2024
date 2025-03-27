import axios from "axios"
import { url } from "../../utils/constant";
import * as React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import { FaBagShopping } from "react-icons/fa6";
import NavBar from "../HomeSreen/NavBar";
import { Container } from "react-bootstrap";


function OrderSummary(){
    const [orderData,setOrderData] = useState([])

    const token=sessionStorage.getItem('token')

   let config={
      headers:{
        Authorization:`Bearer ${token}`
      }}

    const handleGetOrder= async ()=>{
        let res = await axios.get(`${url}/order`,config)
        console.log("handleGetOrder",res.data.orderData)
       setOrderData(res.data.orderData)
       console.log(res.data.orderData)
    //    setOrderSum(res.data.orderData.movies.amount)
        }
        // Calling API call for handlegetorder
    useEffect(()=>{
        handleGetOrder()
    },[])
    
  
    const totalOrderPrice = orderData.map((element)=>{
         const price = (element.movies).map((p)=>{
            //   console.log(p.amount) //250
             return p.amount
         })
        // console.log("price",price) // [250, 250]
        const total = price.reduce((acc,cv)=>acc+cv)
        // console.log("total",total) //total 500
         return total
    })   
     console.log("totalOrderPrice",totalOrderPrice) // [500,500,500,500]

    return(
        <>
        <div className="row mx-auto">
        <div className="mx-auto col-lg-8 col-md-10 col-12 border rounded border-secondary  my-4 px-sm-5 py-3" >
            <div className="fs-2 justify-content-center align-items-center pb-3 d-flex flex-row text-center">
            <FaBagShopping className="fs-1 me-1 text-warning"/>
            <div>My Orders</div>
            </div>

            {
            //repeat end of each card
            totalOrderPrice.map((x)=>(
            orderData.map((element)=>(
            <div key = {element._id} className=" mb-4">
             <div className="mb-3 mx-2 fs-6">Order ID: {element._id}</div>
          
             {/* <div>Ordered on {element.updatedAt}</div> */}

             {
             element.movies.map((movie)=>(
             <OrderSummaryCard key={movie._id} {...movie} updatedAt={element.updatedAt} />
             ))}        
        
                {   

                    <div className="text-end fw-bold fs-4 mx-2 " >Total Price :
                    <span className="fw-bold ms-1 fs-4">${x}</span> </div>
                 }  
             <hr />
            </div> 
        
        ))       
    ) )
            }
                  
       </div>
        </div>
        </>
    )
}
export default OrderSummary

//Order image round small image