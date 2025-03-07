import phoneImage from '../../assets/phoneImage.webp'

function Service_MiddleDesign(){
    return(
        <>
   <div className=" -4 d-flex mb-3 row mx-auto col-12">
        {/* Left Side */}
        <div className=" px-4  -primary d-flex justify-content-center mb-4 mb-sm-4 align-items-center flex-column gap-sm-5 gap-4  text-center col-lg-4 col-md-12">
            <div className="d-flex flex-column  justify-content-center mx-4 ">
            <div className="text-warning fs-5">What's new</div>
            <div className="fs-6 text-secondary">Never miss new releases of your streaming providers</div>
            </div>
            <div className="d-flex flex-column mx-2">
            <div className="text-warning fs-5">What's hot</div>
            <div className="fs-6 px-2 text-secondary">Discover the most popular movies and TV shows</div>
            </div>
        </div>
        {/* Middle */}
       <div className="d-flex  align-items-center  mb-4 mb-sm-4  -primary justify-content-center col-lg-4 my-md-4 col-md-12">
        <img className="phoneImg" src={phoneImage} alt="" 
        />
        </div>

        {/* Right Side */}
        <div className=" mt-3 mb-sm-4  -4 -primary d-flex justify-content-center flex-column gap-sm-5 gap-4 col-lg-4 col-md-12 text-center px-5">
        <div className=" d-flex flex-column ">
            <div className="text-warning fs-5">Price Drops</div>
            <div className="fs-6 text-secondary">Appsclusive - Find the best rent/buy deals every day</div>
        </div>
        <div className="d-flex flex-column ">
          <div className="text-warning fs-5">WatchList</div>
          <div className="fs-6 text-secondary">Discover the most popular movies and TV shows</div>
        </div>
        </div> 
    </div>
    </>
    )
}
export default Service_MiddleDesign