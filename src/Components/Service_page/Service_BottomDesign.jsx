import Button from 'react-bootstrap/Button';


function Service_BottomDesign(){
    return(
        <>
        <div className="row  border-4 gap-3 d-flex column-flex flex-column">
        {/* 1st ROW */}
        <div >
        <h2 className="fs-1 text-white text-center">Download MovieStation for free:</h2>
        </div>
        {/* 2nd ROW */}
        <div className="d-flex gap-5 flex-column  ">
            <div className=" gap-5 d-flex flex-row justify-content-center align-items-center">
            <Button variant="warning" className="col-4 col-md-3 col-sm-4 d-flex flex-row gap-1 justify-content-center align-items-center" ><i className="fa-brands fa-google-play fs-3"></i><div className="fs-4 text-nowrap">GooglePlay</div></Button>

            <Button variant="warning" className="col-4 col-md-3 col-md-3 col-sm-4 d-flex flex-row gap-1 justify-content-center align-items-center" ><i className="fa-brands fa-apple fs-2"></i><div className="fs-4 text-nowrap">App Store</div></Button>
            </div>
            {/* 3rd ROW */}
            <div className=" gap-5 d-flex flex-row justify-content-center align-items-center">
            <Button variant="warning" className="col-4 col-md-3 col-sm-4 d-flex flex-row gap-1 justify-content-center align-items-center" ><i className="fa-brands fa-xbox fs-3"></i><div className="fs-4 text-nowrap">XBOX</div></Button>
            <Button variant="warning" className="col-4  col-md-3 col-sm-4 d-flex flex-row gap-1 justify-content-center align-items-center" ><i className="fa-brands fa-amazon fs-3"></i><div className="fs-4 text-nowrap">AMAZON TV</div></Button>
            </div>
        </div>
        </div>
        </>
    )
}
export default Service_BottomDesign