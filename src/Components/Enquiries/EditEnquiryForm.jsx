import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { url } from "../../utils/constant";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';

function EditEnquiryForm({ showEditModal, setShowEditModal, singleEnquiry, setEnquiryData, mode }) {
  const [userData, setUserData] = useState([]);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const handleClose = () => {
    setShowEditModal(false);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const errorNotify = () =>
    toast.error('Something went wrong ', { autoClose: 3000 });

  const formSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("First Name is required")
      .min(3, "Must be at least 3 characters")
      .max(20, "Must be under 20 characters"),
    lastname: Yup.string()
      .required("Last Name is required")
      .min(3, "Must be at least 3 characters")
      .max(20, "Must be under 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address"),
    phone_number: Yup.string()
      .required("Phone No. is required")
      .matches(/^[0-9]{10}$/, "Must be exactly 10 digits"),
    subject: Yup.string()
      .required("Subject is required")
      .min(3, "Must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Must be at least 10 characters"),
  });

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
      updateEnquiry(values);
      handleClose();
    },
  });

  const updateEnquiry = async (updatedEnquiry) => {
    try {
      const res = await axios.put(
        `${url}/updateenquiry/${singleEnquiry._id}`,
        updatedEnquiry,
        config
      );

      if (res.status === 200) {
        const getRes = await axios.get(`${url}/allenquiry`);
        setEnquiryData(getRes.data.allEnquiry);
        toast.success("Enquiry updated successfully!", { autoClose: 2000 });
      } else {
        errorNotify();
      }
    } catch (e) {
      console.error("Error updating enquiry:", e);
      toast.error("Something went wrong while updating.");
    }
  };

  return (
    <Modal
      show={showEditModal}
      onHide={handleClose}
      size="lg"
      style={{
        margin: "12% 0",
        backgroundColor: mode === "light" ? "white" : "black",
      }}
    >
      <Modal.Header closeButton className="px-5 fs-5 text-black">
        Edit Enquiry Information
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit} className="px-5 py-3">
        <div className="row text-secondary justify-content-center">
          <Form.Group className="col-6 mb-1">
            <Form.Label htmlFor="firstname">First Name</Form.Label>
            <Form.Control
              disabled
              type="text"
              id="firstname"
              name="firstname"
              value={formik.values.firstname}
            />
          </Form.Group>
          <Form.Group className="col-6 mb-1">
            <Form.Label htmlFor="lastname">Last Name</Form.Label>
            <Form.Control
              disabled
              type="text"
              id="lastname"
              name="lastname"
              value={formik.values.lastname}
            />
          </Form.Group>
        </div>

        <div className="row text-secondary justify-content-center">
          <Form.Group className="col-6 mb-1">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              disabled
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
            />
          </Form.Group>
          <Form.Group className="col-6 mb-1">
            <Form.Label htmlFor="phone_number">Mobile Phone No.</Form.Label>
            <Form.Control
              disabled
              type="text"
              id="phone_number"
              name="phone_number"
              value={formik.values.phone_number}
            />
          </Form.Group>
        </div>

        <div className="row text-secondary justify-content-center">
          <Form.Group className="col-12 mb-1">
            <Form.Label htmlFor="subject">Subject</Form.Label>
            <Form.Control
              type="text"
              id="subject"
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.subject && formik.touched.subject}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.subject}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-12">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.description && formik.touched.description}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="col-12 d-flex justify-content-start">
            <Button type="submit" variant="warning" className="px-4 mt-4">
              Submit
            </Button>
          </div>
        </div>
       
      </Form>
 
    </Modal>
  
  );
  
}

export default EditEnquiryForm;
