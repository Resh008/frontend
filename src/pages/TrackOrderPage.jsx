import React, { useEffect } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllOrderOfUser } from '../redux/actions/order';
import { backend_url } from '../server';
import { TbTruckDelivery } from 'react-icons/tb';
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { MdOutlineDownloadDone } from 'react-icons/md';

const TrackOrderPage = () => {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllOrderOfUser(user._id))
    }, [dispatch])

    const data = orders && orders.find((item) => item._id === id);

    const discount = data.cart[0].orginalPrice - data.cart[0].discountPrice

    const delivery = data.cart[0].discountPrice * 0.1

    console.log(data)


    return (
        <div>
            <Header />
            <div>
                <section class="bg-white py-8 antialiased md:py-16">
                    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">Track the delivery of order #{data?._id?.slice(0, 10)}</h2>

                        <div class="mt-6 sm:mt-8 lg:flex lg:gap-8">
                            <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
                                <div class="space-y-4 p-6">
                                    <div class="flex items-center gap-6">
                                        <a href="#" class="h-14 w-14 shrink-0">
                                            <img class="hidden h-full w-full dark:block" src={`${backend_url}/${data.cart[0].images[0]}`} alt="imac image" />
                                        </a>

                                        <p> {data.cart[0].name} </p>
                                    </div>

                                    <div class="flex items-center justify-between gap-4">
                                        <p class="text-sm font-normal text-gray-500"><span class="font-medium text-gray-900 dark:text-white">Product ID:</span> {data.cart[0]._id}</p>

                                        <div class="flex items-center justify-end gap-4">
                                            <p class="text-base font-normal text-gray-900">{data.cart[0].qty}x</p>

                                            <p class="text-xl font-bold leading-tight text-gray-900">Rs.{data.cart[0].discountPrice}</p>
                                        </div>
                                    </div>
                                </div>



                                <div class="space-y-4 bg-gray-50 p-6">
                                    <div class="space-y-2">
                                        <dl class="flex items-center justify-between gap-4">
                                            <dt class="font-normal text-gray-500">Original price</dt>
                                            <dd class="font-medium text-gray-900">Rs.{data.cart[0].orginalPrice}</dd>
                                        </dl>

                                        <dl class="flex items-center justify-between gap-4">
                                            <dt class="font-normal text-gray-500 dark:text-gray-400">Discount Price</dt>
                                            <dd class="text-base font-medium text-green-500">-Rs.{discount}</dd>
                                        </dl>

                                        <dl class="flex items-center justify-between gap-4">
                                            <dt class="font-normal text-gray-500">Delivery</dt>
                                            <dd class="font-medium text-gray-900">Rs.{delivery}</dd>
                                        </dl>
                                        <dl class="flex items-center justify-between gap-4">
                                            <dt class="font-normal text-gray-500">Payment Status</dt>
                                            <dd class="font-medium text-gray-900">{data.paymentInfo}</dd>
                                        </dl>
                                    </div>

                                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt class="text-lg font-bold text-gray-900">Total</dt>
                                        <dd class="text-lg font-bold text-gray-900">Rs.{data.totalPrice}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div class="mt-6 grow sm:mt-8 lg:mt-0">
                                <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 class="text-xl font-semibold text-gray-900">Current Status</h3>
                                    <ol className="relative ms-3 border-gray-200 dark:border-gray-700">
                                        {data && data.status === "Delivered" ? (
                                            <h1 className='flex items-center'><MdOutlineDownloadDone size={20} /> Your product has been delivered</h1>
                                        ) : (
                                            data && data.status === "Processing" ? (
                                                <h1 className='flex items-center'><LiaTruckLoadingSolid size={20} /> Your product is being processed</h1>
                                            ) : (
                                                data && data.status === "Sent out to delivery" ? (
                                                    <h1 className='flex items-center'><TbTruckDelivery size={20} /> Your product is on its way</h1>
                                                ) : null
                                            )
                                        )}
                                    </ol>



                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default TrackOrderPage