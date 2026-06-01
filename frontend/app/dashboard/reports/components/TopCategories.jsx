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
    return <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse h-[400px]"></div>;
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">

      <h3 className="font-semibold text-gray-800 mb-4">Top Categories</h3>

      <div className="flex flex-col gap-4">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat.id} className="hover:bg-gray-50 p-2 rounded-xl transition-colors duration-200">

              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-800 font-medium">{cat.amount}</span>
                  <span className="text-gray-400 w-8 text-right">{cat.percent}%</span>
                </div>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className={`${cat.color} h-1.5 rounded-full transition-all duration-500`}
                  style={{ width: `${cat.percent}%` }}
                ></div>
              </div>

            </div>
          ))
        ) : (
          <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">
            No categories found
          </div>
        )}
      </div>

    </div>
  );
}