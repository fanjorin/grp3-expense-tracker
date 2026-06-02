"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { reportAPI } from "@/services/api";

const COLORS = [
  "#4DA6FF",
  "#FF6B6B",
  "#FFA500",
  "#4CAF50",
  "#E0E0E0",
  "#9C27B0",
  "#00BCD4",
  "#8BC34A",
];

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
            color: COLORS[index % COLORS.length],
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
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse h-[400px]"></div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 h-full">
      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="p-1.5 bg-blue-50 rounded-lg text-blue-600 text-sm">
          🥧
        </span>
        By Category
      </h3>

      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => `${Math.round(value)}%`}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col gap-2 mt-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
            {data.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm hover:bg-slate-50 px-3 py-2 rounded-xl transition-all group cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
                    {entry.name}
                  </span>
                </div>
                <span className="text-slate-800 font-bold">{entry.amount}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total Spent
            </span>
            <span className="text-lg font-black text-slate-900">
              ₦{totalSpent.toLocaleString()}
            </span>
          </div>
        </>
      ) : (
        <div className="h-[300px] flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
          <span className="text-3xl">🏜️</span>
          No data available
        </div>
      )}
    </div>
  );
}
