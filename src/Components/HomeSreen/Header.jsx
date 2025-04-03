import { Button, Container } from '@mui/material'
import coverPage from '../../assets/coverPage.png'
import Image from 'react-bootstrap/Image';


function Header (){
      return(
        <>        
        <div className="mainBackground  border-primary border-4  " >
         <Image style={{minHeight:"minContent"}} src={coverPage} alt="" className=" bg-header-image  "  />
      <div className='bgFade row mx-auto border-danger border-4  ' >
        <div className='d-flex justify-content-center align-items-center  flex-column gap-2 col-md-10 col-lg-9 col-sm-9 mt-md-4 mt-lg-3 mt-sm-3 mx-auto  '>
        <div className=" text-white fw-bold my-lg-1 mx-auto fs-1 " 
         >Your streaming guide for movies, TV shows & sport</div>
        <div
         className='  text-secondary  mx-auto fs-4 ' 
         >Find where to stream new, popular & upcoming entertainment with JustWatch.</div>  
        </div> 
          <div className='d-none align-items-center d-sm-block row mx-auto d-flex justify-content-between ' style={{width:"80%"}}>
        <Button variant="contained"  className="col-sm-7 me-3 me-md-5 col-md-6 col-lg-4 col-12 rounded fs-6 text-nowrap "
        style={{backgroundColor:"#f0ad4e",height:"50px"}}
       >Discover Movies & TV shows</Button>
        <Button variant="outlined" className="col-sm-4 col-lg-3 col-md-4 col-12 rounded fs-6  " style={{borderColor:"#adb5bd",height:"50px", color:"#adb5bd",}}  >Features</Button>    
        </div>
        </div>
        </div>
        </>
    )
}
export default Header