import React from 'react'
import { AiFillShopping, AiOutlineGift, AiOutlineShop } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {FiPackage, FiShoppingBag} from 'react-icons/fi'
import { BiMessageSquareDetail } from 'react-icons/bi';
import { backend_url } from '../../../server';

const DashboardHeader = () => {
    const {seller} = useSelector((state) =>state.seller);

  return (
    <div>
        <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
            <div>
                <Link to = "/dashbord-orders">
                    <img src="https://cdn.discordapp.com/attachments/749319878003130380/1231484518498832466/Untitled_design_26.png?ex=66372055&is=6624ab55&hm=2814164c24dee9fd6370a4974f179d17ddb233bd5f750105fda23b91ad76255d&width=200&height=80" alt=""  className='w-full h-[50px]'/>
                </Link>
            </div>
            <div className="flex items-center">
                <div className="flex items-center mr-4"></div>
                    <Link to = "/dashboard-events" className='800px:block hidden'>
                    <AiOutlineGift color='#555' size={30} className='mx-5 cursor-pointer'/>
                    </Link>
                    <Link to = "/dashboard-cupouns" className='800px:block hidden'>
                    <MdOutlineLocalOffer color='#555' size={30} className='mx-5 cursor-pointer'/>
                    </Link>
                    <Link to = "/dashboard-products" className='800px:block hidden'>
                    <FiShoppingBag color='#555' size={30} className='mx-5 cursor-pointer'/>
                    </Link>
                    <Link to = "/dashboard-orders" className='800px:block hidden'>
                    <FiPackage color='#555' size={30} className='mx-5 cursor-pointer'/>
                    </Link>
                    {/* <Link to = "/dashboard-messages" className='800px:block hidden'>
                    <BiMessageSquareDetail color='#555' size={30} className='mx-5 cursor-pointer'/>
                    </Link> */}
                    <Link to = {`/shop/${seller._id}`}>
                        <img src={`${backend_url}${seller.avatar.url}`} alt="" className='w-[50px] h-[50px] rounded-full object-cover'/>
                    </Link>
            </div>
        </div>
    </div>
  )
}

export default DashboardHeader