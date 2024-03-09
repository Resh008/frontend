import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/style';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const incremenetCount = () => {
    setCount(count + 1)
  }

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=Hello This is a pasal which is not yet a pasal")

  }

  console.log(data)

  return (
    <div className='bg-white'>
      {data ? (
        <div className={`unset ${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex ">
              <div className="w-full 800px:w-[50%]">
                <img src={data.image_Url[select].url} alt="" className='w-[80%]' />
                <div className="w-full 800px:w-[50%]">
                  <div className="w-full flex">
                    <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                      <img
                        src={data?.image_Url[0].url}
                        alt=""
                        className='h-full w-full'
                        onClick={() => setSelect(0)}
                      />
                    </div>
                    <div className={`${select === 1 ? "border" : "null"} cursor-pointer`}>
                      <img
                        src={data?.image_Url[1].url}
                        alt=""
                        className='h-full w-full'
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </div>

                </div>

              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>
                  {data.name}
                </h1>
                <p>
                  {data.description}
                </p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Rs.{data.discount_price}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? "Rs." + data.price : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className='bg-gradient-to-r from-red-400 to-red-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-90 transition duration-300 ease-in-out'
                      onClick={decrementCount}>
                      -
                    </button>
                    <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[8px]'>
                      {count}
                    </span>
                    <button
                      className='bg-gradient-to-r from-red-400 to-red-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-90 transition duration-300 ease-in-out'
                      onClick={incremenetCount}>
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className='cursor-pointer'
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title='Remove from whitelist'
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className='cursor-pointer'
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title='Add to whitelist'
                      />
                    )}
                  </div>
                </div>
                <div className={`${styles.button} mt-6 rounded h-11 flex items-center`}>
                  <span className='text-white flex items-center'>
                    Add to Cart <AiOutlineShoppingCart className='ml-1' />
                  </span>
                </div>
                <div className="flex items-center pt-8">

                  <img src={data.shop.shop_avatar.url} alt=""
                    className='w-[50px] h-[50px] rounded-full mr-2' />
                  <div className='pr-8'>
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className='pb-3 text[15px]'>
                      {(data.shop.ratings)} Ratings
                    </h5>
                  </div>
                  <div className={`${styles.button} bg-[#6444d1] !rounded !h-11`}
                    onClick={handleMessageSubmit}>
                    <span className='text-white flex items-center'>
                      <AiOutlineMessage className='ml-1' />  Send Message
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <ProductDetailsInfo data={data} />
          <br /> <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className=' bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded'>
      <div className="full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5 className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {
            active === 1 ? (
              < div className={`${styles.active_indicator}`} />
            ) : null
          }
        </div>
        <div className="relative">
          <h5 className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {
            active === 2 ? (
              < div className={`${styles.active_indicator}`} />
            ) : null
          }
        </div>
        <div className="relative">
          <h5 className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {
            active === 3 ? (
              < div className={`${styles.active_indicator}`} />
            ) : null
          }
        </div>
      </div>
      {
        active === 1 ? (
          <>
            <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
              Ecommerce offers many benefits to buyers and consumers, but one drawback is that consumers can’t physically interact with items they’re buying. Overcoming this challenge is a primary concern for ecommerce business — and the solution is all in the details.

              A good product detail page (PDP) does exactly that — it provides the particulars users need to bridge the gap created by online shopping.
            </p>

            <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
              In spite of the PDP’s huge impact on conversions, a Baymard Institute study revealed that many ecommerce brands struggle with effective product detail page design. It’s hard to create persuasive PDPs because large quantities of information must be highly detailed and meticulously accurate — without being awkward to navigate.

              While there’s no set formula, this post offers best practices and strategies that can help you develop elegant product detail pages that compel higher conversion rates. It includes:
            </p >
            <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
              In spite of the PDP’s huge impact on conversions, a Baymard Institute study revealed that many ecommerce brands struggle with effective product detail page design. It’s hard to create persuasive PDPs because large quantities of information must be highly detailed and meticulously accurate — without being awkward to navigate.

              While there’s no set formula, this post offers best practices and strategies that can help you develop elegant product detail pages that compel higher conversion rates. It includes:
            </p >

          </>
        ) : null
      }

      {
        active === 2 ? (
          <div className="w-full justify-center min-h-[40vh] flex items-center">
            <p>
              No Reviews yet!
            </p>
          </div>
        ) : null
      }

      {
        active === 3 && (
          <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
              <div className="flex items-center">
                <img src={data.shop.shop_avatar.url} alt=""
                  className='w-[50px] h-[50px] rounded-full' />

                <div className='pl-3'>
                  <h3 className={`${styles.shop_name}`}>
                    {data.shop.name}
                  </h3>
                  <h5 className='pb-2 text-[15px]'>
                    ({data.shop.ratings}) Ratings
                  </h5>
                </div>
              </div>
              <p className='pt-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde molestiae officiis soluta sapiente fugiat! Est voluptatum commodi consectetur. Nostrum accusantium numquam beatae quia eum expedita, aspernatur alias esse nesciunt laboriosam.
              </p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on <span className='font-[500]'>4rth March,2024</span>
                </h5>
                <h5 className="font-[600]">
                  Total products <span className='font-[500]'>1,223</span>
                </h5>
                <h5 className="font-[600]">
                  Total Reviews <span className='font-[500]'>32</span>
                </h5>
                <Link to ="/">
                  <div
                    className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                  >
                    <h4 className='text-white'>Visit Shop</h4>
                  </div>

                </Link>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductDetails;
