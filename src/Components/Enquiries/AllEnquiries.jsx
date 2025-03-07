import axios from "axios"
import { url } from "../../utils/constant"
import { useEffect, useState } from "react"
import AboutUs_ImageBanner from "../AboutUs_page/AboutUs_ImageBanner"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap";
import CustomizedTables from "./CustomizedTables"
import { Image } from "react-bootstrap"
import Card from 'react-bootstrap/Card';

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
    }, []) // API call has to be made inside UseEffect () only
    console.log(enquiryData)
    return (
        <>
        <div className="  border-warning d-flex align-items-center gap-3 justify-content-center flex-column" style={{height:"80vh"}} >
        {/* Back */}
        <div className=" d-flex justify-content-end  col-10 col-lg-6 mx-auto"
        onClick={()=>navigate('/contact')}>
        <Button variant="secondary d-flex flex-row gap-1 my-2  justify-content-center align-items-center">
        <i className="fa-solid fa-angles-left fs-6"></i>
        <div className="fs-6">Back</div></Button>
        </div>
        
        { 
             enquiryData == null ? 
        <div className="d-flex justify-content-center">
<Card className="col-10 col-lg-11 outline-none bg-transparent" >
<Image
        className="overlayImgBanner outline-none"
        src={"https://img.pikbest.com/wp/202405/tv-console-contemporary-displaying-a-modern-smart-in-sleek-living-room-with-dark-flooring-3d-rendered_9845708.jpg!bw700"}            
          
         />
         <div className="imageOverLay "></div>
         
      <Card.ImgOverlay className="d-flex flex-column border-4 align-items-center justify-content-center  text-center"
       style={{zIndex:"3"}}
      >
        <Card.Text className="fs-md-1 fs-5 text-white fw-bold" style={{fontStyle:"italic"}}>"No Enquires Generated So Far !!"</Card.Text>
        </Card.ImgOverlay>
</Card>
        </div>
            //  <AboutUs_ImageBanner
            //  cardText={"No Enquires Generated So Far!!"} 
            //  banner={"https://img.pikbest.com/wp/202405/tv-console-contemporary-displaying-a-modern-smart-in-sleek-living-room-with-dark-flooring-3d-rendered_9845708.jpg!bw700"}
            //  />
             
             
             :
            <>
            <CustomizedTables enquiryData = {enquiryData}/>
            </>
        }
            </div>
     </>
    )
}
export default AllEnquiries