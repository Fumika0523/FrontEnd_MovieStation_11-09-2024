import { Button, Container } from '@mui/material'
import coverPage from '../../assets/coverPage.png'

function Header (){

      return(
        <>
        <div className="mainBackground ">
         <img  src={coverPage} alt="" className=" bg-header-image" />
         <div className='bgFade d-flex flex-column  align-items-center'>
        <div 
        className="col-6">
        <div
         className="text-white fw-bold my-1" 
         style={{fontSize:"390%"}}
         >Your Streaming guide for movies, TV shows & sport</div>
        <div
         className='text-secondary fs-3 '
         >Find where to stream new, popular & upcoming entertainment with JustWatch.</div>   

        <div className='d-flex justify-content-center my-3 ' >
        <Button variant="contained"   className="fw-bold fs-5 rounded rounded-4 py-3 px-5"
        style={{backgroundColor:"#f0ad4e"}} >Discover Movies & TV shows</Button>
        <Button variant="outlined" className="rounded rounded-4 pfw-bold fs-5 py-3 px-5 " style={{borderColor:"#adb5bd", color:"#adb5bd"}}  >Features</Button>
        </div>
        </div>
        </div>
        </div>
        {/* </Container> */}
        </>
    )
}
export default Header