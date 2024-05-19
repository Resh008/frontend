import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getAllOrderOfShop } from '../../redux/actions/order';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { MdEmail, MdPhone } from 'react-icons/md';
import { backend_url, server } from '../server';
import styles from '../styles/style';
import { getAllOrderOfUser } from '../redux/actions/order';
import { VscFeedback } from 'react-icons/vsc';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

const UserOrderDetails = () => {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)
    const [status, setStatus] = useState("");
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("")
    const navigate = useNavigate();
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [warningOpen, setWarningOpen] = useState(false)



    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllOrderOfUser(user._id))
    }, [dispatch])

    const data = orders && orders.find((item) => item._id === id);

    const orderUpdateHandler = (e) => {
        console.log("fff");
    }

    const reviewHandler = async (e) => {
        if (comment === "") {
            toast.error("Write something in comment")
        } else {
            await axios.put(`${server}/products/create-review`, {
                user,
                rating,
                comment,
                productId: selectedItem?._id,
                orderId: id,
            }, { withCredentials: true })
                .then((res) => {
                    toast.success("Review Added")
                    setComment("")
                    setRating(1)
                    // setOpen(false)
                    // navigate('/profile')
                })
        }
    }

    console.log(data)

    const handleCancelOrder = async (data) => {
        const orderId = data._id
        await axios.delete(`${server}/order/cancel-order/${orderId}`, {
            withCredentials: true,
        });
        navigate("/")
        window.location.reload()
        navigate("/profile")
        toast.success("Your order has been canceled")

    }

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div>
                <div className="flex justify-end item-end space-y-2 flex-col ">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order #{data?._id?.slice(0, 10)} </h1>
                    <p className="text-base font-medium leading-6 text-gray-600">Order Plcaed at: {data?.createdAt?.slice(0, 10)} </p>
                </div>
            </div>

            {/* {data && data?.cart.map((item, index) => {
          return(
            <div className="w-full flex items-start">
            {item.isReviewed ? null : (
            <div className={`${styles.button} flex justify-end items-end bg-blue-500 text-white border-[2px] !rounded-[10px]`} onClick={() => setOpen(true) || setSelectedItem(item)}> <VscFeedback size={18} /><div className="pl-1">Write a review</div></div>
            )
            }
          </div>
          )
         })} */}


         

            {
                data && data.status === "Delivered" && (
                    <>
                        {data && data?.cart.map((item, index) => {
                            return (
                                <div className="w-full flex items-start">
                                    {item.isReviewed ? null : (
                                        <div className={`${styles.button} flex justify-end items-end bg-blue-500 text-white border-[2px] !rounded-[10px]`} onClick={() => setOpen(true) || setSelectedItem(item)}> <VscFeedback size={18} /><div className="pl-1">Write a review</div></div>
                                    )
                                    }
                                </div>
                            )
                        })}
                    </>
                )
            }



            {
                // review popupo
                open && (
                    <div className="w-full fixed top-0 left-0 h-screen bg-[#000000a9]  py-6 flex flex-col justify-center sm:py-12">
                        <div class="py-3 sm:max-w-xl sm:mx-auto">
                            <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                                <div class="px-12 py-5">
                                    <h2 class="text-gray-800 text-3xl font-semibold">Your opinion matters to us!</h2>
                                </div>
                                <div class="bg-white w-full flex flex-col items-center">
                                    <div class="flex flex-col items-center py-6 space-y-3">
                                        <span class="text-lg text-gray-800">Give product a rating out 5</span>
                                        <div class="flex space-x-3">
                                            {[1, 2, 3, 4, 5].map((i) =>
                                                rating >= i ? (
                                                    <AiFillStar key={i} className='mr-1 cursor-pointer' color='rgb(246,186,0)' size={25} onClick={() => setRating(i)} />
                                                ) : (
                                                    <AiOutlineStar key={i} className='mr-1 cursor-pointer' color='rgb(246,186,0)' size={25} onClick={() => setRating(i)} />
                                                )
                                            )}

                                        </div>
                                    </div>
                                    <div class="w-3/4 flex flex-col">
                                        <textarea required rows="3" class="p-4 text-gray-500 rounded-xl resize-none bg-gray-200" placeholder='Write review...' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                        <button class="py-3 my-8 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white" onClick={reviewHandler}>Rate now</button>
                                    </div>
                                </div>
                                <div class="h-20 flex items-center justify-center cursor-pointer" onClick={() => setOpen(false)}>
                                    <a class="text-gray-600">Maybe later</a>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
            <Link to='/profile'>
                <span className={`${styles.button} flex justify-end items-end bg-transparent text-[#292929] border-[2px]`} onClick={() => navigate('/')}>Go back</span>
            </Link>
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
                            {
                                data && (data.status === "Processing") ? (
                                    <div className='flex justify-end cursor-pointer' onClick={() => setDeleteOpen(true)}>
                                    <Button>Cancel Order</Button>
                                </div>
                                ) : (
                                    <div className='text-red-600'>Order cannot be Canceled after being processed. </div>
                                )
                            }


                            {
                                deleteOpen && (
                                    <div class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
                                        <div aria-hidden="true" class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
                                        </div>

                                        <div class="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                                            <div
                                                class="w-full py-2 bg-white cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-sm">

                                                <button tabindex="-1" type="button" class="absolute top-2 right-2 rtl:right-auto rtl:left-2">
                                                    <svg title="Close" tabindex="-1" class="h-4 w-4 cursor-pointer text-black"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                    <span class="sr-only">
                                                        Close
                                                    </span>
                                                </button>



                                                <div class="space-y-2 p-2">
                                                    <div class="p-4 space-y-2 text-center">
                                                        <h2 class="text-xl font-bold tracking-tight" id="page-action.heading">
                                                            Confirm Cancel Order?
                                                        </h2>

                                                        <p class="text-gray-500">
                                                            Are you sure you would like to do this?
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="space-y-2">
                                                    <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>

                                                    <div class="px-6 py-2">
                                                        <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                                                            <button type="button" onClick={() => setDeleteOpen(false)}
                                                                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                                                                <span class="flex items-center gap-1">
                                                                    <span class="">
                                                                        Cancel
                                                                    </span>
                                                                </span>
                                                            </button>

                                                            <button onClick={() => setOpen(false) || handleCancelOrder(data)}
                                                                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">

                                                                <span class="flex items-center gap-1">
                                                                    <span class="">
                                                                        Confirm
                                                                    </span>
                                                                </span>

                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                deleteOpen && (
                                    <div class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
                                        <div aria-hidden="true" class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
                                        </div>

                                        <div class="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                                            <div
                                                class="w-full py-2 bg-white cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-sm">

                                                <button tabindex="-1" type="button" class="absolute top-2 right-2 rtl:right-auto rtl:left-2">
                                                    <svg title="Close" tabindex="-1" class="h-4 w-4 cursor-pointer text-black"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                    <span class="sr-only">
                                                        Close
                                                    </span>
                                                </button>



                                                <div class="space-y-2 p-2">
                                                    <div class="p-4 space-y-2 text-center">
                                                        <h2 class="text-xl font-bold tracking-tight" id="page-action.heading">
                                                            Confirm Cancel Order?
                                                        </h2>

                                                        <p class="text-gray-500">
                                                            Are you sure you would like to do this?
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="space-y-2">
                                                    <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>

                                                    <div class="px-6 py-2">
                                                        <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                                                            <button type="button" onClick={() => setDeleteOpen(false)}
                                                                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                                                                <span class="flex items-center gap-1">
                                                                    <span class="">
                                                                        Cancel
                                                                    </span>
                                                                </span>
                                                            </button>

                                                            <button onClick={() => setOpen(false) || handleCancelOrder(data)}
                                                                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">

                                                                <span class="flex items-center gap-1">
                                                                    <span class="">
                                                                        Confirm
                                                                    </span>
                                                                </span>

                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                )
                            }
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
        </div>
    )
}

export default UserOrderDetails