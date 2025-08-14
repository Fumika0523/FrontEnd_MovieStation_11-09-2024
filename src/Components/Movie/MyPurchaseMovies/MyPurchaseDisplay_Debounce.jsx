import { useEffect, useState } from "react"
import axios from "axios"
import { url } from "../../../utils/constant"
import {cartAddItem,setCart} from "../../../utils/cartSlice"
import { setWishlist } from '../../../utils/WishCartSlice';
import { Navigate, useNavigate } from "react-router-dom"
import MovieActionButtons from "../MovieActionButtons"
import { useDispatch, useSelector } from "react-redux"
import MyMovieCard from "./MyPurchaseCard"
import MyPurchaseCard from "./MyPurchaseCard";
import { BiSolidMoviePlay } from "react-icons/bi";

const MyPurchaseDisplay_Debounce = ({mode}) => {
const [filterMovieData, setFilterMovieData] = useState([]) //filtered movie value
const [orderData, setOrderData] = useState([])
const [sortedData, setSortedData] =useState("createdAt:desc") //default
//console.log("sortedData",sortedData)
//console.log("orderData",orderData)
const [loading,setLoading] = useState(false)
const [searchTerm, setSearchTearm] = useState("")
const [userMovieData,setUserMovieData] = useState([])
    const cart = useSelector(store => store.cart.cartItems || [])
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const token = sessionStorage.getItem('token')
    const wishlist = useSelector(store => store.wishlist.wishItems || []);

let config = {
    headers: {
    Authorization: `Bearer ${token}`
}}

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${url}/wish-list`, {
          headers: { Authorization: `Bearer ${token}` }
        });
       // console.log(response.data.wishData)
        if (response.data.wishData) {
          dispatch(setWishlist(response.data.wishData)); 
         // console.log("Wishlist:", response.data);
        } else {
          dispatch(setWishlist([])); // wrap empty
        }
      } catch (error) {
        //console.error("Failed to load wishlist", error);
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
        //console.log(response.data.cartData)
        if(response.data.cartData){
          dispatch(setCart(response.data.cartData))
         // console.log("cart",response.data)
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

 const fetchOrders = async(sortBy)=>{
    setLoading(true);
    try{
        // /order?sortBy=createdAt:asc
        const res = await axios.get(`${url}/order?sortBy=${sortBy}`,config)
       // console.log(`${url}/order?sortBy=${sortBy}`)
        setOrderData(res.data.orderData)
        //console.log("orderData from my movie",res.data.orderData)
    }
    catch(error){
        //console.log("Error fetching orders:",error);
    }
    setLoading(false)
}
useEffect(()=>{
    fetchOrders(sortedData)
},[])


    return (
    <>
            <div className="me-4">
            <MovieActionButtons 
            mode={mode}
            navigate={navigate}
            wishlistCount={wishlist?.length || 0}
            cartCount={cart?.length || 0}
            />

        </div>
        {/* VIDEO PLAYER */}
         <h3 className="ms-5 d-flex align-items-center gap-1">
          <BiSolidMoviePlay className="fs-1 text-success" />
          My Purchase
          </h3>
        <div className="d-flex flex-row justify-content-center flex-wrap mt-4 gap-5 mx-lg-0 mx-md-0 mx-3">
            
            {
            orderData?.map((element,)=>(
            element.movies.map((element) => (
                <MyPurchaseCard {...element} key={element._id} element={element} mode={mode} />
         ))
            )
               )
            }
        </div>
    </>

  )
}

export default MyPurchaseDisplay_Debounce