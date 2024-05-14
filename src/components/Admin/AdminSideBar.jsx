import React from 'react'
import { MdAdminPanelSettings, MdDeliveryDining, MdEmojiEvents, MdOutlineLocalOffer, MdOutlineProductionQuantityLimits, MdOutlineViewInAr } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { GiPayMoney, GiShop } from "react-icons/gi";
import { FaUsersCog } from "react-icons/fa";
import { BsBox, BsBox2, BsShop } from 'react-icons/bs';
import { TbShoppingBagDiscount, TbShoppingCartFilled } from 'react-icons/tb';

const AdminSideBar = ({ active }) => {
    return (
        <div className='w-full h-[89vh] bg-white shadow-sm overflow-y-hidden sticky top-0 left-0 z-10'>
            {/* Single Items */}
            <div className="w-full flex items-center p-4">
                <Link to="/admin" className='w-full flex items-center'>
                    <RxDashboard size={30} color={`${active === 1 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[#d73535]" : "text-[#555]"}`}>
                        Dashboard
                    </h5>
                </Link>
            </div>
            {/* All Orders */}
            <div className="w-full flex items-center p-4">
                <Link to="/admin-orders" className='w-full flex items-center'>
                    <MdOutlineViewInAr size={30} color={`${active === 2 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[#d73535]" : "text-[#555]"}`}>
                        All Orders
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/admin-users" className='w-full flex items-center'>
                    <FaUsersCog size={30} color={`${active === 3 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[#d73535]" : "text-[#555]"}`}>
                        All Users
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/admin-products" className='w-full flex items-center'>
                    <TbShoppingCartFilled size={30} color={`${active === 4 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[#d73535]" : "text-[#555]"}`}>
                        All Products
                    </h5>
                </Link>
            </div>
            {/* All Events */}
            <div className="w-full flex items-center p-4">
                <Link to="/admin-sellers" className='w-full flex items-center'>
                    <BsShop size={30} color={`${active === 5 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 5 ? "text-[#d73535]" : "text-[#555]"}`}>
                        All Sellers
                    </h5>
                </Link>
            </div>
             <div className="w-full flex items-center p-4">
                <Link to="/admin-request-withdraw" className='w-full flex items-center'>
                    <GiPayMoney size={30} color={`${active === 6 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 6? "text-[#d73535]" : "text-[#555]"}`}>
                        Withdraw Money
                    </h5>
                </Link>
            </div>
        </div>
    )
}

export default AdminSideBar