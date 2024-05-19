import React from "react";
import { AiOutlineCreditCard, AiOutlineMessage } from "react-icons/ai";
import {
  HiOutlineLogout,
  HiOutlineShoppingBag,
  HiReceiptRefund,
} from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { MdOutlineAdminPanelSettings, MdOutlinePassword, MdOutlineTrackChanges } from "react-icons/md";
import {RiLockPasswordLine} from "react-icons/ri"
import { TbAddressBook } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {

  const {user} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`,{withCredentials: true})
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(1);
        }}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span className={`pl-3 ${active === 1 ? " !text-[red]" : ""} 800px:block hidden`}>
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(2);
        }}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span className={`pl-3 ${active === 2 ? " !text-[red]" : ""} 800px:block hidden`}>
          Orders
        </span>
      </div>
 
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(3);
        }}
      >
        <MdOutlineTrackChanges size={20} color={active === 3 ? "red" : ""} />
        <span className={`pl-3 ${active === 3 ? " !text-[red]" : ""} 800px:block hidden`}>
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(4);
        }}
      >
        <RiLockPasswordLine size={20} color={active === 4 ? "red" : ""} />
        <span className={`pl-3 ${active === 4 ? " !text-[red]" : ""} 800px:block hidden`}>
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(5);
        }}
      >
        <TbAddressBook size={20} color={active === 5 ? "red" : ""} />
        <span className={`pl-3 ${active === 5 ? " !text-[red]" : "" } 800px:block hidden`}>
          Address
        </span>
      </div>

        {
          user && user.role === "Admin" && (
            <Link to ="/admin">
            <div
              className="flex items-center cursor-pointer w-full mb-8"
              onClick={() => {
                setActive(6);
              }}
            >
              <MdOutlineAdminPanelSettings size={20} color={active === 6 ? "red" : ""} />
              <span className={`pl-3 ${active === 6 ? " !text-[red]" : "" } 800px:block hidden`}>
                Admin Panel
              </span>
            </div>
            </Link>
          )
        }


      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(5) || logoutHandler();
        }}
      >
        <HiOutlineLogout size={20} color={active === 6 ? "red" : ""} />
        <span className={`pl-3 ${active === 6 ? "!text-[red]" : ""} 800px:block hidden`}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
