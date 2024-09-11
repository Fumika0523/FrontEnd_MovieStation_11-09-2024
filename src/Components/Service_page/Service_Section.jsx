import Service_TopDesign from './Service_TopDesign'
import Service_MiddleDesign from './Service_MiddleDesign'
import Service_BottomDesign from './Service_BottomDesign'

function Service_Section (){
    return(
        <>
        <div>
             {/* {shouldRenderHeader && <Header/>} */}
            <div className='fs-2 text-center mt-4'>MovieStation Apps for Smartphone&TV</div>
            <Service_TopDesign/>
            <h3 className='text-white text-center mt-5'>Introducing: features & functions</h3>
            <hr />
            <Service_MiddleDesign/>
            <hr className="text-secondary"/>
            <Service_BottomDesign/>
        </div>
        </>
    )
}
export default Service_Section