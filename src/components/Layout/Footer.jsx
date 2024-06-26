import React from "react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    footercompanyLinks,
    footerProductLinks,
    footerSupportLinks,
} from "../../static/data";

const Footer = () => {
    return (
        <div className="bg-[#171717] text-white">
            <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
                <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
                    {/* Logo */}
                    <img
                        src="https://media.discordapp.net/attachments/749319878003130380/1201804872081477662/BlameJohn.png?ex=65d46181&is=65c1ec81&hm=7b41677f6c13be62032c83692613ee49a9f967e7a2c4575168be05537a022d59&=&format=webp&quality=lossless&width=160&height=160"
                        alt=""
                        style={{ filter: "brightness(0) invert(1)" }}
                    />
                    <br />
                    <p>Almadi - an Online Ecommerce designed for Nepal's Market</p>
                    <div className="flex items-center mt-[15px]">
                        <AiFillFacebook size={25} className="cursor-pointer" />
                        <AiOutlineTwitter
                            size={25}
                            style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                        <AiFillInstagram
                            size={25}
                            style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                        <AiFillYoutube
                            size={25}
                            style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                    </div>
                </ul>

                <ul className="text-center sm:text-start">
                    <h1 className="mb-1 font-semibold">Shop</h1>
                    {footercompanyLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                                to={link.link}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>


            </div>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
            >
                <span>© 2024 Resh Bikram Bhattarai | 2227741 |  All rights reserved.</span>
                <span>Terms · Privacy Policy</span>
                <div className="sm:block flex items-center justify-center w-full">
                    <img
                        src="https://web.khalti.com/static/img/logo1.png"
                        alt=""
                        className="filter white brightness-200 w-[150px] h-full"
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default Footer;