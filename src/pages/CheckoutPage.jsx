import React from 'react'
import Header from '../components/Layout/Header'
import Checkout from "../components/checkouts/Checkout"
import Footer from '../components/Layout/Footer'
import CheckoutSteps from '../components/checkouts/CheckoutSteps'
import { useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader'
import { Navigate } from 'react-router-dom'


const CheckoutPage = () => {
    const {isAuthenticated} = useSelector((state)=>state.user)
  return (
    <div>
        <Header/>
        <br />
        <br />
        {
            !isAuthenticated ? (
                <Navigate to = "/login"/>
            ) : (
                <>
                <CheckoutSteps/>
                <br />
                <Checkout/>
                </>
            )
        }
        <br />
        <br />
        <Footer/>

    </div>
  )
}

export default CheckoutPage