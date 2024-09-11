import coverPage from '../assets/coverPage.png'

function Header (){
    // Use location hook, ex
    return(
        <>
        <img src={coverPage} alt="" className="opacity-50 bg-header-image"/>
        <div className="card-img-overlay mt-5">
        <div className="text-white text-center mt-5 pt-5 fw-bold" style={{fontSize:"400%",marginLeft:"20%", width:"65%"}}>Your Streaming guide for movies, TV shows & sport</div>
        <div className='text-secondary text-center mt-2 fs-4'>Find where to stream new, popular & upcoming entertainment with JustWatch.</div>   
        <div className='d-flex justify-content-center mt-5' style={{width:"60%",marginLeft:"20%"}}>
        <button type="button" className="btn btn-warning fs-5 fw-bold py-3 px-5">Discover Movies & TV shows</button>
        <button type="button" className="btn btn-outline-secondary fs-5 fw-bold py-3 px-5 ms-5" >Features</button>
        </div>
        </div>
        </>
    )
}
export default Header