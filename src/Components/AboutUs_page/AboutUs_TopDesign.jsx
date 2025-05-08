import { Button } from "react-bootstrap"

function AboutUs_TopDesign ({mode, design,imgUrl,heading1,heading2,textSummary,btnComment}){
    return(
    <>  
    <div className={design} >
        {heading1}
        <div className="fs-5">
        {heading2}
        </div>
    <img src={imgUrl} alt="" className="col-12 my-2 w-100"  style={{objectFit:"cover",height:"350px"}}/>
    <p className="fs-6 my-3"
    style={{ color: mode == "light" ? "rgb(56, 57, 58)" : "rgb(72, 75, 77)"}}>
        {textSummary}
    </p>
    <Button variant="secondary" className="mt-3 col-12 mx-auto">{btnComment}</Button>
    </div>
    </>
    )
}
export default AboutUs_TopDesign