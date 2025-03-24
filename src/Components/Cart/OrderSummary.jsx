import axios from "axios"
import { url } from "../../utils/constant"
import * as React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import { FaBagShopping } from "react-icons/fa6";


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
        // console.log(res)
       setOrderData(res.data.orderData)
       console.log(res.data.orderData)
    //    setOrderSum(res.data.orderData.movies.amount)
        }
        // Calling API call for handlegetorder
    useEffect(()=>{
        handleGetOrder()
    },[])
    
    const [orderSum,setOrderSum] = useState([])
    // setOrderSum(total)
    
    const totalOrderPrice = orderData.map((element)=>{
        const price = (element.movies).map((p)=>{
            // console.log(p.amount)
            return p.amount
        })
        // console.log("price",price)
        const total = price.reduce((acc,cv)=>acc+cv)
        console.log("total",total)
         return total
      
    })   
    console.log("totalOrderPrice",totalOrderPrice) 
  
    //array > Object



    return(
        <>
        <div className="row mx-auto">
        <div className="mx-auto col-lg-6 col-md-8 col-12 border border-secondary my-4 px-5 py-3" style={{borderRadius:"3%"}}>
            <div className="fs-2 pb-3 d-flex flex-row text-center"><FaBagShopping className="fs-1 me-1 text-warning"/>
            <div>My Orders
            </div>
            </div>

            {
            orderData.map((element)=>(
            <div key = {element._id} className="mb-4">
             <div className="mb-3 fs-6">Order ID: {element._id}</div>
          
             {/* <div>Ordered on {element.updatedAt}</div> */}

             {
             element.movies.map((movie)=>(
             <OrderSummaryCard key={movie._id} {...movie} updatedAt={element.updatedAt} />
             ))}

                    
        
{
            totalOrderPrice.map((p)=>(
                    <div  {...p}>Total Price: {p}</div>
                ))
                 }  
             <hr />
          
            </div> 
        
        ))
            
            }
                  
            {/* */}
           
       
       </div>
       </div>
        </>
    )
}
export default OrderSummary

//Order image round small image