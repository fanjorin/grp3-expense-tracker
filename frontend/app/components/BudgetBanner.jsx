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
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse h-32"></div>
    );

  const amountSpent = summary?.spent || 0;
  const totalBudget = summary?.totalBudget || 50000;
  const amountLeft = summary?.remaining || 0;
  const percentageUsed = summary?.percentage || 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <p className="text-lg sm:text-2xl font-bold text-slate-800">
          You've spent{" "}
          <span className="text-blue-600">₦{amountSpent.toLocaleString()}</span>{" "}
          this month
        </p>
        <span
          className={`w-fit text-xs font-semibold px-3 py-1 rounded-full border ${amountLeft < 5000 ? "text-red-600 bg-red-50 border-red-100" : "text-slate-500 bg-slate-50 border-slate-200"}`}
        >
          ₦{amountLeft.toLocaleString()} left
        </span>
      </div>

      {/* Budget Info */}
      <p className="text-sm font-medium text-blue-600 mb-4">
        Monthly Budget: ₦{totalBudget.toLocaleString()}{" "}
        <span className="text-slate-400 font-normal ml-2">
          | {Math.round(percentageUsed)}% utilized
        </span>
      </p>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percentageUsed}%`,
            background:
              percentageUsed > 80
                ? "linear-gradient(90deg, #f97316, #ef4444)"
                : "linear-gradient(90deg, #3b82f6, #2563eb)",
          }}
        ></div>
      </div>
    </div>
  );
}
