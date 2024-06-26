import React from 'react'
import styles from '../../styles/style'
import CountDown from "./CountDown"
import { backend_url } from '../../server'
import AllEvents from '../Shop/AllEvents'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/actions/cart'
import { toast } from 'react-toastify'

const EventCard = ({active,data}) => {

    const {cart} =  useSelector((state)=>state.cart)
    const dispatch = useDispatch();
    const navigate =  useNavigate()
    const {user}=useSelector((state)=>state.user)
    const addToCartHandler = (id) => {
    
        if (user) {
            if (cart) {
                const isItemExists = cart.find((i) => i._id === id);
                if (isItemExists) {
                    toast.error("Item already exists in your cart");
                } else {
                    if (data && data.stock < 1) {
                        toast.error("Oops, no more in stock");
                    } else {
                        const cartData = { ...data, qty: 1 };
                        dispatch(addToCart(cartData));
                        toast.success("Item added to cart");
                    }
                }
            } else {
                toast.error("Cart not found");
            }
        } else {
            toast.error("Login first");
            navigate('/login');
        }
    };
    console.log(data)
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
        <img
            src={data.images && `${backend_url}${data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        <div className="w-full lg:[w-50%] flex flex-col justify-center pl-8">
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
                <span className='pr-5 font-[400] text-[17px] text-[#44a55e]'>
                    <b>{data.sold_out}</b> sold
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