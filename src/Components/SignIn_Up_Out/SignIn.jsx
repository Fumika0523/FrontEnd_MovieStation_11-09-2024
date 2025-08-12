import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { url } from '../../utils/constant'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setWishlist } from '../../utils/WishCartSlice';

function SignIn({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isError, isSetError] = useState('');

  // Redirect back path after login, default to /allmovies
  const fromPath = location.state?.from || '/allmovies';

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required!"),
    email: Yup.string().email("Invalid email format").required("Email is required").email("Enter a valid email address"),
    phone_number: Yup.number().required("Phone No. is required!")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone_number: ""
    },
    validationSchema,
    onSubmit: (values) => {
      postSignInUser(values);
    }
  });

  const errorNotify = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 300,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const errorPWNotify = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const successNotify = () => toast.success("Successfully signed in", {
    position: "top-right",
    autoClose: 300,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  // Fetch wishlist from backend and update Redux store
  const fetchWishlist = async (token) => {
    try {
      const res = await axios.get(`${url}/wish-list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.wishData) {
        dispatch(setWishlist(res.data.wishData));
      } else {
        dispatch(setWishlist([]));
      }
    } catch (e) {
      console.error("Failed to fetch wishlist", e);
      dispatch(setWishlist([]));
    }
  };

  const postSignInUser = async (loginuser) => {
    try {
      const res = await axios.post(`${url}/signin`, loginuser);

      if (res.data.token) {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('userId', res.data.user._id);
        sessionStorage.setItem('name', res.data.user.name);
        setIsAuthenticated(true);
        successNotify();

        // Fetch wishlist after login to update counts and state
        await fetchWishlist(res.data.token);

        // Navigate after successful login
        navigate(fromPath);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "An error occurred";
      isSetError(message);
      if (message === "User Email Address Not Found") {
        errorNotify(message);
      } else if (message === "User Password is incorrect") {
        errorPWNotify(message);
      } else if (message === "Your login credentials are incorrect, kindly check and re-enter!") {
        // optional alert or notification here as per your UI
      } else {
        alert(message);
      }
      console.log(message);
    }
  };

  return (
    <>
      <div className="container-fluid border-4 border-primary d-flex justify-content-center align-items-center">
        <Form
          onSubmit={formik.handleSubmit}
          className="sign_up_in_container col-md-8 col-lg-5 col-sm-9 col-12 px-4 py-5 px-sm-5"
          style={{ marginTop: "5%" }}
        >
          {/* Title */}
          <h1 className="mb-3 text-center">Sign in</h1>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-0">Email address</Form.Label>
            <Form.Control type="email" placeholder=""
              name="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email ? (
              <div style={{ color: "red" }}>{formik.errors.email} </div>
            ) : null}
          </Form.Group>

          {/* Phone NO. */}
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label className="m-0">Phone No.</Form.Label>
            <Form.Control type="phone_number" placeholder=""
              name="phone_number"
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              onChange={formik.handleChange} />
            {formik.errors.phone_number && formik.touched.phone_number ? (
              <div style={{ color: "red" }}>{formik.errors.phone_number}</div>
            ) : null}
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="m-0">Password</Form.Label>
            <Form.Control type="password" placeholder=""
              name="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange} />
            {formik.errors.password && formik.touched.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </Form.Group>

          <div className="row px-3 py-3 d-flex flex-row justify-content-between">
            <Button className="my-2 col-sm-3 col-4 d-flex justify-content-center" variant="secondary" type="button" onClick={() => navigate('/allmovies')}>
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

      <ToastContainer />
    </>
  );
}

export default SignIn;
