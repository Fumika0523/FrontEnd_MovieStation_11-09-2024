import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LikeCard from '../Movie/LikeCard';
import { useNavigate } from "react-router-dom";
import {url} from '../../utils/constant'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from '../../utils/cartSlice';

export default function MovieCard({movieposter,moviename,rating,summary,cast,_id,setMovieData,element,disLikeNum,likeNum}) {
// Store:
const dispatch=useDispatch()

  const [expanded, setExpanded] = React.useState(false);
  //useNavigate()
  const navigate=useNavigate()
console.log(disLikeNum,likeNum)

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// const [summaryShow,setSummaryShow] = useState(false)
// const [castShow,setCastShow] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setSummaryShow(!summaryShow)
    setCastShow(false)
  };

  const token=sessionStorage.getItem('token')
    let config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    
  const handleAdditem=async(movieItem)=>{
    console.log(movieItem)
    // >> api call for updating the backend >> saving to the DB
    let res=await axios.post(`${url}/addcart`, movieItem,config)
    console.log(res)
    if(res.data){
      // Add the data to the store and from the store we can use it everywhere
      dispatch(addItem(res.data.orderData))
     }
  }

  const deleteMovie=async()=>{
    console.log("Movie Deleted from the DB..")
    let res = await axios.delete(`${url}/deletemovie/${_id}`,config)
   console.log(res)   
  }

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
    component="img" height="185" image={movieposter}alt="movieposter"/>
     
    <CardActions>
    {/* <IconButton aria-label="add to favorites"> */}
    {/* <FavoriteIcon /> */}
    
    <LikeCard likeNum={likeNum} disLikeNum={disLikeNum}/>

    {/* Edit Icon */}
    <button className="btn px-1" onClick={()=>navigate(`/editmovie/${_id}`)}><i className="fa-solid fa-pencil text-white"></i></button>

    {/* Delete Icon */}
    <button className="btn px-2" onClick={(values)=>deleteMovie()}><i className="fa-solid fa-trash text-white"></i></button>
    
    {/* REDUX */}
    <button className="btn px-w text-white" onClick={()=>{handleAdditem(element)}}><i className="fa-solid fa-cart-shopping text-white"></i></button>

    {/* </IconButton> */}
    {/* <IconButton aria-label="share"> */}
    {/* <ShareIcon /> */}
    {/* </IconButton> */}

    <ExpandMore
    expand={expanded} onClick={handleExpandClick}aria-expanded={expanded} aria-label="show more">
    <ExpandMoreIcon />
    </ExpandMore>
    </CardActions>
    <Collapse in={expanded}>
    <CardContent>
    <Typography paragraph>{summary}</Typography>      
    </CardContent>
    </Collapse>
    </Card>
  )}
