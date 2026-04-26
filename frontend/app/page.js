import Navbar from "./components/Navbar";
import BudgetBanner from "./components/BudgetBanner";
import ActionBar from "./components/ActionBar";
import Charts from "./components/Charts";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <BudgetBanner />
      <ActionBar />
      <Charts />
    </main>
  );
}