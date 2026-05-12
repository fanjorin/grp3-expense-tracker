export default function BudgetBanner() {
  const totalBudget = 50000;
  const amountSpent = 45000;
  const amountLeft = totalBudget - amountSpent;
  const percentageUsed = (amountSpent / totalBudget) * 100;

  return (
    <div className="mx-8 mt-6 bg-white rounded-xl p-6 shadow-sm">
      
      {/* Top Text */}
      <p className="text-2xl font-semibold text-gray-800">
        You've spent{" "}
        <span className="text-blue-600 font-bold">₦{amountSpent.toLocaleString()}</span>{" "}
        this month
      </p>

      {/* Budget Info */}
      <p className="text-sm text-blue-600 mt-2">
        Budget: ₦{totalBudget.toLocaleString()}{" "}
        <span className="text-gray-400">| {percentageUsed}% used</span>
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{ width: `${percentageUsed}%` }}
        ></div>
      </div>

      {/* Amount Left */}
      <p className="text-right text-sm text-gray-500 mt-1">
        ₦{amountLeft.toLocaleString()} left
      </p>

    </div>
  );
}