import React from 'react'
import Adminheader from '../components/Admin/Adminheader'
import AdminSideBar from '../components/Admin/AdminSideBar'
import AllUsers from '../components/Admin/AllUsers'
import AllSellers from "../components/Admin/AllSellers.jsx"

const AdminDashboardSellersPage = () => {
  return (
    <div>
        <Adminheader/>
        <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
            <div className=" w-[80px] 800px:w-[330px]">
                <AdminSideBar active = {5}/>
            </div>
            <AllSellers/>
        </div>
        </div>
    </div>
  )
}

export default AdminDashboardSellersPage