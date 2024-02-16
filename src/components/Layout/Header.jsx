import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "../../styles/style";
import { productData } from "../../static/data";
import { AiOutlineSearch } from "react-icons/ai"
import {IoIosArrowForward} from "react-icons/io"

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData && productData.filter((product) => 
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  }
  return (
    <div className={`${styles.section}`}>
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div>
          <Link to="/">
            <img src="https://media.discordapp.net/attachments/749319878003130380/1201804872081477662/BlameJohn.png?ex=65d46181&is=65c1ec81&hm=7b41677f6c13be62032c83692613ee49a9f967e7a2c4575168be05537a022d59&=&format=webp&quality=lossless&width=160&height=160" alt='' />
          </Link>
        </div>

        {/* Seach Box */}
        <div className="w-[50%] relative">
          <input type='text' placeholder='Search product...' value={searchTerm} onChange={handleSearchChange} className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md' />
          <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />
          {
            searchData && searchData.length !== 0 ? (
              <div className='absolute min-h-[30vh] bg-slate-50 shadow-sw-2 z-[9] p-4'>
                {searchData && searchData.map((i, index) => {
                  const d = i.name;

                  const Product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${Product_name}`}>
                      <div className="w-full flex items-start-py-3">
                        <img src={i.image_Url[0].url} alt=""
                          className='w-[40px] h-[40]px mr-[10px]'
                        />
                      </div>
                      <h1>{i.name}</h1>
                    </Link>
                  )
                })}
              </div>
            ) : null
          }
        </div>
        <div className={`${styles.button}`}>
            <Link to = "/seller">
                <h1 className='text-[#fff] flex items-center'>
                    Become a seller <IoIosArrowForward className="ml-1"/>
                </h1>
            </Link>

        </div>
      </div>
    </div>
  )
}

export default Header