import { Image } from "react-bootstrap"
import Card from 'react-bootstrap/Card';

function AboutUs_ImageBanner ({appName,cardText,banner}){
    return(
    <>
  {/* <div className="d-flex justify-content-center align-items-center  border border-danger border-4  align-items-center mb-3" */}
    {/* // style={{position:"relative",opacity:"1"}} */}
   {/* > */}

<Card className="outline-none bg-transparent" >
<Image
        className="overlayImgBanner outline-none"
        src={banner}
        s="card-img" 
         />
         <div className="imageOverLay"></div>
         
      <Card.ImgOverlay className="my-md-5 d-flex flex-column border-4 mt-sm-4 mt-3 mx-auto col-sm-10 col-lg-6 text-center" style={{position:"absolute",zIndex:"3"}}
      >
         {appName && <div className="text-warning fw-bold -warning -4 text-nowrap text-center mx-auto fs-md-1 fs-2  ">
            <i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass text-warning mx-auto"></i> MovieStation</div>}
        <Card.Text className="fs-2 text-white mx-auto d-display d-sm-block d-none d-sm-block" style={{fontStyle:"italic"}}> {cardText}</Card.Text>
        </Card.ImgOverlay>
    </Card>

       {/* <div className="card  text-center text-white col-10 " 
         style={{:"4px solid red",  position: "relative"  }}
         > */}
         {/* <div className='bgFade1   w-100' > */}
        {/* <div className="card-image-overlay col-6  mx-auto" style={{overlay:"auto"}}> */}
        {/* <div className="-4  -warning card-img-overlay"
            >
       {appName && <h1 className="text-warning "><i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass text-warning"></i> MovieStation</h1>}

        <div className="card-text" style={{fontStyle:"italic"}}>{cardText}</div>
        </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
    {/* </div> */}
        </>
    )
}
export default AboutUs_ImageBanner