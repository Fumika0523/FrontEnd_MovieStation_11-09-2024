import phoneImage from '../../assets/phoneImage.webp'

function Service_MiddleDesign(){
    return(
        <>
   <div className="d-flex">
        {/* Left Side */}
        <div className=" d-flex justify-content-center align-items-center flex-column gap-5  text-center col-lg-4 col-md-12 mb-3 ">
            <div className="d-flex flex-column  justify-content-center  mx-4 ">
            <div className="text-warning fs-5">What's new</div>
            <div className="fs-5">Never miss new releases of your streaming providers</div>
            </div>
            <div className="d-flex flex-column mx-2">
            <div className="text-warning fs-5">What's hot</div>
            <div className="fs-5">Discover the most popular movies and TV shows</div>
            </div>
        </div>
        {/* Middle */}
       <div className="d-flex justify-content-center col-lg-4 my-md-4 col-md-12 mb-3">
        <img className="phoneImg" src={phoneImage} alt="" 
        />
        </div>

        {/* Right Side */}
        <div className=" d-flex justify-content-center flex-column gap-5 col-lg-4 col-md-12 text-center b mb-3">
        <div className=" d-flex flex-column  mx-4">
            <div className="text-warning fs-5">Price Drops</div>
            <div className="fs-5">Appsclusive - Find the best rent/buy deals every day</div>
        </div>
        <div className="d-flex flex-column  mx-4">
          <div className="text-warning fs-5">WatchList</div>
          <div className="fs-5">Discover the most popular movies and TV shows</div>
        </div>
        </div> 
    </div>
    </>
    )
}
export default Service_MiddleDesign