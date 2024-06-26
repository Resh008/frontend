import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { backend_url } from '../../../server';
import { Link } from 'react-router-dom';
import styles from '../../../styles/style';
import Magnifier from "react-magnifier";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify"
import {addToCart} from "../../../redux/actions/cart"
import { addToWishList, removeFromWishList } from '../../../redux/actions/wishList';

const ProductDetailsCard = ({ setOpen, data }) => {
  const {wishList} = useSelector((state)=>state.wishList)
  const {cart} = useSelector((state)=>state.cart)
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(wishList && wishList.find((i)=>i._id === data._id)){
        setClick(true)
    } else {
        setClick(false)
    }
    
    }, [wishList])

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const incremenetCount = () => {
    setCount(count + 1)
  }

  const handleMessageSubmit = () => {

  }

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
}

const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
}

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if(isItemExists){
      toast.error("Item exist in your cart")
    } else {
        if(data.stock <= count){
          toast.error("Oops, no more in stock");
        } else {
          const cartData = {...data, qty: count};
          dispatch(addToCart(cartData));
          toast.success("Item added to cart")
        }
    }

  }

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.images && `${backend_url}${data.images[0]}`}
                  alt="" />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={data.images && `${backend_url}${data.shop.avatar.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">4/5 Ratings</h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">(50) Sold out</h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Rs.{data.discountPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {"Rs." + (data.orginalPrice ? data.orginalPrice : null)}
                  </h3>

                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-red-400 to-red-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-red-400 to-red-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incremenetCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishListHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishListHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};


export default ProductDetailsCard