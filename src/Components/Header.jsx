import { Button,  } from '@mui/material'
import coverPage from '../assets/coverPage.png'

function Header (){
    // Use location hook, ex
    return(
        <>
        <img src={coverPage} alt="" className="opacity-50 bg-header-image"/>
        <div className="card-img-overlay  text-center " style={{margin:"8% 10%",width:"80%"}}>
        <div className="text-white pt-5 fw-bold" style={{fontSize:"400%"}}>Your Streaming guide for movies, TV shows & sport</div>
        <div className='text-secondary fs-3'>Find where to stream new, popular & upcoming entertainment with JustWatch.</div>   
        <div className='d-flex justify-content-center mt-5' style={{width:"80%",marginLeft:"10%",gap:"10%",fontSize:"120%"}}>
        <button type="button" className=" bg-warning px-5 py-3 fw-bold" style={{borderRadius:"15px"}}>Discover Movies & TV shows</button>
        <button   type="button" className="btn btn-outline-secondary  opacity-80  px-5 py-3 fw-bold" style={{borderRadius:"15px"}} >Features</button>
        </div>
        </div>
        </>
    )
}
export default Header