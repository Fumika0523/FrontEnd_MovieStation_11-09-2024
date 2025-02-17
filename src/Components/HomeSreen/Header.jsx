import { Button, Container } from '@mui/material'
import coverPage from '../../assets/coverPage.png'
import Image from 'react-bootstrap/Image';


function Header (){

      return(
        <>
        
        <div className="mainBackground border" style={{top:"-13px"}}>
         <Image  src={coverPage} alt="" className=" bg-header-image"  />
         <div className='bgFade border-4 border-warning' >
        <div 
        className="d-flex border border-4 justify-content-center flex-column 
        align-items-center col-lg-10 col-md-10 col-sm-10 col-11  border-danger"
        >
        {/* <div style={{position:"relative",border:"1px solid red"}}> */}
        <div
         className="text-white fw-bold my-1 col-md-10 col-lg-8 col-sm-10 border col-10" style={{fontSize:"4.3vw"}}
         >Your streaming guide for movies, TV shows & sport</div>
        <div
         className='text-secondary col-md-10 col-lg-9 col-9' style={{fontSize:"2vw"}}
         >Find where to stream new, popular & upcoming entertainment with JustWatch.</div>   

        <div className=' col-lg-8 col-md-9 border col-sm-10 col-10  d-flex   text-nowrap my-5 d-flex justify-content-evenly' >
        <Button variant="contained"  className="fw-bold text-nowrap rounded rounded-4"
        style={{backgroundColor:"#f0ad4e",fontSize:"1.5vw",  overFlow: "hidden", textOverflow: "ellipsis",padding:"2% 5%"}}
       >Discover Movies & TV shows</Button>
        <Button variant="outlined" className="fw-bold rounded rounded-4 pfw-bold " style={{borderColor:"#adb5bd", color:"#adb5bd",fontSize:"1.5vw",padding:"2% 5%"}}  >Features</Button>
        </div>
        {/* </div> */}
        </div>
        </div>
        </div>
        {/* </Container> */}
        </>
    )
}
export default Header