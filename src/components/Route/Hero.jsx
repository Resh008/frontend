import React from 'react'
import styles from '../../styles/style'

const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] 800px:min-h[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
    style={{
        backgroundImage:'url("/uploads/bg.jpg")',
    }}
    >

    </div>
  )
}

export default Hero