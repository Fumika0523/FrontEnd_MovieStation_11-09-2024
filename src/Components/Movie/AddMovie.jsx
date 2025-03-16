import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import TextField from '@mui/material/TextField';
import * as Yup from "yup";
import { useFormik } from 'formik'
import Box from '@mui/material/Box';
import axios from "axios";
import { url } from "../../utils/constant";
import { Button,Stack, Container, Grid, Typography } from '@mui/material';
import { grey,amber,red,pink,blueGrey} from '@mui/material/colors';


export default function AddMovie({setMovieData}) {
const navigate = useNavigate();
const amberColor = amber[500];

const formSchema=Yup.object().shape({
  moviename:Yup.string().min(5,"Too Short"),
  movieposter:Yup.string().min(5,"Too Short").max(20,"Movie Name too long"),
  rating:Yup.number().required().positive(),
  summary:Yup.string().min(5,"Too Short").max(250,"Summary Too long"),
  cast:Yup.string().min(5,"Too Short").max(250,"Too Long"),
  trailer:Yup.string().required(),
  publishYear:Yup.string().required(),
  likeNum:Yup.string().required(),
  disLikeNum:Yup.string().required(),
  genres:Yup.number().required(),
  category:Yup.string().required(),
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
      genres:"",
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
setMovieData(res)
}

//updating a data toer
  const getMovieData = async () => {
    console.log("Movie data is called.....")
    let res = await fetch(`${url}/movie`, config) //API call to get all movie data
    let data = await res.json()
    console.log(data)
    getMovieData()
  }


  return (
    <>
    <div className='h-100 d-flex justify-content-center align-items-center row mx-auto' >
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
      <Grid container  marginBottom={3} >
      <Grid  xs={6} item textAlign={"start"}>
      {/* Back */}
      <Button variant="contained" className='fs-6'
      style={{backgroundColor:"#6c757d",color:"White"}} onClick={()=>{navigate('/allmovies')}} ><i class="fa-solid fa-circle-left me-1 "></i>BACK</Button>
      </Grid>
      <Grid xs={6} item textAlign={"end"}>
      {/* ADD MOVIE */}
        <Button onClick={() => {
                navigate('/allmovies')
              }}
              variant="contained" type="submit" className='fs-6 text-black'  style={{backgroundColor:amberColor,textWrap:"nowrap"}}><i class="fs-6 fa-solid fa-circle-plus me-1"></i>ADD MOVIE</Button>
      </Grid>
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
          <div>{formik.errors.moviename}</div>
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
          <div>{formik.errors.moviename}</div>
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
          <div>{formik.errors.rating}</div>
        ) : null }
        </Grid>

        {/* Category */}
        <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Category"
          name="category" id="category"  onChange={formik.handleChange} value={formik.values.category} /> 
          </Grid>

           {/* MOVIE Cast */}
           <Grid xs={12} sm={6} md={4} item >
           <TextField
            required
            fullWidth
            label="Cast"
            name="cast" id="cast"  onChange={formik.handleChange} value={formik.values.cast} /> 
            </Grid>

          {/* Publish Year */}
          <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Publish Year"
          name="publishYear" id="publishYear"  onChange={formik.handleChange} value={formik.values.publishYear}/>
          </Grid>

        {/* Like Num */}
        <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Like Number"
          name="likeNum" id="likeNum" onChange={formik.handleChange} value={formik.values.likeNum} />
          </Grid>

        {/* DISLIKE NUM */}
        <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Dislike Number"
          name="disLikeNum" id="disLikeNum"  onChange={formik.handleChange} value={formik.values.disLikeNum} />
        </Grid>

        {/* MOVIE GEnres */}
        <Grid xs={12} sm={6} md={4} item >
          <TextField
          fullWidth
          required
          label="Movie Genres"
          name='genres' id="genres"  onChange={formik.handleChange} value={formik.values.genres} /> 
          </Grid>

           {/* MOVIE TRAILER */}
           <Grid xs={12} sm={6} md={6} item >
           <TextField
           fullWidth
          required
          label="Movie Trailer"
          name="trailer" id="trailer"  onChange={formik.handleChange} value={formik.values.trailer}  /> 
           </Grid>

         {/* Summary */}
         <Grid xs={12} sm={12} md={6} item >
        <TextField fullWidth required id="summary" 
          label="Summary" name="summary"  onChange={formik.handleChange} value={formik.values.summary} /> 
           </Grid>
      </Grid>
   </Box>
   </div>
{/* </div> */}
</>
  );}