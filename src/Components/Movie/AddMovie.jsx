import Stack from '@mui/material/Stack';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from 'formik'
import {url} from '../../utils/constant'
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material';
import { grey,amber,red,pink,blueGrey} from '@mui/material/colors';

export default function AddMovie({setMovieData}) {
const navigate = useNavigate();
const greyColor = grey[900]; // #212121
const amberColor = amber[500];
const amberColor1 = amber[700];
const redColor = red[900];
const pinkColor = pink[900]
const darkGreyColor = grey[700];
const blueGreyColor = blueGrey[500]

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
getMovieData();
navigate('/allmovies')
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
    <>
    <Box border={2}
    display="flex"
    flexDirection={"column"}
     borderColor="grey.600" 
     borderRadius={6}
     boxShadow={"5px 5px 10px #ccc"}
     padding={3}
      component="form"
      maxWidth={1000}
      alignItems="center"
      justifyContent={"center"}
      margin="auto"
      marginTop={5}
      marginBlock={5}
      // sx={{
      //   '& .MuiTextField-root': { width: '30%' ,height:'8ch' },boxShadow:13,
      // }}
      noValidate
      autoComplete="off" 
      onSubmit = {formik.handleSubmit}  
      // style={{margin:"5% auto",width:"75%", padding:"0% 5%"}}
    >
<Grid container  marginBottom={3} >
<Grid  xs={6} item textAlign={"start"}>
{/* Back */}
<Button variant="contained" className=' fs-5'
style={{backgroundColor:"#6c757d",color:"White"}} onClick={()=>{navigate('/allmovies')}} ><i class="fa-solid fa-circle-left me-2"></i>BACK</Button>
</Grid>
<Grid xs={6} item textAlign={"end"}>
{/* ADD MOVIE */}
<Button variant="contained"  className='fs-5 text-black' onClick={()=>{navigate('/allmovies')}} style={{backgroundColor:amberColor,textWrap:"nowrap"}}><i class="fa-solid fa-circle-plus me-2"></i>ADD MOVIE</Button>
</Grid>
</Grid>
  <Grid container spacing={2}
  // direction="row"  useFlexGap flexWrap="wrap"
  >
        {/* MOVIE NAME */}
        <Grid xs={12} sm={4} item >
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
        <Grid xs={12} sm={4} item >
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
        <Grid xs={12} sm={4} item >
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
        <Grid xs={12} sm={4} item >
          <TextField
          fullWidth
          required
          label="Category"
          name="category" id="category"  onChange={formik.handleChange} value={formik.values.category} /> 
          </Grid>

           {/* MOVIE Cast */}
           <Grid xs={12} sm={4} item >
           <TextField
            required
            fullWidth
            label="Cast"
            name="cast" id="cast"  onChange={formik.handleChange} value={formik.values.cast} /> 
            </Grid>

          {/* Publish Year */}
          <Grid xs={12} sm={4} item >
          <TextField
          fullWidth
          required
          label="Publish Year"
          name="publishYear" id="publishYear"  onChange={formik.handleChange} value={formik.values.publishYear}/>
          </Grid>

        {/* Like Num */}
        <Grid xs={12} sm={4} item >
          <TextField
          fullWidth
          required
          label="Like Number"
          name="likeNum" id="likeNum" onChange={formik.handleChange} value={formik.values.likeNum} />
          </Grid>

        {/* DISLIKE NUM */}
        <Grid xs={12} sm={4} item >
          <TextField
          fullWidth
          required
          label="Dislike Number"
          name="disLikeNum" id="disLikeNum"  onChange={formik.handleChange} value={formik.values.disLikeNum} />
        </Grid>

        {/* MOVIE GEnres */}
        <Grid xs={12} sm={4} item >
          <TextField
          fullWidth
          required
          label="Movie Genres"
          name='genres' id="genres"  onChange={formik.handleChange} value={formik.values.genres} /> 
          </Grid>

           {/* MOVIE TRAILER */}
           <Grid xs={12} sm={6} item >
           <TextField
           fullWidth
          required
          label="Movie Trailer"
          name="trailer" id="trailer"  onChange={formik.handleChange} value={formik.values.trailer}  /> 
           </Grid>

         {/* Summary */}
         <Grid xs={12} sm={6} item >
        <TextField fullWidth required id="summary" 
          label="Summary" name="summary"  onChange={formik.handleChange} value={formik.values.summary} /> 
           </Grid>
           </Grid>
   </Box>
{/* </div> */}
</>
  );}