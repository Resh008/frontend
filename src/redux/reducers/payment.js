// reducers/payment.js

const initialState = {
    loading: false,
    error: null,
    paymentUrl: null,
  };
  
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INITIATE_PAYMENT_START':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'INITIATE_PAYMENT_SUCCESS':
        return {
          ...state,
          loading: false,
          paymentUrl: action.payload.paymentUrl,
        };
      case 'INITIATE_PAYMENT_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  
  export default paymentReducer;
  