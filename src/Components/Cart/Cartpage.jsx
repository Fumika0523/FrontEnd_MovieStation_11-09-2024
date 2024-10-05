import { useDispatch, useSelector } from "react-redux"
import { removeItem, removeLastItem, removeFirstItem } from "../../utils/cartSlice"
import { useNavigate } from "react-router-dom"
import OrderPage from "./OrderPage"
import { Button } from '@mui/base/Button';
import axios from "axios";
import { url } from "../../utils/constant";
import AboutUs_ImageBanner from "../AboutUs_page/AboutUs_ImageBanner";



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
        let res = await axios.delete(`${url}/deletecart`, config)
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
            <div style={{ border: "2px solid grey", padding: "1%", width: "70%", margin: "3% 15%", borderRadius: "2%" }}>
                <h2 className="text-center"><i class="fa-solid fa-bag-shopping me-1 text-warning  fs-1"></i>Your Shopping Cart</h2>

                {/* Back */}
                {
                    cartItems.length === 0 ?
                        <Button onClick={() => navigate('/allmovies')} className="btn btn-secondary" style={{ marginLeft: "8%" }} >Back to All Movies</Button> :
                        <Button onClick={() => navigate('/allmovies')} className="btn btn-secondary">Back to All Movies</Button>
                }

                {/* Clear Cart */}

                {
                    cartItems.length === 0 ?
                        <></> :
                        <>
                            <Button onClick={() => {
                                handleClearitem()
                            }} className="btn btn-primary">Clear Cart</Button>
                        </>
                }


                {/*Remove 1 item from last  */}

                {
                    cartItems.length === 0 ?
                        <></> :
                        <Button className="btn btn-secondary" onClick={() => {
                            handleRemoveLastItem()
                        }} >Remove 1 item from last</Button>
                }

                {/* Remove 1 item from beginning */}

                {
                    cartItems.length === 0 ?
                        <></> :
                        <Button className="btn btn-secondary" onClick={() => {
                            handleRemoveFirstItem()
                        }}>Remove 1 item from beginning</Button>
                }

                {
                    cartItems.length === 0 ?
                        <AboutUs_ImageBanner banner={"https://img.buzzfeed.com/buzzfeed-static/static/2021-10/23/0/asset/50c4363d5d1a/sub-buzz-943-1634947235-19.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto"} cardText={"The Cart is Empty🛒...!!!!" } /> :
                        <>
                            <OrderPage />
                        </>
                }

            </div>
        </>
    )
}
export default Cartpage

// EMpty image
