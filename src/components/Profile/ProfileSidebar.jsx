import React from "react";
import { AiOutlineCreditCard, AiOutlineMessage } from "react-icons/ai";
import {
  HiOutlineLogout,
  HiOutlineShoppingBag,
  HiReceiptRefund,
  HiShoppingBag,
} from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`,{withCredentials: true})
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        window.location.reload(true);
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
        <span className={`pl-3 ${active === 1 ? "text-[red]" : ""}`}>
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
        <span className={`pl-3 ${active === 2 ? "text-[red]" : ""}`}>
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(3);
        }}
      >
        <HiReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-[red]" : ""}`}>
          Refunds
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(4) || navigate("/inbox");
        }}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span className={`pl-3 ${active == 4 ? "text-[red]" : ""}`}>Inbox</span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(5);
        }}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span className={`pl-3 ${active == 5 ? "text-[red]" : ""}`}>
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(6);
        }}
      >
        <AiOutlineCreditCard size={20} color={active === 6 ? "red" : ""} />
        <span className={`pl-3 ${active == 6 ? "text-[red]" : ""}`}>
          Payment Methods
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(7);
        }}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span className={`pl-3 ${active == 7 ? "text-[red]" : ""}`}>
          Address
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(8) || logoutHandler();
        }}
      >
        <HiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
        <span className={`pl-3 ${active == 8 ? "text-[red]" : ""}`}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
