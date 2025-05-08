import Service_TopDesign from './Service_TopDesign'
import Service_MiddleDesign from './Service_MiddleDesign'
import Service_BottomDesign from './Service_BottomDesign'

function Service_Section({mode}){
    return(
        <>
        <div className=" gap-2 mt-5 d-flex flex-column px-2" >
             {/* {shouldRenderHeader && <Header/>} */}
      
             <div className='fs-2 mb-1 text-center'>MovieStation Apps for Smartphone&TV</div>
             {/*  <Service_TopDesign/> */}
            <div className=''>
            <h3 className='text-white text-center'>Introducing: features & functions</h3>
            </div>
            {/* <hr /> */}
            <Service_MiddleDesign/>
            <hr className="text-secondary"/>
            <Service_BottomDesign/>
        </div>
        </>
    )
}
export default Service_Section