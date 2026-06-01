import BudgetBanner from "../components/BudgetBanner";
import ActionBar from "../components/ActionBar";
import Charts from "../components/Charts";
import ExpenseList from "../components/ExpenseList";

export default function DashboardPage() {
  return (
    <>
      <BudgetBanner />
      <ActionBar />
      <Charts />
      <ExpenseList />
    </>
  );
}
