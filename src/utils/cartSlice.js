import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:[],
    },
    reducers:{
    cartAddItem:(state,action)=>{
        const exists = state.cartItems.find(cartItems => cartItems._id === action.payload._id); 
        if(!exists){
            state.cartItems.push(action.payload)
        }
    },

    cartRemoveItem : (state, action)=>{
        state.cartItems = state.cartItems.filter(cartItems => cartItems._id !== action.payload._id);
    },

    removeAllItems:(state,action)=>{
        state.cartItems=[] //item empty
    },

    setCart:(state, action) =>{
        state.cartItems = action.payload;
    },

   
}})
export const {cartAddItem,cartRemoveItem,setCart,removeAllItems} = cartSlice.actions
export default cartSlice.reducer

