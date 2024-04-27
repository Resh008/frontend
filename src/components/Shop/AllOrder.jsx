import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { getAllOrderOfShop } from '../../redux/actions/order';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { RxBoxModel } from 'react-icons/rx';
import { MdPendingActions } from 'react-icons/md';

const AllOrders = () => {

    const { orders, isLoading } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrderOfShop(seller._id))
    }, [dispatch]);


    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.value === "Delivered" ? "greenColor" : "redColor";
          },
        },    
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      orders &&
      orders.forEach((item) => {
          row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "Rs. " + item.totalPrice,
            status: item.status,
          });
        });
    


    return (
        <>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <div className='w-full mx-8 mt-10 bg-white p-5 pt-6'>
                      <h1 className='flex items-center justify-center pb-2  text-red-500 rounded-sm text-[32px]'><MdPendingActions size={32}/><strong className='pl-2'>All Orders</strong></h1>
                        <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                        />
                    </div>
                )
            }
        </>
    )
}

export default AllOrders