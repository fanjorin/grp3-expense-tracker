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
      <div className="mx-8 mt-6 mb-8 bg-white rounded-xl p-8 shadow-sm text-center text-gray-500">
        Loading expenses...
      </div>
    );
  }

  return (
    <div className="mx-8 mt-6 mb-8 bg-white rounded-xl p-4 shadow-sm">

      {/* Title */}
      <h3 className="font-semibold text-gray-700 mb-4">Recent Transactions</h3>

      {/* Table */}
      {expenses.length === 0 ? (
        <p className="text-center py-8 text-gray-400 text-sm">No transactions yet. Start by adding one!</p>
      ) : (
        <table className="w-full text-sm">

          {/* Table Header */}
          <thead>
            <tr className="text-blue-600 text-left border-b border-gray-200">
              <th className="pb-2">Category</th>
              <th className="pb-2">Type</th>
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

                {/* Type */}
                <td className="py-3">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${expense.type === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {expense.type}
                  </span>
                </td>

                {/* Amount */}
                <td className={`py-3 font-medium ${expense.type === 'INCOME' ? 'text-green-600' : 'text-gray-700'}`}>
                  {expense.type === 'INCOME' ? '+' : '-'}₦{expense.amount.toLocaleString()}
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
      )}
    </div>
  );
}
