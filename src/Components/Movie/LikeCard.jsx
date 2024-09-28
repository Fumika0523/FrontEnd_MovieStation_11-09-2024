import { useState } from "react";

function LikeCard({likeNum,disLikeNum}){
    const [like,setLike] = useState(likeNum)
    const [disLike,setDisLike] = useState(disLikeNum)

    return(
        <>
        {/* more than 1,000 -> in "K" */}
          <i style={{color:"white"}} className="fa-regular fa-thumbs-up position-relative fs-5 mx-2 pt-2" onClick={()=>{
            setLike(parseInt(like)+1) //converting to number
        }}>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"style={{fontSize:"65%"}}>
            {like}
       </span>
        </i>

        <i style={{color:"white"}} className="fa-regular fa-thumbs-down position-relative fs-5 mx-2 pt-2" onClick={()=>{
            setDisLike(parseInt(disLike)+1)
        }}>  
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill " style={{fontSize:"65%"}}>
            {disLike}
       </span>
       </i>
     
      


        </>
    )
}
export default LikeCard