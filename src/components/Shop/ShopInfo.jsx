import React from 'react'
import { useSelector } from 'react-redux'
import { backend_url } from '../../server'
import styles from '../../styles/style'

const ShopInfo = ({ isOwner }) => {
    const { seller } = useSelector((state) => state.seller)
    const logOutHandler = () => {
        
    }

    // console.log(seller.avatar)

    return (
        <div>
            <div className='w-full py-5 '>
                <div className="w-full flex items-center  justify-center">
                    <img src={`${backend_url}${seller.avatar.url}`} alt="" className='w-[150px] h-[150px] object-cover rounded-full' />
                </div>
                <h3 className='text-center py-2 text-[20px]'>
                    {seller.name}
                </h3>
                <p className='text-[16px] text-[#000000a6] p-[10px] flex items-center'>{seller.description}</p>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Address</h5>
                <h4 className='text-[#000000a6]'>{seller.address}</h4>
            </div>

            <div className="p-3">
                <h5 className='font-[600]'>Phone Number</h5>
                <h4 className='text-[#000000a6]'>{seller.phoneNumber}</h4>
            </div>

            <div className="p-3">
                <h5 className='font-[600]'>Total Products</h5>
                <h4 className='text-[#000000a6]'>10</h4>
            </div>
            
            <div className="p-3">
                <h5 className='font-[600]'>Your Shop Ratings</h5>
                <h4 className='text-[#000000a6]'>9/10</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>You joined us on</h5>
                <h4 className='text-[#000000a6]'>{seller.createdAt.slice(0,10)}</h4>
            </div>
            {
                isOwner && (
                    <div className="py-3 px-4">
                        <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                            <span className='text-white'>Edit Shop</span>
                        </div>
                        <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px] !bg-red-700`} onClick={logOutHandler}>
                            <span className='text-white'>Logout</span>
                        </div>
                    </div>
                )
            } 
        </div>
    )
}

export default ShopInfo