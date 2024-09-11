import { useNavigate } from 'react-router-dom'
import React from 'react'

function AboutUs(){
  const navigate=useNavigate()

    return(
        <>
    <div className="d-flex justify-content-center">
      <div className="card text-center text-white"  style={{width:"90%",height:"400px"}}>
      <img src="https://images.unsplash.com/photo-1586899028174-e7098604235b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2hpbmclMjB0dnxlbnwwfHwwfHx8MA%3D%3D"
        s="card-img" alt="..."  style={{width:"100%",height:"400px",opacity:"85%"}}/>
     <div className="card-img-overlay">
     <h1><i className="fa-solid fa-couch"></i><i  className="fa-solid fa-wine-glass"></i> MovieStation</h1>
      <h3 className="card-text">Connecting movie fans with their favorite content worldwide</h3>
      </div>
    </div>
    </div>
    
  <div className="row align-items-center p-5">
    <h1 className="text-center pb-4"> What we do</h1>
    {/* 1st section */}
    <div className="col fs-4 text-end">
    For our users
    <div className="text-end">
    Apps for movie & TV show fans
    </div>
    <img src="https://images.unsplash.com/photo-1615986200762-a1ed9610d3b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHR2JTIwc2NyZWVufGVufDB8fDB8fHww" alt="" style={{width:"50%x",height:"250px"}} className="my-4"/>
    <p className="fs-6">
    We show you where you can legally watch movies and TV shows that you love. You are kept up to date with what is new on Netflix, Amazon Prime, Apple TV and many other streaming platforms. Our simple filter system allows you to see only what is important to you.
    We also allow users to track their favorite shows and movies, and can notify you when a title is available on one of your services..
    </p>
    <button type="button" className="btn btn-secondary mt-4">Learn more about our apps</button>

    </div>
    {/* 2nd section*/}
    <div className="col fs-4 text-start">
    For our clients
    <div className="text-start">
    Next generation movie marketing
    </div>
    <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWElMjBzdHJlYW1pbmd8ZW58MHx8MHx8fDA%3D" alt="" style={{width:"320px",height:"250px"}} className="my-4"/>
    <p className="fs-6">
    JustWatch Media helps Entertainment brands around the world get to grips with new challenges and opportunities. From blockbuster movies, award winning shows, major sporting events and console games, we buy media for our clients across the major digital platforms. We offer our clients something no one else can, media buying based on audience content tastes.
    </p>
    <button type="button" className="btn btn-secondary mt-4 ">Learn more about our marketing campaigns</button>
    </div>
    {/* last section */}
    <h4 className= "text-center py-4">WE WANT HEAR FROM YOU</h4>
    <div className="col">
    We work tirelessly to make the experience of using our apps the best that it can be and we love any feedback or suggestions you may have in order for us to improve further.
    </div>
    <div className="col">
    If you would like to find out more about opportunities to work with us, visit our talent page, we are always looking to get more skilled and inspired people on our team.
    </div>
    <div className="col">
    If you are interested in running campaigns with us for your upcoming movie, home entertainment release or VOD service we are happy to hear from you.
    </div>
    <button type="submit" className="btn btn-secondary"  onClick={()=>{navigate('/contact')}} >Contact us</button>
    </div>
            </>
    )
}
export default AboutUs