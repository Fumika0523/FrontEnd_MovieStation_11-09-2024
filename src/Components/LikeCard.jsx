import { useState } from "react";


function LikeCard(){
    const [like,setLike] = useState(0)
    const [disLike,setDisLike] = useState(0)

    return(
        <>
        {/* <i style={{color:"green",marginRight:"5px"}} className="fa-regular fa-thumbs-up" onClick={()=>{
            setLike(like+1)
        }}>&nbsp;{like}</i>
         */}
        {/* <i style={{color:"red"}} className="fa-regular fa-thumbs-down" onClick={()=>{
            setDisLike(disLike+1)
        }}>&nbsp;{disLike}</i> */}

 
       <i style={{color:"white"}} className="fa-regular fa-thumbs-up position-relative fs-5 mx-2" onClick={()=>{
            setLike(like+1)
        }}>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
            {like}
       </span>
        </i>

        <i style={{color:"white"}} className="fa-regular fa-thumbs-down position-relative fs-5 mx-2" onClick={()=>{
            setDisLike(disLike+1)
        }}>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
            {disLike}
       </span>
        </i>
      


        </>
    )
}
export default LikeCard