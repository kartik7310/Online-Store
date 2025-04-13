import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp"
const FeatureCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* left container  */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort and style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel and style
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover high-quality,comfort clothing that effortlessly blends
            fashion and function,Designed to make you look and feel great every
            day.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white px-6 py-2  rounded-lg text-lg  hover:text-gray-800"
          >
            Shop Now
          </Link>
        </div>
        <div className="lg:w-1/2">
        <img  className ="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl" src={featured} alt="featured-image" /></div>
      </div>
    </section>
  );
};

export default FeatureCollection;
