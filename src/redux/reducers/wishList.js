import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishList: localStorage.getItem("wishListItems")
    ? JSON.parse(localStorage.getItem("wishListItems"))
    : [],
};

export const wishListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishList", (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishList.find((i) => i._id === item._id);
      if (isItemExist) 
      {
        return {
        ...state,
        wishList: state.wishList.map((i) => (i._id === isItemExist._id ? item : i)),
      };
    } else {
        state.wishList.push(item);
      }
    })
    .addCase("removeFromWishList", (state, action) => {
      const itemIdToRemove = action.payload;
      state.wishList = state.wishList.filter((i) => i._id !== itemIdToRemove);
    });
});
