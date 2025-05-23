import Button from 'react-bootstrap/Button';


function Service_BottomDesign(){
    return(
        <>
        <div className=" border-4  d-flex column-flex flex-column">
        {/* 1st ROW */}
        <div >
        <div className="mb-3 text-center fs-md-1 fs-5 ">Download MovieStation for free:</div>
        </div>

        {/* 2nd ROW */}
        {/* <div className="d-flex gap-4 flex-column"> */}
            <div  className=" mb-4 col-md-6 col-lg-8 mx-auto d-flex col-10 flex-wrap justify-content-evenly gap-4  align-items-center">
            <Button variant="warning" className="col-lg-4 col-md-5 col-sm-5 col-2 d-flex flex-row gap-1 justify-content-center align-items-center" ><i  className="fa-brands fa-google-play fs-sm-3  fs-4"></i><div className="text-nowrap fs-sm-5 d-none d-sm-block"  >GooglePlay</div></Button>

            <Button variant="warning"  className="col-lg-4 col-md-5 col-sm-5 col-2 d-flex flex-row gap-1 justify-content-center align-items-center" ><i className="fa-brands fa-apple fs-sm-2 fs-3" ></i><div className="text-nowrap fs-sm-5  d-none d-sm-block" >App Store</div></Button>
            {/* </div> */}

            {/* 3rd ROW */}
            {/* <div className="d-flex mb-4 gap-4 flex-column">
            <div div className=" col-lg-10 col-md-8 col-11  mx-auto d-flex flex-row justify-content-between gap-lg-5 gap-sm-3 align-items-center"> */}
            <Button variant="warning" className="col-lg-4 col-md-5 col-sm-5 col-2 d-flex flex-row gap-1 justify-content-center align-items-center" ><i className="fa-brands fa-xbox fs-sm-3 fs-4"></i><div className="text-nowrap fs-sm-5  d-none d-sm-block">XBOX</div></Button>

            <Button  variant="warning" className="col-lg-4 col-md-5 d-flex col-sm-5 col-2 flex-row gap-1 justify-content-center align-items-center"><i className="fa-brands fa-amazon fs-sm-3 fs-4" ></i><div className="text-nowrap fs-sm-5  d-none d-sm-block"  >AMAZON TV</div></Button>
            </div>
            {/* </div> */}
            </div>
        {/* </div> */}
        </>
    )
}
export default Service_BottomDesign