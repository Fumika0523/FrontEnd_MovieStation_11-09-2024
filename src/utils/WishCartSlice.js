import { createSlice } from "@reduxjs/toolkit";

const wishCartSlice = createSlice({
  name: "wishlist",
  initialState:  {
  wishItems:[],
  },     
  reducers: {
    // Add an item to the wishlist
    wishAddItem: (state, action) => {
        state.wishItems.push(action.payload);
        console.log(action.payload) //selected moviedata
      }
    },
    // Remove a specific item from the wishlist
    wishRemoveItem: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
});




export const {wishAddItem,wishRemoveItem} = wishCartSlice.actions
export default wishCartSlice.reducer

