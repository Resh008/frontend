import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url, server } from "../../server";
import { toast } from "react-toastify";
import styles from "../../styles/style";
import KhaltiCheckout from "khalti-checkout-web";
import { useSelector } from "react-redux";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const {user} = useSelector((state)=>state.user)
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const initiateKhaltiPayment = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`${server}/payment/initiate`, orderData, config);
      console.log(data); // Log the response for debugging
      // Handle the response and redirect to the payment URL
      window.location.href = data.data.payment_url;
    } catch (error) {
      console.error("Error initiating Khalti payment", error);
      toast.error("Error initiating Khalti payment");
    }
  };

  // const order = {
  //   cart:orderData?.cart,
  //   shippingAdress: orderData?.shippingAddress,
  //   user: user && user,
  //   totalPrice: orderData?.totalPrice,
  //   paymentInfo: {
  //     status: transactionData.status // Include payment status here
  //   }
  // }




let config = {
    // replace this key with yours
    "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

let checkout = new KhaltiCheckout(config);


  

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo initiateKhaltiPayment={initiateKhaltiPayment} />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({ initiateKhaltiPayment }) => {

  const {user} =  useSelector((state)=>state.user);

  const [orderData, setOrderData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);


  console.log(orderData)
  console.log(user)

  // // const payload = {
  // //   cart:orderData?.cart,
  // //   shippingAdress: orderData?.shippingAddress,
  // //   user: user,
  // //   totalPrice: orderData?.totalPrice,
  // //   paymentInfo: {
  // //     status: "Cash on Delivery"
  // //   },
  // }

const handleKhaltiPayment = async () => {
  const payload = {
    "return_url": `${base_url}payment-success`,
    "website_url": 'http://localhost:3000/',
    amount: (parseInt(orderData?.totalPrice)),
    // "amount": orderData?.,
    "purchase_order_id": `Order01`,
    "purchase_order_name": `Almadi`,
    "merchant_username":'Almadi',
    "customer_info": {
      name: orderData?.user.name ?? '',
      email: orderData?.user.email ?? '',
      phone: orderData?.user.phoneNumber ?? '',
      // "name": "Resh",
      // "email": "reshambhattarai05@gmail.com",
      // "phone":"9860130046"
    },
  };
  try {
    const { data } = await axios.post(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      payload,
      {
        headers: {
          "authorization": `Key 057952c55a814d9691ef319dc8309e90`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (data?.payment_url) {
      const paymentUrl = data.payment_url;
      console.log('Navigating to payment URL:', paymentUrl);

      window.location.href = paymentUrl;
    }

    console.log('data', data);
  } catch (err) {
    console.log('Error', err);
  }
};

const orderCashonDelivery = {
  cart:orderData?.cart,
  shippingAdress: orderData?.shippingAddress,
  user: user, 
  totalPrice: orderData?.totalPrice,
  paymentInfo: "Cash on delivery"
}

const cashonDelivery = async () => {
  try {
  if(orderData){
  const response = await axios.post(`${server}/order/create-order-cash`, orderCashonDelivery);
  console.log("Order created successfully:", response.data);

    // Clear local storage and redirect to success page
    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.setItem("latestOrder", JSON.stringify({})); 
    navigate("/");
    toast.success("Order successful!");
      }
      
        
  } catch (error) {
      
  }
}

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex w-full pb-5 border-b mb-2">
        <div
          className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
          onClick={handleKhaltiPayment}
        >
          Pay with Khalti
        </div>
      </div>
      <div
          className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
          onClick={cashonDelivery}
        >
          Cash on delivery
        </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">{orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;