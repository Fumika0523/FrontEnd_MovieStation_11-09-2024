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
import NavBar from "../HomeSreen/NavBar";
import { Button } from "react-bootstrap";

export default function AddMovie({setMovieData,mode}) {
const navigate = useNavigate();
const amberColor = amber[500];

const formSchema = Yup.object().shape({
  moviename: Yup.string().required("Movie name is required"),
  movieposter: Yup.string().required("Movie poster URL is required").min(5, "URL too short"),
  rating: Yup.number().required("Rating is required").positive("Rating must be positive"),
  category: Yup.string().required("Category is required"),
  cast: Yup.string().required("Cast information is required"),
  publishYear: Yup.number().required("Publish year is required").integer("Must be a whole number"),
  likeNum: Yup.number().required("Likes count is required").integer("Must be a whole number"),
  disLikeNum: Yup.number().required("Dislikes count is required").integer("Must be a whole number"),
  genres: Yup.array().of(Yup.string()).optional(),
  trailer: Yup.string().required("Trailer URL is required").min(5, "URL too short"),
  summary: Yup.string().required("Summary is required").min(200, "Summary must be at least 200 characters"),
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
      // genres:"",
      category:"",
  },
  validationSchema:formSchema,
  onSubmit:(values)=>{ 
  console.log(values) 
  postMovies(values)
  }   
})
const token = sessionStorage.getItem('token')
console.log(token)

let config = {
  headers:{
    Authorization:`Bearer ${token}`
  }
}

const postMovies=async(newMovie)=>{
   console.log("Movie Posted to the DB..")
  console.log("NEW MOVIE:",newMovie)
let res = await axios.post(`${url}/addmovie`,newMovie,config)
console.log(res)
if(res){
  getMovieData()
  navigate(`/allmovies`)
}

}

//updating a data toer
  const getMovieData = async () => {
    console.log("Movie data is called.....")
    let res = await fetch(`${url}/movie`, config) //API call to get all movie data
    let data = await res.json()
    console.log(data)
    setMovieData()  
  }

  // if(token == null){
  //  console.log("NO TOKEN")
  // }
  // else{
  //  console.log("YES TOKEN")
  // }

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
      <Grid container className=" d-flex justify-content-between" marginBottom={3} >

      {/* Back */}
<Button
  variant="secondary"
  onClick={() => navigate('/allmovies')}
  className="text-nowrap d-flex align-items-center me-3"
>
  <IoChevronBackOutline className="fs-4 me-1" />
  Back to All Movies
</Button>
  
   
      {/* ADD MOVIE */}
        <Button  variant="success"  className='fs-6 text-nowrap'  ><i className="fs-6 fa-solid fa-circle-plus me-1"></i>Add Movie</Button>

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
          onChange={formik.handleChange}
          defaultValue={formik.values.movieposter}
        />
        {formik.errors.movieposter && formik.touched.movieposter? (
          <div style={{color:"red"}}>{formik.errors.moviename}</div>
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
          name="category" id="category"  onChange={formik.handleChange} value={formik.values.category} /> 
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
            name="cast" id="cast"  onChange={formik.handleChange} value={formik.values.cast} /> 
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
          name="publishYear" id="publishYear"  onChange={formik.handleChange} value={formik.values.publishYear}/>
          {formik.errors.publishYear && formik.touched.publishYear? (
          <div style={{color:"red"}}>{formik.errors.publishYear}</div>
        ) : null }
          </Grid>

        {/* Like Num */}
        <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Like Number"
          name="likeNum" id="likeNum" onChange={formik.handleChange} value={formik.values.likeNum} />
          {formik.errors.likeNum && formik.touched.likeNum? (
          <div style={{color:"red"}}>{formik.errors.likeNum}</div>
        ) : null }
          </Grid>

        {/* DISLIKE NUM */}
        <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Dislike Number"
          name="disLikeNum" id="disLikeNum"  onChange={formik.handleChange} value={formik.values.disLikeNum} />
          {formik.errors.disLikeNum && formik.touched.disLikeNum? (
          <div style={{color:"red"}}>{formik.errors.disLikeNum}</div>
        ) : null }
        </Grid>

        {/* MOVIE GEnres */}
        {/* <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Movie Genres"
          name='genres' id="genres"  onChange={formik.handleChange} value={formik.values.genres} /> 
          {formik.errors.genres && formik.touched.genres? (
          <div style={{color:"red"}}>{formik.errors.genres}</div>
        ) : null }
          </Grid> */}

           {/* MOVIE TRAILER */}
           <Grid xs={12} sm={12} md={4} item >
           <TextField
           fullWidth
          required
          label="Movie Trailer"
          name="trailer" id="trailer"  onChange={formik.handleChange} value={formik.values.trailer}  /> 
            {formik.errors.trailer && formik.touched.trailer? (
          <div style={{color:"red"}}>{formik.errors.trailer}</div>
        ) : null }
           </Grid>

         {/* Summary */}
         <Grid xs={12}  item >
        <TextField fullWidth required id="summary" 
          label="Summary" name="summary"  onChange={formik.handleChange} value={formik.values.summary} /> 
          {formik.errors.summary && formik.touched.summary? (
          <div style={{color:"red"}}>{formik.errors.summary}</div>
        ) : null }
           </Grid>
      </Grid>
   </Box>
      </div>
    </>
  );}