import Sidebar from "./components/Sidebar";
import ReportsHeader from "./components/ReportsHeader";
import SummaryCards from "./components/SummaryCards";

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-56 flex-1 p-8">
        <ReportsHeader />
        <SummaryCards />
      </main>

    </div>
  );
}