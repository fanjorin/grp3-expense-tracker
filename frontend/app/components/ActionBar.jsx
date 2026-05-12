export default function ActionBar() {
  return (
    <div className="mx-8 mt-4 flex items-center gap-4 flex-wrap">

      {/* Add Expense Button */}
      <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        + Add Expense
      </button>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search....."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-400"
      />

      {/* Category Dropdown */}
      <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none">
        <option>Category</option>
        <option>Food</option>
        <option>Clothing</option>
        <option>Rent & Bills</option>
        <option>Groceries</option>
        <option>Utilities</option>
        <option>Transportation</option>
        <option>Savings</option>
        <option>Miscellaneous</option>
      </select>

      {/* Time Filter Dropdown */}
      <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none">
        <option>This Month</option>
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
      </select>

    </div>
  );
}