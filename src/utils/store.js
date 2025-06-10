import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import wishCartSlice from "./WishCartSlice";


const store = configureStore({
    //contain the slices
    reducer:{
        cart:cartSlice,
        wishlist:wishCartSlice,
    },
}) 
export default store