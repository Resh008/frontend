import React, { useState } from "react";

const PopupPassword = ({ open, onClose, sendPassword }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    onClose(); // Close the modal after password change
    sendPassword(newPassword); // Call the callback function 
  };


  return (
    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={open ? "fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto" : "hidden"}>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-white">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-blue-400 dark:text-black">
              Enter your Password
            </h3>
            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handlePasswordChange}>
              <div>
                <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-black dark:text-black">Current Password</label>
                <p className="font-Poppins text-xs text-gray-500 pb-2 pt-1">For security reasons, Please enter your current password to continue. </p>
                <input type="password" name="new-password" id="new-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-600" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupPassword;
