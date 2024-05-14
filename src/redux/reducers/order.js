import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  adminOrders: [], // Separate state slice for admin orders
  error: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('getAllOrdersUserRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllOrdersUserSuccess', (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders; // Update orders state
    })
    .addCase('getAllOrdersUserFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    //get shop orders 
    .addCase('getAllOrdersShopRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllOrdersShopSuccess', (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders; // Update orders state
    })
    .addCase('getAllOrdersShopFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    //get all order for admin
    .addCase('getAllOrdersAdminRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllOrdersAdminSuccess', (state, action) => {
      state.isLoading = false;
      state.adminOrders = action.payload.order;
      state.success = true;
    })
    .addCase('getAllOrdersAdminFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors',(state,action) => {
      state.error = null;
    })
});
