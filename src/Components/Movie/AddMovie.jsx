import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import TextField from '@mui/material/TextField';
import * as Yup from "yup";
import { useFormik } from 'formik'
import Box from '@mui/material/Box';
import axios from "axios";
import { url } from "../../utils/constant";
import { Grid} from '@mui/material';
import { grey,amber,red,pink,blueGrey} from '@mui/material/colors';
import { IoChevronBackOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

export default function AddMovie({setMovieData,mode}) {
const navigate = useNavigate();
const amberColor = amber[500];
const formSchema = Yup.object().shape({
  moviename: Yup.string().required("Movie name is required").min(3,"Movie name must be at least 3 characters"),
  movieposter: Yup.string().required("Movie poster URL is required").min(5, "URL too short"),
  rating: Yup.number().required("Rating is required").positive("Rating must be positive"),
  category: Yup.string().required("Category is required").min(3,"Category must be at least 3 characters"),
  cast: Yup.string().required("Cast information is required").min(10,"Category must be at least 10 characters"),
  publishYear: Yup.number().required("Publish year is required").integer("Must be a whole number").min(4,"Category must be at least 4 characters"),
  likeNum: Yup.number().required("Likes count is required").integer("Must be a whole number"),
  disLikeNum: Yup.number().required("Dislikes count is required").integer("Must be a whole number"),
  amount: Yup.number().required("Price is required"),
  trailer: Yup.string().required("Trailer URL is required").min(5, "URL too short"),
  summary: Yup.string().required("Summary is required").min(200, "Summary must be at least 100 characters"),
})

const formik=useFormik({
  initialValues:{
      moviename:"",
      movieposter:"",
      rating:"",
      summary:"",
      cast:"",
      trailer:"",
      publishYear:"",
      likeNum:"",
      disLikeNum:"",
      amount:"",
      category:"",
  },
  validationSchema:formSchema,
  onSubmit:(values)=>{ 
  //console.log(values) 
  postMovies(values)
  getMovieData()

  }   
})
const token = sessionStorage.getItem('token')
//console.log(token)

let config = {
  headers:{
    Authorization:`Bearer ${token}`
  }
}

const postMovies=async(newMovie)=>{
  console.log("NEW MOVIE:",newMovie)
  let res = await axios.post(`${url}/addmovie`,newMovie,config)
  console.log(res)
    if(res.status === 200){
      navigate('/allmovies')
        // setMovieData(res);
    }
}
//updating a data toer
  const getMovieData = async () => {
    console.log("Movie data is called.....")
    let res = await fetch(`${url}/movie`) //API call to get all movie data
    console.log(res)
    let data = await res.json()
    console.log(data)
  }
  useEffect(() => {
  getMovieData();
}, []);




 return (
    <>
      <div className='h-100 d-flex justify-content-center align-items-center  row mx-auto' >
    <Box
    component="form" 
     sx={{
      width: {xs: "90%", md: "75%", sm: "85%", lg:"70%"},
      margin:{lg:"8% 0%",md:"15% 0%", xs:"5% 0%", sm:"10% 0"}
      }}
    style={{padding:"4% 5%"}}
    border={1}
    display="flex"
    flexDirection={"column"}
     borderColor="grey.600" 
     borderRadius={6}
     boxShadow={"5px 5px 10px #ccc"}
      alignItems="center"
      justifyContent={"center"}
      noValidate
      autoComplete="off" 
      onSubmit = {formik.handleSubmit}  >

      {/* Buttons */}
        <Grid container className=" d-flex justify-content-between " marginBottom={3} >
        <Button
          variant="success"
          onClick={() => navigate('/allmovies')}
          className="text-nowrap d-flex align-items-center me-3"
          style={{
          backgroundColor: mode === "light" ? "white" : "rgba(114, 114, 116, 0.52)",
          border: mode === "light" ? "1px solid rgba(199, 199, 203, 0.52)" : "none",
          color: mode === "light" ? "black" : "white",
        }}
        >
          <IoChevronBackOutline className="fs-4 me-1" />
          Cancel
        </Button>

            {/* UPDATE MOVIE */}
          <Button variant="success" type="submit" className="d-flex text-nowrap align-items-center border-0 border "><i class="fa-solid fs-5 fa-circle-plus me-1" 
          style={{
          color: mode === "light" ? "black" : amberColor,
        }}></i>Add Movie</Button>   
      </Grid>
      <Grid container spacing={3} >
        {/* MOVIE NAME */}
        <Grid xs={12} sm={6} md={4} item >
        <TextField 
          fullWidth
          required
          label="Movie Name"
          name="moviename"
          id="moviename"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          defaultValue={formik.values.moviename} 
            />
        {formik.errors.moviename && formik.touched.moviename? (
          <div style={{color:"red"}}>{formik.errors.moviename}</div>
        ) : null }

        </Grid>

        {/* MOVIE POSTER */}
        <Grid xs={12} sm={6} md={4} item >
         <TextField
         fullWidth
          required
          label="Movie Poster"
          name="movieposter"
          id="movieposter"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          defaultValue={formik.values.movieposter}
        />
        {formik.errors.movieposter && formik.touched.movieposter? (
          <div style={{color:"red"}}>{formik.errors.movieposter}</div>
        ) : null }
        </Grid>

        {/* MOVIE Rating */}
        <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Rating"
          name="rating"
          id="rating"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          defaultValue={formik.values.rating}
        />
        {formik.errors.rating && formik.touched.rating? (
          <div style={{color:"red"}}>{formik.errors.rating}</div>
        ) : null }
        </Grid>

        {/* Category */}
        <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Category"
          name="category" id="category"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.category} /> 
            {formik.errors.category && formik.touched.category? (
          <div style={{color:"red"}}>{formik.errors.category}</div>
        ) : null }
          </Grid>

           {/* MOVIE Cast */}
           <Grid xs={12} sm={6} md={4} item >
           <TextField
            required
            fullWidth
            label="Cast"
            name="cast" id="cast"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange} value={formik.values.cast} /> 
              {formik.errors.cast && formik.touched.cast? (
          <div style={{color:"red"}}>{formik.errors.cast}</div>
        ) : null }
            </Grid>

          {/* Publish Year */}
          <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Publish Year"
          name="publishYear" id="publishYear"  
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} value={formik.values.publishYear}/>
          {formik.errors.publishYear && formik.touched.publishYear? (
          <div style={{color:"red"}}>{formik.errors.publishYear}</div>
        ) : null }
          </Grid>

        {/* Like Num */}
        <Grid xs={6} sm={4} item >
          <TextField
          fullWidth
          required
          label="Like Number"
          name="likeNum" id="likeNum"           
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} value={formik.values.likeNum} />
          {formik.errors.likeNum && formik.touched.likeNum? (
          <div style={{color:"red"}}>{formik.errors.likeNum}</div>
        ) : null }
          </Grid>

        {/* DISLIKE NUM */}
        <Grid xs={6} sm={4} item >
          <TextField
          fullWidth
          required
          label="Dislike Number"
          onBlur={formik.handleBlur}
          name="disLikeNum" id="disLikeNum"  onChange={formik.handleChange} value={formik.values.disLikeNum} />
          {formik.errors.disLikeNum && formik.touched.disLikeNum? (
          <div style={{color:"red"}}>{formik.errors.disLikeNum}</div>
        ) : null }
        </Grid>

        {/* MOVIE GEnres */}
        <Grid xs={12} sm={4}  item >
          <TextField
          fullWidth
          required
          label="Price"
          name='amount' id="amount"  
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} value={formik.values.amount} /> 
          {formik.errors.amount && formik.touched.amount? (
          <div style={{color:"red"}}>{formik.errors.amount}</div>
        ) : null }
          </Grid>

           {/* MOVIE TRAILER */}
           <Grid xs={12}  item >
           <TextField
           fullWidth
          required
          label="Trailer"
          name="trailer" id="trailer" 
         onBlur={formik.handleBlur}
         onChange={formik.handleChange} value={formik.values.trailer}  /> 
            {formik.errors.trailer && formik.touched.trailer? (
          <div style={{color:"red"}}>{formik.errors.trailer}</div>
        ) : null }
           </Grid>

         {/* Summary */}
         <Grid xs={12}  item >
        <TextField fullWidth required id="summary" 
          label="Summary" name="summary"  
          onBlur={formik.handleBlur}
          onChange={formik.handleChange} 
          value={formik.values.summary} /> 
          {formik.errors.summary && formik.touched.summary? (
          <div style={{color:"red"}}>{formik.errors.summary}</div>
        ) : null }
           </Grid>
      </Grid>
   </Box>
      </div>
    </>
  );}