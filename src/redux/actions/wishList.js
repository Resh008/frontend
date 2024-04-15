// add to wishList
export const addToWishList = (data) => async(dispatch,getState) => {
    dispatch({
        type:'addToWishList',
        payload: data,
    });

    localStorage.setItem("wishListItems",JSON.stringify(getState().wishList.wishList));
    return data;
};

//remove from cart
export const removeFromWishList = (data) => async(dispatch,getState) => {
    dispatch({
        type:"removeFromWishList",
        payload: data._id,
    });
    localStorage.setItem("wishListItems",JSON.stringify(getState().wishList.wishList));
    return data;
}