import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid } from "@mui/material";
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
import { useDispatch } from 'react-redux';
import { grey,amber,red,pink,blueGrey} from '@mui/material/colors';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MovieCard({mode,setMode, movieposter,moviename,rating,summary,cast,_id,setMovieData,element,disLikeNum,likeNum,deleteBtn,reduxAddcartBtn, movieData}) {
const [specificMovieData,setSpecificMovieData] = useState([])
console.log(mode)

// Store:
const dispatch=useDispatch()
const greyColor = grey[900]; // #212121
const amberColor = amber[500];
const blueGreyColor = blueGrey[100]

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

const [expanded, setExpanded] = React.useState(false);
//useNavigate()
const navigate=useNavigate()
//console.log(disLikeNum,likeNum)

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
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
  console.log(token)
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
console.log("element",element)
console.log("userId",userId,element?.owner)
console.log("isMovieOwner",isMovieOwner)

// SPECIFIC
const getSpecificMovieData = async () =>{
  console.log("Specific Movie Data is called....")
  let res = await axios.get(`${url}/specificmovie`)
  console.log(res.data.movieData)
  setSpecificMovieData(res.data.movieData)
}
useEffect(() => {
 getSpecificMovieData()
}, [])
console.log("Specific Movie Data",specificMovieData)

// const searchUserAddedMovie = specificMovieData.map((element)=>element._id)
// const findUserAddedMovie = movieData.filter((element)=>searchUserAddedMovie.includes(element._id))

// console.log(searchUserAddedMovie)
// console.log(findUserAddedMovie) //find a value
// find , some, filter,includes,map,every
   return (
<>
   {/* <Grid  container border={2} sx={{display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}> */}
    <Grid  lg={4} md={6} sm={6} xs={12} xl={3} item marginBottom={2}>
    <Card 
    style={{maxWidth:"96%",minHeight:"460px",display:"flex",justifyContent:"center",flexDirection:"column",margin:"auto"}}
    //md={{width:"590px"}}
   >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[600] }} aria-label="movietitle">
            {moviename.substring(0,1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={()=>{
            navigate(`/movietrailer/${_id}`)
        }}>
        <MoreVertIcon />
        </IconButton>
        }
        title={moviename}
        subheader={rating}
      />
    <CardMedia 
    component="img" height="200" width="100%" image={movieposter} style={{objectFit:"cover"}} alt="movieposter"/>
     
    <CardActions disableSpacing className=' border-danger d-flex align-items-center'>
   
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

    {/* <Button 
    style={{
      // backgroundColor:mode=="light" ? "transparent":"#3b3b3b",
      color:mode=="light" ? "rgb(66, 66, 66)":"white"}}
    onClick={()=>navigate(`/editmovie/${_id}`)}>
    <i className="fa-solid fs-5 p-0 m-0 fa-pencil" ></i></Button> */}

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

    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
    <ExpandMoreIcon className=''/>
    </ExpandMore>
    </CardActions>
        <Collapse in={!expanded}>
    <CardContent>
    <Typography  sx={{ color: 'text.secondary' }} setCastShow={setCastShow} paragraph>{cast}</Typography>  
    </CardContent>
    </Collapse>

    <Collapse in={expanded}>
    <CardContent>
    <Typography setSummaryShow={setSummaryShow} paragraph>{summary}</Typography>
    </CardContent>
    </Collapse>
    </Card>
    </Grid>
    {/* </Grid> */}
    </>
  )}