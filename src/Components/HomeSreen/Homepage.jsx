import { Container } from "@mui/material"
import AboutUs_Section from "../AboutUs_page/AboutUs_Section"
import ContactUs_Section from "../Enquiries/ContactUs_Section"
import Service_Section from "../Service_page/Service_Section"
import Header from "./Header"
import NavBar from "./NavBar"


function Homepage(){

    return(
        <>
        <div className="container-fluid">
        {/* <NavBar/> */}
        <Header/>
        <AboutUs_Section/>
        <Service_Section/>
        <ContactUs_Section/>
        </div>
        </>
    )
}
export default Homepage