import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"; // ✅ Import icons

const Footer = () => {
  return (
    <footer className="border-t bg-gray-100 py-12 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        
        {/* Newsletter Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-600 mb-4">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className="font-medium text-gray-700 text-sm mb-4">
            Sign up and get 10% off your first order.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* Shop Section */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                Women's Dresses
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                Accessories
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                New Arrivals
              </Link>
            </li>
          </ul>
        </section>

        {/* Support Links */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                FAQ's
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </section>

        {/* Social Media Links */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 transition">
              <FaGithub size={24} />
            </a>
          </div>
        </section>
            {/* Copyright Section */}
 
            <div className="container mx-auto mt-12 px-4 lg:px-0  border-t border-gray-200 pt-6">
  <p className="text-gray-500 text-sm *:tracking-tighter text-center md:text-left hover:text-black">
    © {new Date().getFullYear()} ShopEase. All rights reserved.
  </p>
</div>



      </div>
    </footer>
  );
};

export default Footer;
