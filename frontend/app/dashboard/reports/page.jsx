import ReportsHeader from "./components/ReportsHeader";
import SummaryCards from "./components/SummaryCards";
// import ReportsTabs from "./components/ReportsTabs";
import SpendingByCategory from "./components/SpendingByCategory";
import SpendingOverTime from "./components/SpendingOverTime";
import TopCategories from "./components/TopCategories";
import SummaryPanel from "./components/SummaryPanel";
import RecentTransactions from "./components/RecentTransactions";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <ReportsHeader />

      <div className="w-full">
        <SummaryCards />
      </div>

      {/* <ReportsTabs />*/}

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SpendingByCategory />
        <SpendingOverTime />
        <TopCategories />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div className="lg:col-span-1">
          <SummaryPanel />
        </div>
      </div>
    </div>
  );
}
