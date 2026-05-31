"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`flex items-center justify-between px-8 py-4 bg-white sticky top-0 z-50 transition-shadow duration-300
      ${scrolled ? "shadow-md" : "shadow-sm"}`}>

      {/* Logo */}
      <Logo />

      {/* Nav Links */}
      <div className="flex gap-8">
        <Link href="/" className="text-blue-600 font-semibold border-b-2 border-blue-600 text-sm">
          Dashboard
        </Link>
        <Link href="/reports" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">
          Reports
        </Link>
        <Link href="/settings" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200">
          Settings
        </Link>
      </div>

      {/* User Icon */}
      <div className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200">
        👤 ▾
      </div>

    </nav>
  );
}