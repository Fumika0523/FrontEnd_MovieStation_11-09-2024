import { Button,  } from '@mui/material'
import coverPage from '../../assets/coverPage.png'

function Header (){

    
    return(
        <>
         <img src={coverPage} alt="" className=" bg-header-image" />
         <div className='bgFade '></div>
        <div className="card-img-overlay text-center py-3" style={{margin:"8% 20%",width:"60%",}}>
        <div className="text-white fw-bold" style={{fontSize:"390%"}}>Your Streaming guide for movies, TV shows & sport</div>
        <div className='text-secondary fs-5 py-2'>Find where to stream new, popular & upcoming entertainment with JustWatch.</div>   
        <div className='d-flex justify-content-center mt-3 gap-5' >
        <button className="btn btn-warning  px-5 py-3 fw-bold border border-warning rounded rounded-4 fs-5" >Discover Movies & TV shows</button>
        <button className="btn btn-outline-secondary border border-secondary rounded rounded-4 px-5 py-3 fw-bold fs-5" >Features</button>
        </div>
        </div>
    
        </>
    )
}
export default Header