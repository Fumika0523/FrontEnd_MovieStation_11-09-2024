import React from 'react'

function CartCard({movieposter,moviename,rating,summary}){
    return(
        <>
       
        {/* POSRTER IMAGE */}
        <div>
            <img src={movieposter} alt="" style={{height:"135px",width:"299px"}} /> 
        </div>
        {/* MOVIENAME */}
        <div className="movieContent">
            <div style={{display:"flex",justifyContent:"space-between",margin:"0px 7px 0px 5px "}}>
            <h6 className="text1">{moviename}</h6>
            {/* RATING */}
            <h6 className="text2">{rating}</h6>
            </div>
            <div  style={{display:"flex",justifyContent:"center"}}>{summary}</div>
            </div>
       
        </>
    )
}
export default CartCard