import { useFormik } from 'formik'
import * as Yup from "yup";
import { url } from '../../utils/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function SignUp() {
const navigate = useNavigate()
  const inputDesign={
  backgroundColor:"#1B1C23",
   borderColor:"black",
   color:"white",
  }
  const formSchema=Yup.object().shape({
    name:Yup.string().min(5,"Too Short"),
    lastname:Yup.string(),
    age:Yup.number().required().positive(),
    gender:Yup.string(),
    phone_number:Yup.number().min(10,"Too short").max(10,"Too long").required(),
    password:Yup.string().required(),
    email:Yup.string().required(),
})

const formik=useFormik({
  initialValues:{
      name:"",
      lastname:"",
      age:"",
      gender:"",
      phone_number:"",
      email:"",
      password:"",
  },
  validationSchema:formSchema,
  onSubmit:(values)=>{
      console.log(values) //get a proper data
      postSignUpUser(values)
  }   
})

// posting the usersignup details to the server dv
const postSignUpUser=async(newUser)=>{
  // console.log(newUser)
  // http://localhost:8001/signup
  const res=await axios.post(`${url}/signup`,newUser)
  console.log(res)  //get a proper data
  if(res.status ==200){
    //navigate to signin page >> siginin
    navigate('/signin')
  }}

  return (
    <>
    <div className='container-fluid border-4 border-primary d-flex justify-content-center align-items-center' >
     <Form onSubmit={formik.handleSubmit} className="sign_up_in_container col-md-8 col-sm-10 col-lg-7 col-12 px-4 py-4 px-sm-5 " style={{marginTop:"5%"}} >
    <div className=' text-center fw-bold my-3 fs-1'>Sign Up</div>
        <div className="row mb-1 ">
          {/* Name */}
          <Form.Group className="col-md-6 mb-1">
            <Form.Label htmlFor="name" className="form-label m-0">First Name</Form.Label>
            <Form.Control 
            type="text" 
            // className="form-control "
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}  
            style={inputDesign}/>
          </Form.Group>


          {/* LAST NAME */}
          <Form.Group className="col-md-6 mb-1">
            <Form.Label htmlFor="lastname">Last Name</Form.Label>
            <Form.Control
            type="text" 
            // className="form-control "
            id="lastname"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}  
            style={inputDesign}/>
          </Form.Group>

     
          </div>
          <div className="mb-1 row ">
            {/* AGE */}
            <Form.Group className="col-md-2 mb-1">
            <Form.Label htmlFor="age" className="form-label m-1">Age</Form.Label>
            <Form.Control type="text" className="sign_up_input form-control" 
             id="age"
             name="age"
             value={formik.values.age}
             onChange={formik.handleChange}  
             style={inputDesign}
            />
          </Form.Group>

          {/* Gender */}
         <div className="col-md-4 m d-flex flex-column justify-content-start align-items-start">
        <div className='ps-2 mb-2'>Gender :</div>
        <div className='d-flex flex-row justify-content-start ps-2 align-items-center gap-3'>
        <Form.Check type="radio" name="gender" label={`Male`} 
          value="male"
          onChange={formik.handleChange}/> 
        <Form.Check type="radio" name="gender" label={`Female`}
          value="female"
          onChange={formik.handleChange}/>
        </div>
        </div>

        {/* Phone */}
        <Form.Group className="col-md-6 mb-1">
        <Form.Label htmlFor="phone_number" className="form-label m-0">Phone Number</Form.Label>
        <Form.Control type="text" className="form-control" 
         id="phone_number"
         name="phone_number"
         value={formik.values.phone_number}
         onChange={formik.handleChange} 
         style={inputDesign} />
          </Form.Group>
        </div>

        <div className="row mb-3">
          {/* Email */}
          <Form.Group className="col-md-6">
            <Form.Label htmlFor="email" className="form-label m-0">Email</Form.Label>
            <Form.Control type="email" className="form-control m-0" 
             id="email"
             name="email"
             value={formik.values.email}
             onChange={formik.handleChange} 
             style={inputDesign} 
            />
          </Form.Group>

         {/* Password */}
          <Form.Group className="col">
            <Form.Label htmlFor="password" className="form-label">Password</Form.Label>
            <Form.Control type="password" className="form-control" 
             id="password"
             name="password"
             value={formik.values.password}
             onChange={formik.handleChange} 
             style={inputDesign} 
            />
          </Form.Group>
        </div>
        <div className="row mb-1 px-3 py-2 d-flex flex-row justify-content-between">
      <Button className="my-2 col-sm-3 col-lg-2 col-4 d-flex justify-content-center" variant="secondary" type="submit" onClick={() => navigate('/')}>
        Cancel
      </Button> 
      <Button className="my-2 col-sm-3 col-lg-2 col-4 d-flex justify-content-center" variant="warning" type="submit">
        Submit
      </Button> 
      </div>   
      <div className="d-flex flex-column justify-content-center align-items-center">
      <div>Already have an account?</div>
      <Button variant="none" className="text-warning" onClick={() => navigate('/signin')}>Login to your account</Button>
      </div>   
      </Form>
    </div>

    </>
  )
}
export default SignUp
