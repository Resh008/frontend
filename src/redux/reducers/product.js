import { createReducer } from "@reduxjs/toolkit";


const initialState = {
  isLoading: true,
  success: null,
  error: null,
  product: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('productCreateRequest', (state) => {
      state.isLoading = true;
      state.success = null; // Reset success state
      state.error = null; // Reset error state
    })
    .addCase('productCreateSuccess', (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase('productCreateFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    //Get all products
    .addCase('getAllProductsShopRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllProductsShopSuccess', (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    })
    .addCase('getAllProductsShopSucessFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    //Delete Product
    .addCase('deleteProductRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('deleteProductSuccess', (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase('deleteProductFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })


});

// Define action creator to clear errors
export const clearErrors = () => ({
  type: 'clearErrors'
});



