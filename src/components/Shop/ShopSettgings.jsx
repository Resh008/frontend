import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url, server } from '../../server'
import { MdAddAPhoto } from 'react-icons/md'
import axios from 'axios'
import { loadSeller } from '../../redux/actions/user'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const ShopSettgings = () => {

    const { seller } = useSelector((state) => state.seller)
    const [avatar,setAvatar] = useState();
    const dispatch = useDispatch();
    const [name,setName] = useState(seller && seller.name);
    const [description,setDescription] = useState(seller && seller.description ? seller.description : null);
    const [address,setAddress] = useState(seller && seller?.address);
    const [phoneNumber,setPhoneNumber] = useState(seller && seller.phoneNumber)

    const handleImage = async (e) => {
        e.preventDefault(); // Fix the typo here
        const file = e.target.files[0];
        setAvatar(file);
    
        const formData = new FormData();
        
        formData.append("image", file); // Use the 'file' variable here instead of 'e.target.files[0]'

        await axios.put(`${server}/shop/update-shop-avatar`,formData,{
            headers:{
                "Content-type":"multiple/form-data",
            },
            withCredentials: true,
        }).then((res)=>{
            toast.success("Avatar updated!")
            dispatch(loadSeller());
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    }

    const id = seller._id

    const updateHandler = async(e) => {
        e.preventDefault();
        axios.put(`${server}/shop/update-seller-info`,{
            name,
            address,
            phoneNumber,
            description,
        },{withCredentials:true}).then((res)=>{
            toast.success("Shop info updated!")
        })
    }
    
    return (
        <div className='w-full min-h-screen flex flex-col items-center'>
            <div className="flex w-full 800px:w-[80%] flex-col justify-center my-2">
                {/* Shop info form */}
                <form aria-aria-required = {true} onSubmit={updateHandler}>
                    <div className="bg-gray-100 flex items-center justify-center pt-3">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                            <div className="flex items-center space-x-2 mb-6">
                                <h1 className="text-xl font-semibold">Update Shop Details</h1>
                            </div>
                            <div className="flex items-center justify-center space-x-2 mb-6">
                            <div className="relative">
                        <img src={
                            avatar ? URL.createObjectURL(avatar) : `${backend_url}${seller.avatar.url}`
                        } className='w-[100px] h-[100px] rounded-full cursor-pointer ' alt="" />
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
                            <p className="text-sm text-gray-600 mb-6">Please fill in details you want to update</p>

                            <div className="space-y-3">
                            <div> 
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Shop Name *</label>
                                    <input type="name" value={name}  onChange={(e)=>setName(e.target.value)} placeholder={seller.name} className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm " />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Shop Description *</label>
                                    <input type="name" placeholder={seller?.description ? seller.description : "Enter your shop description..."} onChange={(e)=>setDescription(e.target.value)} value={description}  className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm " />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Shop Address *</label>
                                    <input type="name" placeholder={seller?.address} value={address}  onChange={(e)=>setAddress(e.target.value)} className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm " />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Shop Phone Number *</label>
                                    <input type="name" placeholder={seller?.phoneNumber} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm " />
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" value ="Update Shop" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Update Shop</button>
                                </div>
                                <div className="flex justify-center">
                                    <Link to = {`/shop/${id}`} className='cursor-pointer'>
                                        <span >Go back</span>
                                    </Link>
                                </div>
                            </div>


                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShopSettgings