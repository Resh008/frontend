// actions/payment.js

import axios from 'axios';
import { server } from '../../server';

export const initiatePayment = (orderData) => async (dispatch) => {
  dispatch(initiatePaymentStart());
  try {
    const response = await axios.post(`${server}/payment/khalti`, orderData);
    const { success, pidx, payment_url } = response.data;

    if (success) {
      dispatch(initiatePaymentSuccess(payment_url));
    } else {
      dispatch(initiatePaymentFailure("Payment failed. Please try again."));
    }
  } catch (error) {
    dispatch(initiatePaymentFailure("An error occurred during payment. Please try again."));
  }
};
