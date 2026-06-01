"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { transactionAPI } from "@/services/api";

export default function ExpenseForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: "Food",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    type: "EXPENSE",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await transactionAPI.create(formData);
      if (response && response.success) {
        router.push("/dashboard");
      } else {
        setError(response?.error || "Failed to save transaction.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
    >
      <h2 className="font-semibold text-gray-800 text-lg mb-6">
        Transaction Details
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {/* Type Toggle */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "EXPENSE" })}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${formData.type === "EXPENSE" ? "bg-red-100 text-red-600 border border-red-200" : "bg-gray-50 text-gray-500 border border-transparent"}`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "INCOME" })}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${formData.type === "INCOME" ? "bg-green-100 text-green-600 border border-green-200" : "bg-gray-50 text-gray-500 border border-transparent"}`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="relative">
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 appearance-none transition-all duration-200"
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Bills</option>
            <option>Groceries</option>
            <option>Utilities</option>
            <option>Salary</option>
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
          required
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200"
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
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description{" "}
          <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <textarea
          placeholder="e.g. Lunch at restaurant"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          maxLength={200}
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none transition-all duration-200"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white text-sm py-3 rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-70"
        >
          {isLoading ? "Saving..." : "Save Transaction"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 border border-gray-200 text-gray-600 text-sm py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
