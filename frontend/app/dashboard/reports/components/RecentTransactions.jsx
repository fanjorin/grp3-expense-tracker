"use client";

import { useEffect, useState } from "react";
import { transactionAPI } from "@/services/api";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await transactionAPI.getAll();
        if (res?.success) {
          setTransactions(res.data.slice(0, 5)); // Only show last 5
        }
      } catch (error) {
        console.error("Error fetching recent transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const getCategoryColor = (category, type) => {
    if (type === "INCOME") return "bg-green-100 text-green-600";
    const colors = {
      Food: "bg-blue-100 text-blue-600",
      Transport: "bg-red-100 text-red-500",
      Bills: "bg-yellow-100 text-yellow-600",
      Entertainment: "bg-purple-100 text-purple-600",
      Others: "bg-gray-100 text-gray-500",
    };
    return colors[category] || "bg-gray-100 text-gray-500";
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse h-64"></div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full">
      <div className="px-5 sm:px-6 py-5 border-b border-slate-50 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
          <span className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600 text-sm">
            🕰️
          </span>
          Activity Log
        </h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Latest 5
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        {transactions.length > 0 ? (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-left border-b border-slate-100">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                    Date
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                    Description
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">
                    Category
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="group hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-slate-400 font-medium text-xs">
                        {new Date(transaction.date).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric" },
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {transaction.description || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${getCategoryColor(transaction.category, transaction.type)} text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tighter`}
                      >
                        {transaction.category}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 font-black text-right ${transaction.type === "INCOME" ? "text-green-500" : "text-slate-900"}`}
                    >
                      {transaction.type === "INCOME" ? "+ " : "- "}₦
                      {transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-50 text-center">
              <button className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest transition">
                View Full History →
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
            <span className="text-3xl">🏜️</span>
            <p className="text-xs font-bold uppercase tracking-widest">
              No activity log found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
