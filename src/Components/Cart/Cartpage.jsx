import { useDispatch, useSelector } from "react-redux"
import CartCard from "./CartCard"
import { removeItem, removeLastItem,removeFirstItem } from "../utils/cartSlice"


function Cartpage(){
    const cartItems=useSelector(store=>store.cart.items)
    console.log(cartItems)

    
    //
    const dispatch = useDispatch()
    const handleClearitem=()=>{
        dispatch(removeItem())
    }

    const handleRemoveLastItem=()=>{
        dispatch(removeLastItem())
    }

    const handleRemoveFirstItem=()=>{
        dispatch(removeFirstItem())
    }

    return(
        <>
        <div style={{border:"2px solid grey"}}>
        {/* My Cart */}
        <h2>My Cart</h2>
        {/* Clear Cart */}
        <button onClick={()=>{
            handleClearitem()
        }}>Clear Cart1</button>

        {/*Remove 1 item from last  */}
        <button onClick={()=>{
            handleRemoveLastItem()
        }} className="btn btn-warning">Remove 1 item from last</button>


        {/* Remove 1 item from beginning */}
        <button onClick={()=>{
            handleRemoveFirstItem()
        }}>Remove 1 item from beginning</button>


           {/* <div>CartPage</div> */}
        <div className="d-flex m-2 flex-wrap">
        {
            cartItems.map((element,index)=><CartCard {...element}/>
        )
         }
        </div>
        </div>
         </>
    )
}
export default Cartpage


// Check some cart page, template 