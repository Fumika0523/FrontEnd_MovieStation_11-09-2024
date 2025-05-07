import { useState } from "react";
import { Button } from "react-bootstrap";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import IconButton from '@mui/material/IconButton';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { MdThumbDownAlt } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


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
        <div className="d-flex justify-content-center align-items-center flex-row">
        <div>
        <FaHeart className="fs-5" style={{color:"	rgba(223, 77, 119, 0.89)"}} 
           onClick={()=>{
            setLike(parseInt(like)+1) //converting to number 
        }}/>
          <span  style={{fontSize:"12.5px",marginLeft:"3px"}}>
            {formatNumber(like)}
          </span>
        </div>

        {/* Dislike */}
        {/* <IconButton className="movieCardIcon"> */}
        {/* <div className="ms-2">
        <MdThumbDownAlt style={{color:"rgb(101, 227, 79)"}} className="fs-4" 
          onClick={()=>{
            setDisLike(parseInt(disLike)+1)
           }}/>
           <span  style={{fontSize:"12px",marginLeft:"2px"}}>
            {formatNumber(disLike)}
           </span>
        </div> */}
        </div>
        {/* </IconButton> */}
        </>
    )
}
export default LikeCard