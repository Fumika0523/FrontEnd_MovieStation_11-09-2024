import { useFormik } from 'formik'
import * as Yup from "yup";
import { url } from '../../utils/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
      // console.log(values) 
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
     <form onSubmit={formik.handleSubmit} style={{width:"80%"}}>
    <div className='text-white text-center mb-3 fs-1'>Sign Up</div>
        <div className="row mb-1 ">
          <div className="col ">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
            type="text" 
            className="form-control "
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}  
            style={inputDesign}
                          />
          </div>
          <div className="col">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="text" className="sign_up_input form-control" 
             id="age"
             name="age"
             value={formik.values.age}
             onChange={formik.handleChange}  
             style={inputDesign}
            />
          </div>
        </div>
        <div className="row mb-1 ">
          <div className="col">
          <label htmlFor="gender" className="form-label">Gender:</label><br />
            <input type="radio" 
             id="male"
             name="male"
             value={formik.values.gender}
             onChange={formik.handleChange}  
            />Male
             <input className='ms-4' type="radio" 
             id="female"
             name="female"
             value={formik.values.gender}
             onChange={formik.handleChange}  
            />Female
          </div>
          <div className="col">
            <label htmlFor="phone_number" className="form-label">Phone Number</label>
            <input type="text" className="form-control" 
             id="phone_number"
             name="phone_number"
             value={formik.values.phone_number}
             onChange={formik.handleChange} 
             style={inputDesign} 
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" 
             id="email"
             name="email"
             value={formik.values.email}
             onChange={formik.handleChange} 
             style={inputDesign} 
            />
          </div>
          <div className="col">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" 
             id="password"
             name="password"
             value={formik.values.password}
             onChange={formik.handleChange} 
             style={inputDesign} 
            />
          </div>
        </div>
        <button className="btn btn-warning" type="submit">Sign Up</button>
      </form>
    </div>
    
    </>
  )
}
export default SignUp
