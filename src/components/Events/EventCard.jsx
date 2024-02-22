import React from 'react'
import styles from '../../styles/style'
import CountDown from "./CountDown"

const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
        <div className='w-full lg:-w[50%] m-auto'>
            <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
        </div>
        <div className="w-full lg:[w-50%] flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}> Iphone 15 Pro Max 256GB Golden</h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut modi ex reiciendis excepturi fugiat ipsum laboriosam voluptatibus hic, eligendi culpa! Laborum ducimus debitis illo consequatur saepe iste suscipit consectetur excepturi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo doloribus veritatis debitis exercitationem excepturi, voluptate rerum sequi quibusdam accusamus illo voluptatem quam, ab ut! Aspernatur omnis ratione id quo iure. lorem
            </p>
            <div className="flex py-2 justify-between">
                <div className='flex'>
                    <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                        Rs.101,202
                    </h5>
                    <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>
                        Rs.89,999
                    </h5>
                </div>
                <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>
                    <b>120</b> sold
                </span>
            </div>
            <CountDown />
        </div>
    </div>
  )
}

export default EventCard