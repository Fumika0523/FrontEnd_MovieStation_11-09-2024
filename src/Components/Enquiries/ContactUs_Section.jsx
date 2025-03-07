import axios from "axios";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { url } from "../../utils/constant";
import { Button } from "react-bootstrap";


function ContactUs_Section (){

const navigate = useNavigate()

const formSchema=Yup.object().shape({
  firstname:Yup.string().required(),
  lastname:Yup.string().required(),
  email:Yup.string().required(),
  mobilePhoneNum:Yup.number().required(),
  subject:Yup.string().required(),
  description:Yup.string().required(),
})

const formik = useFormik({
  initialValues:{
    firstname:"",
    lastname:"",
    email:"",
    mobilePhoneNum:"",
    subject:"",
    description:"",
  },
  validationSchema:formSchema,
  onSubmit:(values)=>{
    //console.log(values)
     postEnquiryDetail(values)
  }
})

const token = sessionStorage.getItem('token')
//console.log(token)

let config = {
headers:{
  Authorization:`Bearer ${token}`
}
}

const postEnquiryDetail=async(newEnquiry)=>{
  const res = await axios.post(`${url}/contact`,newEnquiry,config) 
  console.log(res)
  if(res.status == 200){
    navigate('/allenquiries') 
  }
}
    return(
<>
<div className="d-flex justify-content-center flex-column my-3">
 {/*FORM  */}
 <div className=" d-flex justify-content-center align-items-center ">
  <h1 className="text-nowrap ">Submit a request</h1>
</div>
  {/* ALL ENQUIRIES BUTTON */}
<div className=" my-3 col-sm-10 " >
  <Button  variant="warning" className="d-flex me-3 ms-auto flex-row align-items-center gap-1 justify-content-center text-nowrap" 
      style={{}} onClick={()=>navigate('/allenquiries')} ><div>All Enquiries </div><i class="fa-solid fa-circle-question"></i></Button> 
</div>
   {/* message */}
   {/* <p className="fs-sm-5 my-sm-5 my-4 col-sm-8 col-10 mx-auto " >In order to solve your report, we ask you fill in as many fields as possible. Fields like the IMDb ID and JustWatch URL especially allow us to solve your report quickly.
    </p> */}
{/* <div className="  -4 ">    */}
    <form  onSubmit={formik.handleSubmit} className="col-11 col-sm-11 col-md-10 col-lg-8 mt-2 mx-auto" >

        <div className="row  text-secondary justify-content-center">
        {/* First Name */}
        <div className="col-6 col-sm-6 col-lg-6  mb-1">
        <label for="inputmobileNum4" className="form-label m-0">First Name</label>
      
        <input 
        type="text"
         className="form-control"
         id="firstname"
         name="firstname"
         value={formik.values.firstname}
         onChange={formik.handleChange}
         aria-label="First name"
         />
        </div>

      {/* Last Name */}
        <div className="col-sm-6 col-6 col-lg-6 mb-1">
        <label for="inputmobileNum4" className="form-label m-0">Last Name</label>
        <input type="text" className="form-control" aria-label="Last name"
         id="lastname"
         name="lastname"
         value={formik.values.lastname}
         onChange={formik.handleChange}
         />
        </div>
        </div>

        {/* Email */}
        <div className="row text-secondary justify-content-center">
         <div className="col-6 col-sm-6 col-lg-6 mb-1">
         <label for="inputEmail4" className="form-label m-0">Email</label>
        <input type="email" className="form-control" id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          />
        </div>
        <div className="col-6 col-sm-6 col-lg-6 mb-1">
        <label for="inputmobileNum4" className="form-label m-0">Mobile Phone No.</label>
        <input type="mobileNum" className="form-control" id="mobilePhoneNum"
          name="mobilePhoneNum"
          value={formik.values.mobilePhoneNum}
          onChange={formik.handleChange}
          />
        </div>
        </div>
        <div className="row text-secondary justify-content-center">
  <div className="col-8 col-sm-12 col-12 mb-1">
    <label for="inputSub" className="form-label m-0">Subject</label>
    <input type="text" className="form-control" id="subject"
     name="subject"
     value={formik.values.subject}
     onChange={formik.handleChange}
     />
  </div>
  <div className="col-8 col-sm-12 col-12">
    <label for="inputAddress2" className="form-label m-0">Description</label>
    <textarea className="form-control" id="description" rows="3"
     name="description"
     value={formik.values.description}
     onChange={formik.handleChange}
       
     ></textarea>
    
    <p className="text-secondary col-12 text-start my-2" >Please enter the details of your request. <br />
    A member of our support staff will respond as soon as possible.</p>
  </div>
  <div className="col-12 d-flex justify-content-start">
    <Button variant="warning" className="px-4 mt-4">Submit</Button>
  </div>
  </div>
</form>
</div>
</>
    )
}
export default ContactUs_Section