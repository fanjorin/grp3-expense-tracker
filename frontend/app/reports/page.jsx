import Sidebar from "./components/Sidebar";

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-56 flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Analyze your spending and discover insights.</p>
      </main>

    </div>
  );
}