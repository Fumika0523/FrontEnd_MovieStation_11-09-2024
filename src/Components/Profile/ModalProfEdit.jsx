import axios from "axios";
import { useFormik } from "formik"
import { url } from "../../utils/constant";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ModalProfEdit = ({setShowModal,showModal,ProfileData,setProfileData}) => {

const formSchema=Yup.object().shape({
  firstname:Yup.string().required(),
  lastname:Yup.string().required(),
  email:Yup.string().required(),
  phone_number:Yup.number().required(),
  subject:Yup.string().required(),
  description:Yup.string().required(),
})
console.log("ProfileData",ProfileData)
const formik = useFormik({
    initialValues:{
    firstname: ProfileData.name,
    lastname: ProfileData.lastname,
    gender:ProfileData.gender,
    age:ProfileData.age
    },
    enableReinitialize:true,
    validationSchema:formSchema,
    onSubmit:(values)=>{
      console.log(values)

    }
  })
    const navigate = useNavigate()
    const handleClose = () => {
        setShowModal(false)
        navigate('/profile')
        }

  return (
    <>
    <Modal 
    show={showModal} 
    onHide={handleClose} size='lg'
    style={{margin:"20% 0"}}>
    
    <Modal.Header className= 'px-5 fs-5 text-black' closeButton>
    Edit Personal Info
    </Modal.Header>

     {/* Top Section */}
      <Form onSubmit={formik.handleSubmit} className="text-black px-5 py-4" >
        <div className="row mb-1 ">
          {/* Name */}
          <Form.Group className="col-md-6 mb-1">
            <Form.Label htmlFor="name" className="form-label m-0">First Name</Form.Label>
            <Form.Control 
            type="text" 
            // className="form-control "
            id="name"
            name="name"
            value={formik.values.firstname}
            onChange={formik.handleChange}  
          />
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
          />
          </Form.Group>
        </div>
        <div className="mb-1 justify-content-between row me-5 pe-5">
        
        {/* AGE */}
        <Form.Group className="col-md-3 mb-1">
            <Form.Label htmlFor="age" className="form-label m-1">Age</Form.Label>
            <Form.Control type="text" className="sign_up_input form-control" 
             id="age"
             name="age"
             value={formik.values.age}
             onChange={formik.handleChange}  
            />
        </Form.Group>

          {/* Gender */}
         <div className="col-md-4 d-flex flex-column justify-content-center align-items-start">
        <div className='ps-2 mb-2'>Gender :</div>
        <div className='d-flex flex-row justify-content-start ps-2 align-items-center gap-3'>
        <Form.Check type="radio" name="gender" label={`Male`} 
          value={formik.values.gender}
          onChange={formik.handleChange}/> 
        <Form.Check type="radio" name="gender" label={`Female`}
            value={formik.values.gender}
          onChange={formik.handleChange}/>
        </div>
        </div>
        </div>
    </Form> 
    </Modal>
    </>
  )
}

export default ModalProfEdit