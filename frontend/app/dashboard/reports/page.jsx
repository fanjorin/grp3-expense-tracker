import ReportsHeader from "./components/ReportsHeader";
import SummaryCards from "./components/SummaryCards";
import ReportsTabs from "./components/ReportsTabs";
import SpendingByCategory from "./components/SpendingByCategory";
import SpendingOverTime from "./components/SpendingOverTime";
import TopCategories from "./components/TopCategories";
import SummaryPanel from "./components/SummaryPanel";
import RecentTransactions from "./components/RecentTransactions";

export default function ReportsPage() {
  return (
    <>
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
          <RecentTransactions />
        </div>
        <div className="col-span-1">
          <SummaryPanel />
        </div>
      </div>
    </>
  );
}
