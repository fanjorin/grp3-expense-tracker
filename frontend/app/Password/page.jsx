"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";

export default function PasswordPage() {

  // ── FORM STATE ──────────────────────────────────────────────
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // ── ERROR STATE ───
  // Stores any validation error message to show the user
  const [error, setError] = useState("");

  // ── SHOW/HIDE PASSWORD TOGGLES ────
  // Controls whether the password text is visible or hidden
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── HANDLE INPUT CHANGE ───
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // clear error when user starts typing again
  };

  // ── HANDLE SUBMIT ──
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation — check passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    // Check minimum password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // If all good, log and move to next step
    // TODO: save password → navigate to step 3 (budget)
    console.log("Password set:", formData.password);
  };

  // ── STEPS DATA ──────────────────────────────────────────────
  // Same 3 steps as signup page but:
  // - Step 1 is "completed" (green checkmark)
  // - Step 2 is "active" (white circle)
  // - Step 3 is still "upcoming" (outlined circle)
  const steps = [
    { number: 1, title: "Your details",        subtitle: "Name & email address",   status: "completed" },
    { number: 2, title: "Secure your account", subtitle: "Create a password",      status: "active" },
    { number: 3, title: "Set your budget",     subtitle: "Monthly spending limit", status: "upcoming" },
  ];

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    // Full screen grey background, card centered
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      {/* Card wrapper — holds left and right panels */}
      <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden min-h-[540px]">

        {/* ════════════════════════════════════════
            LEFT PANEL — blue sidebar
            ════════════════════════════════════════ */}
        <div className="bg-blue-600 text-white w-72 flex-shrink-0 p-8 flex flex-col gap-5 hidden md:flex">

          {/* ── Logo ── */}
          <Logo textColor="text-white" />

          {/* ── Headline ── */}
          <h1 className="text-3xl font-bold leading-snug">
            You&rsquo;re one step away from financial clarity.
          </h1>

          {/* ── Subtext ── */}
          <p className="text-sm text-blue-200 leading-relaxed">
            Join thousands of people already tracking smarter, spending better, and saving more.
          </p>

          {/* ── Steps label ── */}
          <p className="text-xs font-bold tracking-widest text-blue-300 uppercase">
            Setup Steps
          </p>

          {/* ── Steps list ── */}
          <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col">

                <div className="flex items-start gap-3">

                  {/* Circle indicator — 3 different states:
                      completed → green circle with checkmark
                      active    → white circle with blue number
                      upcoming  → outlined circle             */}
                  {step.status === "completed" ? (
                    // Green checkmark for completed step
                    <div className="w-7 h-7 min-w-[28px] rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  ) : step.status === "active" ? (
                    // White circle for current step
                    <div className="w-7 h-7 min-w-[28px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xs font-bold">{step.number}</span>
                    </div>
                  ) : (
                    // Outlined circle for upcoming steps
                    <div className="w-7 h-7 min-w-[28px] rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-300 text-xs font-bold">{step.number}</span>
                    </div>
                  )}

                  {/* Step text */}
                  <div>
                    <p className={`text-sm font-semibold ${step.status === "upcoming" ? "text-blue-300" : "text-white"}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-blue-300">{step.subtitle}</p>
                  </div>

                </div>

                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div className="ml-[13px] w-0.5 h-5 bg-blue-500 mt-1" />
                )}

              </div>
            ))}
          </div>

          {/* ── Testimonial — pushed to bottom ── */}
          <div className="mt-auto bg-blue-500 bg-opacity-50 rounded-xl p-4">
            <p className="text-sm text-white italic leading-relaxed">
              &ldquo;Setting up took less than 2 minutes. Now I know exactly where every naira goes.&rdquo;
            </p>
            <p className="text-xs text-blue-300 mt-2">–  Rebecca Ushie</p>
          </div>

        </div>
        {/* END LEFT PANEL */}

        {/* ════════════════════════════════════════
            RIGHT PANEL — Password form
            ════════════════════════════════════════ */}
        <div className="bg-white flex-1 p-10 flex flex-col justify-center">

          {/* ── Tabs ── */}
          <div className="flex gap-6 border-b border-gray-200 mb-7">
            <Link href="/login" className="pb-3 text-sm text-gray-500 hover:text-blue-800 transition-colors">
              Log in
            </Link>
            <span className="pb-3 text-sm font-semibold text-blue-800 border-b-2 border-blue-800">
              Sign up
            </span>
          </div>

          {/* ── Heading ── */}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Secure your account</h2>
          <p className="text-sm text-gray-500 mb-6">Create a password</p>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Password field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              {/* Wrapper for input + show/hide button */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                />
                {/* Show/hide password toggle button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error message — only shows if there's an error */}
            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">Or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google sign up button */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Sign up with Google
            </button>

            {/* ── Create Password button ── */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-3 rounded-lg text-sm transition-all"
            >
              Create Password →
            </button>

          </form>

        </div>
        {/* END RIGHT PANEL */}

      </div>
    </div>
  );
}