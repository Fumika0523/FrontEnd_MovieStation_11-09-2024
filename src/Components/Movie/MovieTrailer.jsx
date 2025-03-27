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
  const darkBg = grey[900]
  const lightBg = yellow[50]
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
    console.log(res.data[0])
    console.log(res)
    setMovieInfo(res.data[0])
  }
  useEffect(() => {
    getTrailerData()
  }, []) //API Call

  return (
    <>
    {/* <Container fluid> */}
      {/* <NavBar/> */}
      {
        movieInfo &&
        
        <div
          className='mx-auto'
          >
            {/* Top */}
            <Row className='mx-auto mx-md-5 ' >
            <Col className="col-lg-8  border-4  col-md-6 col-sm-6 col-12  my-2 d-flex flex-row align-items-center justify-content-start">
            <div className='ps-1 border-4  fs-1'>{movieInfo.moviename}</div>
            <div className='ms-3 border-4  fs-4' style={{color:"#b9bdcc"}}>({movieInfo.publishYear})</div></Col>
            <Col className="border-4  col-lg-3 col-md-4 col-sm-4 col-9 d-flex align-items-start flex-column justify-content-center">
            <div  className='border-4  fw-bold text-secondary ' style={{fontSize:"14px"}}>RATING</div>
            <div className="border-4  d-flex flex-row justify-content-center align-items-center">
              <FaStar className='text-warning fs-4'/>
              <span className="fw-bold mx-1" style={{fontSize:"20px"}}>{movieInfo.rating}</span>
              <span className='text-secondary'> /10</span> 
            </div>
            </Col>
            <Col className='border-4  col-lg-1 col-md-2 col-sm-2 col-3 d-flex align-items-start flex-column justify-content-center '>
            <Button variant="outline-none" style={{color:"white", backgroundColor:"rgb(62, 63, 63)"}} className='w-100'
            onClick={() => navigate('/allmovies')} >
              Back
            </Button>
            </Col>
            </Row>

            <Row className='mx-auto mx-md-5 mb-4 -3' >
            <Col className='col-12'>
              <iframe src={movieInfo?.trailer} frameborder="0" className='opacity-75 w-100' style={{height: "450px" }}></iframe>
            </Col>
            </Row>
            
            {/* Middle */}
            <Row className='mb-4  mx-auto mx-md-5 '>
              {/* LEFT */}
              <Col className='col-lg-4 col-12 mx-auto  d-flex justify-content-center align-items-center mb-md-1  mb-2'>
                {/* Image */}
                <Image className='w-100' style={{height:"100%"}} src={movieInfo?.movieposter} />
              </Col>

              {/* RIGHT */}
              <Col           
              className='col-lg-6 d-flex flex-column ps-3 pt-2 justify-content-center  col-sm-10  col-12 mx-auto mb-md-1  align-items-center mb-2'
              style={{ backgroundColor: mode === "light" ? "rgb(248, 248, 245)": "rgb(8, 11, 13)" }}>
                <div className='mb-3 '>{movieInfo.summary}</div>
                <div className='mb-2 d-flex w-100 flex-column '> <span className='mb-1 fontColorTrailerFont'>CAST</span>{movieInfo.cast}</div>
                <div className='mb-2 d-flex w-100 flex-column '><span className='mb-1 fontColorTrailerFont'>GENRES</span>{movieInfo.genres}</div>
              <div className='mb-2 d-flex w-100 text-wrap flex-column'><span className='mb-1 fontColorTrailerFont '>CATEGORY</span><span className='text-wrap'>{movieInfo.category}</span></div>
              </Col>

              {/* BUTTONS */}
              <Col className='col-lg-2 col-md-10 col-12 col-sm-10 mx-auto mt-1'>
              <Row className='align-items-center mx-auto d-flex justify-content-evenly '>
              {/* List */}
              <Col className="col-md-6 col-6 col-sm-6 col-lg-12">
                <Button variant="outline-none" className="py-3 d-flex w-100 trailerBtn mb-3"
                  style={{ backgroundColor: mode === "light" ? "white" :"rgb(34, 44, 56)",
                    color:mode === "light" ? "rgb(79, 83, 91)":"rgb(197, 199, 203)",
                    borderColor:mode === "light" ? "rgb(179, 181, 183)":"rgb(34, 44, 56)"}}
                  > <i className="fa-solid fa-bookmark fs-5 me-2"></i> <div>List</div></Button>
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
{/* 
        <Carousel.Item >
          <div className='d-flex gap-4 mx-3'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvhXCWtIym-giLoInrcr3MqenfCn4Qted5Q&s" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://images8.alphacoders.com/133/1337616.jpg" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuF88DC7D1R9Za0ODmeWwdWJjIPsPJaBf_iw&s" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ockLWWjSTFjIxj3qTdsdumqWjIsjcAhMCw&s" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6YP2uoyWEL-rCCGzT0HuRpZZ3IOcrRrjoGw&s" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
          </div>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item> */}

        {/* <Carousel.Item >
          <div className='d-flex gap-4 mx-3'>
            <img src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/titanic-et00008457-1676022504.jpg" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReC1mrkfbZ1JOkr0LmyYEimI26SOONo6xldA&s" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://i0.wp.com/the-art-of-autism.com/wp-content/uploads/2021/06/The-Theory-of-Everything.jpg?fit=638%2C479&ssl=1" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://m.media-amazon.com/images/S/pv-target-images/c16f37633b6d90c2d86731e1a7334c915656c3fa4a62175fe1fa25b9c82007ff._UR1920,1080_SX720_FMjpg_.jpg" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://m.media-amazon.com/images/S/pv-target-images/edd2932f6f5d7749138a3b2a8fb0dad862d03ca3c4049359f3f5e5b30a0650e4.jpg" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
          </div>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item> */}

        {/* <Carousel.Item >
          <div className='d-flex gap-4 mx-3'>
            <img src="https://img5.tokyvideo.com/videos/610/61097/previews/previews_0005_custom_1617956273.1385.jpg" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://images.moviesanywhere.com/e45bfc010f1e0626b1ee9efbe2726e55/7e42ca11-be74-41b9-986c-3e5a8a431fe3.jpg" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7-sOcvL5Xl3ca4qSG9jP3y8hyQ5kgWdczg&s" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmMFX3-so34pgn1r-UXTGdkeOXSdiNLyX8ZQ&s" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnETUFhpSMFsDjAwJ1xqBCHTjAIDULe84u5g&s" className="ms-2 d-block rounded-circle" alt="" style={{ height: "270px", width: "18%" }} />
          </div>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
      {/* </Container> */}
    </>
  )
}
export default MovieTrailer
