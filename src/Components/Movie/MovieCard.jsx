import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LikeCard from '../Movie/LikeCard';
import { useNavigate } from "react-router-dom";
import {url} from '../../utils/constant'
import axios from 'axios';
import {red} from '@mui/material/colors';
import { useState } from 'react';
import { createTheme} from '@mui/material/styles';
import { useEffect } from 'react';
import ModeIcon from '@mui/icons-material/Mode';

export default function MovieCard({mode, movieposter,moviename,rating,summary,cast,_id,element,disLikeNum,likeNum,deleteBtn,reduxAddcartBtn, movieData}) {
const [specificMovieData,setSpecificMovieData] = useState([])
// console.log(mode)

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

const [expanded, setExpanded] = React.useState(false);
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

const [summaryShow,setSummaryShow] = useState(false)
const [castShow,setCastShow] = useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setSummaryShow(!summaryShow)
    setCastShow(castShow)
  };

  const token=sessionStorage.getItem('token')
    let config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }   

const userId=sessionStorage.getItem('userId')

//id
// 16 movies >> userID
//loginUser Id === movie owner(userId)  >> Edit || Delete
//Comparison operator
//movieData is all movie datas that were added in the website
const isMovieOwner = userId === element?.owner; // true || false
// console.log("element",element)
// console.log("userId",userId,"element?.owner",element?.owner)
// console.log("isMovieOwner",isMovieOwner)

// SPECIFIC
const getSpecificMovieData = async () =>{
  let res = await axios.get(`${url}/specificmovie`,config)
  setSpecificMovieData(res.data.movieData)
}
useEffect(() => {
 getSpecificMovieData()
}, [])

  return (
    <>
      <Grid lg={4} md={6} sm={6} xs={12} item marginBottom={2} >
      <Card style={{maxWidth:"96%",display:"flex",justifyContent:"center",flexDirection:"column",margin:"auto",alignContent:"center" }}>
      <CardHeader avatar={
        <Avatar sx={{ bgcolor: red[600] }} aria-label="movietitle">
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

        title={moviename}
        subheader={rating}
      />

    <CardMedia component="img"
   height="200" width="100%" image={movieposter} style={{objectFit:"cover",filter: "brightness(75%)"}} alt="movieposter"/>
     
    <CardActions disableSpacing style={{paddingTop:"205px"}} className=' d-flex position-absolute align-items-center'>
   
   <LikeCard  likeNum={likeNum} disLikeNum={disLikeNum} mode={mode}/>
   
   {/* movieData is 1 data that includes all movieData,
   element is single movie data showing each data (map method) */}
   {/* isMovieOwner : compare if it's matched both element(each movie data' movieOwner id) and userId(logged in userId) >> true or false  */}
   {/* IF token and isMovieOwner are noth "true" >> show the edit & delete buttton, otherwise hide these buttons */}
   {token && isMovieOwner ? (
   <>
   {/* Edit Icon */}
   <IconButton onClick={()=>navigate(`/editmovie/${_id}`)}>
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
   {reduxAddcartBtn}
   </CardActions>

   {/* <Collapse in={!expanded}>
    <CardContent className=' border-danger py-0'>
    <Typography  sx={{ color: 'text.secondary' }} setCastShow={setCastShow} paragraph>{cast.substring(0,65)+"..."}</Typography>  
    </CardContent>
    </Collapse>*/}

    {/* <Collapse in={expanded}>
    <CardContent className='py-0'> 
    <Typography setSummaryShow={setSummaryShow} paragraph>{summary.substring(0,170)+"..."}</Typography>
    </CardContent>
    </Collapse>  */}

  {/* Hover */}
  <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
   <ExpandMoreIcon />
   </ExpandMore>


    </Card>
      </Grid>
    </>
  )}