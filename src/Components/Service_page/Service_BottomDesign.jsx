import Button from 'react-bootstrap/Button';


function Service_BottomDesign(){
    return(
        <>
        <div className="row mb-5 border-4 gap-4 d-flex column-flex flex-column">
        {/* 1st ROW */}
        <div >
        <div className="text-white text-center" style={{fontSize:"4vw"}}>Download MovieStation for free:</div>
        </div>
        {/* 2nd ROW */}
        <div className="d-flex gap-4 flex-column  ">
            <div  className=" d-flex flex-row justify-content-between align-items-center"
            style={{margin:"0 20%"}}>
            <Button variant="warning" className="col-5  d-flex flex-row gap-1 justify-content-center align-items-center" ><i  className="fa-brands fa-google-play" style={{fontSize:"3vw"}} ></i><div className="text-nowrap" style={{fontSize:"2.8vw"}}  >GooglePlay</div></Button>

            <Button variant="warning"  className="col-5  d-flex flex-row gap-1 justify-content-center align-items-center" ><i className="fa-brands fa-apple" style={{fontSize:"3.5vw"}}></i><div className="text-nowrap" style={{fontSize:"2.8vw"}} >App Store</div></Button>
            </div>

            {/* 3rd ROW */}
            <div className=" d-flex gap-5 flex-column ">
            <div div className=" d-flex flex-row justify-content-between align-items-center"
            style={{margin:"0 20%"}}>
            <Button variant="warning" className="col-5  d-flex flex-row gap-1 justify-content-center align-items-center" ><i style={{fontSize:"3vw"}}  className="fa-brands fa-xbox"></i><div className="text-nowrap" style={{fontSize:"2.8vw"}} >XBOX</div></Button>

            <Button  variant="warning" className="col-5  d-flex flex-row gap-1 justify-content-center align-items-end"  ><i className="fa-brands fa-amazon" style={{fontSize:"3.2vw"}} ></i><div className="text-nowrap" style={{fontSize:"2.8vw"}}  >AMAZON TV</div></Button>
            </div>
            </div>
            </div>
        </div>
        <hr />
        </>
    )
}
export default Service_BottomDesign