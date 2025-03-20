import { useDispatch, useSelector } from "react-redux"
import { removeItem, removeLastItem, removeFirstItem } from "../../utils/cartSlice"
import { useNavigate } from "react-router-dom"
import CartSummaryPage from "./CartSummaryPage";
import axios from "axios";
import { url } from "../../utils/constant";
import { Button, Image } from "react-bootstrap";


function Cartpage() {
    const cartItems = useSelector(store => store.cart.items)
    console.log(cartItems)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = sessionStorage.getItem('token')

    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const handleClearitem = async () => {
        let res = await axios.delete(`${url}/clearcart`)
        console.log(res)
        if (res.data) {
            dispatch(removeItem())
        }
    }

    const handleRemoveLastItem = () => {
        dispatch(removeLastItem())
    }
    const handleRemoveFirstItem = () => {
        dispatch(removeFirstItem())
    }

    return (
        <>
        {/* <div className="container-fluid border border-4 border-warning">  */}
            <div className="row mx-auto  border-primary border-3" >
                <div className="col-lg-8 col-md-8 col-sm-10 col-11 mx-auto my-5 " style={{ border: "2px solid #3b3b3b", borderRadius: "2%" }}>
                <div className="text-center mb-3 mt-2 align-items-center mx-auto fs-2  d-flex flex-row justify-content-center">
                    <i class="fa-solid fa-bag-shopping me-2 text-warning fs-1"></i>
                    <div className="fs-3">Your Shopping Cart</div>
                </div>
                <div className="mb-3  border-primary d-flex align-items-center justify-content-end mx-auto ">
                {/* Back */}
                {
                    cartItems.length === 0 ?
                    
                        <Button variant="secondary" className="d-flex justify-content-end" onClick={() => navigate('/allmovies')}>
                            Back to All Movies</Button> 
                            :

                        <div style={{width:"75%"}} className="mt-3 mx-auto justify-content-end gap-3 d-flex"> 
                          <Button variant="danger" onClick={() => {
                                handleClearitem()
                         }} >Clear Cart</Button>
                        <Button variant="secondary"  className="d-flex justify-content-end" onClick={() => navigate('/allmovies')}>
                            Back to All Movies</Button>
                      
                        </div>  
                }
                </div>
                {/* Clear Cart */}
                {/* {
                    cartItems.length === 0 ?
                        <></> :
                        <>
                        <div className="mb-2 border-3 mx-auto" style={{width:"75%"}}>
                        <Button onClick={() => {
                                handleClearitem()
                            }} className="btn btn-primary">Clear Cart</Button>
                        </div>
                        </>
                } */}

                {/*Remove 1 item from last  */}

                {/* {
                    cartItems.length === 0 ?
                        <></> :
                        <Button className="btn btn-secondary" onClick={() => {
                            handleRemoveLastItem()
                        }} >Remove 1 item from last</Button>
                } */}

                {/* Remove 1 item from beginning */}

                {/* {
                    cartItems.length === 0 ?
                        <></> :
                        <Button className="btn btn-secondary" onClick={() => {
                            handleRemoveFirstItem()
                        }}>Remove 1 item from beginning</Button>
                } */}
            <div className="mx-auto  border-danger d-flex justify-content-center ">
                {
                    cartItems.length === null ?
                    <>
                <div className="fs-1 text-center">Your Cart is Empty !!</div>
                        <Image className="mx-auto"
                         src={"https://images-prod.dazeddigital.com/1280/azure/dazed-prod/1100/3/1103540.jpg"} 
                         style={{objectFit:"cover",width:"100%"}}

                        />
                </> :
                        <>
                            <CartSummaryPage/>
                        </>
                
                }
                </div>
                </div>
            </div>
        {/* </div> */}
        </>
    )
}
export default Cartpage

// EMpty image
//when its 0 in cart, only cart icon should be there
