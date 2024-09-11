function Service_BottomDesign(){
    return(
        <>
        <div>
        <h2 className="fs-1 text-white text-center">Download MovieStation for free:</h2>
        <div className="fs-2">
            <div className="mb-3 mt-5 d-flex ms-5 justify-content-center">
            <button className="btn col-2 me-5 d-flex btn-warning align-items-center justify-content-center" style={{width:"280px"}}><i className="fa-brands fa-google-play fs-3"></i><div className="fs-4 mx-2">GooglePlay</div></button>
            <button className="btn col-2 me-5 d-flex btn-warning align-items-center justify-content-center " style={{width:"280px"}}><i className="fa-brands fa-apple fs-2"></i><div className="fs-4 mx-2">App Store</div></button>
            </div>
            <div className="btn d-flex mt-5 ms-5 justify-content-center">
            <button className="btn col-2 me-5 d-flex btn-warning align-items-center justify-content-center" style={{width:"280px"}}><i className="fa-brands fa-xbox fs-3"></i><div className="fs-4  mx-2">XBOX</div></button>
            <button className="btn col-2 me-5 d-flex btn-warning align-items-center justify-content-center" style={{width:"280px"}}><i className="fa-brands fa-amazon fs-3"></i><div className="fs-4 mx-2">AMAZON TV</div></button>
            </div>
        </div>
        </div>
        </>
    )
}
export default Service_BottomDesign