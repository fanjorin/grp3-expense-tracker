export default function ReportsTabs() {
  return (
    <div className="flex items-center justify-between border-b border-slate-100">

      {/* Tabs */}
      <div className="flex gap-8">
        {[
          { label: "Overview", active: true },
          { label: "Spending", active: false },
          { label: "Income", active: false },
          { label: "Savings", active: false },
          { label: "Categories", active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`text-xs font-black uppercase tracking-widest pb-4 transition-all relative ${
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
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors mb-3">
        Filter: This Month
        <span className="text-slate-400">▾</span>
      </div>

    </div>
  );
}