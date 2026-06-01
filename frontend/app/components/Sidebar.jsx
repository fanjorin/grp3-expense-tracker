"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/dashboard/reports", label: "Reports", icon: "📊" },
  { href: "/dashboard/add-expense", label: "Add Expense", icon: "➕" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col px-4 py-6 fixed left-0 top-0 z-20">

      {/* Logo */}
      <div className="mb-10 px-2">
        <Logo />
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1"></div>

      {/* Track Every Expense Card */}
      <div className="bg-blue-50 rounded-2xl p-4 text-center">
        <div className="text-3xl mb-2">💰✅</div>
        <p className="font-bold text-gray-800 text-sm mb-1">Track smarter.</p>
        <p className="font-bold text-gray-800 text-sm mb-2">Save more.</p>
        <p className="text-gray-500 text-xs mb-4">
          Add your expenses and take control of your finances.
        </p>
        <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded-full w-full hover:bg-blue-700 transition-colors duration-200">
          Go Premium
        </button>
      </div>

    </aside>
  );
}
