"use client";

import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

const data = [
  { date: "Apr 1", amount: 2000 },
  { date: "Apr 8", amount: 4500 },
  { date: "Apr 15", amount: 8000 },
  { date: "Apr 22", amount: 5000 },
  { date: "Apr 30", amount: 7500 },
];

export default function SpendingOverTime() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Spending Over Time</h3>
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-600 cursor-pointer">
          Daily ▾
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4DA6FF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4DA6FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
          <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#4DA6FF"
            strokeWidth={2}
            fill="url(#colorAmount)"
            dot={{ fill: "#4DA6FF", r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}