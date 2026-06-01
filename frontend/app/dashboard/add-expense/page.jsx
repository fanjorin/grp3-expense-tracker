import AddExpenseHeader from "./components/AddExpenseHeader";
import ExpenseForm from "./components/ExpenseForm";
import ReceiptUpload from "./components/ReceiptUpload";
import ExpenseSummary from "./components/ExpenseSummary";

export default function AddExpensePage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      
      <AddExpenseHeader />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left - Form */}
        <div className="lg:col-span-2">
          <ExpenseForm />
        </div>

        {/* Right - Receipt + Summary */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <ReceiptUpload />
          <ExpenseSummary />
        </div>

      </div>
    </div>
  );
}
