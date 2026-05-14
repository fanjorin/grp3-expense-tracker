export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-100 flex flex-col px-4 py-6 fixed left-0 top-0">

      {/* Logo */}
      <div className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-10 px-2">
        💰 Expense Tracker
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1">
        <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 text-sm">
          🏠 Dashboard
        </a>
        <a href="/reports" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 text-sm">
          📊 Reports
        </a>
        <a href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm">
          ⚙️ Settings
        </a>
      </nav>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Secure Your Data Card */}
      <div className="bg-blue-50 rounded-2xl p-4 text-center">
        <div className="text-3xl mb-2">🔒</div>
        <p className="font-bold text-gray-800 text-sm mb-1">Secure your data</p>
        <p className="text-gray-500 text-xs mb-4">
          Your data is encrypted and always protected.
        </p>
        <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded-full w-full hover:bg-blue-700">
          Learn More
        </button>
      </div>

    </aside>
  );
}