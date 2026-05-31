const summaryItems = [
  { id: 1, icon: "🏷️", iconBg: "bg-green-100", label: "Category", value: "Food" },
  { id: 2, icon: "💰", iconBg: "bg-yellow-100", label: "Amount", value: "₦5,000" },
  { id: 3, icon: "📅", iconBg: "bg-blue-100", label: "Date", value: "Apr 30, 2025" },
  { id: 4, icon: "💳", iconBg: "bg-purple-100", label: "Payment Method", value: "Cash" },
];

export default function ExpenseSummary() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">

      <h2 className="font-semibold text-gray-800 text-lg mb-6">Summary</h2>

      <div className="flex flex-col gap-3">
        {summaryItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">

            <div className="flex items-center gap-3">
              <div className={`${item.iconBg} w-9 h-9 rounded-full flex items-center justify-center text-base`}>
                {item.icon}
              </div>
              <span className="text-sm text-gray-500">{item.label}</span>
            </div>

            <span className="text-sm font-semibold text-gray-800">{item.value}</span>

          </div>
        ))}
      </div>

    </div>
  );
}