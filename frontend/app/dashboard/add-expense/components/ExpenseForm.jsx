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
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-8 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <span className="p-2 bg-blue-50 rounded-xl text-blue-600 text-lg">
          💰
        </span>
        <div>
          <h2 className="font-bold text-slate-900 text-lg leading-tight">
            Transaction Details
          </h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">
            Enter spending or income info
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 sm:mb-8 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Type Toggle */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1 block mb-3">
            Transaction Type
          </label>
          <div className="flex p-1 bg-slate-100 rounded-2xl w-full sm:w-fit">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "EXPENSE" })}
              className={`flex-1 sm:flex-none px-4 sm:px-8 py-2.5 rounded-xl text-xs font-bold transition-all ${formData.type === "EXPENSE" ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              EXPENSE
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "INCOME" })}
              className={`flex-1 sm:flex-none px-4 sm:px-8 py-2.5 rounded-xl text-xs font-bold transition-all ${formData.type === "INCOME" ? "bg-white text-green-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              INCOME
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
            Category
          </label>
          <div className="relative group">
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white appearance-none transition-all duration-200 cursor-pointer"
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
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors">
              ▾
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
            Amount (₦)
          </label>
          <input
            type="number"
            placeholder="0.00"
            required
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
            Date
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors">
              📅
            </span>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 cursor-pointer"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
            Description{" "}
            <span className="text-slate-300 font-normal lowercase">
              (optional)
            </span>
          </label>
          <input
            type="text"
            placeholder="What was this for?"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 font-medium outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 pt-8 border-t border-slate-50">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:flex-1 bg-[#0052CC] text-white text-sm py-4 rounded-xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/10 hover:-translate-y-0.5 transition-all duration-200 font-bold disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "PROSESSING..." : "SAVE TRANSACTION →"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full sm:w-auto px-8 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
