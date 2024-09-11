import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddMovie({setMovieData}){
const navigate=useNavigate()
const [movieName,setMovieName]=useState("")//empty to fill/add the detail
const [moviePoster,setMoviePoster]=useState("")
const [movieRating,setMovieRating]=useState("")
const [movieSummary,setMovieSummary]=useState("")
const [movieCast,setMovieCast]=useState("")
const [movieTrailer,setMovieTrailer]=useState("")
const [moviePublishYear,setMoviePublishYear]=useState("")
const [movieLikeNum,setMovieLikeNum]=useState("")
const [movieDisLikeNum,setMovieDisLikeNum]=useState("")
const [movieGenres,setMovieGenres]=useState("")
const [movieCategory,setMovieCategory]=useState("")

const addFormDesign={
    height:"40px",
    width:"50%",
    borderColor:"grey",
    marginBottom:"20px",
}

const postMovies=async()=>{
    console.log("Movie Posted to the DB")
    let newMovie={
        movieposter:moviePoster,
        moviename:movieName,
        rating:movieRating,
        summary:movieSummary,
        cast:movieCast,
        trailer:movieTrailer,
        publishYear:moviePublishYear,
        likeNum:movieLikeNum,
        disLikeNum:movieDisLikeNum,
        genres:movieGenres,
        category:movieCategory,
    } 

    console.log("NEW MOVIE:",newMovie)
    let res= await fetch(`https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie`,{
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify(newMovie)// passing a object and sending to the server >string format
      })
        // let data = await res.json()
        // console.log(data)
        getMovieData()
}

const getMovieData=async()=>{
    console.log("Movie data is called....")
    let res = await fetch ('https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie')//API call to get all movie data
    let data =await res.json()//responsing in string so we cant use string so, converting to json format
    console.log(data)
    setMovieData(data)
}
    return(
    <>
    <div className="w-75 mx-auto text-center">
        <h2 className="m-4">Add Movie</h2>
        <input className="border rounded" style={addFormDesign}  type="text" id=""  name="" placeholder="Moviename" value={movieName} onChange={(e)=>setMovieName(e.target.value)} /><br />
        <input className="border rounded" style={addFormDesign} type="text" placeholder="Movieposter" value={moviePoster} onChange={(e)=>setMoviePoster(e.target.value)}/><br />
        <input className="border rounded" style={addFormDesign}  type="text" placeholder="Rating" value={movieRating} onChange={(e)=>setMovieRating(e.target.value)}/><br />
        <input className="border rounded" style={addFormDesign}  type="text" placeholder="Summary" value={movieSummary} onChange={(e)=>setMovieSummary(e.target.value)}/><br />
        <input className="border rounded" style={addFormDesign}  type="text" placeholder="Cast" value={movieCast} onChange={(e)=>setMovieCast(e.target.value)}/><br />
        <input className="border rounded" style={addFormDesign}  type="text" placeholder="Trailer" value={movieTrailer} onChange={(e)=>setMovieTrailer(e.target.value)} /><br />
        <input className="border rounded" style={addFormDesign}  type="text" placeholder="Publishyear" value={moviePublishYear} onChange={(e)=>setMoviePublishYear(e.target.value)}/><br />
        <input className="border rounded" style={addFormDesign}  type="text" placeholder="Likenumber" value={movieLikeNum} onChange={(e)=>setMovieLikeNum(e.target.value)}/><br />
        <input className="border rounded" style={addFormDesign}  type="text" placeholder="Dislikenumber" value={movieDisLikeNum} onChange={(e)=>setMovieDisLikeNum(e.target.value)} /><br />
        <input className="border rounded" style={addFormDesign}  type="text" placeholder="Genres" value={movieGenres} onChange={(e)=>setMovieGenres(e.target.value)}/><br />
        <input className="border rounded" style={addFormDesign}  type="text" placeholder="Category" value={movieCategory} onChange={(e)=>setMovieCategory(e.target.value)}/><br />
        {/* Add Movie */}
        <button className="btn bg-warning mx-3" onClick={()=>{
            postMovies() }}>Add Movie</button>

        {/* BACK */}
        <button className="btn btn-warning mx-3" onClick={()=>{navigate('/allmovies')}}>Back</button>
    </div>
    <hr />
    </>
)}
export default AddMovie