const categories = [
  { id: 1, icon: "🏠", name: "Food", amount: "₦18,000", percent: 40, color: "bg-blue-500" },
  { id: 2, icon: "🚌", name: "Transport", amount: "₦13,500", percent: 30, color: "bg-red-400" },
  { id: 3, icon: "💡", name: "Bills", amount: "₦9,000", percent: 20, color: "bg-yellow-400" },
  { id: 4, icon: "🎬", name: "Entertainment", amount: "₦4,500", percent: 10, color: "bg-green-400" },
  { id: 5, icon: "➕", name: "Others", amount: "₦0", percent: 0, color: "bg-gray-300" },
];

export default function TopCategories() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      <h3 className="font-semibold text-gray-800 mb-4">Top Categories</h3>

      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <div key={cat.id}>

            {/* Category Row */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-800 font-medium">{cat.amount}</span>
                <span className="text-gray-400 w-8 text-right">{cat.percent}%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`${cat.color} h-1.5 rounded-full`}
                style={{ width: `${cat.percent}%` }}
              ></div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}