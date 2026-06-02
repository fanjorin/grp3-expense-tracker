"use client";

import { useEffect, useState } from "react";
import BudgetBanner from "../components/BudgetBanner";
import ActionBar from "../components/ActionBar";
import Charts from "../components/Charts";
import ExpenseList from "../components/ExpenseList";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [addedTransaction, setAddedTransaction] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-1 text-center md:text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Welcome back, {user?.firstName || "User"}! 👋
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Here's what's happening with your finances today.
        </p>
      </div>

      {/* Main Stats Banner */}
      <div className="w-full">
        <BudgetBanner />
      </div>

      {/* Analytics Section */}
      <div className="w-full">
        <Charts />
      </div>

      {/* Actions & Transactions Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            Quick Actions & Transactions
          </h2>
        </div>
        <ActionBar onTransactionAdded={setAddedTransaction} />
        <ExpenseList addedTransaction={addedTransaction} />
      </div>
    </div>
  );
}
