"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { reportAPI } from "@/services/api";

const COLORS = ["#FF6B6B", "#FFA500", "#4DA6FF", "#A0A0A0", "#9C27B0", "#00BCD4", "#8BC34A", "#FFC107"];

export default function Charts() {
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, overTimeRes] = await Promise.all([
          reportAPI.getCategories(),
          reportAPI.getOverTime(),
        ]);

        if (categoriesRes?.success) {
          const formattedPie = categoriesRes.data.map(c => ({
            name: c.name,
            value: c.amount
          }));
          setPieData(formattedPie);
        }

        if (overTimeRes?.success) {
          setBarData(overTimeRes.data);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-8 mt-6 grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse h-[350px]"></div>
        ))}
      </div>
    );
  }

  // Calculate insights
  const highestCategory = pieData.length > 0 
    ? [...pieData].sort((a, b) => b.value - a.value)[0] 
    : null;

  return (
    <div className="mx-8 mt-6 grid grid-cols-3 gap-4">

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-700 mb-4">Spending by Category</h3>
        {pieData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 mt-2 max-h-[100px] overflow-y-auto">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-gray-600">{entry.name}: ₦{entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">
            No data for this month
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-700 mb-4">Spending Over Time</h3>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <YAxis hide />
              <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#4DA6FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">
            No data for this week
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <h3 className="font-semibold text-gray-700 mb-4">Insights</h3>
        <div className="flex flex-col gap-4">
          {highestCategory ? (
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
              <span className="text-xl">📊</span>
              <p className="text-sm text-gray-600">You spend the most on <strong>{highestCategory.name}</strong> (₦{highestCategory.value.toLocaleString()})</p>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-xl">ℹ️</span>
              <p className="text-sm text-gray-600">Add transactions to see insights</p>
            </div>
          )}

          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
            <span className="text-xl">📈</span>
            <p className="text-sm text-gray-600">Track your daily spending to stay within budget.</p>
          </div>
        </div>
      </div>

    </div>
  );
}