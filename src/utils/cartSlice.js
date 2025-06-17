import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:[],
    },
    reducers:{
    cartAddItem:(state,action)=>{
        const exists = state.cartItems.find(item => item._id === action.payload._id); 
        if(!exists){
            state.cartItems.push(action.payload)
        }
    },

    cartRemoveItem : (state, action)=>{
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
    },

    setCart:(state, action) =>{
        state.cartItems = action.payload;
    },

    removeAllItems:(state,action)=>{
    state.items=[] //item empty
    },
}})
export const {cartAddItem,cartRemoveItem,setCart,removeAllItems} = cartSlice.actions
export default cartSlice.reducer

