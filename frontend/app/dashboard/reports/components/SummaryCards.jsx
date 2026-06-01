"use client";

import { useEffect, useState } from "react";
import { reportAPI } from "@/services/api";

export default function SummaryCards() {
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
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 animate-pulse h-32"></div>
        ))}
      </div>
    );
  }

  const currentMonthName = new Date().toLocaleString('default', { month: 'short' });
  const lastMonthName = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'short' });

  const cards = [
    {
      id: 1,
      icon: "💳",
      iconBg: "bg-blue-50 text-blue-600",
      label: "Total Spent",
      amount: `₦${(stats?.current?.expense || 0).toLocaleString()}`,
      change: `${Math.abs(Math.round(stats?.changes?.expense || 0))}%`,
      changeLabel: `vs ${lastMonthName}`,
      changeColor: (stats?.changes?.expense || 0) > 0 ? "text-red-500" : "text-green-500",
      arrow: (stats?.changes?.expense || 0) > 0 ? "↑" : "↓",
    },
    {
      id: 2,
      icon: "⬇️",
      iconBg: "bg-green-50 text-green-600",
      label: "Total Income",
      amount: `₦${(stats?.current?.income || 0).toLocaleString()}`,
      change: `${Math.abs(Math.round(stats?.changes?.income || 0))}%`,
      changeLabel: `vs ${lastMonthName}`,
      changeColor: (stats?.changes?.income || 0) > 0 ? "text-green-500" : "text-red-500",
      arrow: (stats?.changes?.income || 0) > 0 ? "↑" : "↓",
    },
    {
      id: 3,
      icon: "💰",
      iconBg: "bg-amber-50 text-amber-600",
      label: "Total Savings",
      amount: `₦${Math.max(0, (stats?.current?.income || 0) - (stats?.current?.expense || 0)).toLocaleString()}`,
      change: "--",
      changeLabel: "Calculated",
      changeColor: "text-slate-400",
      arrow: "",
    },
    {
      id: 4,
      icon: "📈",
      iconBg: "bg-purple-50 text-purple-600",
      label: "Savings Rate",
      amount: stats?.current?.income > 0 
        ? `${Math.round((Math.max(0, stats.current.income - stats.current.expense) / stats.current.income) * 100)}%`
        : "0%",
      change: "--",
      changeLabel: "Goal: 20%+",
      changeColor: "text-slate-400",
      arrow: "",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default">

          <div className="flex items-center justify-between mb-4">
            {/* Icon */}
            <div className={`${card.iconBg} w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm transition-transform group-hover:scale-110`}>
              {card.icon}
            </div>
            
            {/* Change Badge */}
            {card.change !== "--" && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.changeColor} bg-opacity-10 bg-current`}>
                {card.arrow} {card.change}
              </span>
            )}
          </div>

          {/* Label */}
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{card.label}</p>

          {/* Amount */}
          <h2 className="text-2xl font-black text-slate-900 mb-2">{card.amount}</h2>

          {/* Subtext */}
          <p className="text-[10px] text-slate-400 font-medium">
            {card.changeLabel}
          </p>

        </div>
      ))}
    </div>
  );
}