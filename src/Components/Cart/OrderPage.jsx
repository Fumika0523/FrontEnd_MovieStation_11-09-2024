import { useSelector } from "react-redux"
import  ShoppingCard from './ShoppingCard'
import { useEffect, useState } from "react"
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function OrderPage() {
    const navigate=useNavigate()

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

    return (

        <>
            <div className="mx-4">
                <h1 className=" py-1">Cart Page</h1>
                <div className="text-start py-1 text-secondary">Date: <span className="text-white">Feb 16,2022</span></div>
                <div className="border-top border-secondary">

                    {
                        cartItems.map((element) => <ShoppingCard {...element} />)
                    }
                    <div style={{width:"40%"}} className="ms-auto ">
                    <div className="text-start py-3 fs-4" >Cart Summary</div>
                    {/* Dotted underline */}
                    <div style={{ borderBottom: "1px dotted grey"}}>
                    </div>

                    <div className="d-flex justify-content-between fs-5" >
                        <div>Total: </div>
                        <div> {sum}</div>
                    </div>   
                    </div>
                    <button className="btn btn-warning  mt-4 mb-3 px-4 fs-5 text-nowrap" style={{marginLeft:"84%"}} onClick={() => navigate('/ordersummary')} ><BsFillCartCheckFill className="pe-1 fs-2"/>Order Now </button>             
                </div>
                </div>
            </>
            )
}
            export default OrderPage


// OrderSumary