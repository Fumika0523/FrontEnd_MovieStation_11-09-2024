import { useState } from "react";
import { Button } from "react-bootstrap";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import IconButton from '@mui/material/IconButton';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

function LikeCard({likeNum,disLikeNum,mode,setMode}){
    const [like,setLike] = useState(likeNum)
    const [disLike,setDisLike] = useState(disLikeNum)

    const formatNumber = (number)=>{
        if (number >= 1000) {
            return (number / 1000).toFixed(1) + "k";
          } else {
            return number.toString();
          }
    }
    
    return(
        <>
        {/* <Button variant=""
        className="d-flex col-2  me-1 flex-row justify-content-center  gap-1 align-items-center likeBtn btnFont"
        style={{
          // backgroundColor:mode=="light" ? "transparent":"#3b3b3b",
          color:mode=="light" ? "rgb(66, 66, 66)":"white"}}>
          <i 
           className="fa-regular fs-4 fa-thumbs-up "
           onClick={()=>{
            setLike(parseInt(like)+1) //converting to number 
        }}></i>
        <span  style={{fontSize:"15px"}}>
            {formatNumber(like)}
       </span>
        </Button> */}
        <IconButton>
          <ThumbUpOffAltIcon  sx={{ fontSize: 25 }} 
           onClick={()=>{
            setLike(parseInt(like)+1) //converting to number 
        }}/>
          <span  style={{fontSize:"15px",marginLeft:"3px"}}>
            {formatNumber(like)}
          </span>
        </IconButton>

      {/* Dislike */}
      {/* <Button variant="outline-none"
        className="d-flex col-2   flex-row justify-content-center text-start gap-1 align-items-center likeBtn btnFont"
        style={{
          // backgroundColor:mode=="light" ? "transparent":"#3b3b3b",
          color:mode=="light" ? "rgb(66, 66, 66)":"white"}}>
      <i  className="fa-regular  fs-5 fa-thumbs-down" onClick={()=>{
            setDisLike(parseInt(disLike)+1)
        }}> </i>
        <span 
        className="" >
            {formatNumber(disLike)}
       </span>
        </Button> */}
        <IconButton>
          <ThumbDownOffAltIcon  sx={{ fontSize: 25 }} 
          onClick={()=>{
            setDisLike(parseInt(disLike)+1)
           }}/>
           <span  style={{fontSize:"15px",marginLeft:"3px"}}>
            {formatNumber(disLike)}
           </span>
        </IconButton>
        </>
    )
}
export default LikeCard