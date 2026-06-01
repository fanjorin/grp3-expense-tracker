"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "../../components/Logo";
import { authAPI } from "../../../services/api";

function SetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  // ── FORM STATE ──────────────────────────────────────────────
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // ── ERROR STATE ───
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ── SHOW/HIDE PASSWORD TOGGLES ────
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── HANDLE INPUT CHANGE ───
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // ── HANDLE SUBMIT ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.createPassword({
        email,
        password: formData.password
      });

      if (response.success) {
        // Successfully set password, now move to step 3 (budget) or just login
        // For now, let's just go to login or automatically log them in
        router.push('/login');
      } else {
        setError(response.error || 'Failed to set password.');
      }
    } catch (err) {
      setError('Connection error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── STEPS DATA ──────────────────────────────────────────────
  const steps = [
    { number: 1, title: "Your details",        subtitle: "Name & email address",   status: "completed" },
    { number: 2, title: "Secure your account", subtitle: "Create a password",      status: "active" },
    { number: 3, title: "Set your budget",     subtitle: "Monthly spending limit", status: "upcoming" },
  ];

  return (
    <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden min-h-[540px]">
      {/* LEFT PANEL */}
      <div className="bg-blue-600 text-white w-72 flex-shrink-0 p-8 flex flex-col gap-5 hidden md:flex">
        <Logo textColor="text-white" />
        <h1 className="text-3xl font-bold leading-snug">
          You&rsquo;re one step away from financial clarity.
        </h1>
        <p className="text-sm text-blue-200 leading-relaxed">
          Join thousands of people already tracking smarter, spending better, and saving more.
        </p>
        <p className="text-xs font-bold tracking-widest text-blue-300 uppercase">Setup Steps</p>
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col">
              <div className="flex items-start gap-3">
                {step.status === "completed" ? (
                  <div className="w-7 h-7 min-w-[28px] rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                ) : step.status === "active" ? (
                  <div className="w-7 h-7 min-w-[28px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-xs font-bold">{step.number}</span>
                  </div>
                ) : (
                  <div className="w-7 h-7 min-w-[28px] rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-300 text-xs font-bold">{step.number}</span>
                  </div>
                )}
                <div>
                  <p className={`text-sm font-semibold ${step.status === "upcoming" ? "text-blue-300" : "text-white"}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-blue-300">{step.subtitle}</p>
                </div>
              </div>
              {index < steps.length - 1 && <div className="ml-[13px] w-0.5 h-5 bg-blue-500 mt-1" />}
            </div>
          ))}
        </div>
        <div className="mt-auto bg-blue-500 bg-opacity-50 rounded-xl p-4">
          <p className="text-sm text-white italic leading-relaxed">
            &ldquo;Setting up took less than 2 minutes. Now I know exactly where every naira goes.&rdquo;
          </p>
          <p className="text-xs text-blue-300 mt-2">– Rebecca Ushie</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-white flex-1 p-10 flex flex-col justify-center">
        <div className="flex gap-6 border-b border-gray-200 mb-7">
          <Link href="/login" className="pb-3 text-sm text-gray-500 hover:text-blue-800 transition-colors">Log in</Link>
          <span className="pb-3 text-sm font-semibold text-blue-800 border-b-2 border-blue-800">Sign up</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Secure your account</h2>
        <p className="text-sm text-gray-500 mb-6">Create a password for {email}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="password" name="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" object="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
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

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-3 rounded-lg text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Create Password →'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <SetPasswordContent />
      </Suspense>
    </div>
  );
}
