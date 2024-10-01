import { useFormik } from 'formik'
import * as Yup from "yup";
import { url } from '../../utils/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function SignUp() {

const navigate = useNavigate()

  const inputDesign={
  backgroundColor:"#1B1C23",
   borderColor:"black",
   color:"white",
  //  Padding:"0",
  //  Margin:"0"
  }
  const formSchema=Yup.object().shape({
    name:Yup.string().min(5,"Too Short"),
    age:Yup.number().required().positive(),
    gender:Yup.string(),
    phone_number:Yup.number().required(),
    password:Yup.string().required(),
    email:Yup.string().required(),
})

const formik=useFormik({
  initialValues:{
      name:"",
      age:"",
      gender:"",
      phone_number:"",
      email:"",
      password:"",
  },
  validationSchema:formSchema,
  onSubmit:(values)=>{
      console.log(values) 
      postSignUpUser(values)
  }   
})

// posting the usersignup details to the server dv
const postSignUpUser=async(newUser)=>{
  // console.log(newUser)
  // http://localhost:8001/signup
  const res=await axios.post(`${url}/signup`,newUser)
  console.log(res)  
  if(res.status ==200){
    //navigate to signin page >> siginin
    navigate('/signin')
  }}

  return (
    <>
    <div className='container sign_up_in_container my-3 text-white' style={{width:"50%"}}>
     <Form onSubmit={formik.handleSubmit} style={{width:"80%"}}>
    <div className='text-white text-center mb-3 fs-1'>Sign Up</div>
        <div className="row mb-1 ">
          <Form.Group className="col ">
            <Form.Label htmlFor="name" className="form-label">Name</Form.Label>
            <Form.Control 
            type="text" 
            className="form-control "
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}  
            style={inputDesign}/>
          </Form.Group>

          {/* AGE */}
          <Form.Group className="col">
            <Form.Label htmlFor="age" className="form-label">Age</Form.Label>
            <Form.Control type="text" className="sign_up_input form-control" 
             id="age"
             name="age"
             value={formik.values.age}
             onChange={formik.handleChange}  
             style={inputDesign}
            />
          </Form.Group>
          </div>

          {/* Gender */}
         <div className="row mb-1">
        <Form.Check type="radio" name="gender" label={`Male`} 
          value="male"
          onChange={formik.handleChange}/> 

          <Form.Check type="radio" name="gender" label={`Female`}
          value="female"
          onChange={formik.handleChange}/>
          
            {/* Phone */}
          <Form.Group className="col w-50">
            <Form.Label htmlFor="phone_number" className="form-label">Phone Number</Form.Label>
            <Form.Control type="text" className="form-control" 
             id="phone_number"
             name="phone_number"
             value={formik.values.phone_number}
             onChange={formik.handleChange} 
             style={inputDesign} 
            />
          </Form.Group>
        </div>
       

        <div className="row mb-3">
          {/* Email */}
          <Form.Group className="col">
            <Form.Label htmlFor="email" className="form-label">Email</Form.Label>
            <Form.Control type="email" className="form-control" 
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
        <button className="btn btn-warning" type="submit">Sign Up</button>
      </Form>
    </div>

    </>
  )
}
export default SignUp
