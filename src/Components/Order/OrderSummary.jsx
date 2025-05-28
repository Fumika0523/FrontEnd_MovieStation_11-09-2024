import axios from "axios"
import { url } from "../../utils/constant";
import * as React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import { FaBagShopping } from "react-icons/fa6";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdDownloading } from "react-icons/md";
import { BiSort } from "react-icons/bi";
import Button from 'react-bootstrap/Button';

function OrderSummary({ mode }) {
    const [orderData, setOrderData] = useState([])
    const [sortedData, setSortedData] =useState("createdAt:desc") //default

    console.log("sortedData",sortedData)
    console.log("orderData",orderData)
    const [loading,setLoading] = useState(false)

    const token = sessionStorage.getItem('token')
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

 const fetchOrders = async(sortBy)=>{
    setLoading(true);
    try{
        // /order?sortBy=createdAt:asc
        const res = await axios.get(`${url}/order?sortBy=${sortBy}`,config)
        console.log(`${url}/order?sortBy=${sortBy}`)
        setOrderData(res.data.orderData)
        console.log("res.data.orderData",res.data.orderData)
    }
    catch(error){
        console.log("Error fetching orders:",error);
    }
    setLoading(false)
}
useEffect(()=>{
    fetchOrders(sortedData)
},[])

const toggleSortOrder= () =>{
    const newSortOrder = sortedData === "createdAt:asc" ? "createdAt:desc" : "createdAt:asc";
    setSortedData(newSortOrder)
    console.log(sortedData)
    fetchOrders(newSortOrder)
}

    //declearing
    const  totalOrderPrice = orderData?.map((element) => {
        const price = (element.movies)?.map((p) => {
            return p.amount
        })
        const total = price.reduce((acc, cv) => acc + cv)
        return total
    })

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip"  {...props}>
            Download as PDF
        </Tooltip>
    );
    const clientname = sessionStorage.getItem('name')

      const formatDate = (dateString) =>{
          const date = new Date (dateString)
          return date.toLocaleDateString('en-US',{
              year:"numeric",
              month:"short",
              day:"numeric"
          })
         }

         const handleDownload=async(singleOrder,x)=>{
        console.log("singleOrder",singleOrder)
        console.log(singleOrder.x)
        console.log("Button is pressed",clientname)
        console.log("singleOrder",singleOrder)
        console.log("orderId",singleOrder.element._id)
        let orderdate = formatDate(singleOrder.element.updatedAt)
        console.log("orderDate",orderdate)
        // const response = await fetch(`http://localhost:8002/getinvoice?orderid=${orderId}`, {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
let moviename = singleOrder.element.movies.map((element) => element.moviename).join(","); //method in JavaScript is used to convert an array into a single string, with each element separated by a comma.
console.log("moviename",moviename)
let totalprice = singleOrder.x
console.log(totalprice)
let url1 = `http://localhost:8002/getinvoice?orderid=${singleOrder.element._id}&moviename=${moviename}&orderdate=${orderdate}&totalprice=${totalprice}`;

console.log(url1)
const response = await fetch(`${url1}`, {
headers: {
    Authorization: `Bearer ${token}`
  }
}) // when you using fetch >> conver to json. but when u using axios, you dont need.

        if(!response.status==200 && !response.ok && !response.statusText=="OK"){
        throw new Error("Failed to download PDF")
        }
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        console.log("url",url)

        const link = document.createElement("a")
        link.href=url
        link.download="order-summary-pdf"
        document.body.append(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
}

    return (
        <>
            <div className="row mx-auto">
                <div className="mx-auto col-lg-8 col-md-10 col-11 border rounded border-secondary-50  mx-auto my-4 px-sm-5 py-3" >
                    <div className="fs-2 justify-content-between mx-2 align-items-center pb-3 d-flex flex-row">
                        <div className="d-flex flex-row ">
                            <div>
                                <FaBagShopping className="fs-1 me-1 text-warning" />
                            </div>
                            <div>My Orders</div>
                        </div>
                        <div
                        style={{backgroundColor:"transparent"}}>
                            <BiSort className="fs-4 "
                            style={{cursor:"pointer"}}
                            onClick={()=>{toggleSortOrder()}} />
                        </div>
                    </div>
                    {                      
                        totalOrderPrice?.map((x) => (
                        orderData?.map((element) => (
                                <div key={element._id} className="mb-4">
                                    <div className="d-flex mx-3  flex-row justify-content-between align-items-center my-2 ">
                                        <div className="fs-6 fw-bold">Order ID : {element._id}</div>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip} >
                                            <Button variant="none"
                                            onClick={()=>handleDownload({element,x})}>
                                                <MdDownloading className="fs-2"
                                                style={{color:"rgb(251, 181, 4)"}} />
                                            </Button>
                                        </OverlayTrigger>
                                    </div>
                                    {
                                        element.movies.map((movie) => (
                                            <OrderSummaryCard key={movie._id} {...movie} updatedAt={element.updatedAt} />
                                        ))}

                                    {
                                        <div className="text-end fw-bold fs-4 mx-2">Total Price :
                                            <span className="fw-bold ms-1 fs-4">${x}</span> 
                                        </div>
                                    }
                                    <hr />
                                </div>
                            ))
                        ))
                    }

                </div>
            </div>
        </>
    )
}
export default OrderSummary

//Order image round small image