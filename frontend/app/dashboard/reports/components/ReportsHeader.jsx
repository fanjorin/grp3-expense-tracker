export default function ReportsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title */}
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Financial Reports
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium">
          Deep dive into your spending habits.
        </p>
      </div>

      {/* Date Range Picker */}
      <button className="flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
        <span className="text-blue-600">📅</span>
        APR 1 — APR 30, 2026
        <span className="text-slate-400">▾</span>
      </button>
    </div>
  );
}
