"use client";

import { useState } from "react";

export default function ExpenseForm() {
  const [formData, setFormData] = useState({
    category: "Food",
    amount: "",
    date: "2025-04-30",
    description: "",
    paymentMethod: "Cash",
    recurring: false,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      <h2 className="font-semibold text-gray-800 text-lg mb-6">
        Expense Details
      </h2>

      {/* Category */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="relative">
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 appearance-none"
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Bills</option>
            <option>Groceries</option>
            <option>Utilities</option>
            <option>Transportation</option>
            <option>Savings</option>
            <option>Miscellaneous</option>
          </select>
          <span className="absolute right-4 top-3 text-gray-400">▾</span>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (₦)
        </label>
        <input
          type="number"
          placeholder="5,000"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400"
        />
      </div>

      {/* Date */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-gray-400">📅</span>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400"
          />
        </div>
      </div>

    </div>
  );
}