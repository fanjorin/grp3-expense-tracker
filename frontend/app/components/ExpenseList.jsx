const expenses = [
  { id: 1, category: "Food", icon: "🍔", amount: 2500, date: "Today" },
  { id: 2, category: "Transport", icon: "🚌", amount: 1200, date: "Yesterday" },
  { id: 3, category: "Bills", icon: "💡", amount: 5000, date: "Apr 10" },
];

export default function ExpenseList() {
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
                <span>{expense.icon}</span>
                <span>{expense.category}</span>
              </td>

              {/* Amount */}
              <td className="py-3 text-gray-700">
                {expense.amount.toLocaleString()}
              </td>

              {/* Date */}
              <td className="py-3 text-gray-500">
                {expense.date}
              </td>

              {/* Actions */}
              <td className="py-3">
                <div className="flex items-center gap-3">
                  {/* Edit Button */}
                  <button className="text-blue-500 hover:text-blue-700">
                    ✏️
                  </button>
                  {/* Delete Button */}
                  <button className="text-red-400 hover:text-red-600">
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