import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Rings } from 'react-loader-spinner';
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../assets/register.webp";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {registration} from "../redux/Slice/authSlice"
const Signup = () => {
  const disPatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    disPatch(registration({email,name,password}))
    // if (!name || !password || !email) {
    //   toast.error("All fields are required", { type: "error" });
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/v1/register",
    //     {
    //       name,
    //       email,
    //       password,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );

    //   toast("Signup Successfully", { type: "success" });
    //   console.log("User registered:", response.data);
    //   setName("");
    //   setEmail("");
    //   setPassword("");
    //   navigate("/login");
    // } catch (error) {
    //   console.error("Signup error:", error);

    //   if (
    //     error.response &&
    //     error.response.data &&
    //     error.response.data.message
    //   ) {
    //     toast(error.response.data.message, { type: "error" });
    //   } else {
    //     toast("Something went wrong. Please try again.", { type: "error" });
    //   }
    // } finally {
    //   setLoading(false);
    // }
  }
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className=" w-full md:w-1/2 flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 md:p-12 bg-gray-100"
        >
          <div className="flex justify-center mb-4">
            <h2 className="text-xl font-semibold">E-Commerce</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Hey there! 👋</h2>
          <p className="text-center mb-4">Enter your Details for signup</p>

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

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="Name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <button
  disabled={loading}
  className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition cursor-pointer flex justify-center items-center gap-2"
>
  {loading ? (
    <>
      <Rings
        height={20}
        width={20}
        color="#ffffff"
        visible={true}
        ariaLabel="rings-loading"
      />
      Signing up...
    </>
  ) : (
    "Signup"
  )}
</button>
          <button className="flex items-center justify-center gap-3 mt-2 w-full max-w-sm bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
            <FaGoogle className="text-red-500 text-lg" />
            <span>Signup with Google</span>
          </button>
          <div className="mt-4 text-center text-sm">
            Already have account ?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center">
          <img
            src={registerImage}
            alt="Login visual"
            className="w-full h-[700px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
