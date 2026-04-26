import Navbar from "./components/Navbar";
import BudgetBanner from "./components/BudgetBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <BudgetBanner />
    </main>
  );
}