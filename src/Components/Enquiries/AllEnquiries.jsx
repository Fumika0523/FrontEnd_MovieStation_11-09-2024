import axios from "axios"
import { url } from "../../utils/constant"
import { useEffect, useState } from "react"
import AboutUs_ImageBanner from "../AboutUs_page/AboutUs_ImageBanner"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import CustomizedTables from "./CustomizedTables"


function AllEnquiries() {
 
    const navigate = useNavigate()
    const [enquiryData, setEnquiryData] = useState([]) //array

    const token = sessionStorage.getItem('token')
    console.log(token)

    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const getEnquiryData = async () => {
        console.log("Enquiry Data is called....")
        let res = await axios.get(`${url}/allenquiry`, config)
        console.log(res.data.enquiryData)
        setEnquiryData(res.data.enquiryData)
    }

    useEffect(() => {
        getEnquiryData()
    }, []) // APIC call has to be made inside UseEffect () only
    console.log(enquiryData)
    return (
        <>
        <div className=" d-flex justify-content-end"
        onClick={()=>navigate('/contact')}>
            <button className="d-flex btn btn-warning justify-content-center align-items-center px-4" style={{marginTop:"2%",marginRight:"10%",width:"7%"}}>
                <i className="fa-solid fa-angles-left"></i>
                <div className="">Back</div></button> 
        </div>
        { 
             enquiryData.length ===0? <AboutUs_ImageBanner cardText={"No Enquires Generated So Far!!"}/>:
            <>
            <CustomizedTables enquiryData = {enquiryData}/>
            </>
        }
     </>
    )
}
export default AllEnquiries