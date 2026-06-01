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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 animate-pulse h-[350px]"></div>
        ))}
      </div>
    );
  }

  // Calculate insights
  const highestCategory = pieData.length > 0 
    ? [...pieData].sort((a, b) => b.value - a.value)[0] 
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="p-1.5 bg-blue-50 rounded-lg text-blue-600 text-sm">📊</span>
          Spending by Category
        </h3>
        {pieData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={5}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value) => `₦${value.toLocaleString()}`} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2.5 mt-6 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm group cursor-default">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{entry.name}</span>
                  </div>
                  <span className="text-slate-400 text-xs font-medium">₦{entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-[250px] flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
            <span className="text-2xl">📁</span>
            No data for this month
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="p-1.5 bg-green-50 rounded-lg text-green-600 text-sm">📈</span>
          Weekly Spending
        </h3>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value) => `₦${value.toLocaleString()}`} 
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 6, 6]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
            <span className="text-2xl">📉</span>
            No data for this week
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="p-1.5 bg-amber-50 rounded-lg text-amber-600 text-sm">💡</span>
          Quick Insights
        </h3>
        <div className="flex flex-col gap-4">
          {highestCategory ? (
            <div className="flex items-start gap-3.5 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-colors hover:bg-white hover:border-blue-100 group">
              <span className="text-2xl group-hover:scale-110 transition-transform">🍔</span>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Top Spending</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  You spend the most on <strong className="text-slate-900">{highestCategory.name}</strong> (₦{highestCategory.value.toLocaleString()})
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3.5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-2xl">📝</span>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Note</p>
                <p className="text-sm text-slate-600 leading-relaxed">Add transactions to generate smart insights.</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3.5 p-4 bg-blue-50 rounded-2xl border border-blue-100 transition-colors hover:bg-white group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🎯</span>
            <div className="flex flex-col gap-0.5">
              <p className="text-xs text-blue-400 font-medium uppercase tracking-wider">Smart Tip</p>
              <p className="text-sm text-blue-700 leading-relaxed">Track your daily spending to stay within your <strong className="text-blue-900">monthly budget</strong>.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
  }