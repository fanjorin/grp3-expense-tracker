export default function ReportsTabs() {
  return (
    <div className="flex items-center justify-between mb-6 border-b border-gray-200">

      {/* Tabs */}
      <div className="flex gap-6">
        <button className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-3">
          Overview
        </button>
        <button className="text-sm text-gray-500 hover:text-blue-600 pb-3">
          Spending
        </button>
        <button className="text-sm text-gray-500 hover:text-blue-600 pb-3">
          Income
        </button>
        <button className="text-sm text-gray-500 hover:text-blue-600 pb-3">
          Savings
        </button>
        <button className="text-sm text-gray-500 hover:text-blue-600 pb-3">
          Categories
        </button>
      </div>

      {/* This Month Dropdown */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 mb-3">
        This Month
        <span className="text-gray-400">▾</span>
      </div>

    </div>
  );
}