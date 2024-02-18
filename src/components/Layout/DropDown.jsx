import React from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'

const DropDown = ({categoriesData, setDropDown}) => {
    const navigate = useNavigate();
    const submitHandle = (i) =>{
        navigate(`/products?category=${i.title}`)
        setDropDown(false);
        window.location.reload();
    }

  return (
    <div className='pb w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm '>
        {
            categoriesData && categoriesData.map((i,index)=>{
                <div>
                    key={index}
                    className=
                    </div>
            })
        }
    </div>
  )
}

export default DropDown