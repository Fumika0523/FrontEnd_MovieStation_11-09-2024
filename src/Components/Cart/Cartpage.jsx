import { useDispatch, useSelector } from "react-redux"
import { removeItem, removeLastItem,removeFirstItem } from "../../utils/cartSlice"
import { useNavigate } from "react-router-dom"
import OrderPage from "./OrderPage"
import { Button } from '@mui/base/Button';

function Cartpage(){
    const cartItems=useSelector(store=>store.cart.items)
    console.log(cartItems)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClearitem=async()=>{
        let res = await axios.delete(`${url}/deletecart`,config)
        console.log(res)
        if(res.data){
            dispatch(removeItem())
        }
    }

    const handleRemoveLastItem=()=>{
        dispatch(removeLastItem())
    }
    const handleRemoveFirstItem=()=>{
        dispatch(removeFirstItem())
    }

    return(
        <>
        <div style={{border:"2px solid grey",padding:"1%",textAlign:"center",width:"70%",margin:"3% 15%",borderRadius:"2%"}}>
        <h2><i class="fa-solid fa-bag-shopping me-1 text-warning fs-1"></i>Your Shopping Cart</h2>

        {/* Back */}
        <Button onClick={() => navigate('/allmovies')} className="btn btn-secondary">Back to All Movies</Button>

        {/* Clear Cart */}
        <Button onClick={()=>{
            handleClearitem()
        }} className="btn btn-primary">Clear Cart</Button>

        {/*Remove 1 item from last  */}
        <Button className="btn btn-secondary" onClick={()=>{
            handleRemoveLastItem()
        }} >Remove 1 item from last</Button>

        {/* Remove 1 item from beginning */}
        <Button className="btn btn-secondary" onClick={()=>{
            handleRemoveFirstItem()
        }}>Remove 1 item from beginning</Button>

        <OrderPage/>
    </div>
         </>
    )
}
export default Cartpage