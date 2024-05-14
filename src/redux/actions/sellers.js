import axios from "axios";
import { server } from "../../server";

//Get all sellers
export const getAllSeller = () => async(dispatch) => {
    try {
        dispatch({
            type:"getAllSellerRequest",
        })

        const {data} = await axios.get(`${server}/shop/admin-all-sellers`,{withCredentials:true});

        dispatch({
            type:"getAllSellersSuccess",
            payload: data.sellers,
        });
    } catch (error) {
        dispatch({
            type:"getAllSellersFailed",
            payload:error.response.data.message,
        })
    }
}