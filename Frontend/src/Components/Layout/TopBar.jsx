import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
const TopBar = () => {
  return (
    <>
      <div className="bg-red-500 text-white">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <div className="hidden md:flex item-center space-x-4 flex align-center">
            <a href="#" className="hover:text-gray-300">
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="flex justify-evenly ">
          <span>We ship worldwide-Fast and reliable shipping!</span>
          <div>
          <a href="+124587749" className="hover:text-gray-300">
            +1(234) 567-890
          </a>
        </div>
        </div>
      
      </div>
    </>
  );
};

export default TopBar;
