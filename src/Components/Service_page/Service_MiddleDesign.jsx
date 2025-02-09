function Service_MiddleDesign(){
    return(
        <>
   <div className="row "
    // style={{border:"2px solid red"}}
    >
        {/* Left Side */}
        <div className="d-flex justify-content-center flex-column gap-4 col-4">
            <div className="d-flex row flex-column mx-4">
            <div className="text-warning fs-5">What's new</div>
            <div className="fs-5">Never miss new releases of your streaming providers</div>
            </div>
            <div className="d-flex  row mx-4">
            <div className="text-warning fs-5">What's hot</div>
            <div className="fs-5">Discover the most popular movies and TV shows</div>
            </div>
        </div>
        {/* Middle */}
       <div className="d-flex justify-content-center col-4">
        <img className="" src="https://d35v9wsdymy32b.cloudfront.net/v1/images/Nn2zb856sEkgE4TvUqutyF6w.png" alt="" 
        style={{maxWidth:"280px",width:"100%",height:"auto"}}/>
        </div>

        {/* Right Side */}
        <div className=" d-flex justify-content-center flex-column gap-4  col-4">
        <div className=" row flex-column mx-4">
            <div className="text-warning fs-5">Price Drops</div>
            <div className="fs-5">Appsclusive - Find the best rent/buy deals every day</div>
        </div>
        <div className="row flex-column mx-4">
          <div className="text-warning fs-5">WatchList</div>
          <div className="fs-5">Discover the most popular movies and TV shows</div>
        </div>
        </div> 
    </div>
    </>
    )
}
export default Service_MiddleDesign