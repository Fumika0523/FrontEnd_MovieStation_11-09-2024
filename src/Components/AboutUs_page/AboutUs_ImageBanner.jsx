import { Image } from "react-bootstrap"
import Card from 'react-bootstrap/Card';

function AboutUs_ImageBanner ({appName,cardText,banner}){
    return(
    <>
<Card className="outline-none bg-transparent" >
<Image
        // className="overlayImgBanner outline-none"
        className="h-25 d-inline-bloc"
        src={banner}
        s="card-img" 
         />
         <div className="imageOverLay"></div>
         
      <Card.ImgOverlay 
      className="my-md-5 border-warning justify-content-center align-items-center d-flex flex-column border-4  mx-auto col-sm-10 col-lg-6 text-center"     
      style={{zIndex:"3",position:"absolute",bottom:"60px"}}
      >
         {appName && <div className="text-warning fw-bold  text-nowrap text-center mx-auto fs-md-1 fs-2   ">
            <i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass text-warning mx-auto"></i> MovieStation</div>}
        <Card.Text className="fs-2 text-white mx-auto d-display d-sm-block d-none d-sm-block" style={{fontStyle:"italic"}}> {cardText}</Card.Text>
        </Card.ImgOverlay>
    </Card>
        </>
    )
}
export default AboutUs_ImageBanner