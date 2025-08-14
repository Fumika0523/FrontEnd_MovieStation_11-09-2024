

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios"
import { url } from "../../../utils/constant"


const ModalProfEdit = ({ setShowModal, showModal, ProfileData, setProfileData }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')
let config = {
    headers:{
        Authorization: `Bearer ${token}`
    }
}
  const formSchema = Yup.object().shape({
      firstname: Yup.string()
          .required("First Name is required")
          .min(3, "Must be at least 3 characters")
          .max(20, "Must be under 20 characters"),
        lastname: Yup.string()
          .required("Last Name is required")
          .min(3, "Must be at least 3 characters")
          .max(20, "Must be under 20 characters"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.number().required("Age is required").positive().integer(),
  });


  const formik = useFormik({
    initialValues: {
    firstname: ProfileData.name,
    lastname: ProfileData.lastname,
    gender:ProfileData.gender,
    age:ProfileData.age
    },
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: (values) => {
      // console.log("Updated Profile:", values);
      // TODO: Add axios API call here
      updateProfile(values);
      setShowModal(false);
      navigate("/profile");
    },
  });

  const handleClose = () => {
    setShowModal(false);
    navigate("/profile");
  };

  const updateProfile = async(updatedProfile)=>{
    try{
      const re = await axios.put(`${url}/profile/${ProfileData._id}`,
        updatedProfile,config
      )
      if(resizeBy.status == 200){
        const getRes = await axios.get(`${url}/profile`,config)
        // console.log("getRes",getRes.data)
        setProfileData(getRes.data.ProfileData);
        toast.success("Successfully updated profile!",{autoClose:1000})
      }else{
        toast.error("Unable to update profile",{autoClose:1000})
      }

    }catch(e){
      // console.log("Error updating Profile:",e)
      toast.error("Something went wrong while updating")
    }
  }

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" style={{ margin: "10% 0" }}>
      <Modal.Header className="px-5 fs-5 text-black" closeButton>
        Edit Personal Info
      </Modal.Header>

      <Form onSubmit={formik.handleSubmit} className="text-black px-5 py-4">
        <div className="row mb-1">
          {/* First Name */}
          <Form.Group className="col-md-4 mb-1">
            <Form.Label htmlFor="firstname">First Name</Form.Label>
            <Form.Control
              type="text"
              id="firstname"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className="text-danger small">{formik.errors.firstname}</div>
            )}
          </Form.Group>

          {/* Last Name */}
          <Form.Group className="col-md-4 mb-1">
            <Form.Label htmlFor="lastname">Last Name</Form.Label>
            <Form.Control
              type="text"
              id="lastname"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className="text-danger small">{formik.errors.lastname}</div>
            )}
          </Form.Group>
               

          {/* Gender */}
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <div className="mb-2">Gender:</div>
            <div className="d-flex gap-3">
              <Form.Check
              disabled
                type="radio"
                name="gender"
                label="Male"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={formik.handleChange}
              />
              <Form.Check
              disabled
                type="radio"
                name="gender"
                label="Female"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={formik.handleChange}
              />
            </div>
            {/* {formik.touched.gender && formik.errors.gender && (
              <div className="text-danger small">{formik.errors.gender}</div>
            )} */}
          </div>
           </div>


        <Button type="submit" variant="primary" className="px-4 mt-4">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalProfEdit;
