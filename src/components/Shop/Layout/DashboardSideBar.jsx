import React from 'react'
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { IoBagAddOutline } from 'react-icons/io5'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { VscNewFile } from 'react-icons/vsc'
import { GiPayMoney } from "react-icons/gi";
import { BiMessageSquareDetail } from 'react-icons/bi'
import { HiOutlineReceiptRefund } from 'react-icons/hi'
import {CiSettings} from 'react-icons/ci'

const DashboardSideBar = ({ active }) => {
    return (
        <div className='w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10'>
            {/* Single Items */}
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard" className='w-full flex items-center'>
                    <RxDashboard size={30} color={`${active === 1 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[#d73535]" : "text-[#555]"}`}>
                        Dashboard
                    </h5>
                </Link>
            </div>
            {/* All Orders */}
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-orders" className='w-full flex items-center'>
                    <FiShoppingBag size={30} color={`${active === 2 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[#d73535]" : "text-[#555]"}`}>
                        All Orders
                    </h5>
                </Link>
            </div>
            {/* All Products */}
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-products" className='w-full flex items-center'>
                    <FiPackage size={30} color={`${active === 3 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[#d73535]" : "text-[#555]"}`}>
                        All Products
                    </h5>
                </Link>
            </div>
            {/* Create Product */}
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-product" className='w-full flex items-center'>
                    <IoBagAddOutline size={30} color={`${active === 4 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[#d73535]" : "text-[#555]"}`}>
                        Create Product
                    </h5>
                </Link>
            </div>
            {/* All Events */}
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-events" className='w-full flex items-center'>
                    <MdOutlineLocalOffer size={30} color={`${active === 5 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 5 ? "text-[#d73535]" : "text-[#555]"}`}>
                        All Events
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-event" className='w-full flex items-center'>
                    <VscNewFile size={30} color={`${active === 6 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 6 ? "text-[#d73535]" : "text-[#555]"}`}>
                        Create Event
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-withdraw-money" className='w-full flex items-center'>
                    <GiPayMoney size={30} color={`${active === 7 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 7 ? "text-[#d73535]" : "text-[#555]"}`}>
                        Withdraw Money
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-messages" className='w-full flex items-center'>
                    <BiMessageSquareDetail size={30} color={`${active === 8 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 8 ? "text-[#d73535]" : "text-[#555]"}`}>
                        Shop Inbox
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-coupons" className='w-full flex items-center'>
                    <AiOutlineGift size={30} color={`${active === 9 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 9 ? "text-[#d73535]" : "text-[#555]"}`}>
                        Discount Codes
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-refunds" className='w-full flex items-center'>
                    <HiOutlineReceiptRefund size={30} color={`${active === 10 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 10 ? "text-[#d73535]" : "text-[#555]"}`}>
                        Refunds
                    </h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-settings" className='w-full flex items-center'>
                    <CiSettings size={30} color={`${active === 11 ? "#d73535" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 11 ? "text-[#d73535]" : "text-[#555]"}`}>
                        Settings
                    </h5>
                </Link>
            </div>
        </div>
    )
}

export default DashboardSideBar