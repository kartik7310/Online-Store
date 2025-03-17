import React, { useState } from "react";

import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }
  function handleSearch(e){
    e.preventDefault()
    console.log("this value is here",searchTerm);
    setIsOpen(false)
  }

  return (
    <>
      <div
        className={`flex items-center justify-center w-full transition-all duration-300 ${
          isOpen ? "absolute top-0 left-0 w-full bg-white h-30 z-50" : "w-auto"
        }`}
      >
        {isOpen ? (
          <form  onSubmit={handleSearch} className="flex relative items-center justify-center w-full">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-100 px-4 py-2 pr-14 w-full text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                <HiMagnifyingGlass className="h-6 w-6" />
              </button>
            </div>
            <button
              type="submit"
              onClick={handleToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMiniXMark className="h-6 w-6" />
            </button>
          </form>
        ) : (
          <button onClick={handleToggle}>
            <HiMagnifyingGlass className="h-6 w-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBar;
