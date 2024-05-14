import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import WithDrawMoney from "../../components/Shop/WithDrawMoney.jsx"

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className="flex item-start jusify-between w-full">

        
        <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active = {11}/>
        </div>
        <WithDrawMoney/>
        </div>
    </div>
  )
}

export default ShopWithDrawMoneyPage