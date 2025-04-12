import axios from "axios";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { url } from "../../utils/constant";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { Last } from "react-bootstrap/esm/PageItem";

function ContactUs_Section (){
const navigate = useNavigate()
const [enquiryData,  setEnquiryData] = useState([])
const token = sessionStorage.getItem('token')
console.log('token',token)

// const firstname = sessionStorage.getItem('name')
// console.log('firstname',firstname)

// const lastname = sessionStorage.getItem('lastname')
// console.log('lastname',lastname)

// const email = sessionStorage.getItem('email')
// console.log('email',email)

// const phone_number = sessionStorage.getItem('phone_number')
// console.log('phone_number',phone_number)

const [userData,setUserData]=useState([])
//without sessionStorage 

const formSchema=Yup.object().shape({
  firstname:Yup.string().required(),
  lastname:Yup.string().required(),
  email:Yup.string().required(),
  phone_number:Yup.number().required(),
  subject:Yup.string().required(),
  description:Yup.string().required(),
})

const formik = useFormik({
  initialValues:{
    firstname:(token) ? userData.name : "",
    lastname:(token) ? userData.lastname : "",
    email:(token) ? userData.email : "",
    phone_number:(token) ? userData.phone_number : "",
    subject:"",
    description:"",
  },
  enableReinitialize:true,
  //if there is any updates in my initial Value, please make it update (re-initialize value) >> enable:true
  
  //IF you are using sessionStorage, please refer below:
  // initialValues:{
  //   firstname: (token) ? firstname: "",
  //   lastname:(token) ? lastname: "",
  //   email:(token) ? email: "",
  //   phone_number:(token) ? phone_number: "",
  //   subject:"",
  //   description:"",
  // },
  validationSchema:formSchema,
  onSubmit:(values)=>{
    console.log(values)
    postEnquiryDetail(values)
  }
})

let config = {
headers:{
  Authorization:`Bearer ${token}`
}
}

const getUserData = async()=>{
console.log("User data is called........")
let res = await axios.get(`${url}/user`,config)
console.log("getUserData",res.data.userDetail)
setUserData(res.data.userDetail)
}
// console.log("userData",userData)
// console.log("firstname",userData.name)
useEffect(()=>{
getUserData()
},[])

const postEnquiryDetail=async(newEnquiry)=>{
   console.log("NEW Enquiry",newEnquiry)
  
   let res = await axios.post(`${url}/contact`,newEnquiry) 
   console.log(res)
   setEnquiryData(res)
  if(res.status == 200){
    navigate('/allenquiries') 
   }
 }

   const getEnquiryData = async () =>{
    console.log("ContactUsSection")
    let res = await fetch(`${url}/allenquiry`)
    let data = await res.json()
    console.log(data)
    getEnquiryData()
   }

    return(
<>
<div className="container-fluid border-4 border-primary d-flex justify-content-center align-items-center mt-sm-5 mt-md-5 mt-lg-5 mt-1">
{/*FORM  */}

 <Form   onSubmit={formik.handleSubmit}className="sign_up_in_container col-md-10 col-sm-10 col-lg-6 col-12 px-4 py-5 px-sm-5 " >

 <div className="  d-flex justify-content-center align-items-center ">
  <h1 className="text-nowrap">Submit a request</h1>
</div>
  {/* ALL ENQUIRIES BUTTON */}
<div className=" my-4 col-sm-10 col-lg-8 ms-auto" >
  <Button variant="secondary" className="d-flex px-3 ms-auto flex-row align-items-center gap-1 justify-content-center text-nowrap" 
      onClick={()=>navigate('/allenquiries')} ><div>See All Enquiries </div><i class="fa-solid fa-circle-question"></i></Button> 
</div>


        <div className="row  text-secondary justify-content-center">
        {/* First Name */}
        <Form.Group  className="col-6 col-sm-6 col-lg-6  mb-1">
        <Form.Label htmlFor="firstname" className="f m-0">First Name</Form.Label>
        <Form.Control 
        type="text"
         id="firstname"
         name="firstname"
         value={formik.values.firstname}
         onChange={formik.handleChange}
         />
        </Form.Group >

      {/* Last Name */}
        <Form.Group className="col-sm-6 col-6 col-lg-6 mb-1">
        <Form.Label htmlFor="lastname" className=" m-0">Last Name</Form.Label>
        <Form.Control type="text" 
         id="lastname"
         name="lastname"
         value={formik.values.lastname}
         onChange={formik.handleChange}
         />
        </Form.Group>
        </div>

        {/* Email */}
        <div className="row text-secondary justify-content-center">
         <Form.Group className="col-6 col-sm-6 col-lg-6 mb-1">
         <Form.Label htmlFor="email" className=" m-0">Email</Form.Label>
        <Form.Control type="email" className="form-control" id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group className="col-6 col-sm-6 col-lg-6 mb-1">
        <Form.Label htmlFor="phone_number" className=" m-0">Mobile Phone No.</Form.Label>
        <Form.Control type="text"  id="phone_number"
          name="phone_number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          />
        </Form.Group>
        </div>

        <div className="row text-secondary justify-content-center">
         <div className="col-8 col-sm-12 col-12 mb-1">
         <Form.Label htmlFor="subject" className="m-0">Subject</Form.Label>
        <Form.Control type="text" id="subject"
          name="subject"
         value={formik.values.subject}
          onChange={formik.handleChange}
     />
  </div>
  <Form.Group className="col-8 col-sm-12 col-12">
    <Form.Label htmlFor="description" className="m-0">Description</Form.Label>
    <textarea className="form-control" id="description" rows="3"
     name="description"
     value={formik.values.description}
     onChange={formik.handleChange}
       
     ></textarea>
    
    <p className="text-secondary col-12 text-start my-2" >Please enter the details of your request. <br />
    A member of our support staff will respond as soon as possible.</p>
  </Form.Group>

  <div className="col-12 d-flex justify-content-start">
    <Button type="submit" variant="warning" className="px-4 mt-4">Submit</Button>
  </div>
        </div>
    </Form>
</div>
</>
    )
}
export default ContactUs_Section