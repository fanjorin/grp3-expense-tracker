import Logo from "../../components/Logo";

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col px-4 py-6 fixed left-0 top-0">

      {/* Logo */}
      <div className="mb-10 px-2">
        <Logo />
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1">
        <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 text-sm transition-colors duration-200">
          🏠 Dashboard
        </a>
        <a href="/reports" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm">
          📊 Reports
        </a>
        <a href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 text-sm transition-colors duration-200">
          ⚙️ Settings
        </a>
      </nav>

      <div className="flex-1"></div>

      {/* Upgrade Card */}
      <div className="bg-blue-50 rounded-2xl p-4 text-center">
        <div className="text-3xl mb-2">💰✅</div>
        <p className="font-bold text-gray-800 text-sm mb-1">Track smarter.</p>
        <p className="font-bold text-gray-800 text-sm mb-2">Save more.</p>
        <p className="text-gray-500 text-xs mb-4">Get deeper insights into your spending habits.</p>
        <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded-full w-full hover:bg-blue-700 transition-colors duration-200">
          Upgrade to Pro
        </button>
      </div>

    </aside>
  );
}