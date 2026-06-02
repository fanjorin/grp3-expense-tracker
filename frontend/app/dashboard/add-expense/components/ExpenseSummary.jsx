const summaryItems = [
  {
    id: 1,
    icon: "🏷️",
    iconBg: "bg-blue-50 text-blue-600",
    label: "Category",
    value: "Food",
  },
  {
    id: 2,
    icon: "💰",
    iconBg: "bg-green-50 text-green-600",
    label: "Amount",
    value: "₦5,000",
  },
  {
    id: 3,
    icon: "📅",
    iconBg: "bg-amber-50 text-amber-600",
    label: "Date",
    value: "Apr 30, 2026",
  },
  {
    id: 4,
    icon: "💳",
    iconBg: "bg-purple-50 text-purple-600",
    label: "Payment",
    value: "Cash",
  },
];

export default function ExpenseSummary() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-8 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-8">
        <span className="p-2 bg-indigo-50 rounded-xl text-indigo-600 text-lg">
          📝
        </span>
        <div>
          <h2 className="font-bold text-slate-900 text-lg leading-tight">
            Preview
          </h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">
            Real-time summary
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {summaryItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white transition-all group cursor-default"
          >
            <div className="flex items-center gap-3">
              <div
                className={`${item.iconBg} w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm transition-transform group-hover:scale-110`}
              >
                {item.icon}
              </div>
              <span className="text-sm text-slate-500 font-medium">
                {item.label}
              </span>
            </div>

            <span className="text-sm font-black text-slate-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
