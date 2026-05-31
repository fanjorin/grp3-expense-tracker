"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Food", value: 40, amount: "₦18,000", color: "#4DA6FF" },
  { name: "Transport", value: 30, amount: "₦13,500", color: "#FF6B6B" },
  { name: "Bills", value: 20, amount: "₦9,000", color: "#FFA500" },
  { name: "Entertainment", value: 10, amount: "₦4,500", color: "#4CAF50" },
  { name: "Others", value: 0, amount: "₦0", color: "#E0E0E0" },
];

export default function SpendingByCategory() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      <h3 className="font-semibold text-gray-800 mb-4">Spending by Category</h3>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-col gap-2 mt-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-600">{entry.name}</span>
            </div>
            <span className="text-gray-800 font-medium">{entry.amount}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-500">Total</span>
        <span className="text-sm font-bold text-gray-800">₦45,000</span>
      </div>

    </div>
  );
}