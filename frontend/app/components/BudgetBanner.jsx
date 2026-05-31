export default function BudgetBanner() {
  const totalBudget = 50000;
  const amountSpent = 45000;
  const amountLeft = totalBudget - amountSpent;
  const percentageUsed = (amountSpent / totalBudget) * 100;

  return (
    <div className="mx-8 mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">

      {/* Top Row */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-2xl font-bold text-gray-800">
          You've spent{" "}
          <span className="text-blue-600">₦{amountSpent.toLocaleString()}</span>{" "}
          this month
        </p>
        <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          ₦{amountLeft.toLocaleString()} left
        </span>
      </div>

      {/* Budget Info */}
      <p className="text-sm text-blue-600 mb-3">
        Budget: ₦{totalBudget.toLocaleString()}{" "}
        <span className="text-gray-400">| {percentageUsed}% used</span>
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${percentageUsed}%`,
            background: percentageUsed > 80
              ? "linear-gradient(to right, #f97316, #ef4444)"
              : "linear-gradient(to right, #22c55e, #16a34a)"
          }}
        ></div>
      </div>

    </div>
  );
}