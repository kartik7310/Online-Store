import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CardDrower from "../Layout/CardDrower";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  function handleToggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }
  function handleToggleMobileNav() {
    setNavOpen(!navOpen);
  }
  return (
    <>
      <nav className="flex justify-between px-4 py-4">
        <div>
          <Link to="/" className="text-2xl font-med">
            Rabbit
          </Link>
        </div>
        <div className=" hidden md:flex space-x-6">
          <Link to="#" className="text-gray-700 hover:text-black uppercase">
            man
          </Link>
          <Link to="#" className="text-gray-700 hover:text-black uppercase">
            woman
          </Link>
          <Link to="#" className="text-gray-700 hover:text-black uppercase">
            top wear
          </Link>
          <Link to="#" className="text-gray-700 hover:text-black uppercase">
            bottom wear
          </Link>
        </div>
        <div className="flex item-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button className="relative hover:text-black">
            <HiOutlineShoppingBag
              onClick={handleToggleDrawer}
              className="h-6 w-6 text-gray-700 cursor-pointer"
            />
            <span className="absolute bg-red-500 text-white text-xs rounded-full px-1 -top-1 py-0.2">
              4
            </span>
          </button>

          {/* searchBar */}

          <SearchBar />
          <button className="md:hidden">
            <HiBars3BottomRight
              className="h-5 w-6 text-gray-700"
              onClick={handleToggleMobileNav}
            />
          </button>
        </div>
      </nav>
      <CardDrower
        drawerOpen={drawerOpen}
        handleToggleDrawer={handleToggleDrawer}
      />

      {/* mobileNavBar */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button>
            <IoMdClose
              onClick={handleToggleMobileNav}
              className="h-6 w-6 text-gray-600"
            />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="flex flex-col space-y-4">
            <Link
              to="#"
              onClick={handleToggleMobileNav}
              className="black text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="#"
              onClick={handleToggleMobileNav}
              className="black text-gray-600 hover:text-black"
            >
              WoMen
            </Link>
            <Link
              to="#"
              onClick={handleToggleMobileNav}
              className="black text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="#"
              onClick={handleToggleMobileNav}
              className="black text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
