import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { server } from "../server";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState({});
  const { user } = useSelector((state) => state.user);
  const [orderData, setOrderData] = useState({}); // State to store order data

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const data = {};
    for (const [key, value] of searchParams) {
      data[key] = value;
    }
    setTransactionData(data);
    // Check if the status is "Completed" before sending order data to backend
    if (data.status === "Completed") {
      const storedOrderData = JSON.parse(localStorage.getItem("latestOrder"));
      if (storedOrderData) {
        setOrderData(storedOrderData);
      } else {
        toast.error("Error retrieving order data");
        navigate("/payment");
      }
    } else {
      toast.error("Payment not completed");
      navigate("/payment"); // Redirect to payment page if payment is not completed
    }
    // handleCheckout()
  }, []);

 

  const order = {
    cart:orderData?.cart,
    shippingAdress: orderData?.shippingAddress,
    user: orderData?.user,
    totalPrice: orderData?.totalPrice,
    paymentInfo:"Paid via Khalti",
    paymentData:transactionData,
  }

  console.log(order.paymentData)
  

  const [validation,setValidation] = useState();

  const handleCheckout = async () => {
    try {
    if(transactionData.status === "Completed"){
    const response = await axios.post(`${server}/order/create-order`, order);
    console.log("Order created successfully:", response.data);
  
      // Clear local storage and redirect to success page
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify({})); 
      localStorage.setItem("orderData", JSON.stringify({})); 
      navigate("/");
      window.location.reload();
      toast.success("Order successful!");
        }
        
          
    } catch (error) {
        
    }
  }

  useEffect(() => {
  if(transactionData.status==="Completed"){
    handleCheckout()
    // window.location.realod()

  } else {
    console.log("Error")
  }
  }, [transactionData])
  
  

    return (
        <div>
            <Header/>
            <br />
            <br />
            <div class="bg-gray-100 h-screen">
                <div class="bg-white p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div class="text-center">
                        <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Order Placed Done!</h3>
                        <p class="text-gray-600 my-2">Thank you for completing your online payment.</p>
                        <p class="text-gray-600 my-2">Transaction ID: {transactionData.transaction_id}</p>
                        <p class="text-gray-800 my-2">Amount: Rs.{(parseInt(transactionData.amount))/10}</p>
                        <p> Have a great day!  </p>
                        <div class="py-10 text-center">
                            <a href="http://localhost:3000/payment" class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default PaymentSuccessPage