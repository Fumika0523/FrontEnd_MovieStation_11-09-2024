import { Button,  } from '@mui/material'
import coverPage from '../assets/coverPage.png'

function Header (){
    // Use location hook, ex

    // const bgImage = {
    //     background:" linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 50%)",
    //     height:"700px",
    //     width: "100%",
     
    // }
    
    return(
        <>
         <img src={coverPage} alt="" className=" bg-header-image" />
        <div className="card-img-overlay  text-center py-3" style={{margin:"8% 20%",width:"60%",}}>
        <div className="text-white fw-bold" style={{fontSize:"390%"}}>Your Streaming guide for movies, TV shows & sport</div>
        <div className='text-secondary fs-5 py-2'>Find where to stream new, popular & upcoming entertainment with JustWatch.</div>   
        <div className='d-flex justify-content-center mt-3 gap-5 fs-5' >
        <button className=" bg-warning px-5 py-3 fw-bold" style={{borderRadius:"15px"}}>Discover Movies & TV shows</button>
        <button className="btn btn-outline-secondary  px-5 py-3 fw-bold" style={{borderRadius:"15px"}} >Features</button>
        </div>
        </div>
    
        </>
    )
}
export default Header