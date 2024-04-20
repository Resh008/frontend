import React from 'react'
import styles from '../../styles/style'
import CountDown from "./CountDown"
import { backend_url } from '../../server'
import AllEvents from '../Shop/AllEvents'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/actions/cart'
import { toast } from 'react-toastify'

const EventCard = ({active,data}) => {

    const {cart} =  useSelector((state)=>state.cart)
    const dispatch = useDispatch();

    const addToCartHandler = (data) => {
        const isItemExists = cart && cart.find((i) => i._id === data._id);
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
    console.log(data)
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
        <div className='w-full lg:-w[50%] m-auto'>
            <img src={`${backend_url}${data.images && data.images[0]}`} alt="" />
        </div>
        <div className="w-full lg:[w-50%] flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}> {data.name}</h2>
            <p>
                {data.description}
            </p>
            <div className="flex py-2 justify-between">
                <div className='flex'>
                    <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                        Rs.{data.orginalPrice}
                    </h5>
                    <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>
                        Rs.{data.discountPrice}
                    </h5>
                </div>
                <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>
                    <b>120</b> sold
                </span>
            </div>
            <CountDown data={data}/>
            <br />
        <div className="flex items-center">
        <Link to ={`/products/${data._id}?isEvent=true`}>
                <div className={`${styles.button} text-[#ffff] mr-1 !rounded-[5px]`}>
                    See details
                </div>
            </Link>
            <Link>
                <div className={`${styles.button} !bg-[#2e77ff] text-[#ffff] !rounded-[5px]`} onClick={()=>addToCartHandler(data)}>
                    Add to cart
                </div>
            </Link>
        </div>
        </div>
    </div>
  )
}

export default EventCard