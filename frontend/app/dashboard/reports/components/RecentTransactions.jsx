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
    if (type === 'INCOME') return "bg-green-100 text-green-600";
    const colors = {
      "Food": "bg-blue-100 text-blue-600",
      "Transport": "bg-red-100 text-red-500",
      "Bills": "bg-yellow-100 text-yellow-600",
      "Entertainment": "bg-purple-100 text-purple-600",
      "Others": "bg-gray-100 text-gray-500",
    };
    return colors[category] || "bg-gray-100 text-gray-500";
  };

  if (isLoading) {
    return <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse h-64"></div>;
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">

      <h3 className="font-semibold text-gray-800 mb-4">Recent Transactions</h3>

      {transactions.length > 0 ? (
        <>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-3 text-gray-500">
                    {new Date(transaction.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-3 text-gray-800">{transaction.description || "No description"}</td>
                  <td className="py-3">
                    <span className={`${getCategoryColor(transaction.category, transaction.type)} text-xs px-3 py-1 rounded-full font-medium`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`py-3 font-semibold ${transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.type === 'INCOME' ? '+ ' : '- '}₦{transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center mt-4">
            <button className="text-blue-600 text-sm hover:text-blue-700 hover:underline transition-colors duration-200 font-medium">
              View all transactions →
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-400 text-sm">
          No transactions found
        </div>
      )}

    </div>
  );
}