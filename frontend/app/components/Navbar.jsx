import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      
      {/* Logo */}
      <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
        Expense Tracker
      </div>

      {/* Nav Links */}
      <div className="flex gap-8">
        <Link href="/" className="text-blue-600 font-semibold border-b-2 border-blue-600">Dashboard</Link>
        <Link href="/reports" className="text-gray-500 hover:text-blue-600">Reports</Link>
        <Link href="/settings" className="text-gray-500 hover:text-blue-600">Settings</Link>
      </div>

      {/* User Icon */}
      <div className="flex items-center gap-2 text-gray-600 cursor-pointer">
        👤 ▾
      </div>

    </nav>
  );
}