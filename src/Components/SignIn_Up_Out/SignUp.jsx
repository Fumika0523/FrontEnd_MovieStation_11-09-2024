import { useFormik } from 'formik'
import * as Yup from "yup";
import { url } from '../../utils/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function SignUp() {
  const navigate = useNavigate()
const validationSchema = Yup.object().shape({
  name: Yup.string().required("First Name is required").min(3, "First name must be at least 3 characters").max(20, "Fist name must be under 20 characters"),
  lastname:Yup.string().required("Last Name is required").min(3, "Last name must be at least 3 characters").max(20, "Last name must be under 20 characters"),
  gender: Yup.string().required("Gender is required"),
  phone_number: Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: Yup.string().email("Invalid email format").required("Email is required").email("Enter a valid email address"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required").min(8, "Must be at least 8 characters").matches(/[a-z]/, "Must contain at least one lowercase letter").matches(/[A-Z]/, "Must contain at least one uppercase letter").matches(/\d/, "Must contain at least one number").matches(/[@$!%*?&]/, "Must contain at least one special character"),
});

const formik = useFormik({
  initialValues: {
    name: "",
    lastname: "",
    gender: "",
    phone_number: "",
    email: "",
    password: "",
  },
  validationSchema, // Attach the validation schema here
  onSubmit: (values) => {
    console.log(values);
    postSignUpUser(values)
  },
});

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
    <div className='container-fluid border-4 border-primary d-flex justify-content-center align-items-center' >
     <Form onSubmit={formik.handleSubmit} className="sign_up_in_container col-md-8 col-sm-10 col-lg-7 col-12 px-4 py-4 px-sm-5 " style={{marginTop:"5%"}} >
    <div className=' text-center fw-bold my-3 fs-1'>Sign Up</div>
        <div className="row mb-1 ">

          {/* Firstname */}
          <Form.Group className="col-md-6 mb-1">
            <Form.Label htmlFor="name" className="form-label m-0">First name</Form.Label>
            <Form.Control 
            type="text" 
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            />
            {formik.errors.name && formik.touched.name? (
        <div style={{color:"red"}}>{formik.errors.name}</div>
        ) : null }
          </Form.Group>

          {/* lastname */}
          <Form.Group className="col-md-6 mb-1">
            <Form.Label htmlFor="lastname" className="form-label m-0">Last name</Form.Label>
            <Form.Control 
            type="text" 
            id="lastname"
            name="lastname"
              onBlur={formik.handleBlur} 
            value={formik.values.lastname}
            onChange={formik.handleChange}  
            />
          {formik.errors.lastname && formik.touched.lastname? (
         <div style={{color:"red"}}>{formik.errors.lastname}</div>
         ) : null }
          </Form.Group>
          </div>

          <div className="mb-1 row ">
          {/* Gender */}
         <div className="col-md-6 d-flex flex-column justify-content-start align-items-start">
        <div className='ps-1'>Gender :</div>
        <div className='d-flex flex-row justify-content-start ps-2 align-items-center gap-3'>
        <Form.Check type="radio" name="gender" label={`Male`} 
          value="male"
          onChange={formik.handleChange}/> 
        <Form.Check type="radio" name="gender" label={`Female`}
          value="female"
            onBlur={formik.handleBlur} 
          onChange={formik.handleChange}/>
        </div>
        {formik.errors.gender && formik.touched.gender? (
        <div style={{color:"red"}}>{formik.errors.gender}</div>
        ) : null }
        </div>

        {/* Phone */}
        <Form.Group className="col-md-6 mb-1">
        <Form.Label htmlFor="phone_number" className="form-label m-0">Phone Number</Form.Label>
        <Form.Control type="text" className="form-control" 
         id="phone_number"
         name="phone_number"
           onBlur={formik.handleBlur} 
         value={formik.values.phone_number}
         onChange={formik.handleChange} 
          />
      {formik.errors.phone_number && formik.touched.phone_number? (
        <div style={{color:"red"}}>{formik.errors.phone_number}</div>
        ) : null }
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
               onBlur={formik.handleBlur} 
             onChange={formik.handleChange}   />
            {formik.errors.email && formik.touched.email? (
          <div style={{color:"red"}}>{formik.errors.email}</div>
          ) : null }
          </Form.Group>

         {/* Password */}
          <Form.Group className="col">
            <Form.Label htmlFor="password" className="form-label">Password</Form.Label>
            <Form.Control type="password" className="form-control" 
             id="password"
             name="password"
               onBlur={formik.handleBlur} 
             value={formik.values.password}
             onChange={formik.handleChange} 
            />
          {formik.errors.password && formik.touched.password? (
          <div style={{color:"red"}}>{formik.errors.password}</div>
          ) : null }
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