import { Button, Container } from '@mui/material'
import coverPage from '../../assets/coverPage.png'
import Image from 'react-bootstrap/Image';


function Header (){
      return(
        <>        
        <div className="mainBackground " style={{margin:"0"}}>
         <Image  src={coverPage} alt="" className=" bg-header-image  "  />

         <div className='bgFade my-lg-4' >
        <div 
        className="d-flex justify-content-center mt-sm-4 mt-5 mb-5 pb-5 pt-sm-5  align-items-center flex-column  border-4"
        >
        <div
         className="text-white fw-bold my-lg-1  col-md-10 col-lg-8 col-sm-10 fs-1 col-10" 
         >Your streaming guide for movies, TV shows & sport</div>
        <div
         className='text-secondary col-md-10 col-lg-7 col-9 fs-4' 
         >Find where to stream new, popular & upcoming entertainment with JustWatch.</div>   
        <div className=' col-lg-8 col-md-9  col-sm-10 col-10  d-flex  text-nowrap my-md-4 mt-3 d-flex justify-content-evenly' >
        <Button variant="contained"  className="fs-6 fw-bold text-nowrap rounded rounded-4"
        style={{backgroundColor:"#f0ad4e", overFlow: "hidden", textOverflow: "ellipsis",padding:"2% 5%"}}
       >Discover Movies & TV shows</Button>
        <Button variant="outlined" className="fw-bold rounded rounded-4 pfw-bold fs-6 " style={{borderColor:"#adb5bd", color:"#adb5bd",padding:"2% 5%"}}  >Features</Button>
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