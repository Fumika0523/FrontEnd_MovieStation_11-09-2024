import axios from "axios"
import { url } from "../../utils/constant"
import { useEffect, useState } from "react"
import AboutUs_ImageBanner from "../AboutUs_page/AboutUs_ImageBanner"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"


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
        <div className=" d-flex jusity-content-end"
        onClick={()=>navigate('/contact')}>
            <button className="d-flex btn btn-warning justify-content-center align-items-center px-4" style={{marginTop:"2%", marginLeft:"89%",width:"7%"}}>
                <i className="fa-solid fa-angles-left"></i>
                <div className="">Back</div></button> 
        </div>
        { 
             enquiryData.length ===0? <AboutUs_ImageBanner cardText={"No Enquires Generated So Far!!"}/>:
            <table className="container my-5" style={{width:"80%"}}>
                <tr style={{border:"2px solid rgb(109, 104, 104)"}} > 
                    <th style={{border: "2px solid rgb(109, 104, 104)"}}>First Name</th>
                    <th style={{border:"2px solid rgb(109, 104, 104)"}}>Last Name</th>
                    <th style={{border:"2px solid rgb(109, 104, 104)"}} >Email</th>
                    <th style={{border:"2px solid rgb(109, 104, 104)"}}>Mobile Phone No.</th>
                    <th style={{border:"2px solid rgb(109, 104, 104)"}}>Subject</th>
                    <th style={{border:"2px solid rgb(109, 104, 104)"}}>Enquiry</th>
                </tr>
                {
                    enquiryData?.map((element, index) => (
                        <tr style={{border:"2px solid rgb(109, 104, 104)"}}>
                            <td style={{border:"2px solid rgb(109, 104, 104)",width:"10%"}} >{element.firstname}</td>
                            <td style={{border:"2px solid rgb(109, 104, 104)",width:"10%"}}>{element.lastname}</td>
                            <td style={{border:"2px solid rgb(109, 104, 104)",width:"20%"}}>{element.email}</td>
                            <td style={{border:"2px solid rgb(109, 104, 104)",width:"15%"}}>{element.mobilePhoneNum}</td>
                            <td style={{border:"2px solid rgb(109, 104, 104)",width:"15%"}}>{element.subject}</td>
                            <td style={{border:"2px solid rgb(109, 104, 104)",textWrap:"wrap",width:"30%"}}>{element.description}</td>
                        </tr>
                    ))
                }
            </table>
        }
     </>
    )
}
export default AllEnquiries