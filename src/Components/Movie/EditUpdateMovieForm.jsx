import React, { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { useContext } from "react";
import textContext from "../../utils/textContext";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as Yup from "yup";
import { useFormik } from 'formik'
import Box from '@mui/material/Box';
import axios from "axios";
import { url } from "../../utils/constant";


function EditUpdateMovieForm({singleMovie,id}){
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
            moviename:singleMovie.moviename,
            movieposter:singleMovie.movieposter,
            rating:singleMovie.rating,
            summary:singleMovie.summary,
            cast:singleMovie.cast,
            trailer:singleMovie.trailer,
            publishYear:singleMovie.publishYear,
            likeNum:singleMovie.likeNum,
            disLikeNum:singleMovie.disLikeNum,
            genres:singleMovie.genres,
            category:singleMovie.category,
        },
        // validationSchema:formSchema,
        onSubmit:(values)=>{ 
            console.log(values) 
            updateMovies(values)
        }   
      })

      const token = sessionStorage.getItem('token')
      console.log(token)

      let config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const updateMovies=async(updatedMovie)=>{
            console.log("Movie Posted to the DB")
            console.log("Update Movie:",updatedMovie)

    let res = await axios.put(`${url}/updatemovie/${id}`,updatedMovie,config)
    console.log(res)
   // setMovieData();
    }

    //updating a data 
    const getMovieData=async()=>{
        console.log("Movie data is called.....")
        let res = await fetch(`${url}/movie`,config) //API call to get all movie data
        let data = await res.json()
        console.log(data)
        getMovieData(data)
    }
    
                 return (
                    <>
                       {/* <div className='container py-5'> */}
                        <Box border={1} borderColor="grey.600" borderRadius={6}
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { width: '39ch' ,height:'8ch' },boxShadow:13,
                      }}
                      noValidate
                      autoComplete="off" 
                      onSubmit = {formik.handleSubmit}  style={{margin:"10%", padding:"4% 3%"}}
                    >
                          <div style={{display:"flex",gap:"59.5%",marginBottom:"5%"}} >
                
                {/* Back */}
                <button  className='btn btn-secondary py-3 px-5 fs-4' onClick={()=>{navigate('/allmovies')}} ><i class="fa-solid fa-circle-left me-2"></i>BACK</button>
                
                {/* ADD MOVIE */}
                <button className='btn btn-warning  py-3 px-5 fs-4'><i class="fa-solid fa-circle-plus me-2" onClick={()=>{navigate('/allmovies')}}></i>UPDATE MOVIE</button>
                </div>
                  
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
                       
                           {/* MOVIE TRAILER */}
                           <TextField
                          required
                          label="Movie Trailer"
                          name="trailer" id="trailer"  onChange={formik.handleChange} value={formik.values.trailer} style={{width:"60ch"}} /> 
                
                  {/* Summary */}
                    <TextField required id="summary" 
                    label="Summary" name="summary"  onChange={formik.handleChange} value={formik.values.summary} style={{width:"60ch"}}  /> 
                
                  </Stack>
                  </Box>
                {/* </div> */}
                </>
                  );}
    
export default EditUpdateMovieForm