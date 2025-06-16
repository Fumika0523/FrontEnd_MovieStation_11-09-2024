
function AboutUs_BottomDesign({info,mode}){
    return(
        <>
    <div className="ps-lg-4 col-lg-4 col-md-12 mb-5 text-center"
    style={{ color: mode == "light" ? "rgb(56, 57, 58)" : "rgb(109, 112, 114)"}}>
        {info}
    </div>
        </>
    )
}
export default AboutUs_BottomDesign 