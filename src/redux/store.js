import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user";
import {sellerReducer} from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import {cartReducer} from "./reducers/cart"
import { wishListReducer } from "./reducers/wishList";

const  Store = configureStore({
    reducer:{
        user: userReducer,
        seller: sellerReducer,
        products: productReducer,
        event: eventReducer,
        cart: cartReducer,
        wishList: wishListReducer
    }
});

export default Store;