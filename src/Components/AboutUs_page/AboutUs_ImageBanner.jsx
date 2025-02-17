function AboutUs_ImageBanner ({appName,cardText,banner}){
    return(
        <>
  <div className="d-flex justify-content-center container-fluid "
  style={{border:"2px solid red"}}
   >
        <div className="card bg-transparent text-center text-white col-10 " 
         style={{border:"2px solid red"}}
         >
        <img src={banner} 
        s="card-img" alt="..."  style={{height:"400px"}}/>
        <div className="card-img-overlay mt-2">

       {appName && <h1 className="text-warning"><i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass text-warning"></i> MovieStation</h1>}

        <h3 className="card-text">{cardText}</h3>
        </div>
        </div>
    </div>
        </>
    )
}
export default AboutUs_ImageBanner