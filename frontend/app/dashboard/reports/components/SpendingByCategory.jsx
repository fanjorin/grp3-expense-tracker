"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { reportAPI } from "@/services/api";

const COLORS = ["#4DA6FF", "#FF6B6B", "#FFA500", "#4CAF50", "#E0E0E0", "#9C27B0", "#00BCD4", "#8BC34A"];

export default function SpendingByCategory() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await reportAPI.getCategories();
        if (res?.success) {
          const formattedData = res.data.map((c, index) => ({
            name: c.name,
            value: c.percentage,
            amount: `₦${c.amount.toLocaleString()}`,
            rawAmount: c.amount,
            color: COLORS[index % COLORS.length]
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching category spending:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalSpent = data.reduce((acc, curr) => acc + curr.rawAmount, 0);

  if (isLoading) {
    return <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse h-[400px]"></div>;
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">

      <h3 className="font-semibold text-gray-800 mb-4">Spending by Category</h3>

      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${Math.round(value)}%`} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col gap-2 mt-2 max-h-[150px] overflow-y-auto">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-gray-600">{entry.name}</span>
                </div>
                <span className="text-gray-800 font-medium">{entry.amount}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-sm font-bold text-gray-800">₦{totalSpent.toLocaleString()}</span>
          </div>
        </>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      )}

    </div>
  );
}