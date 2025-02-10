import Service_TopDesign from './Service_TopDesign'
import Service_MiddleDesign from './Service_MiddleDesign'
import Service_BottomDesign from './Service_BottomDesign'

function Service_Section (){
    return(
        <>
        <div className="container-fluid my-5 d-flex flex-column" >
             {/* {shouldRenderHeader && <Header/>} */}
             <div className='row'>
             <div className='fs-2  text-center'>MovieStation Apps for Smartphone&TV</div>
             </div>
            <Service_TopDesign/>
            <div className='row'>
            <h3 className='text-white text-center  my-3'>Introducing: features & functions</h3>
            </div>
            <hr />
            {/* <div className='row'> */}
            <Service_MiddleDesign/>
            {/* </div> */}

            <hr className="text-secondary"/>
            <Service_BottomDesign/>
        </div>
        </>
    )
}
export default Service_Section