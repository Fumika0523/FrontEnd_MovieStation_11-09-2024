import Stack from '@mui/material/Stack';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from 'formik'
import {url} from '../../utils/constant'
import axios from 'axios';


export default function AddMovie({setMovieData}) {
const navigate = useNavigate();

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
  // validationSchema:formSchema,
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
getMovieData();
}

//updating a data toer
const getMovieData=async()=>{
  console.log("Movie data is called....")
  let res = await fetch(`${url}/movie`,config)//API call to get all movie data
  let data = await res.json()//responding in string, conver to json format
  console.log(data)
  setMovieData(data)
}

  return (
    <div className='container py-5'>
    <div className='fs-1 text-center pb-4'>Add Movie</div>
   <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '45ch' },
      }}
      noValidate
      autoComplete="off" 
      onSubmit = {formik.handleSubmit}
    >
       <Stack direction="row"  useFlexGap flexWrap="wrap" spacing={{ xs: 2, sm: 4 }}>
  
        {/* MOVIE NAME */}
        <TextField
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

        {/* MOVIE POSTER */}
         <TextField
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
        

        {/* MOVIE Rating */}
            <TextField
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

        {/* Category */}
            <TextField
          required
          label="Category"
    name="category" id="category"  onChange={formik.handleChange} value={formik.values.category} /> 
          
           {/* MOVIE Cast */}
           <TextField
          required
          label="Cast"
          name="cast" id="cast"  onChange={formik.handleChange} value={formik.values.cast} /> 

        {/* MOVIE TRAILER */}
            <TextField
          required
          label="Movie Trailer"
          name="trailer" id="trailer"  onChange={formik.handleChange} value={formik.values.trailer} /> 
    
        {/* Publish Year */}
            <TextField
          required
          label="Publish Year"
          name="publishYear" id="publishYear"  onChange={formik.handleChange} value={formik.values.publishYear}/>

        {/* Like Num */}
            <TextField
          required
          label="Like Number"
          name="likeNum" id="likeNum" onChange={formik.handleChange} value={formik.values.likeNum} />
          

        {/* DISLIKE NUM */}
            <TextField
          required
          label="Dislike Number"
          name="disLikeNum" id="disLikeNum"  onChange={formik.handleChange} value={formik.values.disLikeNum} />
       
        {/* MOVIE GEnres */}
            <TextField
          required
          label="Movie Genres"
          name='genres' id="genres"  onChange={formik.handleChange} value={formik.values.genres} /> 
       
  {/* Summary */}
    <TextField required id="summary" 
    label="Summary" name="summary"  onChange={formik.handleChange} value={formik.values.summary} /> 

  </Stack>
  <div style={{marginTop:"2%"}} >

    {/* Back */}
    <Button style={{backgroundColor:"grey",marginRight:"2%"}} type="submit" variant="contained" onClick={()=>{navigate('/allmovies')}} >BACK</Button>

  {/* ADD MOVIE */}
  <Button color="warning" type="submit" variant="contained">ADD MOVIE</Button>
</div>
 </Box>
</div>
  );}