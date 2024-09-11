// import MovieCard from "./MovieCard"
import MovieCard_UI from "../Material_UI/MovieCard_UI"

function MovieDisplay({movieData,setMovieData}){
    console.log(movieData)
    let displayStyle={
        display:"flex",
        flexWrap:"wrap",
        gap:"2.7%",
        margin:"1% 4% 1% 4%",
        // backgroundColor: "black",
        position:"relative",
    //    border:"1px solid red",
        cursor: "pointer",    
      }

    return(
    <>
    <div style={displayStyle}>
    {/* each movie card */}
    {
    movieData?.map((element,index)=>(
    // <MovieCard movieposter={element.movieposter} moviename={element.moviename} rating={element.rating} summary={element.summary} cast={element.cast} key={index} id={index} genres={element.genres} category={element.category} /> //key for the backend , not going to use anymore
    // <MovieCard {...element} key={index} setMovieData={setMovieData} element={element}/>  
    <MovieCard_UI {...element} key={index} setMovieData={setMovieData} element={element}/>   //spread operator
))
    }
    </div>
        </>  
    )
}
export default MovieDisplay