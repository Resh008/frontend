import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/style'
import { IoBagHandleOutline } from "react-icons/io5"
import {HiOutlineMinus, HiPlus } from "react-icons/hi"
import { Link } from 'react-router-dom'

const Cart = ({ setOpenCart }) => {

    const cartData = [
        {
            name: "Iphone 15 pro Max 256GB Gold",
            description: " lorem ",
            price: 10200
        },
        {
            name: "Iphone 15 pro Max 256GB Gold",
            description: " lorem ",
            price: 90000
        },
        {
            name: "Iphone 15 pro Max 256GB Gold",
            description: " lorem ",
            price: 80000
        },
    ]

    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
                <div>
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1 size={25} className='cursor-pointe' onClick={() => setOpenCart(false)} />
                    </div>
                    {/* Item Length */}
                    <div className={`${styles.noramlFlex} p-4`}>
                        <IoBagHandleOutline size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>
                            3 Items
                        </h5>
                    </div>

                {/* Cart Items */}
                <br/>
                <div className='w-full border-t'>
                        {
                            cartData && cartData.map((i,index) => (
                                <CartSingle key={index} data={i} />
                            ))
                        }

                </div>
                </div>
                {/* Checkoout Button */}
                <div className="px-5 mb-3">
                    <Link to = "/checkout">
                        <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}>
                        <h1 className='text-white text-[18px] font-[600]'>Checkout Now (Rs.10,000)</h1>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

const CartSingle = ({data}) => {
    const [value,setValue] =  useState(1);
    const totalPrice = data.price * value
    return(
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <div>
                    <div className={`bg-[#a7abb14f] border border-[#a7abb14f] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                    onClick={()=> setValue(value+1)}
                    >
                        <HiPlus  size={18} color="#000" />
                    </div>
                    <span className='pl-[10px]'>
                        {value}
                    </span>
                    <div className='bg-[#e44343] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer'
                     onClick={()=> setValue(value===1 ? 1 : value -1)}
                    >
                        <HiOutlineMinus size={16} color='#fff' />
                    </div>
                </div>
                <img src="https://png.monster/wp-content/uploads/2022/09/png.monster-209.png" alt="" 
                className='w-[80px] h-[80px] ml-2'/>
                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font=[400] text-[15px] text-[#00000082]'>Rs.{data.price} x {value}</h4>
                    <h4 className='font-[600] text-[17px] pt-3 text-[#d02222] font-Roboto'>Rs.{totalPrice}</h4>
                </div>
                <RxCross1 className='cursor-pointer'/>
            </div>
        </div>
    )
}

export default Cart