"use client";

import { useState } from "react";

export default function PreferencesSection() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-all duration-300">

      <div className="flex items-center gap-3 mb-8">
        <span className="p-2 bg-indigo-50 rounded-xl text-indigo-600 text-lg">⚙️</span>
        <div>
          <h2 className="font-bold text-slate-900 text-lg leading-tight">System Preferences</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Customize your app experience</p>
        </div>
      </div>

      {/* Dropdowns Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

        {/* Currency */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
            Currency
          </label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer">
            <option>Nigerian Naira (₦)</option>
            <option>US Dollar ($)</option>
            <option>Euro (€)</option>
            <option>British Pound (£)</option>
          </select>
        </div>

        {/* Date Format */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
            Date Format
          </label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer">
            <option>Apr 30, 2026</option>
            <option>30/04/2026</option>
            <option>04/30/2026</option>
            <option>2026-04-30</option>
          </select>
        </div>

        {/* Time Format */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
            Time Format
          </label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer">
            <option>12 Hour (AM/PM)</option>
            <option>24 Hour</option>
          </select>
        </div>

      </div>

      {/* Theme Toggle */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1 block mb-3">
          App Theme
        </label>
        <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">

          {/* Light Button */}
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all
              ${theme === "light"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
              }`}
          >
            ☀️ LIGHT
          </button>

          {/* Dark Button */}
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all
              ${theme === "dark"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
              }`}
          >
            🌙 DARK
          </button>

        </div>
      </div>

    </div>
  );
}