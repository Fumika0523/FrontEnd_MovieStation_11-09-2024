import { Button } from "react-bootstrap"

function AboutUs_TopDesign ({design,imgUrl,heading1,heading2,textSummary,btnComment}){
    return(
    <>  
    <div className={design} >
        {heading1}
        <div>
        {heading2}
        </div>
    <img src={imgUrl} alt="" className="col-12 my-2"  style={{objectFit:"cover",height:"350px"}}/>
    <p className="fs-6  my-3">
        {textSummary}
    </p>
    <Button variant="secondary" className=" fs-5">{btnComment}</Button>
        </div>
    </>
    )
}
export default AboutUs_TopDesign