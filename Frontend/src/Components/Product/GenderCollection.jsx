import React from "react";
import MenCollection from "../../assets/mens-collection.webp";
import WomenCollection from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1 group overflow-hidden">
          <img
            src={WomenCollection}
            alt="Women's Collection"
            className="w-full h-[400px] md:h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-105 "
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 shadow-lg transition-opacity duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline font-semibold hover:text-gray-700"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 group overflow-hidden">
          <img
            src={MenCollection}
            alt="Men's Collection"
            className="w-full h-[400px] md:h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 shadow-lg transition-opacity duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline font-semibold hover:text-gray-700"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
