import axios from "axios";
import { server } from "../../server";

//Load user 

export const loadUser = () => async (dispatch) => {

    try {
        dispatch({
            type: "LoadUserRequest", 
        });
        const {data} = await axios.get(`${server}/user/getuser`,{ withCredentials: true })
        dispatch({
            type: "LoadUserSuccsess",
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type:"LoadUserFail",
            payload: error.response.data.message,
        });
    }
};