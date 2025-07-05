import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router"
import { url } from "../../utils/constant";
import EditEnquiryForm from "./EditEnquiryForm";

const EditEnquiry = ({mode}) => {
const [singleEnquiry,setSingleEnquiry] = useState()
 const {id} =useParams()
const navigate = useNavigate()
const token = sessionStorage.getItem('token')
    console.log(token)
    
    let config = {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

const getEnquiryData = async () =>{
    console.log("Enquiry data is called...")
    let res = await fetch(`${url}/enquiry/${id}`,config)
    let data = await res.json()
    console.log("not found",data)
    setSingleEnquiry(data)
}
console.log("singleEnquiry",singleEnquiry)
useEffect(()=>{
    getEnquiryData()
},[])

  return (
    <>

        <EditEnquiryForm singleEnquiry={singleEnquiry} id={id} mode={mode}/>
  
    </>
  )
}

export default EditEnquiry