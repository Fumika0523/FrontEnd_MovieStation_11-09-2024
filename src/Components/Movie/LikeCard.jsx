import { useState } from "react";
import { Button } from "react-bootstrap";

function LikeCard({likeNum,disLikeNum,mode,setMode}){
    const [like,setLike] = useState(likeNum)
    const [disLike,setDisLike] = useState(disLikeNum)

    return(
        <>
        {/* more than 1,000 -> in "K" */}
          <i style={{color:mode=="light" ? "black":"lightgreen"}}
           className="fa-regular fa-thumbs-up position-relative fs-5 mx-2 pt-2" onClick={()=>{
            setLike(parseInt(like)+1) //converting to number 
        }}>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill pt-2"
        style={{color:mode=="light" ? "black":"lightgreen",ontSize:"60%"}}
    >
            {like}
       </span>
        </i>
      
        <i style={{color:mode=="light" ? "black":"red"}} className="fa-regular fa-thumbs-down position-relative fs-5 mx-2 pt-2" onClick={()=>{
            setDisLike(parseInt(disLike)+1)
        }}>  
        <span style={{color:mode=="light" ? "black":"red", fontSize:"60%"}}
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill" >
            {disLike}
       </span>
       </i>
 
     
      


        </>
    )
}
export default LikeCard