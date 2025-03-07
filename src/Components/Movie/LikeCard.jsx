import { useState } from "react";
import { Button } from "react-bootstrap";

function LikeCard({likeNum,disLikeNum,mode,setMode}){
    const [like,setLike] = useState(likeNum)
    const [disLike,setDisLike] = useState(disLikeNum)

    return(
        <>
        {/* more than 1,000 -> in "K" */}
        {/* Like */}
        <Button variant="secondary d-flex flex-row justify-content-center text-start gap-1 align-items-center">
          <i 
        //   style={{color:mode=="light" ? "black":"lightgreen"}}
           className="fa-regular fs-4 fa-thumbs-up "
           onClick={()=>{
            setLike(parseInt(like)+1) //converting to number 
        }}></i>
        <span className="fs-6">
            {like}
       </span>
        </Button>

      {/* Dislike */}
      <Button variant="secondary d-flex flex-row justify-content-center text-start gap-1 align-items-center">
      <i  className="fa-regular  fs-4 fa-thumbs-down" onClick={()=>{
            setDisLike(parseInt(disLike)+1)
        }}> </i>
        <span 
        className="fs-6" >
            {disLike}
       </span>
        </Button>
        </>
    )
}
export default LikeCard