import axios from "axios";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { url } from "../../utils/constant";
import { Button } from "@mui/material";


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
console.log(token)

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
      {/* ALL ENQUIRIES BUTTON */}
      <button style={{ marginTop:"2%", marginLeft:"85%"}} className="px-4 btn btn-warning" onClick={()=>navigate('/allenquiries')} >All Enquiries <i class="fa-solid fa-circle-question ms-1"></i></button> 
      
      {/*FORM  */}
    <form  onSubmit={formik.handleSubmit} className="container pb-5" style={{width:"80%"}}>
        <h1 className="text-center">Submit a request</h1>
        <div className="text-start mx-auto fs-5 my-5" style={{width:"66%"}}>In order to solve your report, we ask you fill in as many fields as possible. Fields like the IMDb ID and JustWatch URL especially allow us to solve your report quickly.</div>
        <div className="row text-secondary justify-content-center">
            {/* First Name */}
        <div className="col-4 mb-1">
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
        <div className="col-4 mb-1">
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
         <div className="col-md-4 mb-1">
         <label for="inputEmail4" className="form-label m-0">Email</label>
        <input type="email" className="form-control" id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          />
        </div>
        <div className="col-md-4 mb-1">
        <label for="inputmobileNum4" className="form-label m-0">Mobile Phone No.</label>
        <input type="mobileNum" className="form-control" id="mobilePhoneNum"
          name="mobilePhoneNum"
          value={formik.values.mobilePhoneNum}
          onChange={formik.handleChange}
          />
        </div>
        </div>
        <div className="row text-secondary justify-content-center">
  <div className="col-8 mb-1">
    <label for="inputSub" className="form-label m-0">Subject</label>
    <input type="text" className="form-control" id="subject"
     name="subject"
     value={formik.values.subject}
     onChange={formik.handleChange}
     />
  </div>
  <div className="col-8">
    <label for="inputAddress2" className="form-label m-0">Description</label>
    <textarea className="form-control" id="description" rows="3"
     name="description"
     value={formik.values.description}
     onChange={formik.handleChange}
       
     ></textarea>
    
    <p className="text-secondary mt-2" >Please enter the details of your request. A member of our support staff will respond as soon as possible.</p>
  </div>
  <div className="col-8 d-flex justify-content-start">
    <button className="btn btn-warning px-4 my-2">Submit</button>
  </div>
  </div>
</form>
    
</>
    )
}
export default ContactUs_Section

// 