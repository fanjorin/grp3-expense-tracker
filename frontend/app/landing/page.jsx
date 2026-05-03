import LandingNavbar from "./components/LandingNavbar";
import Hero from "./components/Hero";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <LandingNavbar />
      <Hero />
    </main>
  );
}