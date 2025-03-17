import React from "react";
import { IoMdClose } from "react-icons/io";
import CardProduct from "../Cart/CardProduct";

const CardDrower = ({ drawerOpen, handleToggleDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-full bg-white sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/3
 h-full white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
   drawerOpen ? "translate-x-0" : "translate-x-full"
 }`}
    >
      {/* // close button */}
      <div className="flex justify-end p-4">
        <button>
          <IoMdClose
            onClick={handleToggleDrawer}
            className="h-6 w-6r cursor-pointer"
          />
        </button>
      </div>
      {/* cart contents with scrollable area */}
      <div className="overflow-y-auto flex-grow p-4">
        <h2 className="text-xl font-semibold mb-4">Your cart</h2>
        <CardProduct />
      </div>
      {/* button for checkout */}
      <div className="bottom-0 sticky p-4">
        <button className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
          CheckOut
        </button>
      </div>
      <p className="text-sm tracking-tighter text-gray-500  text-center">
        Shipping,taxes and discount codes calculated at checkout
      </p>
    </div>
  );
};

export default CardDrower;
