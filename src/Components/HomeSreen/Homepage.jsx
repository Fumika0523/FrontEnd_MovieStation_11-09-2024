import { Container } from "@mui/material"
import AboutUs_Section from "../AboutUs_page/AboutUs_Section"
import ContactUs_Section from "../Enquiries/ContactUs_Section"
import Service_Section from "../Service_page/Service_Section"
import Header from "./Header"
import Footer from "./Footer"

function Homepage({mode}){

    return(
        <>
        {/* <NavBar/> */}
        <Header mode={mode}/>
        <AboutUs_Section mode={mode}/>
        <Service_Section mode={mode}/>
        <ContactUs_Section mode={mode}/>
        {/* <Footer/> */}
        </>
    )
}
export default Homepage