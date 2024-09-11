function AboutUs_TopDesign ({design,imgUrl,heading1,heading2,textSummary,btnComment}){
    return(
        <>
    <div className={design}>
    {heading1}
        <div>
    {heading2}
        </div>
    <img src={imgUrl} alt="" style={{width:"50%",height:"250px"}} className="my-4"/>
    <p className="fs-6">
        {textSummary}
    </p>
    <button type="button" className="btn btn-secondary fs-5 mt-4">{btnComment}</button>
    </div>
        </>
    )
}
export default AboutUs_TopDesign