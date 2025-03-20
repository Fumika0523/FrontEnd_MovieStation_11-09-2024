import { useDispatch, useSelector } from "react-redux"
import CartCard from "./CartCard";
import { useEffect, useState } from "react"
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../utils/constant";
import { removeItem } from "../../utils/cartSlice";
import { Button } from "react-bootstrap";

function CartSummaryPage() {
    const navigate=useNavigate()

    const dispatch = useDispatch()

    const [sum,setSum]=useState(0)
    const cartItems=useSelector(store=>store.cart.items)
console.log(cartItems)
    
    useEffect(()=>{
        if(cartItems){
          const total=cartItems.reduce((acc,cv)=>acc+cv.amount,0)
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

      const handleAddOder=async()=>{
        console.log("OrderPage")
        console.log(cartItems)
        //console.log(movieItem) //the data you going to send to the add order
        // api call for updating the backend >> saving to the DB
        // Buy now >> Order Page || Sumary page
        let res = await axios.post(`${url}/addorder`,{movies:cartItems})
        console.log(res)

        if(res.status == 200){//success responses
          await axios.delete(`${url}/clearcart`); // delete api call
          // clear the redux store
          dispatch(removeItem())
          navigate(`/ordersummary`) 
        }
      }
      return (
        <>
          <div className=" w-100 row mx-auto">
                {/* <h1 className=" py-1">Cart Page</h1> */}
                <div className="text-start  border-primary py-1 text-secondary">Date: <span className="text-white">Feb 16,2022</span></div>
                <div className="border-top border-secondary">
                    {
                        cartItems?.map((element) => <CartCard {...element} />)
                    }
                    <div style={{width:"40%"}} className="ms-auto ">
                    <div className="text-start pt-3 fs-6 mb-1" >Cart Summary</div>
                    {/* Dotted underline */}
                    <div style={{ borderBottom: "1px dotted grey"}}>
                    </div>

                    <div className="d-flex justify-content-between fs-6" >
                        <div className="mt-1">Total: </div>
                        <div> {sum}</div>
                        </div>  
                        </div>
                        
                        <div className="d-flex justify-content-end">
                        <Button variant="warning" className="d-flex justify-content-cente align-items-center text-nowrap mt-5 mb-3"  onClick={() => {handleAddOder()}} ><BsFillCartCheckFill className=" fs-1 me-1"/>Order Now </Button>
                       
                </div>
                </div>
                </div>
            </>
            )
}
            export default CartSummaryPage


// OrderSumary