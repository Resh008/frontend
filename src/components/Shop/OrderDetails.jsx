import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderOfShop } from '../../redux/actions/order';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { backend_url, server } from '../../server';
import { MdEmail, MdPhone } from 'react-icons/md';
import styles from '../../styles/style';
import { toast } from 'react-toastify';
import axios from 'axios';

const OrderDetails = () => {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllOrderOfShop(seller._id))
    }, [dispatch])

    const data = orders && orders.find((item) => item._id === id);

    const orderUpdateHandler = async (e) => {
        await axios.put(`${server}/order/update-order-status/${id}`, {
            status
        }, { withCredentials: true }).then((res) => {
            toast.success("Order status updated")
            navigate('/dashboard-orders')
        }).catch((error) => {
            toast.error(error.response.data.message);
            console.log(error)
        })
    }

    console.log(data)

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div>
                <div className="flex justify-end item-end space-y-2 flex-col ">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order #{data?._id?.slice(0, 10)} </h1>
                    <p className="text-base font-medium leading-6 text-gray-600">Order Plcaed at: {data?.createdAt?.slice(0, 10)} </p>

                </div>
            </div>

            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">

                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Order Details</p>
                        <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full hidden md:block" src={`${backend_url}/${data.cart[0].images[0]}`} alt="dress" />
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{data.cart[0].name}</h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm leading-none text-gray-800">
                                            <span className="text-gray-300">Category: </span> {data.cart[0].category}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base xl:text-lg leading-6">
                                        Rs.{data.cart[0].discountPrice} <span className="text-red-600 line-through">Rs.{data.cart[0].orginalPrice}</span>
                                    </p>
                                    <p className="text-base xl:text-lg leading-6 text-gray-800">{data.cart[0].qty}</p>
                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">Rs.{data.totalPrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between  w-full">
                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base leading-4 text-gray-600">Rs.{data.cart[0].discountPrice}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                                    <p className="text-base leading-4 text-gray-600">Rs.{data.cart[0].discountPrice * 0.1}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">Payment Status:</p>
                                    <p className={`text-base leading-4 ${data.paymentInfo === "Paid via Khalti" ? "text-green-700 font-bold" : "text-gray-600"}`}>{data.paymentInfo}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">Rs.{data.totalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer Details</h3>
                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-8 border-b border-gray-200 w-[40px] h-[40px] rounded-full">
                                <img src={`${backend_url}${data.user.user.avatar.url}`} alt="avatar" />
                                <div className=" flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">{data.user.user.name}</p>
                                </div>
                            </div>

                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <MdEmail size={24} color='grey' />
                                <p className="cursor-pointer text-sm leading-5 text-gray-800">{data.user.user.email}</p>
                            </div>
                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <MdPhone size={24} color='grey' />
                                <p className="cursor-pointer text-sm leading-5 text-gray-800">{data.user.user.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{data.shippingAddress.address1},{data.shippingAddress.address2}, {data.shippingAddress.zipCode}, {data.shippingAddress.city}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order Status</h1>
            <div className='flex justify-start item-start space-y-2 flex-col'>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-start items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col jusitfy-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-row jusitfy-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className='cursor-pointer text-gray-800  bg-gray-300 outline-blue-400 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-200 '>
                                {
                                    [
                                        "Processing",
                                        "Shipping",
                                        "Sent out to delivery",
                                        "Delivered"
                                    ]
                                        .slice(
                                            [
                                                "Processing",
                                                "Shipping",
                                                "Sent out to delivery",
                                                "Delivered"
                                            ].indexOf(data?.status) + 1 // Add 1 to start from the next status
                                        ).map((option, index) => (
                                            <option value={option} key={index} className='cursor-pointer flex !item-start py-2 text-sm text-black-600 dark:text-gray-20'>
                                                {option}
                                            </option>
                                        ))
                                }
                            </select>
                            <div className='pl-10'>
                                <button type="button" class="text-blue-700 bg-blue-100 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2" onClick={orderUpdateHandler}>Update Status</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails