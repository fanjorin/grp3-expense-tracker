"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Food", value: 25 },
  { name: "Transport", value: 25 },
  { name: "Bills", value: 25 },
  { name: "Other", value: 25 },
];

const barData = [
  { day: "Mon", amount: 2000 },
  { day: "Tue", amount: 3500 },
  { day: "Wed", amount: 1500 },
  { day: "Thu", amount: 4000 },
  { day: "Fri", amount: 3000 },
  { day: "Sat", amount: 5000 },
  { day: "Sun", amount: 2500 },
];

const COLORS = ["#FF6B6B", "#FFA500", "#4DA6FF", "#A0A0A0"];

export default function Charts() {
  return (
    <div className="mx-8 mt-6 grid grid-cols-3 gap-4">

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-700 mb-4">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2 mt-2">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
              <span className="text-gray-600">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-700 mb-4">Spending Over Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="amount" fill="#4DA6FF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-700 mb-4">Insights</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
            <span className="text-xl">🍔</span>
            <p className="text-sm text-gray-600">You spend the most on <strong>food</strong></p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
            <span className="text-xl">📈</span>
            <p className="text-sm text-gray-600">Your <strong>spending increased</strong> by 20% this week</p>
          </div>
        </div>
      </div>

    </div>
  );
}