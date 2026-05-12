import Sidebar from "./components/Sidebar";
import ReportsHeader from "./components/ReportsHeader";
import SummaryCards from "./components/SummaryCards";
import ReportsTabs from "./components/ReportsTabs";
import SpendingByCategory from "./components/SpendingByCategory";
import SpendingOverTime from "./components/SpendingOverTime";
import TopCategories from "./components/TopCategories";
import SummaryPanel from "./components/SummaryPanel";

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
            <SpendingOverTime />
          </div>
          <div className="col-span-1">
            <TopCategories />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-2">
            {/* Recent Transactions - coming in Commit 5 */}
          </div>
          <div className="col-span-1">
            <SummaryPanel />
          </div>
        </div>

      </main>

    </div>
  );
}