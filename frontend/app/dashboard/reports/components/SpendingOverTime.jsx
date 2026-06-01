"use client";

import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
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
    return <div className="bg-white rounded-xl p-5 shadow-sm animate-pulse h-[300px]"></div>;
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Spending Over Time (This Week)</h3>
      </div>

      {/* Chart */}
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DA6FF" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4DA6FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
            <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} hide />
            <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#4DA6FF"
              strokeWidth={2}
              fill="url(#colorAmount)"
              dot={{ fill: "#4DA6FF", r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[220px] flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      )}

    </div>
  );
}