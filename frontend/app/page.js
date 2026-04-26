import Navbar from "./components/Navbar";
import BudgetBanner from "./components/BudgetBanner";
import ActionBar from "./components/ActionBar";
import Charts from "./components/Charts";
import ExpenseList from "./components/ExpenseList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <BudgetBanner />
      <ActionBar />
      <Charts />
      <ExpenseList />
    </main>
  );
}