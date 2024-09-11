function Service_TopDesign(){
    return(
        <>
        <div className="d-flex mt-5">
        <div className="fs-2 ms-5 " style={{width:"50%"}}>
            <div className="mb-3 mt-5 d-flex ms-5 justify-content-center ">
            <button className="btn col-2 me-5 d-flex btn-warning justify-content-center align-items-center" style={{width:"240px"}}><i className="fa-brands fa-google-play fs-3 "></i><div className="fs-4 mx-2">GooglePlay</div></button>
            <button className="btn col-2 me-5 d-flex btn-warning align-items-center justify-content-center" style={{width:"240px"}}><i className="fa-brands fa-apple fs-2"></i><div className="fs-4 mx-2">App Store</div></button>
            </div>
           
            <div className="d-flex mt-5 ms-5 justify-content-center">
            <button type="button" className="btn col-2 me-5 d-flex btn-warning align-items-center justify-content-center" style={{width:"240px"}}><i className="fa-brands fa-xbox fs-3"></i><div className="fs-4 mx-2">XBOX</div></button>
            <button type="button" className="btn col-2 me-5 d-flex btn-warning align-items-center justify-content-center" style={{width:"240px"}}><i className="fa-brands fa-amazon fs-3"></i><div className="fs-4 mx-2">AMAZON TV</div></button>
            </div>
        </div>
        <img className="text" src="https://www.cnet.com/a/img/resize/def3ecb03391b781124f22392112facab070acc3/hub/2011/10/18/24f8d2da-cbf2-11e2-9a4a-0291187b029a/freeview-hd-apps.jpg?auto=webp&width=1200" style={{heigh:"450px",width:"40%"}} alt="" />
        </div>
        
    </>
    )
}
export default Service_TopDesign