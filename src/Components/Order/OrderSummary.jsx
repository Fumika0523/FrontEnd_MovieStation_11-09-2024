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
    const [sortedData, setSortedData] =useState([])
    console.log("sortedData",sortedData)
    console.log("orderData",orderData)
    const [loading,setLoading] = useState(false)

    const token = sessionStorage.getItem('token')

    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const handleGetOrder = async () => {
        let res = await axios.get(`${url}/order`, config)
        console.log("handleGetOrder", res.data.orderData)
        setOrderData(res.data.orderData)
        console.log(res.data.orderData)
        //setOrderSum(res.data.orderData.movies.amount)
    }
    // Calling API call for handlegetorder
    useEffect(() => {
        handleGetOrder()
    }, [])

    // Onclick
    //true >> asc >> faul >> desc
    const getSortedData = async()=>{
        setLoading(true)
        let res = await axios.get(`${url}/order?sortBy=createdAt:desc`,config)
        console.log("GetSortedData",res.data.orderData)
        setSortedData(res.data.orderData)
    }

    //declearing
    let totalOrderPrice ;
    if(loading == true) // it has to display only 6 
         {
            console.log("loading",loading)
         totalOrderPrice = sortedData.map((element) => {
            const price = (element.movies).map((p) => {
                return p.amount
            })
            const total = price.reduce((acc, cv) => acc + cv)
            return total
        })
    }else{
         totalOrderPrice = orderData.map((element) => {
            const price = (element.movies).map((p) => {
                return p.amount
            })
            const total = price.reduce((acc, cv) => acc + cv)
            return total
        })
    }
    
console.log(totalOrderPrice)

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Download
        </Tooltip>
    );

    return (
        <>
            <div className="row mx-auto">
                <div className="mx-auto col-lg-8 col-md-10 col-12 border rounded border-secondary  my-4 px-sm-5 py-3" >
                    <div className="fs-2 justify-content-between mx-2 align-items-center pb-3 d-flex flex-row">
                        <div className="d-flex flex-row ">
                            <div>
                                <FaBagShopping className="fs-1 me-1 text-warning" />
                            </div>
                            <div>My Orders</div>
                        </div>
                        <div>
                            <BiSort className="fs-4"
                            onClick={()=>{ getSortedData()}} />
                        </div>
                    </div>
                    {
                        // checking toggle
                        loading == true ?
                        // <h1>Sorted Order</h1>
                        totalOrderPrice.map((x) => (
                            sortedData.map((element) => (
                                <div key={element._id} className="mb-4">
                                    <div className="d-flex mx-3  flex-row justify-content-between align-items-center my-2 ">
                                        <div className="fs-6 fw-bold">Order ID : {element._id}</div>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip} >
                                            <Button variant="none">
                                                <MdDownloading className="fs-2"
                                                style={{color:"rgb(46, 197, 54)"}} />
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
                        :
                         
                        totalOrderPrice.map((x) => (
                            orderData.map((element) => (
                                <div key={element._id} className="mb-4">
                                    <div className="d-flex mx-3  flex-row justify-content-between align-items-center my-2 ">
                                        <div className="fs-6 fw-bold">Order ID : {element._id}</div>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip} >
                                            <Button variant="none">
                                                <MdDownloading className="fs-2"
                                                style={{color:"rgb(46, 197, 54)"}} />
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