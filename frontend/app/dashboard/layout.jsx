import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Shared Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-60 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
