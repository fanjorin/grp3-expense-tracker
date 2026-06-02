"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";
import { authAPI } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.login(formData);
      if (response.success) {
        // Save token to localStorage (simple implementation)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError(response.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("Connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 1. MAIN WRAPPER: Grey background with card centered in the middle
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-6 text-slate-800">
      {/* Card — holds left and right panels side by side */}
      <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden min-h-[540px]">
        {/* =========================================================
            LEFT SIDE: Blue Promotional Sidebar
            ========================================================= */}
        <div className="hidden md:flex w-[38%] bg-blue-600 p-8 flex-col gap-5 text-white select-none">
          {/* ── Logo ── */}
          <Logo textColor="text-white" />

          {/* ── Main Value Proposition ── */}
          <h1 className="text-3xl font-bold leading-snug">
            Welcome back to financial clarity.
          </h1>
          <p className="text-sm text-blue-200 leading-relaxed">
            Continue tracking your spending, staying on budget, and reaching
            your financial goals.
          </p>

          {/* ── Testimonial Box — pushed to bottom ── */}
          <div className="mt-auto bg-blue-500 bg-opacity-50 rounded-xl p-4">
            <p className="text-sm text-white italic leading-relaxed">
              &ldquo;The best expense tracker I've ever used. Simple, fast, and
              reliable.&rdquo;
            </p>
            <p className="text-xs text-blue-300 mt-2">- Ahmed Suleiman</p>
          </div>
        </div>
        {/* END LEFT SIDE */}

        {/* =========================================================
            RIGHT SIDE: Interactive Form Section
            ========================================================= */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white">
          <div className="w-full max-w-[460px]">
            {/* ── Navigation Tabs (Log In / Sign Up) ── */}
            <div className="flex gap-6 mb-10 border-b border-slate-100 text-sm font-medium">
              <button
                type="button"
                className="pb-3 text-[#0052CC] border-b-2 border-[#0052CC] font-semibold"
              >
                Log in
              </button>
              <Link
                href="/signup"
                className="pb-3 text-slate-400 hover:text-slate-600 transition"
              >
                Sign up
              </Link>
            </div>

            {/* ── Form Header ── */}
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              Log in to your account
            </h2>
            <p className="text-sm text-slate-400 mb-8">
              Enter your details to access your dashboard
            </p>

            {/* ── Login Form ── */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                  {error}
                </div>
              )}

              {/* Email Address Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@gmail.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    virtual
                    className="text-xs font-medium text-[#0052CC] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-medium"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Decorative Content Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-[1px] bg-slate-200"></div>
                <span className="px-4 text-xs text-slate-400 font-medium bg-white">
                  Or
                </span>
                <div className="flex-1 h-[1px] bg-slate-200"></div>
              </div>

              {/* Google Log In Button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2.5 p-3.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition shadow-sm"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0052CC] text-white p-3.5 rounded-lg text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition shadow-sm shadow-blue-600/10 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Log in →"}
              </button>
            </form>

            {/* ── Footer Link ── */}
            <p className="text-center mt-8 text-sm text-slate-500">
              No account yet?{" "}
              <Link
                href="/signup"
                className="text-[#0052CC] font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
        {/* END RIGHT SIDE */}
      </div>
      {/* END CARD */}
    </div>
  );
}
