import React from 'react'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllOrders from "../../components/Shop/AllOrder.jsx"
import Footer from '../../components/Layout/Footer.jsx'
import OrderDetails from "../../components/Shop/OrderDetails.jsx"

const ShopAllOrders = () => {
    return (
        <div>
            <DashboardHeader/>
            <OrderDetails/>
            <Footer/>
        </div>
      )
}

export default ShopAllOrders