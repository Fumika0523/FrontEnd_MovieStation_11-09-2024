import axios from "axios"
import { url } from "../../utils/constant"
import { useEffect, useState } from "react"
import AboutUs_ImageBanner from "../AboutUs_page/AboutUs_ImageBanner"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap";
import CustomizedTables from "./CustomizedTables"


function AllEnquiries({mode}) {
const token = sessionStorage.getItem('token')
const navigate = useNavigate()
const [enquiryData, setEnquiryData] = useState([]) 

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
        {/* Back */}
        <div className="border-4 d-flex  flex-column col-11  mx-auto">
        <div className="d-flex mb-3 justify-content-end">
        <Button variant="secondary d-flex flex-row gap-1 my-2  justify-content-center align-items-center"
        onClick={()=>navigate('/contact')}>
        <i className="fa-solid fa-angles-left fs-6"></i>
        <div className="fs-6">Back</div>
        </Button>
        </div>
        
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
            <CustomizedTables enquiryData = {enquiryData} setEnquiryData={setEnquiryData} />
         
             </>
        } 
         </div>
            </div>
     </>
    )
}
export default AllEnquiries