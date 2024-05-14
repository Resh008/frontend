import React from 'react'
import Adminheader from '../components/Admin/Adminheader'
import AdminSideBar from '../components/Admin/AdminSideBar'
import WithDrawRequest from '../components/Admin/WithDrawRequest'

const AdminDashboardWithDrawRequestPage = () => {
  return (
    <div>
    <Adminheader/>
    <div className="w-full flex">
    <div className="flex items-start justify-between w-full">
        <div className=" w-[80px] 800px:w-[330px]">
            <AdminSideBar active = {6}/>    
        </div>
        <WithDrawRequest/>
            </div>
    </div>
</div>
  )
}

export default AdminDashboardWithDrawRequestPage