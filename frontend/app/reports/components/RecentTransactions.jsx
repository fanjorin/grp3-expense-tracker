const transactions = [
  { id: 1, date: "Apr 30, 2025", description: "Grocery Shopping", category: "Food", categoryColor: "bg-blue-100 text-blue-600", amount: "- ₦2,500", amountColor: "text-red-500" },
  { id: 2, date: "Apr 29, 2025", description: "Bus Ticket", category: "Transport", categoryColor: "bg-red-100 text-red-500", amount: "- ₦1,200", amountColor: "text-red-500" },
  { id: 3, date: "Apr 28, 2025", description: "Electricity Bill", category: "Bills", categoryColor: "bg-yellow-100 text-yellow-600", amount: "- ₦5,000", amountColor: "text-red-500" },
  { id: 4, date: "Apr 27, 2025", description: "Netflix Subscription", category: "Entertainment", categoryColor: "bg-green-100 text-green-600", amount: "- ₦2,500", amountColor: "text-red-500" },
  { id: 5, date: "Apr 26, 2025", description: "Salary", category: "Income", categoryColor: "bg-green-100 text-green-600", amount: "+ ₦80,000", amountColor: "text-green-500" },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">

      <h3 className="font-semibold text-gray-800 mb-4">Recent Transactions</h3>

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
              <td className="py-3 text-gray-500">{transaction.date}</td>
              <td className="py-3 text-gray-800">{transaction.description}</td>
              <td className="py-3">
                <span className={`${transaction.categoryColor} text-xs px-3 py-1 rounded-full font-medium`}>
                  {transaction.category}
                </span>
              </td>
              <td className={`py-3 font-semibold ${transaction.amountColor}`}>
                {transaction.amount}
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

    </div>
  );
}