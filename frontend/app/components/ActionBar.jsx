"use client";
import { useState } from "react";
import { transactionAPI } from "../../services/api";

export default function ActionBar() {
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
    await transactionAPI.create({
      ...form,
      amount: Number(form.amount),
    });
    alert("Expense added!");
    setShowForm(false);
    setForm({ type: "EXPENSE", amount: "", category: "", description: "", date: "" });
  };

  return (
    <div className="mx-8 mt-4">

      {/* Top Bar */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Expense
        </button>

        <input
          type="text"
          placeholder="Search....."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-400"
        />

        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none">
          <option>Category</option>
          <option>Food</option>
          <option>Clothing</option>
          <option>Rent & Bills</option>
          <option>Groceries</option>
          <option>Utilities</option>
          <option>Transportation</option>
          <option>Savings</option>
          <option>Miscellaneous</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none">
          <option>This Month</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <div className="mt-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-4">New Expense</h3>
          <div className="grid grid-cols-2 gap-4">

            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>

            <input
              type="number"
              placeholder="Amount (₦)"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />

            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Rent & Bills">Rent & Bills</option>
              <option value="Groceries">Groceries</option>
              <option value="Transportation">Transportation</option>
              <option value="Savings">Savings</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />

            <input
              type="text"
              placeholder="Description (optional)"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm col-span-2"
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 col-span-2">
              Save Expense
            </button>

          </div>
        </div>
      )}
    </div>
  );
}