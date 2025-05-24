// import { useDispatch, useSelector } from "react-redux"
// import MovieCard from "../MovieCard";
// import { useEffect, useState } from "react"
// import { BsFillCartCheckFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { url } from "../../utils/constant";
// import { removeItem } from "../../utils/wish";
// import { Button } from "react-bootstrap";

// function MyWishList() {
//     const navigate=useNavigate()

//     const dispatch = useDispatch()

//     const [sum,setSum]=useState(0)
// console.log(wishListItem)
    
//     useEffect(()=>{
//         if(wishListItem){
//           const total=wishListItem.reduce((acc,cv)=>acc+cv.amount,0)
//           console.log(total)
//           setSum(total)
//         }
//       },[])

//       const token=sessionStorage.getItem('token')
  
//       let config={
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       }

//       const handleAddOder=async()=>{
//         console.log("WishListPage")
//         console.log(wishListItem)
//         //console.log(movieItem) //the data you going to send to the add order
//         // api call for updating the backend >> saving to the DB
//         // Buy now >> Order Page || Sumary page
//         let res = await axios.post(`${url}/add-my-wish-list`,{movies:wishListItem},config)
//         console.log(res)

//         if(res.status == 200){//success responses
//           await axios.delete(`${url}/clearcart`,config); // delete api call
//           // clear the redux store
//           dispatch(removeItem())
//           navigate(`/allmovies`) 
//         }}
//         const formatDate = (dateString) =>{
//           // console.log(dateString)
//           const date = new Date (dateString)
//           // console.log(date)
//           return date.toLocaleDateString('en-US',{
//               year:"numeric",
//               month:"short",
//               day:"numeric"
//           })
//          }

//         const currentDate = new Date ()
//          console.log("Today' Date", currentDate)
//          const Today = formatDate(currentDate)
//          console.log(Today)
        
//       return (
//         <>
//           <div className=" w-100 row mx-auto">
//                 {/* <h1 className=" py-1">Cart Page</h1> */}
//                 <div className="text-start  border-primary py-1 fs-5 text-secondary">Date: <span className="text-white">{Today}</span></div>
//                 <div className="border-top border-secondary">
//                     {
//                         wishListItem?.map((element,index) =>
//                            <CartCard {...element} key={element._id} />)
//                     }
//                     <div style={{width:"40%"}} className="ms-auto  mb-4 mt-3  ">
//                     {/* Dotted underline */}
//                     <div style={{ borderBottom: "1px dotted grey"}}>
//                     </div>
//                     <div className="d-flex me-2 justify-content-between " >
//                         <div className="">Total: </div>
//                         <div className=" text-secondary">$ {sum}</div>
//                         </div>  
//                         </div>
                        
//                         <div className="d-flex justify-content-end align-items-center">
//                         <Button variant="warning" className="d-flex justify-content-cente align-items-center text-nowrap my-3"  onClick={() => {handleAddOder()}} ><BsFillCartCheckFill className=" fs-3 me-1"/><span className="fs-6">Order Now</span> </Button>       
//                 </div>
//                 </div>
//                 </div>
//             </>
//             )
//           }
//             export default MyWishList