import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LikeCard from '../Movie/LikeCard';
import { useNavigate } from "react-router-dom";
import {url} from '../../utils/constant'
import axios from 'axios';
import { amber,red } from '@mui/material/colors';
import { useState } from 'react';
import { createTheme} from '@mui/material/styles';
import { useEffect } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import { ToastContainer, toast } from 'react-toastify';
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function MovieCard({mode, movieposter,moviename,rating,summary,cast,_id,element,disLikeNum,likeNum,deleteBtn,reduxAddcartBtn, movieData}) {
const [specificMovieData,setSpecificMovieData] = useState([])
// console.log(mode)

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  });

const navigate=useNavigate()

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(00deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

  const token=sessionStorage.getItem('token')
    let config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }   

//three dot shouldnt show
const userId=sessionStorage.getItem('userId')

//id
// 16 movies >> userID
//loginUser Id === movie owner(userId)  >> Edit || Delete
//Comparison operator
//movieData is all movie datas that were added in the website
const isMovieOwner = userId === element?.owner; // true || false

// SPECIFIC
const getSpecificMovieData = async () =>{
  // console.log("Specific Movie Data is called....")
  let res = await axios.get(`${url}/specificmovie`,config)
  // console.log(res.data.movieData)
  setSpecificMovieData(res.data.movieData)
}
useEffect(() => {
 getSpecificMovieData()
}, [])
// console.log("Specific Movie Data",specificMovieData)
// console.log(searchUserAddedMovie)
// console.log(findUserAddedMovie) //find a value
// find , some, filter,includes,map,every

const ratNum = {rating } 
const starNum = ratNum.rating / 2
// console.log("ratNum",ratNum.rating)
console.log("starNum.toFixed(1)",starNum.toFixed(1)) 
// console.log("starNUm.ceil()",Math.ceil(starNum))
// console.log("starNum.floor()",Math.floor(starNum))
// console.log("starNum.round()",Math.round(starNum))
// console.log(Math.ceil(4.1)) //5
// console.log(Math.floor(4.1)) //4
// console.log(Math.round(4.1)) //4
const rating1 = {rating}
console.log(rating1)
console.log(rating1.rating, "/10")

   return (
  <>
    <Grid lg={4} md={6} sm={6} xs={12} xl={3} item marginBottom={2} >
      <Card  className="movieCard" style={{maxWidth:"96%",display:"flex",justifyContent:"center",flexDirection:"column",margin:"auto",padding:"0 0 10px 0"}}>
      <CardHeader className="py-2 fw-bold" 
      avatar={
          <Avatar sx={{ bgcolor: red[900],color:"lightgray" }} aria-label="movietitle">
            {moviename.substring(0,1)}
          </Avatar>
          }
           action={
            token ?
            <IconButton aria-label="settings" 
            onClick={()=>{navigate(`/movietrailer/${_id}`)}}>
              <MoreVertIcon />
            </IconButton>
          :
            null
          }
          titleTypographyProps={{fontSize:"16x",paddingBottom:"0px",marginBottom:"0px" }}
        title={moviename}
        subheaderTypographyProps={{display:"flex",flexDirection:"row",justifyContent:"start",alignItems:"center",gap:"5px",fontSize:"13px"}}
       subheader={
        <>
        {rating} /10
        <Rating size="small" name="half-rating" defaultValue={starNum.toFixed(1)} precision={0.5}  style={{paddingTop:"5px"}} />
        </>
    
      }
      />
      {/* <div className='position-absolute d-flex flex-row justify-content-start align-items-start' style={{top:"35px",left:"70px"}}>
      <div style={{fontSize:"14px"}}>{rating}/10</div>
      <div>   <Rating size="small" name="half-rating" defaultValue={starNum.toFixed(1)} precision={0.5} /></div>
      </div> */}
    <CardMedia 
    component="img"  
    className=""
    width="100%" image={movieposter} style={{objectFit:"cover",display:"block",filter: "brightness(55%)",height:"210px"}} alt="movieposter"/>
    {/* CART ICON */}
    <div style={{right:"0px",top:'63px',position:"absolute"}}>
    {reduxAddcartBtn} 
    </div>

     {/* Bottom Card ICONS */}
    <CardActions disableSpacing className='d-flex flex-row  d-block position-absolute' style={{bottom:"45px",left:"5px"}}>
   
    <LikeCard  likeNum={likeNum} disLikeNum={disLikeNum} mode={mode}/>
    
        {token && isMovieOwner ? (
    <>
    {/* Edit Icon */}
    <IconButton className="editBtn" onClick={()=>navigate(`/editmovie/${_id}`)}>
      <ModeIcon />
    </IconButton>

    {/* Delete Icon */}
    {deleteBtn}
      </>)
      :
      (<>
      {/* <h1>Dont display</h1> */}
      </>
    )}

    </CardActions>
    <CardContent >
     <div className='overlay px-3 d-flejustify-content-center align-items-center' style={{fontSize:"14px",textAlign:"justify"}}>

    <span className='movieCast pb-1' >{cast.substring(0,65)+"..."}</span>

    <p className="movieSummary text-white pt-2" >{summary.substring(0,180)+"..."}</p>
    </div>
    </CardContent>
{/*     
    </Typography>  
    </CardContent> */}
  
    {/* <Collapse in={expanded}>
    <CardContent className=' border-danger py-0'>
    <Typography className="movieSummary" setSummaryShow={setSummaryShow} paragraph>{summary.substring(0,170)+"..."}</Typography>
    </CardContent>
    </Collapse> */}
    </Card>
    </Grid>
    </>
  )}