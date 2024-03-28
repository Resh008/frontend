import React from 'react'
import Lottie from "react-lottie";
import animationData from "../../Assets/Animations/Animation - 1711640378390.json";

const Loader = () => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className='w-full h-screen flex items-center justify-normal'>
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  )
}

export default Loader