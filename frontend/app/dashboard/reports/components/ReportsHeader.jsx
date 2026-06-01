export default function ReportsHeader() {
  return (
    <div className="flex items-center justify-between mb-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-500 text-sm mt-1">
          Analyze your spending and discover insights.
        </p>
      </div>

      {/* Date Range Picker */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
        📅 Apr 1 — Apr 30, 2025
        <span className="text-gray-400">▾</span>
      </div>

    </div>
  );
}