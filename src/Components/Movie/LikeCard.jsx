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
        <div className="d-flex align-items-center justify-content-center">
        {/* <span className="bg-primary d-flex align-items-center justify-content-center rounded-circle" style={{width:"28px",height:"28px"}}> */}
        <FaThumbsUp className=" fs-6" style={{color:"white"}} 
           onClick={()=>{
            setLike(parseInt(like)+1) //converting to number 
        }}/>
        {/* </span> */}
          <span className="" style={{fontSize:"13px",marginLeft:"3px"}}>
            {formatNumber(like)}
          </span>
        </div>

        {/* Dislike */}
        {/* <IconButton className="movieCardIcon"> */}
        <div className="ms-2 d-flex align-items-center ">
        {/* <span className="bg-secondary d-flex align-items-center justify-content-center rounded-circle" style={{width:"28px",height:"28px"}}> */}
          <MdThumbDownAlt style={{color:""}} className="fs-5" 
          onClick={()=>{
            setDisLike(parseInt(disLike)+1)
           }}/>
          {/* </span> */}

           <span  style={{fontSize:"12px",marginLeft:"2px"}}>
            {formatNumber(disLike)}
           </span>
        </div>
        </div>
        {/* </IconButton> */}
        </>
    )
}
export default LikeCard