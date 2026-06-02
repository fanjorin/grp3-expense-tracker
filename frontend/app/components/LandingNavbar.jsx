"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

const navLinks = ["Features", "How It Works", "Pricing", "About Us", "Contact"];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <nav className={`flex items-center justify-between px-6 md:px-10 py-4 sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/70 backdrop-blur-sm"}`}>

      {/* Logo */}
      <Logo />

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
        {navLinks.map((link) => (
          <button
            key={link}
            className="relative hover:text-blue-600 transition-colors duration-200 group"
          >
            <span>{link}</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard/reports" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Reports
            </Link>
            <Link href="/dashboard" className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200">
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Log in
            </Link>
            <Link href="/signup" className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200">
              Get Started Free
            </Link>
          </>
        )}
      </div>

    </nav>
  );
}