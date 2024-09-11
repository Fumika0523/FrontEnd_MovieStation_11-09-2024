import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import textContext from "../../utils/textContext";

function EditMovie(){
const [singleMovie, setSingleMovies]=useState()
const {id}=useParams()


const getMovieData=async()=>{
    console.log("Movie data is called.........")
    let res = await fetch (`https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie/${id}`)//API call
    let data =await res.json()//responsing in string so we cant use string so, converting to json format
    console.log(data)
    setSingleMovies(data)
}
console.log(singleMovie)

useEffect(()=>{
    getMovieData()
},[])//when your page is loaded

    return(
        <>
        {
        singleMovie?
        <EditMovieForm  singleMovie={singleMovie} id={id}/>//LOAD WHEN API COMPLETED
        :
        <p>Loading..........</p>//When API CALL IS RUNNING
    }        
    </>
    )}
export default EditMovie

function EditMovieForm({singleMovie,id}){
const [movieName,setMovieName]=useState(singleMovie.moviename)
const [moviePoster,setMoviePoster]=useState(singleMovie.movieposter)
const [movieRating,setMovieRating]=useState(singleMovie.rating)
const [movieSummary,setMovieSummary]=useState(singleMovie.summary)
const [movieCast,setMovieCast]=useState(singleMovie.cast)
const [movieTrailer,setMovieTrailer]=useState(singleMovie.trailer)
const [moviePublishYear,setMoviePublishYear]=useState(singleMovie.publishYear)
const [movieLikeNum,setMovieLikeNum]=useState(singleMovie.likeNum)
const [movieDisLikeNum,setMovieDisLikeNum]=useState(singleMovie.disLikeNum)
const [movieGenres,setMovieGenres]=useState(singleMovie.genres)
const [movieCategory,setMovieCategory]=useState(singleMovie.category)
const navigate=useNavigate()
const [textUseContext,setTextUseContext]=useContext(textContext)

  const addFormDesign={
        height:"40px",
        width:"50%",
        borderColor:"grey",
        marginBottom:"20px",
    }

    const updateMovies=async()=>{
        console.log("Movie Posted to the DB")
        let updatedMovie={
        //key:value
        //ley > actual in API what key is mentioned value > useState Values
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
        console.log("Update Movie:",updatedMovie)
        let res = await fetch (`https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie/${id}`,
            {
                method:'PUT',
                headers: {'content-type':'application/json'},
                // Send your data in the request body as JSON
                body: JSON.stringify(updatedMovie)// sending to the server >string format
              })
                let data = await res.json()
                console.log(data)
             }

return(
    <>
    <h6 className="mx-5 mt-4 text-left">{textUseContext}</h6>
    <div className="w-75 mx-auto text-center mb-5">
        <h2 className="m-4">Edit Movie</h2>
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
        
        <button className="btn bg-warning mx-3" onClick={()=>{
            updateMovies() }}>Update Movie</button>
        <button className="btn btn-warning mx-3" onClick={()=>{navigate('/allmovies')}}>Back</button>
    </div>
  
    </>
)
}
//if you need it, you can create a number of functional components inside another component but, it should be after "export default". and you can re-use it. you cannot write "export default" after the functional components.


    
