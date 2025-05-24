import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import wishListSlice from './wishListSlice'

const store=configureStore({
    //contain the slices
    reducer:{
        cart:cartSlice,
        wishCart:wishListSlice
    },
}) 
export default store