"use client";
import { useEffect, useState } from "react";
import { transactionAPI } from "../../services/api";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    transactionAPI.getAll().then(setExpenses);
  }, []);

  const handleDelete = async (id) => {
    await transactionAPI.delete(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="mx-8 mt-6 mb-8 bg-white rounded-xl p-4 shadow-sm">

      {/* Title */}
      <h3 className="font-semibold text-gray-700 mb-4">Expense List</h3>

      {/* Table */}
      <table className="w-full text-sm">

        {/* Table Header */}
        <thead>
          <tr className="text-blue-600 text-left border-b border-gray-200">
            <th className="pb-2">Category</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">

              {/* Category */}
              <td className="py-3 flex items-center gap-2">
                <span>{expense.category}</span>
              </td>

              {/* Amount */}
              <td className="py-3 text-gray-700">
                ₦{expense.amount.toLocaleString()}
              </td>

              {/* Date */}
              <td className="py-3 text-gray-500">
                {new Date(expense.date).toLocaleDateString()}
              </td>

              {/* Actions */}
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <button className="text-red-400 hover:text-red-600"
                    onClick={() => handleDelete(expense.id)}>
                    🗑️
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}