"use client";
import { useState } from "react";
import { transactionAPI } from "../../services/api";

export default function ActionBar({ onTransactionAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: "EXPENSE",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleSubmit = async () => {
    if (!form.amount || !form.category || !form.date) {
      alert("Please fill in all fields");
      return;
    }
    const response = await transactionAPI.create({
      ...form,
      amount: Number(form.amount),
    });
    if (!response?.success) {
      alert("Failed to add transaction. Please try again.");
      return;
    }
    onTransactionAdded?.(response.data);
    alert("Expense added!");
    setShowForm(false);
    setForm({
      type: "EXPENSE",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
  };

  return (
    <div className="">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 bg-[#0052CC] text-white px-5 py-3 sm:py-2.5 rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition shadow-sm shadow-blue-600/10"
        >
          <span className="text-lg">{showForm ? "×" : "+"}</span>
          {showForm ? "Close" : "Add Transaction"}
        </button>

        <div className="flex-1 relative min-w-0 sm:min-w-[200px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full text-slate-900 bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 sm:py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-2.5 text-sm outline-none cursor-pointer focus:border-blue-500 transition text-slate-900 min-w-[140px]">
            <option>All Categories</option>
            <option>Food</option>
            <option>Clothing</option>
            <option>Rent & Bills</option>
            <option>Groceries</option>
            <option>Utilities</option>
            <option>Transportation</option>
            <option>Savings</option>
            <option>Miscellaneous</option>
          </select>

          <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-2.5 text-sm outline-none cursor-pointer focus:border-blue-500 transition text-slate-600 min-w-[120px]">
            <option>This Month</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <div className="mt-6 bg-white p-8 rounded-2xl shadow-lg border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                New Transaction
              </h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-bold">
                Details of your spending or income
              </p>
            </div>
            <div className="flex p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setForm({ ...form, type: "EXPENSE" })}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${form.type === "EXPENSE" ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                EXPENSE
              </button>
              <button
                onClick={() => setForm({ ...form, type: "INCOME" })}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${form.type === "INCOME" ? "bg-white text-green-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                INCOME
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Amount (₦)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full p-3.5 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition cursor-pointer text-slate-700"
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Clothing">Clothing</option>
                <option value="Rent & Bills">Rent & Bills</option>
                <option value="Groceries">Groceries</option>
                <option value="Transportation">Transportation</option>
                <option value="Savings">Savings</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-3.5 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Description (optional)
              </label>
              <input
                type="text"
                placeholder="What was this for?"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-3.5 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                onClick={handleSubmit}
                className="w-full bg-[#0052CC] text-white p-4 rounded-xl font-bold hover:bg-blue-700 active:bg-blue-800 transition shadow-lg shadow-blue-600/10"
              >
                Save Transaction →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
