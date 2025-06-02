import AboutUs_TopDesign from "./AboutUs_TopDesign"
import AboutUs_BottomDesign from "./AboutUs_BottomDesign"
import AboutUs_ImageBanner from "./AboutUs_ImageBanner"
import { useNavigate } from 'react-router-dom'
import { Button } from "react-bootstrap"

const topDesignData=[
    
    {
        heading1:"For our users",
        heading2:"Apps for movie & TV show fans",
        imgUrl:"https://images.unsplash.com/photo-1615986200762-a1ed9610d3b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHR2JTIwc2NyZWVufGVufDB8fDB8fHww",
        textSummary:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        btnComment:"Learn more about our apps",
        design:" fs-3 col-lg-5 col-md-11 col-sm-10 d-flex col-11 flex-column gap-2 pb-sm-5 text-center"
    },
    {
        heading1:"For our clients",
        heading2:"Next generation movie marketing",
        imgUrl:"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWElMjBzdHJlYW1pbmd8ZW58MHx8MHx8fDA%3D",
        textSummary:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        btnComment:"Learn more about our marketing campaigns",
        design:"text-start  fs-3 -4 -warning col-lg-5 col-md-11 col-sm-10 col-11 d-flex flex-column gap-2 text-center",
    }
]

const bottomDesignData=[
    {
        info:"We work tirelessly to make the experience of using our apps that it can be and we love any feedback/suggestions you may have in order for us to improve further."
    },
    {
        info:"If you would like to find out more about opportunities to work with us, visit our talent page, we are always looking to get more skilled and inspired people on our team."
    },
    {
        info:"If you are interested in running campaigns with us for your upcoming movie, home entertainment release or VOD service we are happy to hear from you."
    }
]

    function AboutUs_Section({mode,setMode}){
        const navigate=useNavigate()

    return(
        <>
  <div className="mb-5">
    <AboutUs_ImageBanner banner ={"https://static.justwatch.com/backdrop/137681/s1920/Marvels-The-Avengers"} appName="MovieStation" cardText="Connecting movie fans with their favourite content worldwide" className=""/>
    <div className="">
        {/* 1st */}
        <div className="whatwedo   mx-lg-5  mx-sm-0 py-5 my-md-0 my-4"
        style={{ backgroundColor: mode == "light" ? "white" : "#121212"}}
        >
        <h1 className="d-flex justify-content-center align-items-center mb-3" 
        > WHAT WE DO</h1>
         <div className="d-flex row mx-auto justify-content-center gap-3   ">
        {
            //Spread Operator
            topDesignData.map((element)=><AboutUs_TopDesign {...element}/>)
        }
            </div>
        </div>
    </div>
    {/* 2nd */}
        <div className="col-10 com-md-8 mx-auto" style={{marginTop:"-20%"}}>
        <div >
             <div className= " fs-3 fw-bold mx-auto text-center w-100 mb-5 "
             >WE WANT TO HEAR FROM YOU</div>
        </div>
         {/* Last Section */}
         <div className="row d-flex flex-row justify-content-between">
                {
                    bottomDesignData.map((element)=><AboutUs_BottomDesign {...element}/>)
                }
        <div  className="d-flex  justify-content-center">        
        <Button variant="secondary" className="fs-5 pb-2 px-5" onClick={()=>{navigate('/contact')}} >Contact to info@moviestation.com</Button>
        </div>
        </div>
    </div>
    </div>
        </>
    )
}
export default AboutUs_Section