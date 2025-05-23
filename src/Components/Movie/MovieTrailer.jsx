import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { url } from '../../utils/constant';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import {grey,yellow} from "@mui/material/colors";
import NavBar from '../HomeSreen/NavBar';

function MovieTrailer({mode}) {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState();

  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')
  console.log(token)

  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const getTrailerData = async () => {
    console.log("Trailer data is called....")
    let res = await axios.get(`${url}/movie/${id}`,config)
    console.log("movieTrailer",res.data)
    console.log("res",res)
    setMovieInfo(res.data)
  }
  useEffect(() => {
    getTrailerData()
  }, []) //API Call

  console.log("movieInfo",movieInfo)
  // watchlater from Trailer should remove
  return (
    <>
      {
        movieInfo &&
        
        <div
          className='mx-auto'
          >
            {/* Top */}
            <Row className='mx-auto mx-md-5 mb-3 -3' >
            <div className='text-end mb-2'>
            <Button size="sm" variant="outline-none" style={{color:"white", backgroundColor:"rgb(62, 63, 63)"}} className='px-3'
            onClick={() => navigate('/allmovies')} >
              Back
            </Button>
            </div>
            {/* YOUTUBE */}

            <Col className='col-12'>
            <iframe src={movieInfo?.trailer }  
            className='iframe w-100'
               showinfo="0" allow="encrypted-media" frameborder="0" 
               style={{height:"400px"}}
              ></iframe>

            </Col>
            </Row>

            {/* TITLE */}
            <Row className='mx-5 border-primary d-flex flex-row align-items-end justify-content-' >
            <Col className="col-lg-8  border-4  col-md-6 col-sm-8 col-9">
            <div className='text-nowrap border-4 text-start fs-3'>{movieInfo.moviename}
            <span className='ms-1 border-4  fs-6' style={{color:"#b9bdcc"}}>({movieInfo.publishYear})</span></div>
            </Col>
            <Col className="border-4  col-lg-4 col-md-6 col-sm-4 col-3">
            {/* <div className='border-danger d-flex flex-column justify-content-center align-items-end'>
            <div  className='border-4  fw-bold text-secondary ' style={{fontSize:"13px"}}>RATING</div>
            <div className="border-4 d-flex flex-row justify-content-center align-items-center">
              <FaStar className='text-warning fs-3'/>
              <span className="fw-bold mx-1" style={{fontSize:"18px"}}>{movieInfo.rating}</span>
              <span className='text-secondary' 
              style={{fontSize:"17px"}}> /10</span> 
            </div>
            </div> */}
      
            </Col>
            </Row>
            
            {/* Middle */}
            <Row className='mb-4  mx-5'>
              {/* LEFT */}
              <Col className='col-lg-4 col-12 mx-auto d-flex justify-content-center align-items-center mb-md-1  mb-2'>
                {/* Image */}
                <Image className='w-100 d-block  border-4 border-danger' style={{height:"auto",objectFit:"cover"}} src={movieInfo?.movieposter} />
               
              </Col>

              {/* RIGHT */}
              <Col           
              className='col-lg-6 d-flex flex-column ps-3 pt-2 justify-content-center  col-sm-11  col-12 mx-auto mb-md-1  align-items-center mb-2'
              style={{ color: mode === "light" ? "rgb(248, 248, 245)": "rgb(128, 129, 130)" }}>
                <div className='mb-3'
                >{movieInfo.summary}</div>
                <div className='mb-2 d-flex w-100 flex-column '> <span className='mb-1 fontColorTrailerFont'>CAST</span>{movieInfo.cast}</div>
                <div className='mb-2 d-flex w-100 flex-column '><span className='mb-1 fontColorTrailerFont'>GENRES</span>{movieInfo.genres}</div>
              <div className='mb-2 d-flex w-100 text-wrap flex-column'><span className='mb-1 fontColorTrailerFont '>CATEGORY</span><span className='text-wrap'>{movieInfo.category}</span></div>
              </Col>

              {/* BUTTONS */}
              <Col className='col-lg-2 col-sm-10 mx-auto mt-1'>
              <Row className='align-items-center mx-auto d-flex justify-content-evenly '>
              {/* List */}
              <Col className="col-md-6 col-6 col-sm-6 col-lg-12">
                <Button variant="outline-none" className="py-3 d-flex w-100 trailerBtn mb-3"
                  style={{ backgroundColor: mode === "light" ? "white" :"rgb(34, 44, 56)",
                    color:mode === "light" ? "rgb(79, 83, 91)":"rgb(197, 199, 203)",
                    borderColor:mode === "light" ? "rgb(179, 181, 183)":"rgb(34, 44, 56)"}}
                  > 
                  {/* <i className="fa-solid fa-bookmark fs-5 me-2"></i> <div>List</div> */}
                  <div className='border-danger d-flex flex-row gap-2 justify-content-center align-items-end'>
           
            <div className="border-4 d-flex flex-row justify-content-center align-items-center"
            style={{ backgroundColor: mode === "light" ? "white" :"rgb(34, 44, 56)",
              color:mode === "light" ? "rgb(79, 83, 91)":"rgb(197, 199, 203)",
              borderColor:mode === "light" ? "rgb(179, 181, 183)":"rgb(34, 44, 56)"}}
            >
              <FaStar className='text-warning fs-4 me-2'/>
              <span>{movieInfo.rating}</span>
              <span> /10</span> 
               {/* <div  className='border-4  fw-bold text-secondary ' style={{fontSize:"13px"}}>RATING</div> */}
            </div>
            </div>

                  </Button>
                </Col>
              <Col className='col-md-6 col-sm-6 col-lg-12'>
                  {/* Seen all */}
                <Button variant="outline-none" className="py-3 text-nowrap trailerBtn w-100 d-flex mb-3"
                   style={{ backgroundColor: mode === "light" ? "white" :"rgb(34, 44, 56)",
                    color:mode === "light" ? "rgb(79, 83, 91)":"rgb(197, 199, 203)",
                    borderColor:mode === "light" ? "rgb(179, 181, 183)":"rgb(34, 44, 56)"}}
                    > <i className="fa-solid fa-check fs-5 me-2"></i><div>Seen all</div></Button>
              </Col>
              <Col className='col-md-6 col-sm-6 col-lg-12' >
                  {/*Like*/}
                   <Button variant="outline-none" className="px-2 py-3 trailerBtn w-100 d-flex  mb-3"
                 style={{ backgroundColor: mode === "light" ? "white" :"rgb(34, 44, 56)",
                  color:mode === "light" ? "rgb(79, 83, 91)":"rgb(197, 199, 203)",
                  borderColor:mode === "light" ? "rgb(179, 181, 183)":"rgb(34, 44, 56)"}} > 
                  <i className="fa-solid fa-thumbs-up fs-5 me-2"></i><div>{movieInfo.likeNum}</div></Button>
                  </Col>
                  <Col className='col-md-6 col-sm-6 col-lg-12'>
                  {/* DisLike */}
                  <Button variant="outline-none" className="px-2 py-3 trailerBtn w-100 d-flex mb-3" 
                  style={{ backgroundColor: mode === "light" ? "white" :"rgb(34, 44, 56)",
                    color:mode === "light" ? "rgb(79, 83, 91)":"rgb(197, 199, 203)",
                    borderColor:mode === "light" ? "rgb(179, 181, 183)":"rgb(34, 44, 56)"}}> <i className="fa-solid fa-thumbs-down fs-5 me-2"></i><div>{movieInfo.disLikeNum}</div></Button>
              </Col>
              </Row>
              </Col>
              </Row>
        </div>
      }

      {/* Carousel */}
      {/* <div> */}
      <Carousel  className='border-4   d-none d-md-block row -4 mx-auto border-warning my-5'>
        <Carousel.Item variant="warning"  className=' '>
          <div className='d-flex flex-row justify-content-between mx-auto col-11'>
            <div className='col-2'>
            <img src="https://www.barbie-themovie.com/images/share.jpg" className="w-100 d-block rounded-circle" alt="" style={{ height: "250px",  }} />
            </div>
            <div className='col-2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnFNUcX9OnSQzcOMWPpm7OAjvTfQcxDDcGg&s" className="w-100 d-sm-none d-md-block rounded-circle" alt="" style={{ height: "270px"}} />
            </div>
            <div className="col-2">
            <img src="https://www.famousbirthdays.com/group_images/medium/suicide-squad-movie.jpg" className="w-100 d-block rounded-circle" alt="" style={{ height: "270px" }} />
            </div>
            <div className="col-2">
            <img src="https://www.seramarkoff.com/wp-content/uploads/2023/08/oppenheimer-full-movie-in-hd-leaked-online-christopher-nolans-biographical-thriller-faces-wrath-of-piracy-is-available-to-download-illegally-1-582x306.jpg" className="w-100 d-block rounded-circle" alt="" style={{ height: "270px"}} />
            </div>
            <div className="col-2">
            <img src="https://scera.org/wp-content/uploads/2019/05/Aladdin-2019-Wallpaper-HD.jpg" className="w-100 d-block rounded-circle" alt="" style={{ height: "270px" }} />
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item >
        <div className='d-flex flex-row justify-content-between mx-auto col-11'>
            <div className='col-2'>
            <img src="https://images.hungama.com/c/1/dea/071/48749022/48749022_1280x800.jpg"  className="w-100 d-block rounded-circle" alt="" style={{ height: "250px",  }} />
            </div>
            <div className='col-2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRab_D2ID4CQoy1fwE1o5PgBoQoOSL5I_fnsw&s"  className="w-100 d-sm-none d-md-block rounded-circle" alt="" style={{ height: "270px"}} />
            </div>
            <div className="col-2">
            <img src="https://i0.wp.com/www.mrbeansholiday.com/wp-content/uploads/2019/01/Wallpaper1-04.jpg?resize=800%2C640&ssl=1"className="w-100 d-block rounded-circle" alt="" style={{ height: "270px" }} />
            </div>
            <div className="col-2">
            <img src="https://laughingsquid.com/wp-content/uploads/2015/12/the-competition-a-new-animated-s.jpg"className="w-100 d-block rounded-circle" alt="" style={{ height: "270px"}} />
            </div>
            <div className="col-2">
            <img src="https://nefariousreviews.wordpress.com/wp-content/uploads/2015/11/princess-mononoke-featured.jpg" className="w-100 d-block rounded-circle" alt="" style={{ height: "270px" }} />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  )
}
export default MovieTrailer
