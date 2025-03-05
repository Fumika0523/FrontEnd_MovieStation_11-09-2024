import { Button } from "react-bootstrap"

function Service_TopDesign(){
    return(
        <>
        <div className="ms-1 row  flex "
        >
        {/* LEFT　SIDE */}
        <div className="  col-lg-6 col-sm-12 d-flex flex-column gap-5 mb-5 justify-content-center align-items-center" >
            {/* 1st ROW */}
            <div className="d-flex justify-content-center gap-2 gap-lg-3 gap-md-4 gap-sm-2 col-12">
                <Button variant="warning" className="d-flex flex-row col-6 col-md-5  col-sm-6  align-items-center justify-content-center text-nowrap"><i className="fa-brands fa-google-play fs-3 "></i><div className="fs-4">GooglePlay</div></Button> 
                <Button variant="warning" className="d-flex flex-row col-6 col-md-5  col-sm-6  align-items-center justify-content-center"><i className="fa-brands fa-apple fs-2"></i><div className="fs-4">App Store</div></Button> 
            </div>
           {/* 2nd ROW */}
            <div className="d-flex justify-content-center gap-2 gap-lg-3 gap-md-4 gap-sm-2 col-12 ">
                <Button variant="warning" className="d-flex flex-row col-6 col-md-5  col-sm-6 justify-content-center align-items-center"><i className="fa-brands fa-xbox fs-3"></i><div className="fs-4 mx-2">XBOX</div></Button> 
                <Button variant="warning" className="d-flex flex-row col-6 col-md-5 col-sm-6 align-items-center justify-content-center text-nowrap"><i className="fa-brands fa-amazon fs-2"></i><div className="fs-4 ">AMAZON TV</div></Button> 
            </div>
        </div>

        {/* Right Side */}
        <div className="col-lg-6 col-md-10 mx-auto col-sm-12 col-12 d-flex justify-content-center">
        <img  src="https://www.cnet.com/a/img/resize/def3ecb03391b781124f22392112facab070acc3/hub/2011/10/18/24f8d2da-cbf2-11e2-9a4a-0291187b029a/freeview-hd-apps.jpg?auto=webp&width=1200" style={{width:"100%",height:"auto",objectFit:"contain"}} alt="" />
        </div>
        </div>
        
    </>
    )
}
export default Service_TopDesign