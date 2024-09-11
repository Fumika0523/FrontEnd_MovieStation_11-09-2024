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
        {/* Clear Cart */}
        <button onClick={()=>{
            handleClearitem()
        }}>Clear Cart</button>

        {/*Remove 1 item from last  */}
        <button onClick={()=>{
            handleRemoveLastItem()
        }} >Remove 1 item from last</button>


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
         </>
    )
}
export default Cartpage