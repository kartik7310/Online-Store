import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginImage from "../assets/login.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    console.log("user register", { Name, email, password });
  }
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className=" md:w-1/2 flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 md:p-12 bg-gray-100"
        >
          <div className="flex justify-center mb-4">
            <h2 className="text-xl font-semibold">E-Commerce</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Hey there! 👋</h2>
          <p className="text-center mb-4">
            Enter your email and password to login
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition">
            Login
          </button>
          <button className="flex items-center justify-center gap-3 mt-2 w-full max-w-sm bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <FaGoogle className="text-red-500 text-lg" />
            <span>Login with Google</span>
          </button>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center">
          <img
            src={loginImage}
            alt="Login visual"
            className="w-full h-[700px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
