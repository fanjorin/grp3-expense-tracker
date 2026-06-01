import AddExpenseHeader from "./components/AddExpenseHeader";
import ExpenseForm from "./components/ExpenseForm";
import ReceiptUpload from "./components/ReceiptUpload";
import ExpenseSummary from "./components/ExpenseSummary";

export default function AddExpensePage() {
  return (
    <>
      <AddExpenseHeader />

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">

        {/* Left - Form */}
        <div className="col-span-2">
          <ExpenseForm />
        </div>

        {/* Right - Receipt + Summary */}
        <div className="col-span-1 flex flex-col gap-4">
          <ReceiptUpload />
          <ExpenseSummary />
        </div>

      </div>
    </>
  );
}
