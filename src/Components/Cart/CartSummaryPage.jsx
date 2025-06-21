import { useDispatch, useSelector } from "react-redux"
import CartCard from "./CartCard";
import { useEffect, useState } from "react"
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../utils/constant";
import { removeAllItems } from "../../utils/cartSlice";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

function CartSummaryPage() {
  const infoNotify = () => toast.success('Signin page is loading', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
    });
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const [sum,setSum]=useState(0)
    const cart = useSelector(store=>store.cart.cartItems)
    console.log(cart)
    
    useEffect(()=>{
        if(cart){
          const total=cart.reduce((acc,cv)=>acc+cv.amount,0)
          console.log(total)
          setSum(total)
        }
      },[])

      const token=sessionStorage.getItem('token')
  
      let config={
        headers:{
          Authorization:`Bearer ${token}`
        }
      }

      const handleAddOder= async () => {
        if (!token) {
          infoNotify() 
          navigate("/signin"); // Redirect to signin if no token
          return;
        }
        console.log("OrderPage");
        console.log(cart);

        try {
          let res = await axios.post(`${url}/addorder`, { movies: cart }, config);
          console.log(res);
          if (res.status === 200) { // Success response
            await axios.delete(`${url}/clearcart`, config); // Clear cart in DB
            dispatch(removeAllItems()); // Clear Redux store
            navigate(`/ordersummary`);
          }
        } catch (error) {
          console.error("Error processing order:", error);
        }
      };
        
        const formatDate = (dateString) =>{
          // console.log(dateString)
          const date = new Date (dateString)
          // console.log(date)
          return date.toLocaleDateString('en-US',{
              year:"numeric",
              month:"short",
              day:"numeric"
          })
         }

        const currentDate = new Date ()
       //  console.log("Today' Date", currentDate)
         const Today = formatDate(currentDate)
      //   console.log(Today)
        
      return (
        <>
          <div className=" w-100 row mx-auto">
                {/* <h1 className=" py-1">Cart Page</h1> */}
                <div className="text-start  border-primary py-1 fs-5 text-secondary">Date: <span className="text-white">{Today}</span></div>
                <div className="border-top border-secondary">
                    {
                        cart?.map((element,index) =>
                        <CartCard {...element} key={element._id} element={element}  />)
                    }
                    <div style={{width:"40%"}} className="ms-auto  mb-4 mt-3  ">
                    {/* Dotted underline */}
                    <div style={{ borderBottom: "1px dotted grey"}}>
                    </div>
                    <div className="d-flex me-2 justify-content-between " >
                        <div className="">Total: </div>
                        <div className=" text-secondary">$ {sum}</div>
                        </div>  
                        </div>
                        
                        <div className="d-flex justify-content-end align-items-center">
                        <Button variant="warning" className="d-flex justify-content-cente align-items-center text-nowrap my-3" 
                         onClick={() => {handleAddOder()}} ><BsFillCartCheckFill className=" fs-3 me-1"/><span className="fs-6">Order Now</span> </Button>       
                </div>
                </div>
                </div>
            </>
            )
          }
            export default CartSummaryPage