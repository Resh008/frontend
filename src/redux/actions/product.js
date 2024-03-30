import axios from "axios";
import { server } from "../../server";

//Create Product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const data = await axios.post(
      `${server}/products/create-product`,
      newForm,
      config
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

//Get all products
export const getAllProductsShop = (id) => async(dispatch) => {
  try {
    dispatch({
      type:"getAllProductsShopRequest",
    });

    const {data} = await axios.get(`${server}/products/get-all-products-shop/${id}`);
    dispatch({
      type:"getAllProductsShopSuccess",
      payload: data.products,
    })
    
  } catch (error) {
    dispatch({
      type: "getAllProductsShopSucessFailed",
      payload: error.response.data.message,
    });
  }
}

//Delete Products
export const deleteProduct = (id) => async(dispatch) => {
  try {
    dispatch({
      type:"deleteProductRequest",
    })

    const {data} = await axios.delete(`${server}/products/delete-shop-product/${id}`, {
      withCredentials:true,
    });
    dispatch({
      type:"deleteProductSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
}