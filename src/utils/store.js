import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import textSlice from './textSlice'
import counterSlice from "./counterSlice";

const store=configureStore({
    //contain the slices
    reducer:{
        cart:cartSlice,
        text:textSlice,
        counter:counterSlice,
    },
}) 
export default store