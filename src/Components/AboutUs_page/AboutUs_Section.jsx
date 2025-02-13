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
        textSummary:"We show you where you can legally watch movies and TV shows that you love. You are kept up to date with what is new on Netflix, Amazon Prime, Apple TV and many other streaming platforms. Our simple filter system allows you to see only what is important to you. We also allow users to track their favorite shows and movies, and can notify you when a title is available on one of your services..",
        btnComment:"Learn more about our apps",
        design:"text-end fs-2"
    },
    {
        heading1:"For our clients",
        heading2:"Next generation movie marketing",
        imgUrl:"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWElMjBzdHJlYW1pbmd8ZW58MHx8MHx8fDA%3D",
        textSummary:"JustWatch Media helps Entertainment brands around the world get to grips with new challenges and opportunities. From blockbuster movies, award winning shows, major sporting events and console games, we buy media for our clients across the major digital platforms. We offer our clients something no one else can, media buying based on audience content tastes.",
        btnComment:"Learn more about our marketing campaigns",
        design:"fs-2 ",
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

    function AboutUs_Section(){
        const navigate=useNavigate()

    return(
        <>
  
    <AboutUs_ImageBanner banner ={"https://i.redd.it/d1vjsn34bht01.jpg"} appName="MovieStation" cardText="Connecting movie fans with their favourite content worldwide"/>

    <div className="container-fluid "
    // style={{border:"4px solid red"}}
    >
        {/* 1st */}
        <div className=" row">
        <h1 className="d-flex justify-content-center align-items-center my-3 "> What we do</h1>
        </div>
        <div className="row">
            <div className="d-flex justify-content-center align-items-center gap-4">
        {
            //Spread Operator
            topDesignData.map((element)=><AboutUs_TopDesign {...element}/>)
        }

            </div>
        </div>
        <div className="row">
             <h3 className= "text-center my-5">WE WANT HEAR FROM YOU</h3>
        </div>
         {/* Last Section */}
         {/* <div className="container-fluid"> */}
                {
                    bottomDesignData.map((element)=><AboutUs_BottomDesign {...element}/>)
                }
        <div  className="d-flex justify-content-center">        
        <Button variant="secondary" className="fs-5 py-2 px-5" onClick={()=>{navigate('/contact')}} >Contact to MovieStation</Button>
        </div>
        </div>
    {/* </div> */}
        </>
    )
}
export default AboutUs_Section


//update the img and the text on What we do.
//Last section, call 3 times for the 3 cols, map method.
//className also you can pass as prop.