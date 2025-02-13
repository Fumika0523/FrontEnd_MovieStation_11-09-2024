import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
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

// SPECIFIC
const getSpecificMovieData = async () =>{
  console.log("Specific Movie Data is called....")
  let res = await axios.get(`${url}/specificmovie`,config)
  console.log(res.data.movieData)
  setSpecificMovieData(res.data.movieData)
}
useEffect(() => {
 getSpecificMovieData()
}, [])
console.log("Specific Movie Data",specificMovieData)

const searchUserAddedMovie = specificMovieData.map((element)=>element._id)
const findUserAddedMovie = movieData.filter((element)=>searchUserAddedMovie.includes(element._id))
console.log(searchUserAddedMovie)
console.log(findUserAddedMovie) //find a value
// find , sum

   return (
    <Card sx={{ maxWidth:440, mb:4 }}  >
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
    component="img" height="185" image={movieposter} alt="movieposter"/>
     
    <CardActions className='d-flex justify-content-between'>
    
    <LikeCard  likeNum={likeNum} disLikeNum={disLikeNum} mode={mode}/>
    
    {/* You need to click a movie to know if singleMovie is "null" so we should take another option,
    find who added this movie using  a populate  and both Token & ?? are matched, the edit & Delete buttons should show

// in MovieData, there is a specificmoviedata or not << array of object, find a data
// const findSpecificMovieData = setMovieData.find(specificMovieData._id)
// console.log(findSpecificMovieData)
//if you get the value ==> show edit & delete buttton.
// if not ==> dont show the buttons.*/}``

    {token && findUserAddedMovie ? (
      <>
    {/* Edit Icon */}
    <Button 
    className='fs-6'
    style={{color:mode=="light" ? greyColor:blueGreyColor}}
    onClick={()=>navigate(`/editmovie/${_id}`)}>
    <i className="fa-solid fa-pencil" ></i></Button>

    {/* Delete Icon */}
    {deleteBtn}
      </>)
      :
      (<>
      {/* <h1>Dont display</h1> */}
      </>
    )}

    {/* Edit Icon */}
    {/* <Button 
    className='fs-6'
    style={{color:mode=="light" ? greyColor:blueGreyColor}}
    onClick={()=>navigate(`/editmovie/${_id}`)}>
    <i className="fa-solid fa-pencil" ></i></Button> */}

    {/* Delete Icon */}
    {/* {deleteBtn}
     */}

    {/* REDUX */}
    {reduxAddcartBtn}

    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
    <ExpandMoreIcon />
    </ExpandMore>
    </CardActions>
    
    <Collapse in={!expanded}>
    <CardContent>

    <Typography setCastShow={setCastShow} paragraph>{cast}</Typography>  
    
    </CardContent>
    </Collapse>

    <Collapse in={expanded}>
    <CardContent>

    <Typography setSummaryShow={setSummaryShow} paragraph>{summary}</Typography>
    
    </CardContent>
    </Collapse>
    </Card>
  )}