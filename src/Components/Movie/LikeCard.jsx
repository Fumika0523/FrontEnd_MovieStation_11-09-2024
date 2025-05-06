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
        <div className="d-flex justify-content-center align-items-center flex-row">
        <div>
        <ThumbUpOffAltIcon  sx={{ fontSize: 25 }} 
           onClick={()=>{
            setLike(parseInt(like)+1) //converting to number 
        }}/>
          <span  style={{fontSize:"12px",marginLeft:"2px"}}>
            {formatNumber(like)}
          </span>
        </div>

        {/* Dislike */}
        {/* <IconButton className="movieCardIcon"> */}
        <div className="ms-2">
        <ThumbDownOffAltIcon  sx={{ fontSize: 25 }} 
          onClick={()=>{
            setDisLike(parseInt(disLike)+1)
           }}/>
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