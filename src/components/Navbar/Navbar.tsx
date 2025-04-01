"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logo from "../../../public/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo */}
      <Link href="/">
        <Image src={logo} alt="Logo" width={200} height={80} className="logo" />
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
            <Link href="/pages/movie/createmovie" className="block px-4 py-2 lg:inline">Add Movie</Link>
            <Link href="/pages/screen" className="block px-4 py-2 lg:inline">Add Screen</Link>
            <Link href="/pages/schedule" className="block px-4 py-2 lg:inline">Add Schedule</Link>
            <Link href="/pages/movie/addceleb" className="block px-4 py-2 lg:inline">Add Celebrity</Link>
          </>
        ) : (
          <>
            <Link href="/pages/auth/signin" className="block px-4 py-2 lg:inline">Login</Link>
            <Link href="/pages/auth/signup" className="block px-4 py-2 lg:inline">Signup</Link>
          </>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
