import axios from "axios"
import { url } from "../../utils/constant";
import { setWishlist } from '../../utils/WishCartSlice'
import {cartAddItem,setCart} from "../../utils/cartSlice"
import { useEffect } from "react";
import { useState } from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import { FaBagShopping } from "react-icons/fa6";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdDownloading } from "react-icons/md";
import { BiSort } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import MovieActionButtons from "../Movie/MovieActionButtons";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

function OrderSummary({ mode }) {
    const cart = useSelector(store => store.cart.cartItems || [])
    const wishlist = useSelector(store => store.wishlist.wishItems || []);
    const navigate = useNavigate()
    const [orderData, setOrderData] = useState([])
    const [sortedData, setSortedData] =useState("createdAt:desc") //default
    console.log("sortedData",sortedData)
    console.log("orderData",orderData)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch() 
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
    //console.log("totalOrderPrice12",totalOrderPrice)  
    console.log("orderData",orderData)

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
        // console.log("singleOrder",singleOrder)
        // console.log(singleOrder.x)
        // console.log("Button is pressed",clientname)
        console.log("singleOrder",singleOrder)
        // console.log("orderId",singleOrder.element._id)
        let orderdate = formatDate(singleOrder.element.updatedAt)
        //static price >> 
        const totalprice = singleOrder.element.movies.length*250
        const movies = singleOrder.element.movies // array of {moviename.price}
        //console.log("orderDate",orderdate)
        // const response = await fetch(`http://localhost:8002/getinvoice?orderid=${orderId}`, {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
// let moviename = singleOrder.element.movies.map((element) => element.moviename).join(","); //method in JavaScript is used to convert an array into a single string, with each element separated by a comma.
// console.log("moviename",moviename)

console.log(singleOrder.element.movies)

// let totalprice = singleOrder.x
// console.log(totalprice)

let url1 = `http://localhost:8002/getinvoice?orderid=${singleOrder.element._id}&orderdate=${orderdate}&totalprice=${totalprice}`;

console.log(url1)

const response = await fetch(`${url1}`, {
method:'POST',
headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type':'application/json'
  },
  //req.body
  body: JSON.stringify({
    orderid:singleOrder.element._id,
    orderdate,
    totalprice,
    movies
  })
}) // when you using fetch >> conver to json. but when u using axios, you dont need.
    if(!response.status==200 && !response.ok && !response.statusText=="OK"){
    throw new Error("Failed to download PDF")
    }
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    console.log("url",url)

    const link = document.createElement("a")
    link.href=url
    link.download=`order-summary-${singleOrder.element._id}.pdf`
    document.body.append(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${url}/wish-list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data.wishData)
        if (response.data.wishData) {
          dispatch(setWishlist(response.data.wishData)); 
          //console.log("Wishlist:", response.data);
        } else {
          dispatch(setWishlist([])); // wrap empty
        }
      } catch (error) {
        console.error("Failed to load wishlist", error);
        dispatch(setWishlist([]));
      }
    };

    if (token) {
      fetchWishlist();
    }
  }, [dispatch, token]);

    useEffect(()=>{
    const getCartData=async()=>{
      try{
        let response = await axios.get(`${url}/cart`,{
        headers:{Authorization:`Bearer ${token}`}
        })
        console.log(response.data.cartData)
        if(response.data.cartData){
          dispatch(setCart(response.data.cartData))
          //console.log("cart",response.data)
        } else{
          dispatch(setCart([]))
        }
      }catch(error){
        //console.error("Failed to load Cart",error);
        dispatch(setCart([]))
      }
    }
    if(token){
      getCartData()
    }
  },[dispatch,token])

    return (
    <>
        <div className="row mx-auto">
             <MovieActionButtons 
            mode={mode}
            navigate={navigate}
            wishlistCount={wishlist?.length || 0}
            cartCount={cart?.length || 0}
            />
                <div className="mx-auto col-lg-8 col-md-11 col-11 border rounded border-secondary-50 my-4 px-sm-5 py-3" >
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
                 <>
                    {                      
                        orderData?.map((element) => (
                                <div key={element._id} className="mb-4">
                                    <div className="d-flex mx-3  flex-row justify-content-between align-items-center my-2 ">
                                        <div className="fs-6 fw-bold">Order ID : {element._id}</div>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip} >
                                            <Button variant="none"
                                            // onClick={()=>handleDownload({element,x})}
                                            >
                                                <MdDownloading className="fs-2"
                                                style={{color:"rgb(251, 181, 4)"}} />
                                            </Button>
                                        </OverlayTrigger>
                                    </div>
                                    {
                                        element.movies.map((movie) => (
                                            <OrderSummaryCard key={movie._id} {...movie} updatedAt={element.updatedAt} />
                                        ))}   
                        {(() => {
            const total = element.movies?.map(p => p.amount).reduce((acc, cv) => acc + cv, 0);
            return  <div className="text-end fw-bold fs-4 mx-2"> Total Price :
                            <span className="fw-bold ms-1 fs-4">${total}</span>  
                            </div> 
            })()}
             <hr />
              </div>
                        ))
                    }

                 </>                  
                </div>
        </div>
    </>
    )
}
export default OrderSummary

//Order image round small image