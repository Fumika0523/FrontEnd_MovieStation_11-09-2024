function AboutUs_ImageBanner ({appName,cardText}){
    return(
        <>
  <div className="d-flex justify-content-center mt-2">
        <div className="card bg-transparent text-center text-white"  style={{width:"85%",height:"400px"}}>
        <img src="https://img.pikbest.com/wp/202405/tv-console-contemporary-displaying-a-modern-smart-in-sleek-living-room-with-dark-flooring-3d-rendered_9845708.jpg!bw700"
        s="card-img" alt="..."  style={{height:"400px"}}/>
        <div className="card-img-overlay mt-2">

       {appName && <h1><i className="fa-solid fa-couch  text-warning"></i><i className="fa-solid fa-wine-glass text-warning"></i> MovieStation</h1>}

        <h3 className="card-text">{cardText}</h3>
        </div>
        </div>
    </div>
        </>
    )
}
export default AboutUs_ImageBanner