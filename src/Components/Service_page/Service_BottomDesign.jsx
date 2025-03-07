import Button from 'react-bootstrap/Button';


function Service_BottomDesign(){
    return(
        <>
        <div className=" gap-4 d-flex column-flex flex-column">
        {/* 1st ROW */}
        <div >
        <div className="text-white text-center fs-md-1 fs-5 ">Download MovieStation for free:</div>
        </div>
        {/* 2nd ROW */}
        <div className="d-flex   gap-4 flex-column">
            <div  className="col-md-10 mx-auto d-flex col-11 flex-row justify-content-between gap-md-5   align-items-center"
            >
            <Button variant="warning" className="col-lg-5 col-md-5 col-sm-5 col-5 d-flex flex-row gap-1 justify-content-center align-items-center" ><i  className="fa-brands fa-google-play fs-sm-3 "  ></i><div className="text-nowrap fs-sm-5"  >GooglePlay</div></Button>
            <Button variant="warning"  className="col-lg-5 col-md-5 col-sm-5 col-5 d-flex flex-row gap-1 justify-content-center align-items-center" ><i className="fa-brands fa-apple fs-sm-2" ></i><div className="text-nowrap fs-sm-5" >App Store</div></Button>
            </div>

            {/* 3rd ROW */}
            <div className="d-flex   gap-4 flex-column">
            <div div className=" col-lg-10 col-md-10 col-11   mx-auto d-flex flex-row justify-content-between gap-lg-5 gap-sm-3 align-items-center"
           >
            <Button variant="warning" className="col-lg-5 col-md-5 col-sm-5 col-5 d-flex flex-row gap-1 justify-content-center align-items-center" ><i className="fa-brands fa-xbox fs-sm-3"></i><div className="text-nowrap fs-sm-5">XBOX</div></Button>

            <Button  variant="warning" className="col-lg-5 col-md-5 d-flex col-sm-5 col-5 flex-row gap-1 justify-content-center align-items-center"  ><i className="fa-brands fa-amazon fs-sm-3" ></i><div className="text-nowrap fs-sm-5"  >AMAZON TV</div></Button>
            </div>
            </div>
            </div>
        </div>
        <hr />
        </>
    )
}
export default Service_BottomDesign