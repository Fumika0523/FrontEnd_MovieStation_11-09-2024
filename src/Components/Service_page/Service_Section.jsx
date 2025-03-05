import Service_TopDesign from './Service_TopDesign'
import Service_MiddleDesign from './Service_MiddleDesign'
import Service_BottomDesign from './Service_BottomDesign'

function Service_Section (){
    return(
        <>
        <div className=" gap-2 my-5 d-flex flex-column" >
             {/* {shouldRenderHeader && <Header/>} */}
      
             <div className='fs-2 mb-5 text-center'>MovieStation Apps for Smartphone&TV</div>
             {/*  <Service_TopDesign/> */}
            <div className=' mt-5'>
            <h3 className='text-white text-center'>Introducing: features & functions</h3>
            </div>
            <hr />
            <Service_MiddleDesign/>
            <hr className="text-secondary"/>
            <Service_BottomDesign/>
        </div>
        </>
    )
}
export default Service_Section