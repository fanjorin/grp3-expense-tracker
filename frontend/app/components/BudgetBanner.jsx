"use client";

import { useEffect, useState } from "react";
import { reportAPI } from "@/services/api";

export default function BudgetBanner() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await reportAPI.getSummary();
      if (res?.success) {
        setSummary(res.data);
      }
      setIsLoading(false);
    };
    fetchSummary();
  }, []);

  if (isLoading)
    return (
      <div className="mx-8 mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse h-32"></div>
    );

  const amountSpent = summary?.spent || 0;
  const totalBudget = summary?.totalBudget || 50000;
  const amountLeft = summary?.remaining || 0;
  const percentageUsed = summary?.percentage || 0;

  return (
    <div className="mx-8 mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-2xl font-bold text-gray-800">
          You've spent{" "}
          <span className="text-blue-600">₦{amountSpent.toLocaleString()}</span>{" "}
          this month
        </p>
        <span
          className={`text-sm px-3 py-1 rounded-full border ${amountLeft < 5000 ? "text-red-500 bg-red-50 border-red-100" : "text-gray-400 bg-gray-50 border-gray-100"}`}
        >
          ₦{amountLeft.toLocaleString()} left
        </span>
      </div>

      {/* Budget Info */}
      <p className="text-sm text-blue-600 mb-3">
        Budget: ₦{totalBudget.toLocaleString()}{" "}
        <span className="text-gray-400">
          | {Math.round(percentageUsed)}% used
        </span>
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${percentageUsed}%`,
            background:
              percentageUsed > 80
                ? "linear-gradient(to right, #f97316, #ef4444)"
                : "linear-gradient(to right, #22c55e, #16a34a)",
          }}
        ></div>
      </div>
    </div>
  );
}
