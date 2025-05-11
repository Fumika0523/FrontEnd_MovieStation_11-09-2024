import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CardCover from '@mui/joy/CardCover';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from "@mui/material/Box";
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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
import { FaHeart  } from "react-icons/fa";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { IoEyeSharp } from "react-icons/io5";
import MoreVertIcon from '@mui/icons-material/MoreVert';


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

//loginUser Id === movie owner(userId)  >> Edit || Delete
//Comparison operator
//movieData is all movie datas that were added in the website
const isMovieOwner = userId === element?.owner; // true || false
console.log("isMovieOwner",isMovieOwner)
console.log("userId",userId)
console.log("token",token)
console.log("element?.owner",element?.owner)//66fbe656eaefd381ff4840e4 >> Spirit Away
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
// console.log("starNum.toFixed(1)",starNum.toFixed(1)) 
// console.log("starNUm.ceil()",Math.ceil(starNum))
// console.log("starNum.floor()",Math.floor(starNum))
// console.log("starNum.round()",Math.round(starNum))
// console.log(Math.ceil(4.1)) //5
// console.log(Math.floor(4.1)) //4
// console.log(Math.round(4.1)) //4
const rating1 = {rating}

   return (
  <>
    <Grid lg={4} md={6} sm={6} xs={12} xl={3} item marginBottom={2} >
      <Card     
       className="movieCard" 
      style={{maxWidth:"96%",display:"flex",justifyContent:"center",flexDirection:"column",margin:"auto",padding:"0 0 8px 0"}}>
         <CardHeader className="py-2 fw-bold"

      avatar={
          <Avatar sx={{ color:"white",backgroundColor:"rgba(246, 90, 23, 0.64)"}} aria-label="movietitle">
            {moviename.substring(0,1)}
          </Avatar>
          }


          action={
            
            token && isMovieOwner ?
          <>
       <span className=' d-flex flex-row align-items-center justify-content-center gap-1' style={{ position:"absolute",right:"3px",top:"28px"}}>

          {/* EDIT */}
          <Tooltip title="Edit">
          <ModeIcon onClick={()=>navigate(`/editmovie/${_id}`)} className='editBtn fs-5'/>
          </Tooltip>

          {/* Delete Icon */}
           {deleteBtn}

          {/* Add to Wish List */}
          <Tooltip title="Add to Wish List">
            <FaHeart 
              onClick={()=>{navigate(`/movietrailer/${_id}`)}}
              className='addmyListIcon fs-6' />
            </Tooltip>

            {/* See More */}
            <Tooltip title="See More">
            {/* <IconButton className=' p-1'
            aria-label="settings" 
            onClick={()=>{navigate(`/movietrailer/${_id}`)}}> */}
              <MoreVertIcon 
               onClick={()=>{navigate(`/movietrailer/${_id}`)}}className='seeMoreIcon fs-5'/>
            {/* </IconButton> */}
            </Tooltip>
            </span>
          </>         
          :
            null
          
            ||

          token ?
          <IconButton 
            aria-label="settings" 
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
        <Rating size="small" readOnly name="half-rating" defaultValue={starNum.toFixed(1)} precision={0.5}  style={{paddingBottom:"5px",
           color:"rgb(242, 154, 3)"

            }} />
        </>
      }
      />
  
  {/* IMAGE */}
  <CardMedia 
    component="img"  
    className=""
    width="100%" image={movieposter} style={{objectFit:"cover",display:"block",height:"210px"}} alt="movieposter"/>
    <div className='content'></div>

    {/* My CART ICON*/}
    <div className='' style={{right:"5px",top:'63px',position:"absolute"}}>
    {reduxAddcartBtn} 
    </div>

  {/* Bottom Card ICONS */}
<CardActions disableSpacing className='border-primary border-4 w-100 d-flex flex-row  d-block position-absolute ' style={{bottom:"45px",left:"0px"}}>
   
   <LikeCard  likeNum={likeNum} disLikeNum={disLikeNum} mode={mode}/>


      {/* {token && isMovieOwner ? (
   <>
   <div className='position-absolute d-flex flex-row gap-2' style={{right:"0px"}}> */}
   {/* Edit Icon */}
   {/* <IconButton className="editBtn" onClick={()=>navigate(`/editmovie/${_id}`)}>
     <ModeIcon />
   </IconButton> */}

   {/* Delete Icon */}
   {/* {deleteBtn}
   </div>
     </>)
     :
     (<> */}
     {/* <h1>Dont display</h1> */}
     {/* </>
   )} */}
</CardActions> 

    {/* CAST & SUMMARY  */}
    <CardContent className=''>
     <div className='overlay px-3' style={{fontSize:"13px",textAlign:"justify",backgroundColor:mode == "light" ? "white" :"#161718",color:mode == "light"?"black":"#bdbfc2"}}>

    <span className='movieCast d-flex align-items-center' style={{paddingTop:"1px"}} 
    >{cast.substring(0,65)+"..."}</span>

    <p className="movieSummary"
      >{summary.substring(0,205)+"..."}</p>
    </div>
    </CardContent>
    </Card>
    </Grid>
    </>
  )}