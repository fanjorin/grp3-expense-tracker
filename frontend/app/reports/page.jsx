import Sidebar from "./components/Sidebar";
import ReportsHeader from "./components/ReportsHeader";
import SummaryCards from "./components/SummaryCards";
import ReportsTabs from "./components/ReportsTabs";
import SpendingByCategory from "./components/SpendingByCategory";
import TopCategories from "./components/TopCategories";

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-56 flex-1 p-8">
        <ReportsHeader />
        <SummaryCards />
        <ReportsTabs />

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <SpendingByCategory />
          </div>
          <div className="col-span-1">
            {/* Spending Over Time - coming in Commit 4 */}
          </div>
          <div className="col-span-1">
            <TopCategories />
          </div>
        </div>
      </main>

    </div>
  );
}