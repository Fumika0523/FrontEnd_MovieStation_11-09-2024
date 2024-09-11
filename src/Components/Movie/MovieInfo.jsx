import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function MovieInfo({ movie }) {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState(movie[id]);
  // console.log(movie)
  // console.log(id)
  // console.log(movie[id])

  return (
    <>
    {/* Trailer */}
      <div style={{position:"relative"}} >
        <iframe
          style={{ width: "100%", height: "750px" }}
          className="opacity-75"
          src={movieInfo.trailer}
        ></iframe>

        <div className="d-flex"
          style={{
            height: "300x",
            width: "90%",
            backgroundColor: "black",
            margin: "0 5% 10%",
            boxShadow: "10px 5px 5px grey",
            position: "absolute",
            top: "88%",
        
          }}
        ><div>
          {/* Left Image */}
          <img
            src={movieInfo.movieposter}
            alt=""
            style={{ height: "480px", width: "79%", marginLeft: "40px", float:"left"}}
          />
             {/* List */}
        <div
          className="d-flex pt-4 pb-2"
          style={{
            width: "59%",
            marginLeft: "8.7%",
            backgroundColor: "#303841",
          }}
        >
          <div className="d-flex flex-column align-items-center ms-4">
            <i className=" fa-solid fa-bookmark"></i>
            <span className="mt-1">List</span>
          </div>
          {/* Seen all */}
          <div className="d-flex flex-column align-items-center  ms-5">
            <i className="fa-solid fa-check"></i>
            <span className="mt-1">Seen all</span>
          </div>

          {/* thumb-Up */}
          <i className=" ms-5 fa-solid fa-thumbs-up position-relative fs-5 d-flex flex-column align-items-center">
            <span className="fs-6 mt-1">100</span>
          </i>
          {/* Thumb-down */}
          <i className="ms-5 fa-solid fa-thumbs-down position-relative fs-5 d-flex flex-column align-items-center">
            <span className="fs-6 mt-1">45</span>
          </i>
          </div>
        </div>
          <div style={{width:"120%"}}>
            <div className="d-flex  align-items-center">
              <div className="fs-1 fw-bold ">{movieInfo.moviename}</div>
              <div className="text-secondary ms-3 fs-3">{movieInfo.publishYear}</div>
            </div>
            <div className="d-flex">
              <div className="fs-5 mt-3 text-warning">Watch Now</div>
              </div>
              <div className="d-flex"> 
               
              <div className="text-white">{movieInfo.summary}</div>
              <div className="d-flex flex-column " style={{height:"300px"}}>
              <div className="text-secondary">Cast:{movieInfo.cast}</div>
              <div className="mt-4 text-secondary">Genres:{movieInfo.genres}</div>
              <div className="mt-4"><div className="text-secondary">This show is:{movieInfo.category}</div></div>
              </div>
              </div>
          </div>
        </div>
      </div>

      
    </>
  );
}
export default MovieInfo;
