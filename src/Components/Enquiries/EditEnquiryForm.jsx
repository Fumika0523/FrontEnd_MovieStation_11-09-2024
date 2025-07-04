import axios from "axios";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { url } from "../../utils/constant";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';

function EditEnquiryForm({ showEditModal, setShowEditModal, singleEnquiry, setEnquiryData,mode }) {
  console.log("singleEnquiry _ID", singleEnquiry._id)
  console.log("singleEnquiry", singleEnquiry)
  const navigate = useNavigate()
  
  const handleClose = () => {
    setShowEditModal(false)
    navigate('/allenquiries') 
  }
  const token = sessionStorage.getItem('token')
  // console.log('token',token)

  const getEnquiryData = async () =>{
    console.log("EnquiryData is called..")
    let res = await axios.get(`${url}/allenquiry`)
    console.log("res.data.allEnquiry",res.data.allEnquiry)
    setEnquiryData(res.data.allEnquiry )
    }
    useEffect(()=>{
    getEnquiryData()
    },[])

  const [userData, setUserData] = useState([])
  const getUserData = async () => {
    console.log("User data is called........")
    let res = await axios.get(`${url}/user`, config)
    // console.log("getUserData",res.data.userDetail)
    setUserData(res.data.userDetail)
  }
  useEffect(() => {
    getUserData()
  }, [])
  //without sessionStorage 

const formSchema=Yup.object().shape({
  firstname:Yup.string().required("First Name is required").min(3, "First name must be at least 3 characters").max(20, "First name must be under 20 characters"),
  lastname:Yup.string().required("Last Name is required").min(3, "Last name must be at least 3 characters").max(20, "Last name must be under 20 characters"),
  email:Yup.string().required("Email is required").email("Enter a valid email address"),
  phone_number:Yup.string().required("Phone No. is required").matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  subject:Yup.string().required("Subject is required").min(3, "Subject must be at least 3 characters"),
  description:Yup.string().required("Description is required").min(10, "Description must be at least 10 characters")
})

  const formik = useFormik({
    initialValues: {
      firstname: singleEnquiry.firstname,
      lastname: singleEnquiry.lastname,
      email: singleEnquiry.email,
      phone_number: singleEnquiry.phone_number,
      subject: singleEnquiry.subject,
      description: singleEnquiry.description,
    },
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: (values) => {
    updateEnquiry(values)
 
    }
  })

  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
//update
  const updateEnquiry = async (updatedEnquiry) => {
    console.log("Enquiry is posted to the DB")
    try{
      let res = await axios.put(`${url}/updateenquiry/${singleEnquiry._id}`,updatedEnquiry,config)
      console.log("res",res)
      if(res){
        let res = await axios.get(`${url}/allenquiry`)
        // console.log("res",updateEnquiry)
        setEnquiryData(res.data.enquiryData)
        handleClose()
        getEnquiryData()
      }
    }catch(e){
      console.error('Error Editing Student:',e)
    }}
    
  return (
    <>
      <Modal  mode={mode}
        show={showEditModal} onHide={handleClose} size='lg'
        style={{ margin: "12% 0", backgroundColor:mode === "light" ? "white": "black" }}>
        <Modal.Header className='px-5 fs-5 text-black'
          closeButton>
          Edit Enquiry Information
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}
          className="px-5 py-3" >
          <div className="row  text-secondary justify-content-center">
            {/* First Name */}
            <Form.Group className="col-6 col-sm-6 col-lg-6  mb-1">
              <Form.Label htmlFor="firstname" className=" m-0">First Name</Form.Label>
              <Form.Control
                disabled
                type="text"
                id="firstname"
                name="firstname"
                value={formik.values.firstname}
              />
            </Form.Group >

            {/* Last Name */}
            <Form.Group className="col-sm-6 col-6 col-lg-6 mb-1">
              <Form.Label htmlFor="lastname" className=" m-0">Last Name</Form.Label>
              <Form.Control
                disabled type="text"
                id="lastname"
                name="lastname"
                value={formik.values.lastname}
              />
            </Form.Group>
          </div>

          {/* Email */}
          <div className="row text-secondary justify-content-center">
            <Form.Group className="col-6 col-sm-6 col-lg-6 mb-1">
              <Form.Label htmlFor="email" className=" m-0">Email</Form.Label>
              <Form.Control
                disabled type="email" className="form-control" id="email"
                name="email"
                value={formik.values.email}
              />
            </Form.Group>

            <Form.Group className="col-6 col-sm-6 col-lg-6 mb-1">
              <Form.Label htmlFor="phone_number" className=" m-0">Mobile Phone No.</Form.Label>
              <Form.Control disabled
                type="text" id="phone_number"
                name="phone_number"
                value={formik.values.phone_number}
              />
            </Form.Group>
          </div>
          <div className="row text-secondary justify-content-center">

            <Form.Group className="col-8 col-sm-12 col-12 mb-1">
              <Form.Label htmlFor="subject" className="m-0">Subject</Form.Label>
              <Form.Control type="text" id="subject"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange} />
            </Form.Group>

            {/* DESCRIPTION */}
            <Form.Group className="col-8 col-sm-12 col-12">
              <Form.Label htmlFor="description" className="m-0">Description</Form.Label>
              <textarea className="form-control" id="description" rows="3"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              ></textarea>
            </Form.Group>

            <div className="col-12 d-flex justify-content-start">
              <Button type="submit" variant="warning" className="px-4 mt-4">Submit</Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default EditEnquiryForm