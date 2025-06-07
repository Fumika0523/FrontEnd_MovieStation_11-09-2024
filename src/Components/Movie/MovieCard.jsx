import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import LikeCard from '../Movie/LikeCard';
import { useNavigate } from "react-router-dom";
import {url} from '../../utils/constant'
import axios from 'axios';
import { useState } from 'react';
import { createTheme} from '@mui/material/styles';
import { useEffect } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import { ToastContainer, toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FaRegHeart } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";

export default function MovieCard({mode, movieposter,moviename,rating,summary,cast,_id,element,disLikeNum,likeNum,deleteBtn,WishBtn,reduxAddcartBtn, movieData}) {
const [specificMovieData,setSpecificMovieData] = useState([])
//  console.log("wishBtn",wishBtn)
//  console.log("deleteBtn",deleteBtn)
//  console.log("reduxAddcartBtn",reduxAddcartBtn)

  const [isCliked, setIsClicked] = useState(false);


  // const divStyle = {
  //   color: !isHovered ? ' rgba(163, 162, 162, 0.648)' : 'white',
  //   cursor: 'pointer'
  // };

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
// console.log("isMovieOwner",isMovieOwner)
// console.log("userId",userId)
// console.log("token",token)
// console.log("element?.owner",element?.owner)//66fbe656eaefd381ff4840e4 >> Spirit Away
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

 const addWishNotify = () => toast.success('Added to Wish List!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
      });

     const handleAddWishitem=async(movieItem)=>{
        // console.log("movieItem,",movieItem)
        // >> api call for updating the backend >> saving to the DB  
        // "=" << Assignment operator
        // "==" << condition comparison operator
        if (token == null){
                navigate(`/signin`) 
        } else {
            let res=await axios.post(`${url}/add-wish-list`, movieItem,config)
            console.log("res",res.data.message)
            if(res.data.message == "Wish Item has been added successfully!"){
                addWishNotify()
            }else{
                console.log("This movie is already added to wish list")
            }
        }}

   return (
  <>
    <Grid lg={4} md={6} sm={6} xs={12} xl={3} item marginBottom={2} >
      <Card className="movieCard" 
      style={{maxWidth:"96%",display:"flex",justifyContent:"center",flexDirection:"column",margin:"auto",padding:"0 0 8px 0"}}>
      <CardHeader className="py-2 fw-bold"

      avatar={
          <Avatar 
          style={{ color: "white", backgroundColor: mode == "light"?" rgb(154, 19, 19)":"rgb(154, 19, 19)"}}      
           aria-label="movietitle">
            {moviename.substring(0,1)}
          </Avatar>
          }

          action={
            token && isMovieOwner ?
          <>
       <span className=' d-flex flex-row align-items-center justify-content-center ' style={{ position:"absolute",right:"3px",top:"28px"}}>

          {/* EDIT */}
          <Tooltip title="Edit">
          <ModeIcon onClick={()=>navigate(`/editmovie/${_id}`)} className='editBtn me-1 fs-4'/>
          </Tooltip>

          {/* Delete Icon */}
          {deleteBtn}

          {/* ADDTOWISH */}
            <>
               <Tooltip title="Add to Wish List">
               {/* <FavoriteIcon
               onClick={()=>{handleAddWishitem(element)}} 
                  //  style={divStyle}
                // onMouseOver={() => setIsHovered(true)}
                // onMouseOut={() => setIsHovered(false)
                className="wishBtn"/> */}
                <FaRegHeart className="text-danger"/>
              </Tooltip>
              <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light" 
                  />
              </>
          
           {/* See More */}
        <Tooltip title="See More">
          <MoreVertIcon 
               onClick={()=>{navigate(`/movietrailer/${_id}`)}}className='seeMoreIcon fs-4'/>
        </Tooltip>
            </span>
          </>         
          :
        token ?
          <>
        <span className=' d-flex flex-row align-items-center justify-content-center' style={{ position:"absolute",right:"3px",top:"28px"}}>

           {/* ADDTOWISH */}
            <>
               <Tooltip title="Add to Wish List">      
             <Button variant="none" className="d-flex align-items-center mb-1 p-0"
                onClick={()=>{
                  setIsClicked(isCliked=="false"?"true":"false")
                }}>
                  {
                    isCliked === "false"?
              <FavoriteIcon
               onClick={()=>{handleAddWishitem(element)}} 
                className="text-danger fs-2"/>
                :
            <FaRegHeart className="text-danger fs-3"/>
                  }
               </Button>
              </Tooltip>
              <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light" 
                  />
              </>
          
      
       {/* See More */}
      <Tooltip title="See More">
        <MoreVertIcon 
               onClick={()=>{navigate(`/movietrailer/${_id}`)}}className='seeMoreIcon fs-4'/>
        </Tooltip>
        </span>
            </>
          :
            null
          
          }
 
      titleTypographyProps={{fontSize:"20x",paddingBottom:"0px",marginBottom:"0px" }}
       title=  {moviename.length >= 25 ? moviename.substring(0, 25) + "..." : moviename}
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
</CardActions> 

    {/* CAST & SUMMARY  */}
    <CardContent className=''>
     <div className='overlay px-3' style={{fontSize:"13px",textAlign:"justify",backgroundColor:mode == "light" ? "white" :"#161718",color:mode == "light"?"black":"rgba(163, 162, 162, 0.648);"}}>

    <span className='movieCast d-flex align-items-center' style={{paddingTop:"1px"}} 
    >
    { 
        (cast.length) >=90 ?
        <>
       {cast.substring(0,90)+"..."}
        </>
          :
          <>
      {cast}
          </>
    }
    </span>

    <p className="movieSummary"
      >{summary.substring(0,205)+"..."}</p>
    </div>
    </CardContent>
    </Card>
    </Grid>
    </>
  )}