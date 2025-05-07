import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const [newArrivals, setNewArrivals] = useState([]);

  // Fetch new arrivals from the API
  async function fetchNewArrivals() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/new-arrival`
      );
      console.log(response);
      
      setNewArrivals(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  }

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <section className="py-12 px-4 lg:px-0">
      {/* Section Heading */}
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Explore New Arrivals
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Discover the latest styles fresh off the runway, keeping your wardrobe trendy.
        </p>
      </div>

      {/* Scrollable Product Section */}
      <div className="relative container mx-auto">
        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 border rounded-full p-3 shadow-md text-black cursor-pointer hover:bg-gray-300 transition-all z-10 hidden sm:flex"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 border rounded-full p-3 shadow-md text-black cursor-pointer hover:bg-gray-300 transition-all z-10 hidden sm:flex"
        >
          <FiChevronRight className="text-2xl" />
        </button>

        {/* Product List */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-scroll scrollbar-hide px-4 snap-x snap-mandatory scroll-smooth overflow-hidden"
        >
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[80%] sm:min-w-[50%] lg:min-w-[30%] flex-shrink-0 snap-start relative bg-white rounded-lg shadow-lg transition-all hover:shadow-xl cursor-grabbing"
            >
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || "Product Image"}
                className="w-full h-[400px] object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-opacity-60 backdrop-blur-md text-white p-4 rounded-b-lg transition-all">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  <p className="mt-1 text-lg font-medium">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Scroll Buttons */}
      <div className="flex justify-center mt-6 sm:hidden">
        <button
          onClick={scrollLeft}
          className="mx-2 p-3 bg-gray-200 rounded-full shadow-md text-black cursor-pointer hover:bg-gray-300 transition-all"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={scrollRight}
          className="mx-2 p-3 bg-gray-200 rounded-full shadow-md text-black cursor-pointer hover:bg-gray-300 transition-all"
        >
          <FiChevronRight className="text-2xl" />
        </button>
      </div>
    </section>
  );
};

export default NewArrivals;
