export default function LandingNavbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-5 bg-white/70 backdrop-blur-sm sticky top-0 z-50">

      {/* Logo */}
      <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
        💰 Expense Tracker
      </div>

      {/* Nav Links - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
        <a href="#" className="hover:text-blue-600">Features</a>
        <a href="#" className="hover:text-blue-600">How It Works</a>
        <a href="#" className="hover:text-blue-600">Pricing</a>
        <a href="#" className="hover:text-blue-600">About Us</a>
        <a href="#" className="hover:text-blue-600">Contact</a>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
          Log in
        </a>
        <a href="#" className="bg-blue-600 text-white text-sm px-4 md:px-5 py-2 rounded-full hover:bg-blue-700">
          Get Started Free
        </a>
      </div>

    </nav>
  );
}