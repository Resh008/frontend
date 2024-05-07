import React from 'react'
import Footer from '../../components/Layout/Footer'
import ShopSettgings from "../../components/Shop/ShopSettgings.jsx"
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.jsx'

const ShopSettingsPage = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className="flex item-start jusify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={10}/>
          </div>
          <ShopSettgings/>
        </div>

        <Footer/>
    </div>
  )
}

export default ShopSettingsPage