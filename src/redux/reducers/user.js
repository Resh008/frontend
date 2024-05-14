import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading : false,
  allUsers: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoadUserSuccess', (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('LoadUserFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    //Update user info
    .addCase('updateUserInfoRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateUserInfoSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('updateUserInfoFailed', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    //Update user adress
    .addCase('updateUserAdressRequest', (state, action) => {
      state.addressloading = true;
    })
    .addCase('updateUserAdressSuccess', (state, action) => {
      state.addressloading = false;
      state.SucessMessage = action.payload.SucessMessage;  
      state.user = action.payload.user;
    })
    .addCase('updateUserAdressFailed', (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    //Delete User adderss
    .addCase('deleteUserAdressRequest', (state, action) => {
      state.addressloading = true;
    })
    .addCase('deleteUserAdressSuccess', (state, action) => {
      state.addressloading = false;
      state.SucessMessage = action.payload.SucessMessage 
      state.user = action.payload.user;
    })
    .addCase('deleteUserAdressFailed', (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    //get all user
    .addCase('getAllUsersAdminRequest', (state) => {
      state.loading = true;
    })
    .addCase('getAllUsersAdminSuccess', (state, action) => {
      state.loading = false;
      state.allUsers = action.payload.users;
    })
    .addCase('getAllUsersAdminFailed', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
    .addCase('clearErrors', (state) => {
      state.error = null;
    })

    
});
