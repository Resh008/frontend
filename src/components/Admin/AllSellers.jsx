import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/user';
import axios from 'axios';
import { server } from '../../server';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { getAllSeller } from '../../redux/actions/sellers';
import { Link } from 'react-router-dom';

const AllSellers = () => {

    const dispatch = useDispatch()
    const [sellerData, setSellerData] = useState(null)
    const { adminSeller } = useSelector((state) => state.seller)
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [confirmDelete,setConfirmDelete] =  useState(false)
    const [userName, setUserName] = useState("")


    useEffect(() => {
        try {
            if (adminSeller == null) {
                dispatch(getAllSeller())
            }
            setSellerData(adminSeller)
        }
        catch (error) {
            console.log(error)
        }
    }, [adminSeller])



    const handleDelete = async (id) => {
    await axios.delete(`${server}/shop/admin-delete-seller/${id}`, {withCredentials:true}).then((res)=>{
        toast.success(res.data.message)
        dispatch(getAllSeller())
    }).catch((error)=>{
        toast.error(error.data.message)
    })
    }
    

    console.log(userName)


    const columns = [
        { field: "id", headerName: "Shop ID", minWidth: 150, flex: 0.7 },

        {
            field: "name",
            headerName: "Shop Name",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "email",
            headerName: "Email",
            type: "text",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "address",
            headerName: "Address",
            type: "text",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "createdAt",
            headerName: "Shop Created at",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: " ",
            minWidth: 150,
            headerName: "Actions",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to = {`/shop/preview/${params.id}`}>
                        <Button>
                            <AiOutlineEye size={20} />
                        </Button>
                        </Link>

                        <Button onClick={() => setUserId(params.id) || setOpen(true) }>
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];
    const rows = []
    sellerData && sellerData.forEach((item) => {
        rows.push({
            id: item?._id,
            name: item.name,
            email: item.email,
            address: item.address,
            createdAt: item.createdAt.slice(0, 10),
        })
    })

    return (
        <div className='w-full flex justify-center items-center'>
            <div className="w-[95%]">
                <h3 className="text-[22px] font-Poppins pb-2 pt-5"><strong>All Sellers</strong></h3>
                <div className="w-full min-h-[45vh] bg-white rounded">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
                {
                    open && (
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
                                            Delete User 
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
                                                <button type="button" onClick={()=>setOpen(false)}
                                                    class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                                                    <span class="flex items-center gap-1">
                                                        <span class="">
                                                            Cancel
                                                        </span>
                                                    </span>
                                                </button>

                                                <button onClick={()=>setOpen(false) || handleDelete(userId)}
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
    )
}

export default AllSellers