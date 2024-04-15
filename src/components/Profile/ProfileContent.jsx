import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loading from "../Events/Loading";
import styles from "../../styles/style";
import { MdAddAPhoto, MdOutlineTrackChanges } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import { TiDeleteOutline } from "react-icons/ti";
import PopupPassword from "./popupPassword"; // Import the PasswordChangePopup component
import { updateUserInformation } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileContent = ({ active }) => {
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber)
  const [zipCode, setZipCode] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null)


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [error]);

  if (!user || !user.avatar) {
    return <div className="flex items-center justify-center pl-[30rem]"><Loading /></div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password))
    if (!error) {
      toast.success("Details updated")
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await axios.put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      toast.success("Avatar updated successfully");
      window.location.reload();
      // Reload the page or update user data as per your requirement
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  

return (
  <div className="w-full">
    {active === 1 && (
      <>
        <div className="flex justify-center w-full">
          <div className="relative">
            <img
              src={`${backend_url}${user?.avatar.url}`}
              className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              alt="User Avatar"
            />
            <div className="w-[30px] h-[30px] rounded-full !bg-[#fffdfd]  flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input type="file" id="image"
                className="hidden"
                onChange={handleImage} />
              <label htmlFor="image">
                <MdAddAPhoto />
              </label>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="w-full px-5">
          <form onSubmit={handleSubmit} aria-required={true}>
            {/* First row*/}
            <div className="w-full 800px:flex block pb-3">
              <div className="w-[50%]">
                <label className="block pb-2">Full Name</label>
                <input type="text" className={`${styles.input} !w-[95%]`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="w-[50%]">
                <label className="block pb-2">Email</label>
                <input type="text" className={`${styles.input} !w-[95%]`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            {/* Second row*/}
            <div className="w-full 800px:flex block pb-3">
              <div className="w-[50%]">
                <label className="block pb-2">Phone Number</label>
                <input type="number" className={`${styles.input} !w-[95%]`}
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
              <div className="w-[50%]">
                <label className="block pb-2">Enter your password Number</label>
                <input type="password" className={`${styles.input} !w-[95%]`}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>

              {/* <div className="w-[50%]">
                  <label className="block pb-2">Zip Code</label>
                  <input type="number" className={`${styles.input} !w-[95%]`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)} />
                </div> */}
            </div>
            {/* Third row*/}
            {/* <div className="w-full 800px:flex block pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Address 1</label>
                  <input type="address" className={`${styles.input} !w-[95%]`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)} />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Address 2</label>
                  <input type="address" className={`${styles.input} !w-[95%]`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)} />
                </div>
              </div> */}
            <div className="flex items-center justify-between">
              <input
                className={`w-[256px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer flex justify-center`}
                required
                value="Update"
                type="submit" />
            </div>
          </form>
        </div>
      </>
    )}

    {/* Order Page */}
    {
      active === 2 && (
        <div>
          <AllOrders />
        </div>
      )
    }

    {/* Refund Page */}
    {
      active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )
    }
    {/* Track order Page */}
    {
      active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )
    }
    {/* Paymenet Page */}
    {
      active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )
    }
    {/* Address Page */}
    {
      active === 7 && (
        <div>
          <Address />
        </div>
      )
    }
  </div>
);
};

const AllOrders = () => {
  const orders = [
    {
      _id: "7621238798172A9iie",
      orderItems: [
        { name: "Iphone-14 Pro max" }
      ],
      totalPrice: 120,
      orderStatus: "Processing"
    }
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    orderStatus: order.orderStatus,
    itemsQty: order.orderItems.length, // Calculate the number of items
    total: `Rs. ${order.totalPrice}` // Format total price
  }));

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    { field: "orderStatus", headerName: "Status", minWidth: 130, flex: 0.7 },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
    {
      field: "_id",
      flex: 1,
      minWidth: 130,
      headerName: " ",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <span className="leading-[1rem]">View Details</span> <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      )
    }
  ];

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "7621238798172A9iie",
      orderItems: [
        { name: "Iphone-14 Pro max" }
      ],
      totalPrice: 120,
      orderStatus: "Processing"
    }
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    orderStatus: order.orderStatus,
    itemsQty: order.orderItems.length,
    total: `Rs. ${order.totalPrice}`
  }));

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "orderStatus", headerName: "Status", minWidth: 130, flex: 0.7, cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
    {
      field: "_id",
      flex: 1,
      minWidth: 130,
      headerName: " ",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <span className="leading-[1rem]">View Details</span> <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      )
    }
  ];

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};



const TrackOrder = () => {
  const orders = [
    {
      _id: "7621238798172A9iie",
      orderItems: [
        { name: "Iphone-14 Pro max" }
      ],
      totalPrice: 120,
      orderStatus: "Processing"
    }
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "orderStatus", headerName: "Status", minWidth: 130, flex: 0.7, cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total Amount", type: "number", minWidth: 130, flex: 0.8 }, // Added total field
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.8,
      minWidth: 130,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button className="flex items-center space-x-1">
            <MdOutlineTrackChanges size={20} /><span>Track Order</span>
          </Button>
        </Link>
      ),
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    orderStatus: order.orderStatus,
    itemsQty: order.orderItems.length,
    total: "Rs " + order.totalPrice, // Corrected this line
  }));

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        getRowId={(row) => row.id}
      />
    </div>
  );
};

const PaymentMethod = () => {

  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#262626] pb-2">Payment Methods</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#FFF]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img className="w-[16%]"
            src="https://cdn.iconscout.com/icon/free/png-512/free-visa-3-226460.png?f=webp&w=256" alt="" />
          <h5 className="pl-5 font-[600]">Resh Bikram Bhattarai</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** *** ****</h6>
          <h5 className="pl-6">08/2025</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8 cursor-pointer">
          <TiDeleteOutline size={25} className="curosor-pointer" />
        </div>

      </div>
    </div>
  )
}

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#262626] pb-2">My Address</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#FFF]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default Address</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>Civil Homes, Tinthana, Nepal</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>977-9860130046</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8 cursor-pointer">
          <TiDeleteOutline size={25} className="curosor-pointer" />
        </div>

      </div>
    </div>
  )
}


export default ProfileContent;
