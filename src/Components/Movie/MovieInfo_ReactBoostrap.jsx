import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

function MovieInfo_ReactBoostrap({movieData}){
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState();

    const fontStyle={
        fontSize:"10.5px",
        // border:"1px solid red",
        // display:"flex",
        // flexDirection:"flex-column"
        display:"flex",
        flexDirection:"column",
        marginTop:"20%",
    }

    const iconStyle={
      fontSize:"21px",
      display:"flex",
      flexDirection:"column",
      marginLeft:"11%",
      alignItems:"center"
    }
    // useNavigate()
    const navigate = useNavigate()

    const getTrailerData= async()=>{
      console.log("Trailer data is called....")
        let res = await fetch(`https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie/${id}`)
        let data = await res.json()
        console.log(data)
        setMovieInfo(data)
    }
    useEffect(()=>{
      getTrailerData()
    },[]) //API Call

      return(
        <>
        {
          movieInfo && 
<div>
<Container>
  <iframe src={movieInfo?.trailer} frameborder="0" className='opacity-75 mt-4' style={{width:"100%",height:"450px"}}></iframe>
</Container>
{/* Middle Section */}
<Container className='d-flex'  style={{ height:"450px"}}>
     {/* Left Section */}
      <div>
        <Col>
          <Image className='align-self-center my-3' src={movieInfo?.movieposter} roundedCircle style={{width:"420px",height:"370px"}}/>
        {/* GREY SECTION */}
        <div className='d-flex justify-content-center gap-3'>
        {/* List */}
        <button type="button" className="px-3 btn btn-secondary d-flex"> <i className="fa-solid fa-bookmark fs-5 px-1"></i>List</button>
        {/* Seen all */}
        <button type="button" className=" px-3 btn btn-secondary d-flex text-nowrap"> <i className="fa-solid fa-check px-1 fs-5"></i>Seen all</button>
        {/*Like*/}
        <button type="button" className=" px-3 btn btn-secondary d-flex"> <i className="fa-solid fa-thumbs-up px-1 fs-5"></i>{movieInfo.likeNum}</button>
     {/* disLike */}
          <button type="button" className="px-3 btn btn-secondary d-flex"> <i className="fa-solid fa-thumbs-down px-1 fs-5"></i>{movieInfo.disLikeNum}</button>

          </div>
        </Col>
      </div>
    {/* MIDDLE  SECTION */}
    {/* Middle-TOP */}
      <Row className='d-flex mx-5' style= {{ width:"55%"}}>
      <div className='d-flex pt-3  align-items-start' style={{height:"20%"}}>
      <Col className="fs-2 fw-bold">{movieInfo.moviename}</Col>
      <Col className="fs-2 text-secondary">{movieInfo.publishYear}</Col>
      </div>
      <div>
      <Col className="text-start" style={{height:"80%"}} >{movieInfo.summary}</Col>
      <Button  variant="warning" style={{width:"20%"}} onClick={()=>{
          navigate(`/`)
        }}>Back</Button>{' '}
      </div>
      </Row>
      <Row className='d-flex flex-column gap-3 text-start' style={{width:"45%"}}>
      <div className='d-flex pt-3' style={{height:"15%"}}></div>
      <div className='xs-12'>Cast : {movieInfo.cast}</div>
      <div className='xs-12'>Genres : {movieInfo.genres}</div>
      <div className='xs-12'>This show is : {movieInfo.category}</div>
      </Row>
   
    
        {/* <Col className='fs-4 text-warning'>Watch Now</Col> */}

      
         </Container>
</div>
// </div>
// {/* </div> */}
}
        {/* Carousel */}
      <Carousel className='my-5'>
      <Carousel.Item  style={{border:"1px solid black", width:"98%"}}>
        <div className='d-flex gap-4 mx-3'>
      <img src="https://www.barbie-themovie.com/images/share.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnFNUcX9OnSQzcOMWPpm7OAjvTfQcxDDcGg&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://www.famousbirthdays.com/group_images/medium/suicide-squad-movie.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://www.seramarkoff.com/wp-content/uploads/2023/08/oppenheimer-full-movie-in-hd-leaked-online-christopher-nolans-biographical-thriller-faces-wrath-of-piracy-is-available-to-download-illegally-1-582x306.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://scera.org/wp-content/uploads/2019/05/Aladdin-2019-Wallpaper-HD.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      </div>
      <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item  style={{border:"1px solid black", width:"98%"}}>
        <div className='d-flex gap-4 mx-3'>
      <img src="https://nefariousreviews.wordpress.com/wp-content/uploads/2015/11/princess-mononoke-featured.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://laughingsquid.com/wp-content/uploads/2015/12/the-competition-a-new-animated-s.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://i0.wp.com/www.mrbeansholiday.com/wp-content/uploads/2019/01/Wallpaper1-04.jpg?resize=800%2C640&ssl=1" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRab_D2ID4CQoy1fwE1o5PgBoQoOSL5I_fnsw&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://images.hungama.com/c/1/dea/071/48749022/48749022_1280x800.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      </div>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item  style={{border:"1px solid black", width:"98%"}}>
        <div className='d-flex gap-4 mx-3'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvhXCWtIym-giLoInrcr3MqenfCn4Qted5Q&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://images8.alphacoders.com/133/1337616.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuF88DC7D1R9Za0ODmeWwdWJjIPsPJaBf_iw&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ockLWWjSTFjIxj3qTdsdumqWjIsjcAhMCw&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6YP2uoyWEL-rCCGzT0HuRpZZ3IOcrRrjoGw&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      </div>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item  style={{border:"1px solid black", width:"98%"}}>
        <div className='d-flex gap-4 mx-3'>
      <img src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/titanic-et00008457-1676022504.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReC1mrkfbZ1JOkr0LmyYEimI26SOONo6xldA&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://i0.wp.com/the-art-of-autism.com/wp-content/uploads/2021/06/The-Theory-of-Everything.jpg?fit=638%2C479&ssl=1" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://m.media-amazon.com/images/S/pv-target-images/c16f37633b6d90c2d86731e1a7334c915656c3fa4a62175fe1fa25b9c82007ff._UR1920,1080_SX720_FMjpg_.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://m.media-amazon.com/images/S/pv-target-images/edd2932f6f5d7749138a3b2a8fb0dad862d03ca3c4049359f3f5e5b30a0650e4.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      </div>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item  style={{border:"1px solid black", width:"98%"}}>
        <div className='d-flex gap-4 mx-3'>
      <img src="https://img5.tokyvideo.com/videos/610/61097/previews/previews_0005_custom_1617956273.1385.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://images.moviesanywhere.com/e45bfc010f1e0626b1ee9efbe2726e55/7e42ca11-be74-41b9-986c-3e5a8a431fe3.jpg" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7-sOcvL5Xl3ca4qSG9jP3y8hyQ5kgWdczg&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmMFX3-so34pgn1r-UXTGdkeOXSdiNLyX8ZQ&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnETUFhpSMFsDjAwJ1xqBCHTjAIDULe84u5g&s" className="ms-2 d-block rounded-circle"  alt="" style={{height:"270px", width:"18%"}} />
      </div>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  </>
    )
}
export default MovieInfo_ReactBoostrap

//replace the images in carousel,
//footer center
//when you mouseover, the movie will be bigger Exactly like Netflix Info icon

