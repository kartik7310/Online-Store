import React, { use, useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Components/Product/FilterSidebar";
import ProductGrid from "../Components/Product/ProductGrid";
import SortOption from "../Components/Product/SortOption";

const CollectionPage = () => {
  const [product, setProduct] = useState([]);
  const sidebarRef = useRef(null);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  function toggleSidebar() {
    setIsOpenSidebar(!isOpenSidebar);
  }

  function handleClickOutSide(e) {
    //close sidebar if click outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsOpenSidebar(false);
    }
  }
  useEffect(() => {
    //add event listener for click event
    document.addEventListener("mousedown", handleClickOutSide);
    //remove the event listener
    return()=>{
      document.removeEventListener("mousedown", handleClickOutSide);
    }
   
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const fetchProduct = [
        {
          _id: 1,
          name: "product 1",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500/?random=1" }],
        },
        {
          _id: 2,
          name: "product 2",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500/?random=2" }],
        },
        {
          _id: 3,
          name: "product 3",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500/?random=3" }],
        },
        {
          _id: 4,
          name: "product 4",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500/?random=4" }],
        },
        {
          _id: 5,
          name: "product 5",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500/?random=5" }],
        },
        {
          _id: 6,
          name: "product 6",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500/?random=6" }],
        },
        {
          _id: 7,
          name: "product 7",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500/?random=7" }],
        },
        {
          _id: 8,
          name: "product 8",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500/?random=8" }],
        },
      ];
      setProduct(fetchProduct);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobile filter button */}
      <button className="lg:hidden border p-2 flex justify-center items-center">
        <FaFilter onClick={toggleSidebar} className="mr-2" />
      </button>

      {/* sidebar filter */}
      <div
        ref={sidebarRef}
        className={`${
          isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        } fixed inset -y-0 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 h-full`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <div className="text-2xl uppercase mb-4">All Collection</div>

        {/* sort options */}
        <SortOption/>
        <ProductGrid products={product}/>
      </div>
    </div>
  );
};

export default CollectionPage;
