import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "../../styles/style";
import { categoriesData, productData } from "../../static/data";
import { AiOutlineHeart, AiOutlineProfile, AiOutlineSearch, AiOutlineSetting, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { CgProfile } from 'react-icons/cg'
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx"
import Navbar from "./Navbar";
import { useSelector } from "react-redux"
import { backend_url } from '../../server.js';
import Cart from "../cart/Cart"
import Whitelist from "../Whitelist/Whitelist"
import { RxCross1 } from 'react-icons/rx';
import shadows from '@mui/material/styles/shadows.js';
import { HiOutlineLogout } from 'react-icons/hi';


const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const {allProducts} = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const {wishList} = useSelector((state)=>state.wishList)

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWitelist, setopenWitelist] = useState(false);
  const [open, setOpen] = useState(false);




  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = allProducts && allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  })

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div className='w-[100px] h-full pb-1 '>
            <Link to="/"  className='pb-[25px]'>
              <img src="https://cdn.discordapp.com/attachments/749319878003130380/1231484518498832466/Untitled_design_26.png?ex=66372055&is=6624ab55&hm=2814164c24dee9fd6370a4974f179d17ddb233bd5f750105fda23b91ad76255d" alt='logo' />
            </Link>
          </div>

          {/* Seach Box */}
          <div className="w-[50%] relative">
            <input type='text' placeholder='Search product...' value={searchTerm} onChange={handleSearchChange} className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'/>
            <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />
            {
              searchData && searchData.length !== 0 ? (
                <div className='absolute min-h-[30vh] bg-slate-50 shadow-sw-2 z-[9] p-4'>
                  {searchData && searchData.map((i, index) => {

                    return (
                      // <Link to={`/products/${i.name.replace(/\s+/g, "-")}`} onClick={() => {
                        <Link to={`/products/${i._id}`} onClick={() => {
                        window.location.reload();
                        window.location.href = `/products/${i.name.replace(/\s+/g, "-")}`;
                      }}>
                        <div className="w-full flex items-start-py-3">
                          <img src={`${backend_url}${i.images[0]}`} alt=""
                            className='w-[40px] h-[40]px mr-[10px]'
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : null
            }
          </div>
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className='text-[#fff] flex items-center'>
                Seller Panel <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>

          </div>
        </div>
      </div>
      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full bg-[#2f34bd] h-[70px]`}>
        <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
          {/* Categories */}
          <div>
            <div onClick={() => setDropDown(!dropdown)}>
              <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                <BiMenuAltLeft size={30} className='absolute top-3 left-2' />
                <button
                  className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white text-lg font-[500] select-none rounded-t-md`}
                >
                  All Categories
                </button>
                <IoIosArrowDown
                  size={20}
                  className='absolute right-2 top-4 cursor-pointer'
                  onClick={() => setDropDown(!dropdown)}
                />
                {
                  dropdown ? (
                    <DropDown
                      categoriesData={categoriesData}
                      setDropDown={setDropDown}
                    />
                  ) : null
                }
              </div>
            </div>

          </div>
          {/* Navigation Header */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className='flex'>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]"
                onClick={() => setopenWitelist(true)}
              >
                <AiOutlineHeart
                  size={30}
                  color='rgb(255 255 255 /83% )' />
                <span className='absolute right-0 top-0 rounded-full bg-[#FA3E3E] w-4 h-4 top right p-0 m-0 text-white text-[12px] leading-tight text-center'>
                  {wishList && wishList.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}>
                <AiOutlineShoppingCart
                  size={30}
                  color='rgb(255 255 255 /83% )' />
                <span className='absolute right-0 top-0 rounded-full bg-[#FA3E3E] w-4 h-4 top right p-0 m-0 text-white text-[12px] leading-tight text-center'>
                {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img src={`${backend_url}${user.avatar.url}`} className='w-[35px] h-[35px] rounded-full' alt="" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 /83% )" />
                  </Link>
                )}
              </div>
            </div>

            {/* Cart Popup */}
            {
              openCart ? (
                <Cart setOpenCart={setOpenCart} />
              ) : null
            }

            {/* Whitelist Popup */}
            {
              openWitelist ? (
                <Whitelist setopenWitelist={setopenWitelist} />
              ) : null
            }
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className={`${active === true ? "shadow-sm fixed top-0 z-10" : null} w-full h-[60px] fixed bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}>
        <div className="w-full flex items-center justify-between">
          <div >
            <BiMenuAltLeft
              size={40}
              className='ml-4 cursor-pointer'
              onClick={() => setOpen(true)} />
          </div>
          <div>
            <Link to="/">
              <img src="https://logolook.net/wp-content/uploads/2023/10/Daraz-Logo.png" alt=""
                className='mt-1 cursor-pointer w-[16%] ml-[50%]' />
            </Link>
          </div>
          <div >
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} />
              <span className='absolute right-0 top-0 rounded-full bg-[#FA3E3E] w-4 h-4 top right p-0 m-0 text-white text-[12px] leading-tight text-center'>
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>
        {/* header Sidebar */}
        {
          open && (
            <div className='fixed w-full bg-[#00000051] z-20 h-full top-0 left-0'>
              <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full justify-between flex pr-3">
                  <div>
                    <div className="relative mr-[15px]">
                      <AiOutlineHeart
                        size={30}
                        className='!mt-5 !ml-3' />
                      <span className='absolute right-0 top-0 rounded-full bg-[#FA3E3E] w-4 h-4 top right p-0 m-0 text-white text-[12px] leading-tight text-center'>
                        0
                      </span>
                    </div>
                  </div>
                  <RxCross1
                    size={30}
                    className='ml-4 mt-5 cursor-pointer'
                    onClick={() => setOpen(false)} />
                </div>
                <div className="my-8 w-[92%] m-auto h-[40px relative]">
                  <input type='text' placeholder='Search product...' value={searchTerm} onChange={handleSearchChange} className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md' />
                  {
                    searchData && (
                      <div className="absolute bg-white z-10 shadow w-full left-0 p-3">
                        {searchData.map((i) => (
                          <Link to={`/products/${i.name.replace(/\s+/g, "-")}`}>
                            <div className="flex items-center justify-between m-1">
                              <img src={i.image_Url[0].url} alt="" className='w-[50px] mr-2' />
                              <h4>{i.name}</h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )
                  }
                </div>
                <Navbar active={activeHeading} />
                <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                  <Link to="/shop-create">
                    <h1 className='text-[#fff] flex items-center'>
                      Become a seller <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
                <br />
                <br />
                <br />
                <div className="flex w-full justify-center space-x-1">
                  {
                    !isAuthenticated && (
                      <>
                        <Link to="/login">Login /</Link>
                        <Link to="/sign-up">Sign-up</Link>
                      </> 
                    )
                  }
                  {
                    isAuthenticated && (
                      <> 
                      <div>
                      <Link to="/profile">
                      <img src={`${backend_url}${user.avatar.url}`} className='w-[35px] h-[35px] rounded-full outline outline-green-500' alt="" />
                       </Link>
                      </div>
                      <Link to = "/profile" className='flex items-center justify-between '> Manage Profile / </Link>
                        
                        <Link to = "/logout" className='flex items-center justify-between'><HiOutlineLogout size={20}/> Logout </Link>

                      </>
                    )
                  }
                </div>

              </div>
            </div>
          )
        }
      </div>
    </>
  )
};

export default Header