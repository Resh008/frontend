import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addToWishList, removeFromWishList } from "../../redux/actions/wishList";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

const Whitelist = ({ setopenWitelist }) => {
  const { wishList } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const removeFromwishListHandler = (data) => {
    dispatch(removeFromWishList(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1}
    dispatch(addToCart(newData));
    setopenWitelist(false);
    toast.success("Wish list product added to your cart")
  }



  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {
          wishList && wishList.length === 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1 size={24}
                  className="cursor-pointer"
                  onClick={() => setopenWitelist(false)}
                />
              </div>
              <img className=" flex w-full h-[195px]" src="https://img.freepik.com/premium-vector/empty-cart_701961-7086.jpg" alt="" />
              <br />
              <h5 className="fixed top-20">Oops, Your wish list is empty</h5>
            </div>

          ) : (
            <>
              <div>
                <div className="flex w-full justify-end pt-5 pr-5">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setopenWitelist(false)}
                  />
                </div>
                {/* Item Length */}
                <div className={`${styles.noramlFlex} p-4`}>
                  <AiOutlineHeart size={25} />
                  <h5 className="pl-2 text-[20px] font-[500]">{wishList && wishList.length} Item</h5>
                </div>

                {/* Cart Items */}
                <br />
                <div className="w-full border-t">
                  {wishList &&
                    wishList.map((i, index) => <CartSingle key={index} data={i} removeFromwishListHandler = {removeFromwishListHandler} addToCartHandler={addToCartHandler}/>)}
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromwishListHandler,addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" onClick={() => removeFromwishListHandler(data)}/>
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-3 text-[#d02222] font-Roboto">
            Rs.{totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
            onClick={()=> addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Whitelist;
