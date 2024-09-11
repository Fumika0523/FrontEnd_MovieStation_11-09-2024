import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import {useContext} from "react"
import textContext from "../../utils/textContext"


function AddMovie_Formik({setMovieData}){
    useEffect(()=>{
        console.log("API call for adding movie")
        let timer=setInterval(()=>{
            console.log("1000")//show counting on AddMovie page
        },1000)
        //unmounting phase
        return()=>{
            console.log("Unmounted!") //when you go to different page, it shows "unmounted!"
            clearInterval(timer)
        }
    },[])
    
    const [textUseContext,setTextUseContext]=useContext(textContext)
    console.log(textUseContext)

    const navigate=useNavigate()
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

    // Style
    const addFormDesign={
        height:"40px",
        width:"50%",
        borderColor:"grey",
        marginBottom:"20px",
    }
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
console.log(formik)
    //handleSubmit
    //handleChange
    //values > (movieName:"",moviePoster:""...)
    
    const postMovies=async(newMovie)=>{
        console.log("Movie Posted to the DB..")
        console.log("NEW MOVIE:",newMovie)
        let res = await fetch(`https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie`,{
            method:'POST',
            headers:{'content-type':'application/json'}, 
            //send your data in the request body as JSON
            body:JSON.stringify(newMovie)
            //passing a object and sending to the server > string format
        })
        let data = await res.json()
        console.log(data)
        getMovieData()
    }

    //updating a data to browser
    const getMovieData=async()=>{
        console.log("Movie data is called....")
        let res = await fetch('https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie')//API call to get all movie data
        let data = await res.json()//responding in string, conver to json format
        console.log(data)
        setMovieData(data)
    }

    return(
        <>
    <h6 className='my-3 mx-5'>{textUseContext}</h6>
    <div className="w-75 mx-auto text-center">
       
        {/*  */}
        <h2>Add Movie</h2>

        {/* onSubmit event */}
        <form onSubmit={formik.handleSubmit}>

            {/* MOVIE NAME */}
            <input style={addFormDesign} type="text" name="moviename" id="moviename" placeholder='Movie Name' onChange={formik.handleChange} value={formik.values.moviename}/> <br />
            {formik.errors.moviename && formik.touched.moviename ? (
             <div>{formik.errors.moviename}</div>
           ) : null}

            {/* MOVIE POSTER */}
            <input style={addFormDesign} type="text" name="movieposter" id="movieposter" placeholder="Movie Poster" onChange={formik.handleChange} value={formik.values.movieposter} /> <br />
            {formik.errors.movieposter && formik.touched.movieposter ? (
             <div style={{color:"red"}}>{formik.errors.movieposter}</div>
           ) : null}

            {/* MOVIE RATING */}
            <input style={addFormDesign} type="text" name="rating" id="rating" placeholder='Rating' onChange={formik.handleChange} value={formik.values.rating} /> <br />
            {formik.errors.rating && formik.touched.rating ? (
             <div>{formik.errors.rating}</div>
           ) : null}

            {/* MOVIE SUMMARY */}
            <input style={addFormDesign} type="text" name="summary" id="summary" placeholder='Summary' onChange={formik.handleChange} value={formik.values.summary}/> <br />

            {/* MOVIE CAST */}
            <input style={addFormDesign} type="text" name="cast" id="cast" placeholder='Cast' onChange={formik.handleChange} value={formik.values.cast}/> <br />

            {/* Trailer */}
            <input  style={addFormDesign} type="text" name="trailer" id="trailer" placeholder='Trailer' onChange={formik.handleChange} value={formik.values.trailer} /> <br />

            {/* PUBLISH YEAR */}
            <input style={addFormDesign} type="text" name="publishYear" id="publishYear" placeholder='Publish Year' onChange={formik.handleChange} value={formik.values.publishYear}/> <br />

            {/* LIKE NUM */}
            <input style={addFormDesign} type="text" name="likeNum" id="likeNum" placeholder='Like Number' onChange={formik.handleChange} value={formik.values.likeNum} /> <br />

            {/* DISLIKE NUM */}
            <input style={addFormDesign} type="text" name="disLikeNum" id="disLikeNum" placeholder='Dislike Number' onChange={formik.handleChange} value={formik.values.disLikeNum} /> <br />

            {/* GENRES */}
            <input style={addFormDesign} type="text" name='genres' id="genres" placeholder='Genres' onChange={formik.handleChange} value={formik.values.genres} /> <br />

            {/* Category */}
            <input style={addFormDesign} type="text" name="category" id="category" placeholder='Category' onChange={formik.handleChange} value={formik.values.category} /> <br />

            {/* ADD MOVIE */}
            <button  type="submit" className='btn btn-warning mx-3'>ADD MOVIE</button>

            {/* Back */}
            <button  type="submit" className='btn btn-warning mx-3' onClick={()=>{navigate('/allmovies')}}>BACK</button>
            
        </form>
    </div>
        </>
    )
}
export default AddMovie_Formik
