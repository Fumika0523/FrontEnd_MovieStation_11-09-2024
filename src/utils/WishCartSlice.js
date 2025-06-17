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
      const exists = state.wishItems.find(item => item._id === action.payload._id); //- action.payload is expected to be the item you want to add.
      //- checks whether the item is already in the wishlist by comparing IDs.
      //- state refers to the current Redux state slice for the wishlist.
      //- wishItems is the array of items added to the wishlist.
      //- .find() looks through each item in that array.
      if (!exists) {
        state.wishItems.push(action.payload); //- state.wishItems is your current list of items in the wishlist.
        //- .push() is a JavaScript method that appends something to the end of an array.
        //- action.payload is the item you’re trying to add (passed in from a dispatched action).
      }
    },  
    // Remove a specific item from the wishlist
    // wishRemoveItem: (state, action) => {
    //   return state.filter(item => item.id !== action.payload.id);
    // },
    wishRemoveItem: (state, action) => {
  state.wishItems = state.wishItems.filter(item => item._id !== action.payload._id);
},
//- state.wishItems is the current array of wishlist items.
// .filter() is a JavaScript method that creates a new array, including only items that pass the given condition.
//- state.wishItems is the current array of wishlist items.


  //Set entire wishlist (on initial fetch from server)
    setWishlist: (state, action) => {
      state.wishItems = action.payload;
    }//- Take whatever is inside action.payload and make it the new wishlist
// Actions in Redux are objects with a type and (usually) a payload.
// The type tells Redux what to do (e.g., "wishAddItem").
// The payload contains the actual data needed for the update.
}
});

// issue > remove Item
// opening closing {} not closed at proper place


export const {wishAddItem,wishRemoveItem,setWishlist} = wishCartSlice.actions
export default wishCartSlice.reducer

