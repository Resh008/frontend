import React from 'react'
import Adminheader from '../components/Admin/Adminheader'
import AdminSideBar from '../components/Admin/AdminSideBar'
import AdminDashboardMain from '../components/Admin/AdminDashboardMain'
import AllUsers from "../components/Admin/AllUsers.jsx"

const AdminDashboardUserPage = () => {
  return (
<div>
        <Adminheader/>
        <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
            <div className=" w-[80px] 800px:w-[330px]">
                <AdminSideBar active = {3}/>
            </div>
            <AllUsers/>
        </div>
        </div>
    </div>
  )
}

export default AdminDashboardUserPage