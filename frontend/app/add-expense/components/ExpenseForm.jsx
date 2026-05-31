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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">

      <h2 className="font-semibold text-gray-800 text-lg mb-6">
        Expense Details
      </h2>

      {/* Category */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div className="relative">
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 appearance-none transition-all duration-200"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
        <input
          type="number"
          placeholder="5,000"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200"
        />
      </div>

      {/* Date */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-gray-400">📅</span>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <textarea
          placeholder="Lunch at restaurant"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          maxLength={200}
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none transition-all duration-200"
        />
        <p className="text-right text-xs text-gray-400 mt-1">
          {formData.description.length}/200
        </p>
      </div>

      {/* Payment Method */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-gray-400">💳</span>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 appearance-none transition-all duration-200"
          >
            <option>Cash</option>
            <option>Debit Card</option>
            <option>Credit Card</option>
            <option>Bank Transfer</option>
            <option>Mobile Money</option>
          </select>
          <span className="absolute right-4 top-3 text-gray-400">▾</span>
        </div>
      </div>

      {/* Recurring Checkbox */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
        <input
          type="checkbox"
          id="recurring"
          checked={formData.recurring}
          onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
          className="w-4 h-4 accent-blue-600"
        />
        <label htmlFor="recurring" className="text-sm text-gray-600 cursor-pointer">
          Add to recurring expenses
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button className="bg-blue-600 text-white text-sm px-8 py-3 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium">
          Save Expense
        </button>
        <button className="border border-gray-200 text-gray-600 text-sm px-8 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium">
          Cancel
        </button>
      </div>

    </div>
  );
}