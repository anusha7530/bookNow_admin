"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logo from "../../../public/logo.png";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const checkAdminAuthentication = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        // Admin is authenticated
        setIsAdminAuthenticated(true);
      } else {
        // Admin is not authenticated
        setIsAdminAuthenticated(false);
      }
    } catch (error) {
      console.error(
        "An error occurred during admin authentication check",
        error
      );
      setIsAdminAuthenticated(false);
    }
  };
  const handleLogout = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/admin/logout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Admin logout Successful", {
          position: "top-center",
        });
        window.location.href = "/pages/auth/signin";
      } else {
        console.error("Logout failed:", data);
      }
    } catch (err) {
      console.error("Logout error:", err);
      window.location.href = "/pages/auth/signin";
    }
  };
  useEffect(() => {
    checkAdminAuthentication();
  }, []);
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={80}
            className="logo"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links */}
        <div
          className={`lg:flex gap-6 items-center ${
            isOpen ? "block" : "hidden"
          } absolute lg:static top-16 left-0 right-0 bg-gray-900 lg:bg-transparent p-4 lg:p-0`}
        >
          {isAdminAuthenticated ? (
            <>
              <Link
                href="/pages/movie/createmovie"
                className="block px-4 py-2 lg:inline"
              >
                Add Movie
              </Link>
              <Link href="/pages/screen" className="block px-4 py-2 lg:inline">
                Add Screen
              </Link>
              <Link
                href="/pages/schedule"
                className="block px-4 py-2 lg:inline"
              >
                Add Schedule
              </Link>
              <Link
                href="/pages/movie/addceleb"
                className="block px-4 py-2 lg:inline"
              >
                Add Celebrity
              </Link>
              <button
                className="bg-[#b92d14e8] px-4 py-2 rounded-lg"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/pages/auth/signin"
                className="block px-4 py-2 lg:inline"
              >
                Login
              </Link>
              <Link
                href="/pages/auth/signup"
                className="block px-4 py-2 lg:inline"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
