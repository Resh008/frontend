import React from 'react'
import styles from '../../styles/style'

const Sponsored = () => {
  return (
    <div className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}>
        <div className="flex justify-between w-full">
            <div className="flex items-start">
                <img src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo-700x394.png" alt="" 
                style= {{width:"150px", objectFit:"contain"}}/>
            </div>
            <div className="flex items-start">
                <img src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo-700x394.png" alt="" 
                style= {{width:"150px", objectFit:"contain"}}/>
            </div>
            <div className="flex items-start">
                <img src="https://logos-world.net/wp-content/uploads/2022/05/Daraz-Logo-700x394.png" alt=""
                style= {{width:"150px", objectFit:"contain"}} />
            </div>
            <div className="flex items-start">
                <img src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-700x394.png" alt=""
                style= {{width:"150px", objectFit:"contain"}} />
            </div>
            <div className="flex items-start">
                <img src="https://logos-world.net/wp-content/uploads/2020/07/Asus-Logo-700x394.png" alt="" 
                style= {{width:"150px", objectFit:"contain"}}/>
            </div>
        </div>

    </div>
  )
}

export default Sponsored