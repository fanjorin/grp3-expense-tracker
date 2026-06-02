"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { reportAPI } from "@/services/api";

export default function SpendingOverTime() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await reportAPI.getOverTime();
        if (res?.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Error fetching spending over time:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse h-[400px]"></div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <span className="p-1.5 bg-green-50 rounded-lg text-green-600 text-sm">
            📈
          </span>
          Spending Over Time
        </h3>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
          Weekly
        </div>
      </div>

      {/* Chart */}
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => `₦${value.toLocaleString()}`}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
              dot={{ fill: "#3b82f6", r: 4, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[280px] flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
          <span className="text-3xl">🕳️</span>
          No data available
        </div>
      )}
    </div>
  );
}
