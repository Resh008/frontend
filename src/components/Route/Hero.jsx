import React from 'react'
import styles from '../../styles/style'

const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
    style={{
        backgroundImage:'url("https://media.discordapp.net/attachments/749319878003130380/1209928945458352128/Untitled_design_10.png?ex=65e8b523&is=65d64023&hm=7d54dee5658fee3d84f47f4c5cfd9934d38ac91c13ede5850bbbdade208f3192&=&format=webp&quality=lossless")',
    }}
    >
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
          <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3a3a3a] capitalize`}>
            Welcome to Almadi <br/> J Khoje tei
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolores quo, quisquam hic ipsum ipsam, eius placeat obcaecati eaque quam dolorem quos. Velit temporibus ex magnam id reiciendis, assumenda accusantium? 
            </p>
        </div>
    </div>
  )
}

export default Hero