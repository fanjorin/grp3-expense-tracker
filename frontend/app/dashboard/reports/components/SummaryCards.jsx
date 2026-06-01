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
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse h-32"></div>
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
      iconBg: "bg-blue-100",
      label: "Total Spent",
      amount: `₦${(stats?.current?.expense || 0).toLocaleString()}`,
      change: `${Math.abs(Math.round(stats?.changes?.expense || 0))}%`,
      changeLabel: `vs ${lastMonthName} 1 — ${lastMonthName} 31`,
      changeColor: (stats?.changes?.expense || 0) > 0 ? "text-red-500" : "text-green-500",
      arrow: (stats?.changes?.expense || 0) > 0 ? "↑" : "↓",
    },
    {
      id: 2,
      icon: "⬇️",
      iconBg: "bg-green-100",
      label: "Total Income",
      amount: `₦${(stats?.current?.income || 0).toLocaleString()}`,
      change: `${Math.abs(Math.round(stats?.changes?.income || 0))}%`,
      changeLabel: `vs ${lastMonthName} 1 — ${lastMonthName} 31`,
      changeColor: (stats?.changes?.income || 0) > 0 ? "text-green-500" : "text-red-500",
      arrow: (stats?.changes?.income || 0) > 0 ? "↑" : "↓",
    },
    {
      id: 3,
      icon: "💰",
      iconBg: "bg-yellow-100",
      label: "Total Savings",
      amount: `₦${Math.max(0, (stats?.current?.income || 0) - (stats?.current?.expense || 0)).toLocaleString()}`,
      change: "--",
      changeLabel: "Calculated from Income - Expense",
      changeColor: "text-gray-400",
      arrow: "",
    },
    {
      id: 4,
      icon: "🕐",
      iconBg: "bg-purple-100",
      label: "Savings Rate",
      amount: stats?.current?.income > 0 
        ? `${Math.round((Math.max(0, stats.current.income - stats.current.expense) / stats.current.income) * 100)}%`
        : "0%",
      change: "--",
      changeLabel: "Percentage of income saved",
      changeColor: "text-gray-400",
      arrow: "",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">

          {/* Icon */}
          <div className={`${card.iconBg} w-10 h-10 rounded-full flex items-center justify-center text-lg mb-3`}>
            {card.icon}
          </div>

          {/* Label */}
          <p className="text-gray-500 text-sm mb-1">{card.label}</p>

          {/* Amount */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{card.amount}</h2>

          {/* Change */}
          <p className={`text-xs ${card.changeColor}`}>
            {card.arrow} {card.change}{" "}
            <span className="text-gray-400">{card.changeLabel}</span>
          </p>

        </div>
      ))}
    </div>
  );
}