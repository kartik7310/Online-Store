import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {

  const [openSidebar, setOpenSidebar] = useState(false);

  function toggleSidebar() {
    setOpenSidebar(!openSidebar);
  }
 
  return (
    <div className=" min-h-screen flex flex-col md:flex-row relative">
      <div className=" flex md:hidden  p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSidebar}>
          <FaBars height={24} />
        </button>
        <h2 className="ml-4 text-xl font-medium cursor-pointer" >Admin Dashboard</h2>
      </div>
      {/* mobile overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
   {/* 
      sidebar */}

      <div className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${openSidebar ?"translate-x-0":"-translate-x-full"} transaction-transform duration-300 md:translate-x-0 md:static md:block z-20`}>
        {/* sidebar */}
        <AdminSidebar/>
      </div>
      {/* main content */}  
      <div className="flex-grow p-6 overflow-auto">
<Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
