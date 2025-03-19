import React from "react";
import heroImg from "../../../src/assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Vacation Ready"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-800 to-gray-500 opacity-60"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-3xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm md:text-lg tracking-tight mb-6">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <p>
            <Link
              to="#"
              className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg"
            >
              Shop Now
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
