import axios from "axios"
import { url } from "../../utils/constant"
import { useEffect, useState } from "react"
import AboutUs_ImageBanner from "../AboutUs_page/AboutUs_ImageBanner"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap";
import CustomizedTables from "./CustomizedTables"
import MovieActionButtons from "../Movie/MovieActionButtons"


function AllEnquiries({mode}) {

const token = sessionStorage.getItem('token')
const navigate = useNavigate()
const [enquiryData, setEnquiryData] = useState([]) 
let config = {
  headers:{
  Authorization:`Bearer ${token}`
  }
}


// ALL
    const getEnquiryData = async () =>{
    console.log("EnquiryData is called..")
    let res = await axios.get(`${url}/allenquiry`)
    console.log("res.data.allEnquiry",res.data.allEnquiry)
    setEnquiryData(res.data.allEnquiry )
    }
    useEffect(()=>{
    getEnquiryData()
    },[])
         // API call has to be made inside UseEffect () only

    return (
    <>
        <div className="my-3 row mx-auto border-4  border-warning " >
        <span className="mb-3 me-5  row"> <MovieActionButtons /></span>
       
        {/* Back */}
        <div className="border-4 d-flex  flex-column col-11  mx-auto">
     
        
        {
        enquiryData?.length === 0 ?
        <> 
           <AboutUs_ImageBanner
             cardText={"No Enquires Generated So Far!!"} 
             banner={"https://img.pikbest.com/wp/202405/tv-console-contemporary-displaying-a-modern-smart-in-sleek-living-room-with-dark-flooring-3d-rendered_9845708.jpg!bw700"}
             />
            </>
            :
            <>
            <CustomizedTables enquiryData = {enquiryData} setEnquiryData={setEnquiryData} mode={mode}/>
         
             </>
        } 
         </div>
            </div>
     </>
    )
}
export default AllEnquiries