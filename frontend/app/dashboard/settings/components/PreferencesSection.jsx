"use client";

import { useState } from "react";

export default function PreferencesSection() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4">

      <h2 className="font-semibold text-gray-800 text-lg mb-6">
        Preferences
      </h2>

      {/* Dropdowns Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 outline-none focus:border-blue-400">
            <option>Nigerian Naira (₦)</option>
            <option>US Dollar ($)</option>
            <option>Euro (€)</option>
            <option>British Pound (£)</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Format
          </label>
          <select className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 outline-none focus:border-blue-400">
            <option>Apr 30, 2025</option>
            <option>30/04/2025</option>
            <option>04/30/2025</option>
            <option>2025-04-30</option>
          </select>
        </div>

        {/* Time Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Format
          </label>
          <select className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 outline-none focus:border-blue-400">
            <option>12 Hour (AM/PM)</option>
            <option>24 Hour</option>
          </select>
        </div>

      </div>

      {/* Theme Toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Theme
        </label>
        <div className="flex gap-3">

          {/* Light Button */}
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-all
              ${theme === "light"
                ? "bg-white border-blue-400 text-blue-600 shadow-sm"
                : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
          >
            ☀️ Light
          </button>

          {/* Dark Button */}
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-all
              ${theme === "dark"
                ? "bg-white border-blue-400 text-blue-600 shadow-sm"
                : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
          >
            🌙 Dark
          </button>

        </div>
      </div>

    </div>
  );
}