import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, ButtonBase, Grid } from "@mui/material";
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
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';


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

   return (
  <>
    <Grid lg={4} md={6} sm={6} xs={12} xl={3} item marginBottom={2} >
      <Card  className="movieCard" style={{maxWidth:"96%",display:"flex",justifyContent:"center",flexDirection:"column",margin:"auto",padding:"0 0 10px 0"}}>
      <CardHeader className="py-2 fw-bold" avatar={
          <Avatar sx={{ bgcolor: red[900],color:"lightgray" }} aria-label="movietitle">
            {moviename.substring(0,1)}
            {/* {rating} */}
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

      title={moviename}
      subheader={rating}
      />
    <CardMedia 
    component="img"  
    className=""
    width="100%" image={movieposter} style={{objectFit:"cover",display:"block",filter: "brightness(50%)",height:"210px"}} alt="movieposter"/>

    <div style={{right:"0px",top:'55px',position:"absolute"}}>
    {reduxAddcartBtn} 
    </div>
    {/* <Fab size="small"  className='moiveEditIcon'  style={{right:"0px",top:'55px',position:"absolute"}}
    onClick={()=>{handleAdditem(element)}}>
    <ShoppingCartIcon/>
    </Fab> */}

    {/* <Tooltip title="Add to Cart">
      <IconButton  onClick={()=>{handleAdditem(element)}} style={{right:"0px",top:'55px',position:"absolute"}} >
        <ShoppingCartIcon />
      </IconButton>
    </Tooltip> */}


     {/* ICONS */}
    <CardActions disableSpacing className='  p-0 d-block position-absolute' style={{bottom:"50px"}}>
   
    <LikeCard className="p-0" likeNum={likeNum} disLikeNum={disLikeNum} mode={mode}/>
    
        {token && isMovieOwner ? (
    <>
    {/* Edit Icon */}
    <IconButton className="p-0" onClick={()=>navigate(`/editmovie/${_id}`)}>
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

    {/* REDUX */}
    {/* {reduxAddcartBtn} */}

    {/* EXPAND */}
    {/* <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
    <ExpandMoreIcon className=''/>
    </ExpandMore> */}
    </CardActions>
    
    {/* <CardContent className='overlay border border-danger '>
    <Typography > */}
    <CardContent >
     <div className='overlay text-start' style={{fontSize:"14px"}}>

    <span className='movieCast px-2' >{cast.substring(0,65)+"..."}</span>

    <p className="movieSummary px-2 pt-1" >{summary.substring(0,170)+"..."}</p>
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