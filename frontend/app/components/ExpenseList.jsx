"use client";
import { useEffect, useState } from "react";
import { transactionAPI } from "../../services/api";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await transactionAPI.getAll();
      if (response && response.success) {
        setExpenses(response.data);
      }
      setIsLoading(false);
    };
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    const response = await transactionAPI.delete(id);
    if (response && response.success) {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center text-slate-400 animate-pulse">
        <div className="h-4 w-32 bg-slate-100 rounded mb-6 mx-auto"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-slate-50 rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table Header/Title Area */}
      <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <span className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600 text-sm">
            🧾
          </span>
          Recent Transactions
        </h3>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {expenses.length} Total
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        {expenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
            <span className="text-4xl">🌵</span>
            <p className="text-sm font-medium">
              No transactions yet. Start by adding one!
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-left border-b border-slate-100">
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                  Category
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                  Description
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                  Amount
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                  Date
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-50">
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Category */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${expense.type === "INCOME" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}
                      >
                        {expense.category.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">
                        {expense.category}
                      </span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4">
                    <span className="text-slate-500 font-medium">
                      {expense.description || "—"}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span
                        className={`font-bold text-base ${expense.type === "INCOME" ? "text-green-600" : "text-slate-900"}`}
                      >
                        {expense.type === "INCOME" ? "+" : "-"}₦
                        {expense.amount.toLocaleString()}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-tighter ${expense.type === "INCOME" ? "text-green-400" : "text-slate-300"}`}
                      >
                        {expense.type}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <span className="text-slate-400 font-medium">
                      {new Date(expense.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all lg:opacity-0 group-hover:opacity-100"
                      onClick={() => handleDelete(expense.id)}
                      title="Delete transaction"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer Area */}
      {expenses.length > 0 && (
        <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-50 text-center">
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest transition">
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
}
