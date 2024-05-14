import React from 'react'
import Adminheader from '../components/Admin/Adminheader'
import AdminSideBar from '../components/Admin/AdminSideBar'
import AllProducts from '../components/Admin/AllProducts.jsx'

const AdminDashboardProductsPage = () => {
  return (
    <div>
    <Adminheader/>
    <div className="w-full flex">
    <div className="flex items-start justify-between w-full">
        <div className=" w-[80px] 800px:w-[330px]">
            <AdminSideBar active = {4}/>
        </div>
        <AllProducts/>
    </div>
    </div>
</div>
  )
}

export default AdminDashboardProductsPage