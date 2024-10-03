import { useDispatch } from "react-redux"
import AboutUs_Section from "../AboutUs_page/AboutUs_Section"
import ContactUs_Section from "../Enquiries/ContactUs_Section"
import Service_Section from "../Service_page/Service_Section"
import Header from "./Header"
import { useEffect } from "react"
import axios from "axios"
import { url } from "../../utils/constant"
import { addItem } from "../../utils/cartSlice"

function Homepage({movie}){
    const dispatch= useDispatch()
    const token=sessionStorage.getItem('token')
    let config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    const getCartData=async()=>{
        let res = await axios.get(`${url}/cart`,config)//response in res.data >> moviedata
        console.log(res.data.cartData);
        if(res.data){
            res.data.cartData.map((element)=>dispatch(addItem(element)))
        }
    }
    useEffect(()=>{
        getCartData()
    },[]) //API call


    return(
        <>
        <Header/>
        <AboutUs_Section/>
        <Service_Section/>
        <ContactUs_Section/>
        </>
    )
}
export default Homepage