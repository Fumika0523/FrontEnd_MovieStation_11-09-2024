import { useDispatch, useSelector } from "react-redux"
import { removeAllItems,cartAddItem,setCart } from "../../utils/cartSlice"
import { useNavigate } from "react-router-dom"
import CartSummaryPage from "./CartSummaryPage";
import axios from "axios";
import { url } from "../../utils/constant";
import { Button, Image } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import MovieActionButtons from "../Movie/MovieActionButtons"
import { useEffect } from "react";
import { setWishlist } from '../../utils/WishCartSlice';


function Cartpage({mode}) {
    const cart = useSelector(store => store.cart.cartItems || [])
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const token = sessionStorage.getItem('token')
    const wishlist = useSelector(store => store.wishlist.wishItems || []);
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const handleClearitem = async () => {
        let res = await axios.delete(`${url}/clearcart`,config)
        console.log(res)
        if (res.data) {
            console.log("Clear cart call")
            dispatch(removeAllItems())
        }
    }
  console.log("1213wishlist",wishlist)
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${url}/wish-list`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log(response.data.wishData)

        if (response.data.wishData) {
          dispatch(setWishlist(response.data.wishData)); 
          console.log("Wishlist:", response.data);
        } else {
          dispatch(setWishlist([])); // wrap empty
        }
      } catch (error) {
        console.error("Failed to load wishlist", error);
        dispatch(setWishlist([]));
      }
    };

    if (token) {
      fetchWishlist();
    }
  }, [dispatch, token]);


    // const handleRemoveLastItem = () => {
    //     dispatch(removeLastItem())
    // }
    // const handleRemoveFirstItem = () => {
    //     dispatch(removeFirstItem())
    // }  

    useEffect(()=>{
    const getCartData=async()=>{
      try{
        let response = await axios.get(`${url}/cart`,{
        headers:{Authorization:`Bearer ${token}`}
        })
        console.log(response.data.cartData)
        if(response.data.cartData){
          dispatch(setCart(response.data.cartData))
          console.log("cart",response.data)
        } else{
          dispatch(setCart([]))
        }
      }catch(error){
        console.error("Failed to load Cart",error);
        dispatch(setCart([]))
      }
    }

    if(token){
      getCartData()
    }
  },[dispatch,token])

        // //response in res.data >> moviedata
        // console.log("getCartData",res);
        // if(res.data && res.data.cartData){
        // dispatch(removeItem());
        //clearing existing cart items from store
        // res.data.cartData.map((element)=>dispatch(cartAddItem(element)))
    //}

    

    return (
        <>
            <div className="row mx-auto px-4 border-primary  border-3 pt-4">
                <MovieActionButtons
                    mode={mode}
                    navigate={navigate}
                    wishlistCount={wishlist?.length || 0}
                    cartCount={cart?.length || 0}

                    />
                <div className="col-lg-7 col-md-8 col-sm-10 col-11 mx-auto my-3 rounded" 
                >
                <div className="justify-content-start my-3  mx-auto fs-2  d-flex flex-row ">
                    <FaShoppingCart className="text-warning fs-1 me-1"/>
                    <div className="fs-3">Your Shopping Cart</div>
                </div>
        
                {/* Back */}
                {
                    cart?.length === 0 ?
                    <div className="d-flex justify-content-end align-items-center"> 
                    <Button variant="none"
                    style={{
                    backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47, 0.52)",
                    color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
                    }}className="text-nowrap" onClick={() => navigate('/allmovies')}> 
                    <IoChevronBackOutline className="fs-4 me-1"/> Back to All Movies</Button>
                     </div>
                       
                            :
                        <div  className="mb-2 d-flex align-items-center justify-content-end flex-row gap-3"> 
                        {/* CLEAR CART */}
                          <Button variant="danger" onClick={() => {
                                handleClearitem()
                         }} >Clear Cart</Button>

                        {/* BACK */}
                        <Button variant="none"
                           style={{
          backgroundColor: mode === "light" ? "white" : "rgba(45, 45, 47)",
          color: mode === "light" ? "black" : "rgba(209, 209, 213, 0.63)",
        }}
          onClick={() => navigate('/allmovies')}> <IoChevronBackOutline className="fs-4 me-1"/>  Back to All Movies</Button>                   </div>  
                }
    
        
            <div className="mx-auto  border-danger d-flex flex-column justify-content-center ">
                {
                    cart?.length === 0 ? (
                               <>
                <div className="fs-1 fw-bold text-center">Your Cart is Empty !!</div>
                <Image className="mx-auto"
                src={"https://images-prod.dazeddigital.com/1280/azure/dazed-prod/1100/3/1103540.jpg"} 
                style={{objectFit:"cover",width:"100%", height:"auto"}} />
                </> 
                    )
    
                :
                (
                <>
                    <CartSummaryPage/>
                </>
                )
           
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
