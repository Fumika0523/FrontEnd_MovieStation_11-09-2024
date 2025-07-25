import { url } from '../../../utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWishlist } from '../../../utils/WishCartSlice';
import MovieActionButtons from '../MovieActionButtons';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import WishMovieCard from "./WishMovieCard";
import {setCart} from '../../../utils/cartSlice'

const WishlistDisplay = ({ mode }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(store => store.wishlist.wishItems);
  const cart = useSelector(store =>store.cart.cartItems)
  console.log(cart,"wishdisplay")
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  console.log("1213",wishlist)
  
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

  return (
    <>
      <Container fluid>
        <Row className="my-3 mx-auto mx-md-2 justify-content-between align-items-center">
          <Col lg={3} className="text-start ps-sm-4 pt-3 d-flex align-items-center fs-4 ">
            <FaHeart className="me-1 text-danger fs-2" /> My Wishlist
          </Col>
          <Col lg={9} className='sticky-top'>
            <MovieActionButtons
              mode={mode}
              navigate={navigate}
              wishlistCount={wishlist?.length}
              cartCount={cart?.length}
            />
          </Col>
        </Row>

        {wishlist?.length === 0 ? (
          <div className="position-relative mt-2" style={{ width: "100%" }}>
            <img
              src="https://img.freepik.com/premium-photo/black-clapperboard-clap-board-movie-slate-use-video-production-film-cinema-industry-black-background_335640-1294.jpg"
              className="w-100"
              alt="Empty Wishlist"
              style={{ filter: "brightness(50%)", maxHeight: "430px", objectFit: "cover" }}
            />
            <h4 className="text-white opacity-75 text-center" style={{ position: "absolute", right: "5%", bottom: "10%" }}>
              <span className="text-warning">Your Wishlist is Empty</span>
            </h4>
          </div>
        ) : (
          wishlist?.map((element, index) => (
            <WishMovieCard 
            {...element} //display data
            key={index}
            element={element} //1 element
            mode={mode}
            isWished={true} />
          ))
        )}
      </Container>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default WishlistDisplay;