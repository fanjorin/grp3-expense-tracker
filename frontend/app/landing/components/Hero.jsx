import FeatureCards from "./FeatureCards";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 md:py-24 gap-12">

      {/* Left Side */}
      <div className="max-w-xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest border border-blue-200">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          TRACK. PLAN. SAVE.
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Take Control of <br />
          <span className="text-blue-600">Your Money</span> —<br />
          Without the Stress
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          Track spending, set budgets, and understand
          where your money actually goes.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-200">
            Start Free →
          </button>
          <button className="flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
            ⊙ See How It Works
          </button>
        </div>

        {/* Avatars + Rating */}
        <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl w-fit border border-white shadow-sm">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white shadow-sm"></div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white shadow-sm"></div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-white shadow-sm"></div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white shadow-sm"></div>
          </div>
          <div>
            <div className="text-yellow-400 text-sm">★★★★★</div>
            <div className="text-gray-600 text-xs font-medium">Loved by 10,000+ users</div>
          </div>
        </div>

      </div>

      {/* Right Side — Feature Cards */}
      <FeatureCards />

    </section>
  );
}