export default function ReportsTabs() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 gap-4">
      {/* Tabs */}
      <div className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide pb-0.5">
        {[
          { label: "Overview", active: true },
          { label: "Spending", active: false },
          { label: "Income", active: false },
          { label: "Savings", active: false },
          { label: "Categories", active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`text-[10px] sm:text-xs font-black uppercase tracking-widest pb-4 transition-all relative whitespace-nowrap ${
              tab.active
                ? "text-blue-600"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
            {tab.active && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Filter Dropdown */}
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors mb-3 w-fit">
        Filter: This Month
        <span className="text-slate-400">▾</span>
      </div>
    </div>
  );
}
