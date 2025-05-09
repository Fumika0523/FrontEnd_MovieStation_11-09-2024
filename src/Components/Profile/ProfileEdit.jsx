import axios from "axios"
import { useEffect, useState } from "react"
import { url } from "../../utils/constant"
import { useNavigate } from "react-router-dom"
import { FaPencilAlt } from "react-icons/fa";import { Button } from "react-bootstrap"
import ModalProfEdit from "./ModalProfEdit";

function ProfileEdit(){
const navigate = useNavigate()
//dateString is a parameter, its accpeting the birthdate
const formatDate = (dateString) => {
    const date = new Date(dateString); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // showing only year, month, day in number
    return date.toLocaleDateString('en-US', options); // show in US date style
    };

const [ProfileData,setProfileData] = useState([])
const [showModal,setShowModal] = useState(false)
const token = sessionStorage.getItem('token')
console.log(token)

let config = {
    headers:{
        Authorization: `Bearer ${token}`
    }
}

const getProfileData=async()=>{
    console.log("User Data is called...")
    let res = await axios.get(`${url}/profile`,config)
    console.log("res.data.ProfileData",res.data.ProfileData)
    setProfileData(res.data.ProfileData)
}
useEffect(()=>{
    getProfileData()
},[]) // API call has to be made inside useEffect() only
console.log("ProfileData",ProfileData)

//destructuring of the object
const {email,password,name,lastname,phone_number,gender} = ProfileData

const handleProfEditClick = (ProfileData)=>{
    setShowModal(true)
    setProfileData(ProfileData)
}

console.log(lastname)

    return(
        <>  
        <div  className="sign_up_in_container py-5 col-md-6 col-11 row mx-auto my-4 px-5">
              {/* Top Section */}
              <div className='fs-2 fw-bold text-center mb-3'>Edit Profile</div>
      
              {/* Basic Info */}
            <div className='p-3 mb-4
            row border border-secondary-subtle d-flex flex-row rounded ' >
            <div className="d-flex justify-content-between mb-3">
            <div className='fw-bold pb-2 fs-5'>Personal Info
            </div>
            <Button variant="success" className="px-3 py-0 "
              onClick={()=>handleProfEditClick(ProfileData)}><FaPencilAlt className="m-0"/>
            </Button>                  
                </div>
               
                {/* FirstName */}
                <div className='d-flex flex-column justify-content-center col-sm-4  align-items-center' >
                <div className="text-secondary   " style={{fontSize:"14px"}}>First Name</div>
                <div style={{fontSize:"18px"}}
                >{name}</div>
                </div>

                {/* LastName */}
                <div className='d-flex flex-column justify-content-center col-sm-4  align-items-center' >
                <div className=" text-secondary" 
                style={{fontSize:"14px"}}>Last Name</div>
                <div style={{fontSize:"18px"}}
             >{lastname}</div>
                </div>
                
                {/* Gender*/}
                  <div className='d-flex flex-column justify-content-center col-sm-4  align-items-center' >
                  <div className=" text-secondary"
                  style={{fontSize:"14px"}}
                  >Gender</div>
                  <div style={{fontSize:"18px"}}  >{gender}</div>
                  </div>

                 {/* Gender
                 <div className='justify-content-start  align-items-center d-flex flex-column col-sm-3 '>
                  <div className=" text-secondary"
                  style={{fontSize:"14px"}}
                  >Age</div>
                  <div style={{fontSize:"18px"}} >{age}</div>
                  </div> */}
              
            </div>
      
              {/* Contact info */}
              <div className='p-3 row border border-secondary-subtle d-flex flex-row rounded mb-4' >
                  <div className='fw-bold pb-2 fs-5'>Contact info</div>

                <div className='justify-content-start  align-items-start d-flex flex-column col-sm-7'>
                <div className=" text-secondary"
                  style={{fontSize:"14px"}}>Email</div>
                <div style={{fontSize:"18px"}} onClick={()=>{navigate('/genderform')}} >{email}</div>
                  </div>
                <div className='justify-content-start  align-items-start d-flex flex-column col-sm-5'>
                    <div className=" text-secondary"
                  style={{fontSize:"14px"}} >Phone</div>
                <div style={{fontSize:"18px"}} onClick={()=>{navigate('/genderform')}} >{phone_number}</div>
                  </div>
              </div>
                                
                {/* Password */}
                <div className='p-3 mb-4 row border border-secondary-subtle d-flex flex-row rounded ' >
                  <div
                  onClick={()=>{navigate('/passwordform')}} className="fs-5 fw-bold">Password</div>
                  <p className="text-secondary" >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                  <div style={{fontSize:"12.5px"}}>Last changed Jul 19,2023</div>
              </div>
              <div className='justify-content-end align-items-center d-flex flex-row rounded ' >
              <Button variant="secondary" 
              className="px-3"
              onClick={()=>navigate('/')} >Back</Button>
              </div>
        </div>
    
    {showModal && (
      <ModalProfEdit
      showModal={showModal}
      setShowModal={setShowModal}
      ProfileData={ProfileData} 
      setProfileData={setProfileData} 
  />
    )}
    

        </>
    )
}

export default ProfileEdit

