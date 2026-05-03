import FeatureCards from "./FeatureCards";

export default function Hero() {
  return (
    <section className="flex items-center justify-between px-10 py-20">

      {/* Left Side */}
      <div className="max-w-lg">

        {/* Badge */}
        <div className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-widest">
          TRACK. PLAN. SAVE.
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Take Control of <br />
          Your Money — <br />
          Without the Stress
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-lg mb-8">
          Track spending, set budgets, and understand <br />
          where your money actually goes.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 mb-10">
          <a href="#" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700">
            Start Free →
          </a>
          <a href="#" className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50">
            ⊙ See How It Works
          </a>
        </div>

        {/* Avatars + Rating */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-pink-300 border-2 border-white"></div>
            <div className="w-10 h-10 rounded-full bg-blue-300 border-2 border-white"></div>
            <div className="w-10 h-10 rounded-full bg-yellow-300 border-2 border-white"></div>
          </div>
          <div>
            <div className="text-yellow-400 text-sm">★★★★★</div>
            <div className="text-gray-500 text-xs">Loved by 10,000+ users</div>
          </div>
        </div>

      </div>

      {/* Right Side — Feature Cards */}
      <FeatureCards />

    </section>
  );
}