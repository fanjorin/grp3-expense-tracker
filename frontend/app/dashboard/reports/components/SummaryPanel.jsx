"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { reportAPI } from "@/services/api";

export default function SummaryPanel() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await reportAPI.getStats();
        if (res?.success) {
          setStats(res.data);
        }
      } catch (error) {
        console.error("Error fetching summary panel stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse h-[400px]"></div>
    );
  }

  const income = stats?.current?.income || 0;
  const spent = stats?.current?.expense || 0;
  const savings = Math.max(0, income - spent);

  const data = [
    { name: "Income", value: income, color: "#10b981" },
    { name: "Spent", value: spent, color: "#ef4444" },
    { name: "Savings", value: savings, color: "#3b82f6" },
  ];

  const savingsChange = stats?.changes?.income - stats?.changes?.expense;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 h-full">
      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="p-1.5 bg-purple-50 rounded-lg text-purple-600 text-sm">
          💰
        </span>
        Quick Summary
      </h3>

      {/* Donut Chart */}
      <div className="relative mb-6">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-black text-slate-900 leading-none">
            ₦{savings.toLocaleString()}
          </p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Net Savings
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3">
        {data.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm group cursor-default"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-slate-500 font-medium group-hover:text-slate-900 transition-colors">
                {entry.name}
              </span>
            </div>
            <span className="font-bold text-slate-800">
              ₦{entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Message */}
      {savings > 0 && (
        <div className="flex items-start gap-3 bg-slate-50 rounded-2xl p-4 mt-8 border border-slate-100 group transition-colors hover:bg-green-50/50 hover:border-green-100">
          <span className="text-xl group-hover:scale-110 transition-transform">
            🎯
          </span>
          <div>
            <p className="text-xs font-bold text-slate-900 mb-0.5">
              {savingsChange > 0
                ? "Outstanding Progress!"
                : "Staying Consistent"}
            </p>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              {savingsChange > 0
                ? `Your net savings increased by ${Math.round(savingsChange)}% this month. Brilliant!`
                : "Your savings are on track. Continue maintaining your financial discipline."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
