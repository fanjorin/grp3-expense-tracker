"use client";

import { useEffect, useState } from "react";
import { reportAPI } from "@/services/api";

const ICON_MAP = {
  "Food": "🍔",
  "Transport": "🚌",
  "Bills": "💡",
  "Entertainment": "🎬",
  "Housing": "🏠",
  "Health": "🏥",
  "Shopping": "🛍️",
  "Others": "➕",
};

const COLOR_MAP = [
  "bg-blue-500",
  "bg-red-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-indigo-400",
  "bg-pink-400",
  "bg-gray-300",
];

export default function TopCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await reportAPI.getCategories();
        if (res?.success) {
          const formatted = res.data.map((c, index) => ({
            id: index + 1,
            icon: ICON_MAP[c.name] || "💰",
            name: c.name,
            amount: `₦${c.amount.toLocaleString()}`,
            percent: Math.round(c.percentage),
            color: COLOR_MAP[index % COLOR_MAP.length]
          })).sort((a, b) => b.percent - a.percent);
          setCategories(formatted);
        }
      } catch (error) {
        console.error("Error fetching top categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse h-[400px]"></div>;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 h-full">

      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="p-1.5 bg-amber-50 rounded-lg text-amber-600 text-sm">🏆</span>
        Top Categories
      </h3>

      <div className="flex flex-col gap-5">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat.id} className="group cursor-default">

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="font-semibold group-hover:text-slate-900 transition-colors">{cat.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-900 font-bold">{cat.amount}</span>
                  <span className="text-slate-400 w-8 text-right font-bold text-xs">{cat.percent}%</span>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`${cat.color} h-full rounded-full transition-all duration-1000 ease-out shadow-sm`}
                  style={{ width: `${cat.percent}%` }}
                ></div>
              </div>

            </div>
          ))
        ) : (
          <div className="h-[200px] flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
            <span className="text-3xl">🏅</span>
            No data found
          </div>
        )}
      </div>

    </div>
  );
}