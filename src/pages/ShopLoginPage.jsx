import React, { useEffect } from 'react'
import ShopLogin from "../components/Shop/ShopLogin"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {
    const navigate = useNavigate();
    const { isSeller,seller, isLoading } = useSelector((state) => state.seller);
  
    useEffect(() => {
      if(isSeller === true){
        navigate(`/dashborad`);
      }
    }, [isLoading, isSeller])
    return (    
      <div>
          <ShopLogin />
      </div>
    )
  }
  
  export default ShopLoginPage