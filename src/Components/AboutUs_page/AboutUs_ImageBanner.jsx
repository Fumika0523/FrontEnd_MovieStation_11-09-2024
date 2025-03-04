import { Image } from "react-bootstrap"
import Card from 'react-bootstrap/Card';

function AboutUs_ImageBanner ({appName,cardText,banner}){
    return(
        <>
  <div className="d-flex justify-content-center border-warning border-4 align-items-center mb-3"
//   style={{position:"relative",opacity:"1"}}
   >

<Card  style={{width:"100%"}}>
<Image
        className="overlayImgBanner"
        src={banner}
        s="card-img" alt="..." 
         />
         <div className="imageOverLay "></div>
         
      <Card.ImgOverlay className="my-5 mx-auto col-ms-10 col-lg-6 text-center" style={{position:"absolute",zIndex:"3"}}
      >
         {appName && <div className="text-warning fw-bold border-warning border-4 text-nowrap text-center mx-auto fs-1 ">
            <i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass text-warning mx-auto"></i> MovieStation</div>}
        <Card.Text className="fs-2 text-white" style={{fontStyle:"italic"}}> {cardText}
        </Card.Text>
        </Card.ImgOverlay>
    </Card>

       {/* <div className="card  text-center text-white col-10 " 
         style={{border:"4px solid red",  position: "relative"  }}
         > */}
         {/* <div className='bgFade1 border  w-100' > */}
        {/* <div className="card-image-overlay col-6 border mx-auto" style={{overlay:"auto"}}> */}
        {/* <div className="border-4 border border-warning card-img-overlay"
            >
       {appName && <h1 className="text-warning "><i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass text-warning"></i> MovieStation</h1>}

        <div className="card-text" style={{fontStyle:"italic"}}>{cardText}</div>
        </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
    </div>
        </>
    )
}
export default AboutUs_ImageBanner