"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: "🏠" },
  { href: "/dashboard/reports", label: "Analytics", icon: "📊" },
  { href: "/dashboard/add-expense", label: "New Entry", icon: "➕" },
  { href: "/dashboard/settings", label: "Account", icon: "⚙️" },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col px-5 py-8 fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>

        {/* Close button - Mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden absolute right-4 top-8 text-slate-400 hover:text-slate-600 p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* Logo Area */}
        <div className="mb-12 px-3">
          <Logo />
        </div>

      {/* Main Navigation */}
      <div className="flex flex-col gap-8">
        <div>
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm transition-all duration-300 group ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-bold shadow-sm shadow-blue-100/50"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className={`text-base transition-transform duration-300 group-hover:scale-110 ${isActive ? "scale-110" : ""}`}>
                    {link.icon}
                  </span>
                  <span className="tracking-tight">{link.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Premium Upgrade Card */}
      <div className="relative mt-auto overflow-hidden rounded-3xl bg-[#0052CC] p-6 text-white shadow-xl shadow-blue-600/20 group cursor-default">
        {/* Background Decorative Shape */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

        <div className="relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl mb-4 backdrop-blur-sm">💎</div>
          <p className="font-black text-sm mb-1 tracking-tight">Unlock Insights</p>
          <p className="text-[11px] text-blue-100/80 mb-5 leading-relaxed font-medium">
            Get advanced analytics and automated reports.
          </p>
          <button className="bg-white text-[#0052CC] text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl w-full hover:bg-blue-50 transition-colors shadow-sm">
            Upgrade Now
          </button>
        </div>
      </div>

    </aside>
  );
}
