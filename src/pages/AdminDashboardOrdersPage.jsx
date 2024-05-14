import React from 'react'
import Adminheader from '../components/Admin/Adminheader'
import AdminSideBar from '../components/Admin/AdminSideBar'
import AllOrders from '../components/Admin/AllOrders.jsx'

const AdminDashboardOrdersPage = () => {
  return (
    <div>
        <Adminheader/>
        <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
            <div className=" w-[80px] 800px:w-[330px]">
                <AdminSideBar active = {2}/>
            </div>
            <AllOrders/>
        </div>
        </div>
    </div>
  )
}

export default AdminDashboardOrdersPage