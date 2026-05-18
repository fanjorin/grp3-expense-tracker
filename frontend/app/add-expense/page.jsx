import Sidebar from "./components/Sidebar";
import AddExpenseHeader from "./components/AddExpenseHeader";

export default function AddExpensePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-56 flex-1 p-8">
        <AddExpenseHeader />

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left - Form */}
          <div className="col-span-2">
            {/* Form coming in Commit 2 and 3 */}
          </div>

          {/* Right - Receipt + Summary */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* Receipt and Summary coming in Commit 4 and 5 */}
          </div>
        </div>
      </main>

    </div>
  );
}