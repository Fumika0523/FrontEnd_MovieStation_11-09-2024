import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik} from 'formik';
import * as Yup from "yup";
import {url} from '../../utils/constant'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function SignIn({setIsAuthenticated}) {
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
    sessionStorage.setItem('name',res.data.user.name)
    sessionStorage.setItem('userId',res.data.user._id)
    sessionStorage.setItem('firstname',res.data.user.name)
    sessionStorage.setItem('lastname',res.data.user.lastname)
    sessionStorage.setItem('email',res.data.user.email)
    sessionStorage.setItem('phone_number',res.data.user.phone_number)
    // setAccessAddMovie(res.data.token)
    if(res.data.token){
      setIsAuthenticated(true)
    }  
    navigate('/')  
  }

  const inputDesign={
    backgroundColor:"#1B1C23",
    borderColor:"black",
    color:"white",
   }

  return (
    <>
    <div className="container-fluid border-4 border-primary d-flex justify-content-center align-items-center">
    <Form 
    onSubmit={formik.handleSubmit} className="sign_up_in_container col-md-8 col-lg-5 col-sm-9 col-12 px-4 py-5 px-sm-5 " style={{marginTop:"5%"}} >
       <h1 className="mb-3 text-center ">Sign in</h1>
     <Form.Group className="mb-3  " controlId="formBasicEmail">
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

      <div className="row px-3 py-3 d-flex flex-row justify-content-between">
      <Button className="my-2 col-sm-3 col-4 d-flex justify-content-center" variant="secondary" type="submit" onClick={() => navigate('/')}>
        Cancel
      </Button> 
      <Button className="my-2 col-sm-3 col-4 d-flex justify-content-center" variant="warning" type="submit">
        Submit
      </Button> 
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
      <div>Do not have an account yet?</div>
      <Button variant="none" className="text-warning" onClick={() => navigate('/signup')}>Create a new account</Button>
      </div>
    </Form>
    </div>
    </>
  );
}

export default SignIn;

