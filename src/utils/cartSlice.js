import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[]//kept as a empty
    },
    //GROUP
    reducers:{
        //actionItem : reducer function
        //actionItemName:()=>{}
        // cart > add to cart, remove from cart, clear the cart
       // >>>> LET ME WORK ON this
        //actionItem : reducer function >> arrow function
       addItem:(state,action)=>{
        //action.payload >> actual data
        //data something to empty array? >> push method
        state.items.push(action.payload)   //add some data > action.payload
        console.log(action.payload)
       },
        //actionItem : reducer function
       removeItem:(state,action)=>{
        state.items=[] //item empty
       },
        //actionItem : reducer function
        removeLastItem:(state,action)=>{
            state.items.pop() //becos we removing so nothing inside ()
        },
         //actionItem : reducer function
         removeFirstItem:(state,action)=>{
            state.items.shift() // becos we removing so empty inside()
         }
    }
})
export const {addItem,removeItem,removeLastItem,removeFirstItem} = cartSlice.actions
export default cartSlice.reducer

