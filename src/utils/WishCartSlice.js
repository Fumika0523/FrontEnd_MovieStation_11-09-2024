import { createSlice } from "@reduxjs/toolkit";

const wishCartSlice = createSlice({
  name: "wishlist",
  initialState:  {
       wishItems:[],
  },  
     
  reducers: {
    // Add an item to the wishlist
    // wishAddItem: (state, action) => {
    //     state.wishItems.push(action.payload);
    //     console.log(action.payload) //selected moviedata
    //   },
    wishAddItem: (state, action) => {
      const exists = state.wishItems.find(item => item._id === action.payload._id);
      if (!exists) {
        state.wishItems.push(action.payload);
      }
    },  
    // Remove a specific item from the wishlist
    // wishRemoveItem: (state, action) => {
    //   return state.filter(item => item.id !== action.payload.id);
    // },
    wishRemoveItem: (state, action) => {
  state.wishItems = state.wishItems.filter(item => item._id !== action.payload._id);
},
  //Set entire wishlist (on initial fetch from server)
    setWishlist: (state, action) => {
      state.wishItems = action.payload;
    }

}
});

// issue > remove Item
// opening closing {} not closed at proper place


export const {wishAddItem,wishRemoveItem,setWishlist} = wishCartSlice.actions
export default wishCartSlice.reducer

