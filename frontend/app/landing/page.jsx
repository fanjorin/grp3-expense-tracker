import LandingNavbar from "./components/LandingNavbar";
import Hero from "./components/Hero";
import BackgroundShapes from "./components/BackgroundShapes";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      <div className="relative z-10">
        <LandingNavbar />
        <Hero />
      </div>
      <BackgroundShapes />
    </main>
  );
}   