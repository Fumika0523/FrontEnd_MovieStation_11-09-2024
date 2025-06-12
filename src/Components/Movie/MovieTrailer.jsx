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
import { IoChevronBackOutline } from "react-icons/io5";
import MovieActionButtons from './MovieActionButtons';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
useSelector

function MovieTrailer({mode}) {


  const { id } = useParams();
    console.log(id)
  const [movieInfo, setMovieInfo] = useState();
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')
  console.log(token)


  const getTrailerData = async () => {
    console.log("Trailer data is called....")
    let res = await axios.get(`${url}/movie/${id}`)
    // console.log("movieTrailer",res.data)
    console.log("res",res)
    setMovieInfo(res.data)
  }
  useEffect(() => {
    getTrailerData()
  }, []) //API Call

  console.log("movieInfo",movieInfo)
  // watchlater from Trailer should remove
  const wishlist = useSelector(store => store.wishlist.wishItems); 
  console.log("wishlist",wishlist) 
  console.log("length",wishlist[0]?.length) 
  return (
    <>

      {
        movieInfo &&
        
        <div
          className='mx-auto'>
            <div className='d-flex flex-row justify-content-end align-items-center'>
                  <MovieActionButtons
                  mode={mode}
                  navigate={navigate}
                  wishlistCount={wishlist[0]?.length}
                  cartCount={cart[0]?.length} />
            <span >
             <Button variant="" className="text-nowrap text-white  me-5" style={{backgroundColor:"rgb(0, 65, 87)"}} onClick={() => navigate('/allmovies')}> 
                    <IoChevronBackOutline className="fs-4  me-1"/>
                     Back to All Movies</Button>
            </span>
            </div>

            {/* Top */}
            <Row className='mx-auto mx-md-5 mb-3 d-flex align-items-center' >
              {/* Moviename */}
            <Col className="col-lg-6  border-4 gap-3 col-md-6 col-sm-6 col-6  d-flex flex-row align-items-center justify-content-start">
            <div className='border-4  fs-2'>{movieInfo.moviename}</div>
            <div className='border-4  fs-4' >({movieInfo.publishYear})</div>
            <div><Button onClick={handleShow}  variant="warning"> ▶ Watch Trailer</Button></div>
            </Col>
            <Col className="border-4  col-lg-6  col-md-6 col-sm-6 col-6 d-flex align-items-end flex-row justify-content-start">
            <div>
            <div  className='border-4  fw-bold text-secondary ' style={{fontSize:"14px"}}>RATING</div>
            <div className="border-4 d-flex flex-row justify-content-center align-items-center">
              <FaStar className='text-warning fs-4'/>
              <span className="fw-bold mx-1" style={{fontSize:"20px"}}>{movieInfo.rating}</span>
              <span className='text-secondary'> /10</span> 
            </div>
            </div>
            <div>
            </div>
            </Col>
            </Row>

            <Modal show={show}   size="lg" onHide={handleClose} >
            {/* <Modal.Header closeButton style={{ backgroundColor: mode === "light" ? "light" : "#1e1e1e", }}>
            </Modal.Header> */}
            <Modal.Header
            closeButton
            className={mode === 'dark' ? 'dark' : ''}
            style={{
              backgroundColor: mode === 'light' ? 'white' : '#1e1e1e',
            }}
          >
          </Modal.Header>
             <Modal.Body style={{    backgroundColor: mode === "light" ? "light" : "#1e1e1e", }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        title="YouTube video"
        src={movieInfo?.trailer}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
              </div>
          </Modal.Body>
            </Modal>
            
            {/* Middle */}
            <Row className='mb-4  mx-auto mx-md-5 '>
              {/* LEFT */}
              <Col className='col-lg-4 col-12 mx-auto  d-flex justify-content-center align-items-center mb-md-1  mb-2'>
                {/* Image */}
                <Image className='rounded w-100' style={{height:"100%"}} src={movieInfo?.movieposter} />
              </Col>

              {/* RIGHT */}
              <Col           
              className='col-lg-6 d-flex flex-column ps-3 pt-2 justify-content-center  col-sm-10  col-12 mx-auto mb-md-1 rounded align-items-center mb-2'
              style={{ backgroundColor: mode === "light" ? "white": "rgb(8, 11, 13)" }}>
                <div className='mb-3 '>{movieInfo.summary}</div>
                <div className='mb-2 d-flex w-100 flex-column '> <span className='mb-1 fw-bold'>CAST</span>{movieInfo.cast}</div>
                <div className='mb-2 d-flex w-100 flex-column '><span className='mb-1 fw-bold'>GENRES</span>{movieInfo.genres}</div>
              <div className='mb-2 d-flex w-100 text-wrap flex-column'><span className='mb-1 fw-bold '>CATEGORY</span><span className='text-wrap'>{movieInfo.category}</span></div>
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
      </Carousel>
    </>
  )
}
export default MovieTrailer