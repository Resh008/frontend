import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true, // Add this line to initialize user property
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadSellerRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('LoadSellerSuccess', (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase('LoadSellerFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
//Get all sellers
    .addCase('getAllSellersRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllSellersSuccess', (state, action) => {
      state.isLoading = false;
      state.adminSeller = action.payload;
    })
    .addCase('getAllSellersFailed', (state, action) => {
      state.isLoading = false;
    });
});

