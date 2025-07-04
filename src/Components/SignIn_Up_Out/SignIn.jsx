import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik} from 'formik';
import * as Yup from "yup";
import {url} from '../../utils/constant'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignIn({setIsAuthenticated}) {
  const navigate = useNavigate()
  const [isError,isSetError] = useState('')
  const validationSchema=Yup.object().shape({
    password:Yup.string().required("Password is required!"),
    email: Yup.string().email("Invalid email format").required("Email is required").email("Enter a valid email address"),
    phone_number:Yup.number().required("Phone No. is required!")
})


  const formik=useFormik({
    initialValues:{
      email:"",
      password:"",
      phone_number:""
    },
    validationSchema,
    onSubmit:(values)=>{
     // console.log(values) // req.body
      //update the value >> signin data
     postSignInUser(values)
    }
  })

 const errorNotify = (message) => toast.error(message, {
position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

// const errorNotify = (message) => toast.error(message, {
//    autoClose: 2000,
//    });


  const errorPWNotify = (message) => toast.error(message, {
  position: "top-right",
  autoClose: 1000, // closes after 3 seconds
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

  const successNotify = () => toast.success("Successfully signed in", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
  });

// useEffect(() => {
//   if (isError === "User Email Address Not Found") {
//    errorNotify()
//   } else if (isError === "User Password is incorrect") {
//    errorPWNotify()
//   }
// }, [isError]);
// console.log(isError)


  // const postSignInUser=async(loginuser)=>{
  //   console.log(loginuser)
  //   const res=await axios.post(`${url}/signin`,loginuser) //loginuser is data
  //   console.log("res.data",res.data)
  //   sessionStorage.setItem('token',res.data.token)
  //   sessionStorage.setItem('userId',res.data.user._id)
  //   sessionStorage.setItem('name',res.data.user.name)
  //   console.log('userId')
  //   // setAccessAddMovie(res.data.token)
  //   if(res.data.token){
  //     setIsAuthenticated(true);  //    
  //   }  
  //   navigate('/') 
  //   console.log("Signin")
  // }


const location = useLocation();
console.log(location)

const fromPath = location.state?.from || '/';

const postSignInUser = async (loginuser) => {
   try {
    const res = await axios.post(`${url}/signin`, loginuser);

    if (res.data.token) {
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('userId', res.data.user._id);
      sessionStorage.setItem('name', res.data.user.name);
      setIsAuthenticated(true);
      navigate(fromPath);
       successNotify()
    }
  } catch (error) {
  const message = error?.response?.data?.message || "An error occurred";
  isSetError(message);
  if (message === "User Email Address Not Found") {
    errorNotify(message);
    // alert("User Email Address is incorrect");
  } else if (message === "User Password is incorrect") {
    errorPWNotify(message)
   // alert("User Password is incorrect");
  } else if (message === "Your login credentials are incorrect, kindly check and re-enter!") {
    //alert("Your login credentials are incorrect, kindly check and re-enter!");
  } else {
    alert(message);
  }
console.log(message)
}
};

// console.log(isError)

  return (
    <>
    <div className="container-fluid border-4 border-primary d-flex justify-content-center align-items-center">
    <Form 
    onSubmit={formik.handleSubmit} className="sign_up_in_container col-md-8 col-lg-5 col-sm-9 col-12 px-4 py-5 px-sm-5 " style={{marginTop:"5%"}} >
      {/* Title */}
       <h1 className="mb-3 text-center ">Sign in</h1>
       {/* Email */}
     <Form.Group className="mb-3  " controlId="formBasicEmail">
       <Form.Label className="m-0">Email address</Form.Label>
        <Form.Control  type="email" placeholder=""
         name="email"
           onBlur={formik.handleBlur} 
         value={formik.values.email}
         onChange={formik.handleChange} />
        {formik.errors.email && formik.touched.email? (
        <div style={{color:"red"}}>{formik.errors.email} </div>
        ) : null }
      </Form.Group>
      
      {/* Phone NO. */}
      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label className="m-0">Phone No.</Form.Label>
        <Form.Control type="phone_number" placeholder=""
        name="phone_number"
          onBlur={formik.handleBlur} 
        value={formik.values.phone_number}
        onChange={formik.handleChange}  />
        {formik.errors.phone_number && formik.touched.phone_number? (
        <div style={{color:"red"}}>{formik.errors.phone_number}</div>
        ) : null }
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="m-0">Password</Form.Label>
        <Form.Control type="password" placeholder=""
         name="password"
           onBlur={formik.handleBlur} 
         value={formik.values.password}
         onChange={formik.handleChange} /> 
         {formik.errors.password && formik.touched.password? (
        <div style={{color:"red"}}>{formik.errors.password}</div>
        ) : null }
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
{/* 
   {
  (isError === "User Email Address Not Found" || isError === "User Password is incorrect") && (
    <p className="">
      {isError === "User Email Address Not Found"
        ? "Email Not Found"
        : "Password is incorrect"}
    </p>
  )
} */}


<ToastContainer />
    </>
    
  );
}

export default SignIn;

