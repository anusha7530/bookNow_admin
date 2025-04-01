"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../../../../public/logo.png";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful signin, e.g., show a success message
        console.log("Admin login successful", data);

        toast.success("Admin login Successful", {
          position: "top-center",
        });
      } else {
        // Handle signin error
        console.error("Admin login failed", response.statusText);
        toast.error("Admin login Failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("An error occurred during login", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-[900px] min-h-[400px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row mt-12">
            <div className="hidden md:w-2/5 bg-black md:flex justify-center items-center">
              <Image src={logo} alt="" className="w-72 h-96 object-contain" />
            </div>
    
            <div className="md:w-3/5 p-6">
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-lg font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border-b border-[#b92d14e8] focus:outline-none focus:border-[#29170fe8]"
                />
              </div>
    
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-lg font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border-b border-[#b92d14e8] focus:outline-none focus:border-[#29170fe8]"
                />
              </div>
              <button
                onClick={handleSignin}
                className="bg-[#b92d14e8] text-white font-semibold py-2 px-6 rounded-md self-center hover:bg-[#573a2de8] transition"
              >
                Login
              </button>
    
              <p className="mt-4 text-center text-gray-700">
                Don't have an account?
                <Link href="/auth/signup" className="text-[#b92d14e8] font-medium">
                  {" "}
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
  )
};

export default SigninPage;
