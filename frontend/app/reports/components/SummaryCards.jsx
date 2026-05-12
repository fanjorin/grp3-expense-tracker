const cards = [
  {
    id: 1,
    icon: "💳",
    iconBg: "bg-blue-100",
    label: "Total Spent",
    amount: "₦45,000",
    change: "12.5%",
    changeLabel: "vs Mar 1 — Mar 31",
    changeColor: "text-red-500",
    arrow: "↑",
  },
  {
    id: 2,
    icon: "⬇️",
    iconBg: "bg-green-100",
    label: "Total Income",
    amount: "₦80,000",
    change: "8.3%",
    changeLabel: "vs Mar 1 — Mar 31",
    changeColor: "text-green-500",
    arrow: "↑",
  },
  {
    id: 3,
    icon: "💳",
    iconBg: "bg-yellow-100",
    label: "Total Savings",
    amount: "₦35,000",
    change: "15.2%",
    changeLabel: "vs Mar 1 — Mar 31",
    changeColor: "text-green-500",
    arrow: "↑",
  },
  {
    id: 4,
    icon: "🕐",
    iconBg: "bg-purple-100",
    label: "Savings Rate",
    amount: "43.8%",
    change: "3.6%",
    changeLabel: "vs Mar 1 — Mar 31",
    changeColor: "text-green-500",
    arrow: "↑",
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-xl p-5 shadow-sm">

          {/* Icon */}
          <div className={`${card.iconBg} w-10 h-10 rounded-full flex items-center justify-center text-lg mb-3`}>
            {card.icon}
          </div>

          {/* Label */}
          <p className="text-gray-500 text-sm mb-1">{card.label}</p>

          {/* Amount */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{card.amount}</h2>

          {/* Change */}
          <p className={`text-xs ${card.changeColor}`}>
            {card.arrow} {card.change}{" "}
            <span className="text-gray-400">{card.changeLabel}</span>
          </p>

        </div>
      ))}
    </div>
  );
}