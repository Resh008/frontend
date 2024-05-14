import React from 'react'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { backend_url, logo_url } from '../../server'
import { AiOutlineGift } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const Adminheader = () => {
    const {seller} = useSelector((state)=>state.seller)
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
    <div>
        <Link to = "/dashbord-orders">
            <img src={`${backend_url}almadi.png`} alt=""  className='w-full h-[50px]'/>
        </Link>
    </div>
    <div className="flex items-center">
        <div className="flex items-center mr-4"></div>
            <Link to = "/dashboard-events" className='800px:block hidden'>
            <AiOutlineGift
             color='#555' size={30} className='mx-5 cursor-pointer'/>
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
            {/* <Link to = {`/shop/${seller._id}`}> */}
                {/* <img src={`${backend_url}${seller.avatar.url}`} alt="" className='w-[50px] h-[50px] rounded-full object-cover'/> */}
            {/* </Link> */}
    </div>
</div>
  )
}

export default Adminheader