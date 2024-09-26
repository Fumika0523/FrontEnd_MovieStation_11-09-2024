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
import LikeCard from '../LikeCard';
import { useNavigate } from "react-router-dom";
import {url} from '../../utils/constant'


export default function MovieCard({movieposter,moviename,rating,summary,cast,_id,setMovieData,element}) {
  const [expanded, setExpanded] = React.useState(false);
  //useNavigate()
  const navigate=useNavigate()

  const getMovieData = async()=>{
      console.log("Movie data is called......")
      let res = await fetch(`${url}/movie`)
      let data = await res.json()
      console.log(data)
      setMovieData(data)//movies
  }

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

  const token = sessionStorage.getItem('token')
  console.log(token)
  
  let config = {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }

  const deleteMovies=async(deletedMovie)=>{
    console.log("Movie Posted to the DB..")
   console.log("NEW MOVIE:",deletedMovie)
 

  let res = await axios.delete(`${url}/allmovies`,deletedMovie,config)
console.log(res)
getMovieData();
}

  const deleteMovie=async()=>{
    console.log(id)
    let res=await fetch(`${url}/movie`,config,{
      method:"DELETE"
  })
  let data = await res.json()
  console.log(data)//output

  if(data){//if data exists
      console.log("deleted successfully")
      //update UI
      getMovieData()
  }

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
            navigate(`/movie/in/${id}`)
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
    
    <LikeCard/>

    {/* Edit Icon */}
    <button className="btn px-1" onClick={()=>navigate(`/editmovie/${_id}`)}><i className="fa-solid fa-pencil text-white"></i></button>

    {/* Delete Icon */}
    <button className="btn px-2" onClick={(values)=>deleteMovie(values)}><i className="fa-solid fa-trash text-white"></i></button>
    
    {/* ADD to CART */}
    <button className="btn px-1" onClick={()=>{setCartUtxt(cartUCtxt+1)}}><i class="fa-solid fa-cart-shopping text-white"></i></button>
    
    {/* REDUX */}
    <button className="btn px-w text-white" onClick={()=>{handleAdditem(element)}}>Redux</button>

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