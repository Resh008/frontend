import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../styles/style';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard"
import { backend_url } from '../../../server';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from '../../../redux/actions/wishList';
import { addToCart } from '../../../redux/actions/cart';
import { toast } from 'react-toastify';
import Ratings from '../../Products/Ratings';

const ProductCard = ({ data, isReview }) => {
  const {cart} = useSelector((state)=>state.cart)
    const {wishList} = useSelector((state)=>state.wishList)
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    // const d = data.name;
    // const product_name = d.replace(/\s+/g, "-");

    useEffect(() => {
    if(wishList && wishList.find((i)=>i._id === data._id)){
        setClick(true)
    } else {
        setClick(false)
    }
    
    }, [wishList])
    
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
            if(data.stock <= 1){
              toast.error("Oops, no more in stock");
            } else {
              const cartData = {...data, qty: 1};
              dispatch(addToCart(cartData));
              toast.success("Item added to cart")
            }
        }
    
      }

    return (
        <><div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
        <div className='flex justify-end'>
        </div>
        <Link to={`${isReview===true ? `/products/${data._id}?i` : `/products/${data._id}`}`}>
        <img
            src={data.images && `${backend_url}${data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        
        <Link to={`/shop/preview/${data.shop._id}`}>
            <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`${isReview===true ? `/products/${data._id}?i` : `/products/${data._id}`}`}>
            <h4 className='pb-3 font-[500]'>
                {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
            </h4>

            <div className="flex">
            <Ratings rating = {data.rating}/>

            </div>

            <div className='py-2 flex items-center justify-between'>
                <div className='flex'>
                    {/* Discounted price withou katings */}
                    <h5 className={`${styles.productDiscountPrice}`}>
                        Rs.{data?.discountPrice}
                    </h5>
                    {/* Kaings   wawla price */}
                    <h4 className={`${styles.price}`}>
                        {data?.discountPrice !==  data?.orginalPrice ? "Rs." + data?.orginalPrice : null}
                    </h4>
                </div>
                <span className='font-[400] text-[17px] text-[#68d284]'>
                    {data?.sold_out} sold
                </span>
            </div>
            </Link>
            </Link>

            {/* Side Options */}
            <div>
                {click ? (
                    <AiFillHeart
                        size={22}
                        className='cursor-pointer absolute right-2 top-5'
                        onClick={() => removeFromWishListHandler(data)}
                        color={click ? "red" : "#333"}
                        title='Remove from whitelist'
                    />
                ) : (
                    <AiOutlineHeart 
                        size={22}
                        className='cursor-pointer absolute right-2 top-5'
                        onClick={() => addToWishListHandler(data)}
                        color={click ? "red" : "#333"}
                        title='Add to whitelist'
                    />
                )}

                    <AiOutlineEye
                        size={22}
                        className='cursor-pointer absolute right-2 top-14'
                        onClick={() => setOpen(!open)}
                        color= "#333"
                        title='Quick View'
                    />

                <AiOutlineShoppingCart
                        size={25}
                        className='cursor-pointer absolute right-2 top-24'
                        onClick={() =>addToCartHandler(data._id)}
                        color= "#444"
                        title='Add to cart'
                    />

                    {
                        open ? (
                            <ProductDetailsCard setOpen={setOpen} data={data}/>
                        ) : null
                    }
            </div>  
    </div>
</>
    )
}

export default ProductCard