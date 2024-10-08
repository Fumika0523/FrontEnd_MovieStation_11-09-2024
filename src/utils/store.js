import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'


const store=configureStore({
    //contain the slices
    reducer:{
        cart:cartSlice,
    },
}) 
export default store