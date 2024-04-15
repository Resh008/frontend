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
import { deleteUserAddress, updatUserAddress, updateUserAdress, updateUserInformation } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from 'react-icons/rx'
import { Country, State, City } from 'country-state-city';

const ProfileContent = ({ active }) => {
  const { user, error,SucessMessage } = useSelector((state) => state.user);
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
    if (SucessMessage){
      toast.success(SucessMessage.SucessMessage)
      dispatch({type:"clearErrors"})
    }
  }, [error,SucessMessage]);

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
      {/* Change Password Page */}
      {
        active === 6 && (
          <div>
            <ChangePassword />
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

const ChangePassword = () => {

  const passwordChangeHandler  = async () => {
    
  }

  return (
    <div className="w-full px-5">
        <h1 className="block text-[25px] text-center font-[600] text-[#262626] pb-2">Change Password</h1>
          <div className="w-full">
            <form aria-required onSubmit={passwordChangeHandler}></form>
          </div>
    </div>
  )
}

const Address = () => {

  const [open, setOpen] = useState(false);
  const [zipCode, setZipCode] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const [city, setCity] = useState("");
  const [addressType, setAddressType] = useState("")
  const [country, setCountry] = useState("");
  const { user } = useSelector((state) => state.user);

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office"
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all details")
    } else {
      dispatch(updatUserAddress(country, city, address1, address2, zipCode, addressType));
      setCountry("")
      setAddress1("")
      setAddress2("")
      setZipCode(null)
      setCity("")
      setAddressType("")
      setOpen(false)
      window.location.reload();
      toast.success("User data added sucessfully")
  
    }
  }

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id),
    toast.success("Adress deleted"))
  }


  


  return (
    <div className="w-full px-5">
      {
        open && (
          <div className="fixed w-full h-screen bg-[#00000089] top-0 left-0 flex items-center justify-center">
            <div className="w-[35%] h-[85vh] bg-white rounded shadow relative overflow-y-hidden">
              <div className=" w-full flex justify-end p-3">
                <RxCross1 size={30} onClick={() => setOpen(false)} className="cursor-pointer" />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add new address
              </h1>
              <div className="w-full">
                <form aria-required onSubmit={handleSubmit} >
                  <div className="w-full block p-4">
                    <div className="w-full pb-2">
                      <label className="block">
                        Country
                      </label>
                      <select name="" id="" value={country} onChange={(e) => setCountry(e.target.value)} className="w-[95%] border h-[40px] rounded-[5px] focus:border-[#f54467]">
                        <option value={"Nepal"} key={"Nepal"} className="block pb-2" >
                          Nepal
                          </option>
                          <option value={"Nepal"} key={"Nepal"} className="block pb-2" >
                          Nepal
                          </option>
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Choose your city</label>
                      <select
                        name=""
                        id=""
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          Choose your city
                        </option>
                        {City &&
                          City.getCitiesOfCountry('NP').map((item) => (
                            <option
                              className="block pb-2"
                              key={item.isoCode}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 1</label>
                      <input type="address" className={`${styles.input}`} onChange={(e) => setAddress1(e.target.value)} value={address1} />
                    </div>
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address 2</label>
                      <input type="address" className={`${styles.input}`} onChange={(e) => setAddress2(e.target.value)} value={address2} />
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Zip Code</label>
                      <input type="address" className={`${styles.input}`} onChange={(e) => setZipCode(e.target.value)} value={zipCode} />
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2">Adress Type</label>
                      <select
                        name=""
                        id=""
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          Choose your adress type
                        </option>
                        {addressTypeData &&
                          addressTypeData.map((item) => (
                            <option
                              className="block pb-2"
                              key={item.name}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <input type="submit"
                        className={`${styles.button} text-[#fff] cursor-pointer`}
                        required
                        readOnly />
                    </div>

                  </div>

                </form>
              </div>
            </div>
          </div>
        )
      }
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#262626] pb-2">My Address</h1>
        <div className={`${styles.button} !rounded-md`} onClick={() => setOpen(true)}>
          <span className="text-[#FFF]">Add New</span>
        </div>
      </div>
      <br />
        {
          user && user.addresses.map((item,index)=>(
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5" key={index}>
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6>{item.address1} / {item.address2}, Nepal</h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6>{user && user.phoneNumber}</h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8 cursor-pointer">
              <TiDeleteOutline size={25} className="curosor-pointer" onClick={()=>handleDelete(item)}/>
            </div>
    
          </div>
          ))
        }
        {
          user && user.addresses.length === 0 && (
            <h5 className="text-center pt-5 text-[18px]">You don't have any adress saved!</h5>
          )
        }
    </div>
  )
}


export default ProfileContent;
