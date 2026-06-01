"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total Income", value: 80000, color: "#4CAF50" },
  { name: "Total Spent", value: 45000, color: "#FF6B6B" },
  { name: "Total Savings", value: 35000, color: "#4DA6FF" },
];

export default function SummaryPanel() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      <h3 className="font-semibold text-gray-800 mb-4">Summary</h3>

      {/* Donut Chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-gray-800">₦35,000</p>
          <p className="text-xs text-gray-500">Saved</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-600">{entry.name}</span>
            </div>
            <span className="font-medium text-gray-800">
              ₦{entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Great Job Message */}
      <div className="flex items-center gap-2 bg-green-50 rounded-lg p-3 mt-4">
        <span className="text-green-500 text-lg">📈</span>
        <div>
          <p className="text-xs font-semibold text-gray-800">Great job!</p>
          <p className="text-xs text-gray-500">You saved 15.2% more than last month.</p>
        </div>
      </div>

    </div>
  );
}