import { useContext, useState } from "react"
import LikeCard from '../LikeCard'
import { useNavigate } from "react-router-dom";
import cartContext from "../../utils/cartContext";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";


function MovieCard ({movieposter,moviename,rating,summary,cast,id,setMovieData,element}){
    const [cartUCtxt,setCartUtxt]=useContext(cartContext)
    const [summaryShow,setSummaryShow] = useState(false)
    const [castShow,setCastShow] = useState(false)

    //useNavigate()
    const navigate=useNavigate()

    const getMovieData = async()=>{
        console.log("Movie data is called......")
        let res = await fetch('https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie')
        let data = await res.json()
        console.log(data)
        setMovieData(data)//movies
    }

    //DELETE
    const deleteMovie=async()=>{
        console.log(id)
        //console.log(`https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie/s${id}`)
        let res=await fetch(`https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie/${id}`,{
        method:"DELETE"
    })
    let data = await res.json()
    console.log(data)//output

    if(data){//if data exists
        console.log("deleted successfully")
        //update UI
        getMovieData()
    }
}

    let ratingDesign={
        color:rating>=8?"green":"red"
    }
    let visibleDesign={
        display:summaryShow==true?"block":"none"
    }
    let visibleCastDesign={
        display:castShow==true?"block":"none"
    }

    let movieIcons={
        // marginRight:"2%",
        padding:"0 10px",
    }

    //btn is pressed > dispatch the action > reducer function
    const dispatch = useDispatch()
    const handleAdditem=(item)=>{
        console.log(item)
        dispatch(addItem(item))
    }

    // console.log(movieposter)
    return(
        <>    
    <div className="cardDesign">
        
    <div className="posterImage">
        <img src={movieposter} alt="" style={{height:"135px",width:"300px"}} /> 
    </div>

    <div className="movieContent">
        <div style={{display:"flex",justifyContent:"space-between",margin:"0px 7px 0px 5px "}}>
        <h6 className="text1">{moviename}</h6>
        <h6 style={ratingDesign} className="text2">{rating}</h6>
        </div>
        <div  style={{display:"flex",justifyContent:"center"}}>
     
    {/* PLUS ICON */}
    <button className="btn" style={movieIcons} onClick={()=>{
        setSummaryShow(!summaryShow)
        setCastShow(false)
    }}>
    {summaryShow?<i style={movieIcons} className="fa-solid fa-caret-down mt-1"></i>: <i style={movieIcons} className="fa-solid fa-caret-up mt-1"></i>}</button>

     {/* play icon */}
     <button className="btn m-0 p-0" onClick={()=>{
                    setCastShow(!castShow)
                    setSummaryShow(false)
        }}>
    {castShow? <i style={movieIcons} className="fa-solid fa-angle-downmt-1"></i>:
  <i style={movieIcons} className="fa-solid fa-angle-up mt-1"></i>}
     </button>
 
    {/* Information Icon : TRAILER */}
     <button className="bg-black border-0 btn m-0 p-0" onClick={()=>{
            navigate(`/movie/in/${id}`)
        }}><i style={movieIcons} className="bi bi-plus-circle"></i></button>
        {/* use icon from Boostrap Icon */}

    {/* Edit Icon */}
    <button className="btn m-0 p-0" onClick={()=>navigate(`/editmovie/${id}`)}><i className="fa-solid fa-pencil text-info"></i></button>

    {/* Delete Icon */}
    <button className="btn m-0 p-0" onClick={()=>deleteMovie()}><i className="fa-solid fa-trash text-danger  me-2"></i></button>

    {/* ADD to CART */}
    <button className="btn m-0 p-0" onClick={()=>{setCartUtxt(cartUCtxt+1)}}><i class="fa-solid fa-cart-shopping text-warning me-2"></i></button>

    {/* REDUX */}
    <button className="btn p-0 m-0" onClick={()=>{handleAdditem(element)}}>Redux</button>

        {/* <i className="fa-solid fa-caret-down"></i>
        <i className="fa-solid fa-caret-up"></i> */}
        {/* <button className="mx-2" onClick={()=>{
        setSummaryShow(!summaryShow)
        setCastShow(false)
        }}>{summaryShow?<i className="fa-solid fa-caret-down p-1 mt-1"></i>: <i className="fa-solid fa-caret-up p-1 mt-1"></i> }</button> */}

        <LikeCard/>
        </div>
        {/* Conditional Styling */}
        {/* < p className="summaryDesign" style={visibleDesign}>{summary.substring(0,170)+"..."}</p>
        <p className="castDesign" style={visibleCastDesign}>{cast}</p> */}
        
        {/* Conditional Rendering */}
        {summaryShow && <p className="summaryDesign">{summary.substring(0,170)+"..."}</p>}
        {/* {summaryShow ? <p className="summaryDesign">{summary.substring(0,170)+"..."}</p>:null} */}

        {/* Conditional Rendering */}
        {/* {castShow &&   <p className="castDesign">{cast}</p>} */}
        { castShow ?   <p className="castDesign" style={visibleCastDesign}>{cast}</p>:null}
    </div>
    </div>
  
        </>
    )
}
export default MovieCard


//when