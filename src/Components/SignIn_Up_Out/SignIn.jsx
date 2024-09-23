import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik} from 'formik';
import * as Yup from "yup";
import {url} from '../../utils/constant'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



function SignIn({isAuthenticated,setIsAuthenticated}) {
  const navigate = useNavigate()
  const formSchema=Yup.object().shape({
    password:Yup.string().required(),
    email:Yup.string().required(),
    phone_number:Yup.number().required()
})

  const formik=useFormik({
    initialValues:{
      email:"",
      password:"",
      phone_number:""
    },
    validationSchema:formSchema,
    onSubmit:(values)=>{
      console.log(values) // req.body
      //update the value >> signin data
     postSignInUser(values)
    }
  })

  const postSignInUser=async(loginuser)=>{
    console.log(loginuser)
    const res=await axios.post(`${url}/signin`,loginuser)
    console.log(res.data)
    sessionStorage.setItem('token',res.data.token)
    sessionStorage.setItem('username',res.data.user.name)
    if(res.data.token){
      setIsAuthenticated(true)
    }  
    navigate('/allmovies')  
  }

  const inputDesign={
    backgroundColor:"#1B1C23",
    borderColor:"black",
    color:"white",
   //  Padding:"0",
   //  Margin:"0"
   }

  return (
    <div className="sign_up_in_container container w-50 my-3">
    <Form 
    onSubmit={formik.handleSubmit}  style={{width:"80%",color:"darkgrey"}}>
       <h1 className="mb-3 text-center text-white">Sign in</h1>
     <Form.Group className="mb-3 p-0 " controlId="formBasicEmail">
       <Form.Label className="m-0">Email address</Form.Label>
        <Form.Control  type="email" placeholder=""
         name="email"
         value={formik.values.email}
         onChange={formik.handleChange}  style={inputDesign} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label className="m-0">Phone No.</Form.Label>
        <Form.Control type="phone_number" placeholder=""
         name="phone_number"
         value={formik.values.phone_number}
         onChange={formik.handleChange} style={inputDesign}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="m-0">Password</Form.Label>
        <Form.Control type="password" placeholder=""
         name="password"
         value={formik.values.password}
         onChange={formik.handleChange} style={inputDesign} /> 
      </Form.Group>
      <Button variant="warning" type="submit">
        Submit
      </Button> 
    </Form>
    </div>
  );
}

export default SignIn;

