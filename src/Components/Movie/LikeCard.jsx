import { useState } from "react";
import { Button } from "react-bootstrap";

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
        {/* more than 1,000 -> in "K" */}
        {/* Like */}
        <Button variant="outline-none"
        className="d-flex  flex-row justify-content-center text-start gap-1 align-items-center likeBtn btnFont"
        style={{backgroundColor:mode=="light" ? "transparent":"#3b3b3b",color:mode=="light" ? "rgb(66, 66, 66)":"white"}}>
          <i 
           className="fa-regular fs-5 fa-thumbs-up "
           onClick={()=>{
            setLike(parseInt(like)+1) //converting to number 
        }}></i>
        <span className="">
            {formatNumber(like)}
       </span>
        </Button>

      {/* Dislike */}
      <Button variant="outline-none"
        className="d-flex  flex-row justify-content-center text-start gap-1 align-items-center likeBtn btnFont"
        style={{backgroundColor:mode=="light" ? "transparent":"#3b3b3b",color:mode=="light" ? "rgb(66, 66, 66)":"white"}}>
      <i  className="fa-regular  fs-5 fa-thumbs-down" onClick={()=>{
            setDisLike(parseInt(disLike)+1)
        }}> </i>
        <span 
        className="" >
            {formatNumber(disLike)}
       </span>
        </Button>
        </>
    )
}
export default LikeCard