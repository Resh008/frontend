import React from 'react'
import styles from '../../styles/style'
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: 'url("https://media.discordapp.net/attachments/749319878003130380/1209928945458352128/Untitled_design_10.png?ex=65e8b523&is=65d64023&hm=7d54dee5658fee3d84f47f4c5cfd9934d38ac91c13ede5850bbbdade208f3192&=&format=webp&quality=lossless")',
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3a3a3a] capitalize`}>
          Welcome to Almadi
        </h1>
        <p className='pt-5 text-[16px] font-Poppins font-[400] text-[#000000ba]'>
          Sabai saman aaba  {" "} 
          <br/>tapai ko Almadi ma
        </p>
        <Link to="/products" className='inline-block'>
          <div className={`${styles.button} mt-5 `}>
            <span className='text-[#ffff] font-Poppins text-[18px]'>
              Buy Now!
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Hero