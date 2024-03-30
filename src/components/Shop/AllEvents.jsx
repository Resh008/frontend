import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { deleteEvent, getAllEventsShop } from '../../redux/actions/event';
import { deleteProduct } from '../../redux/actions/product';
import { toast } from 'react-toastify';

const AllEvents = () => {
    const { events, isLoading } = useSelector((state) => state.event);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsShop(seller._id));
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteEvent(id));
        window.location.reload();
        toast.success("Event deleted")
    };

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
        { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
        { field: "sold", headerName: "Sold Out", minWidth: 100, flex: 0.6 },
        { field: "Stock", headerName: "Stock", minWidth: 130, flex: 0.6 },
        {
            field: "Preview",
            flex: 0.2,
            minWidth: 10,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g,"-");
                return (
                    <>
                        <Link to={`/products/${product_name}`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                );
            }
        },
        {
            field: "Delete",
            flex: 0.2,
            minWidth: 10,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            onClick={() => handleDelete(params.id)}>
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            }
        }
    ];

    const row = events ? events.map(item => ({
        id: item._id,
        name: item.name,
        price: "Rs" + item.discountPrice,
        Stock: item.stock,
        sold: 10,
    })) : [];

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className='w-full mx-8 pt-1 mt-10 bg-white'>
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            )}
        </>
    );
};

export default AllEvents;
