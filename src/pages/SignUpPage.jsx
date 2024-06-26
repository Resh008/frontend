import React, { useEffect } from 'react'
import Signup from "../components/Signup/Signup";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUpPage = () => {

  const navigate= useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
      if(isAuthenticated){
        navigate("/")
      }
    
    }, [])

  return (
    <div><Signup/></div>
  )
}

export default SignUpPage