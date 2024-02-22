import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import styles from '../styles/style'

const FAQPage = () => {
  return (
    <div>
        <Header activeHeading={5}/>
        <Faq/>
        <Footer/>
    </div>
  )
}

const Faq = () => {
    const [activeTab,setActiveTab] = useState(0);

    const toggleTab = (tab) => {
        if(activeTab===tab){
            setActiveTab(0);
        } else{
            setActiveTab(tab);
        }
    }




return(
    <div className={`${styles.section} my-8 `}>
        <h2 className='text-3xl font-bold text-gray-900 mb-8'>FAQ</h2>
        <div className="mx-auto space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <button
                className='flex items-center justify-between w-full'
                onClick={()=> toggleTab(1) }
                >
                    <span className='text-lg font-medium text-gray-900'>
                        How to get Almadi
                    </span>

                </button>
            </div>
        </div>
    </div>
)

}
export default FAQPage

