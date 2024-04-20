import axios from "axios";
import { server } from "../../server";

// Action to fetch all orders of a user
export const getAllOrderOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    const { data } = await axios.get(`${server}/order/get-all-orders/${userId}`);

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data, // Assuming data directly contains orders
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};

// Action to fetch all orders of a shop
export const getAllOrderOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersShopRequest",
    });

    const { data } = await axios.get(`${server}/order/get-seller-all-orders/${shopId}`);

    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data, // Assuming data directly contains orders
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersShopFailed",
      payload: error.response.data.message,
    });
  }
};
