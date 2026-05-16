"use client";

import React from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    // 1. MAIN WRAPPER: Takes full screen height and uses flexbox to split left and right sides
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-800">
      
      {/* =========================================================
          LEFT SIDE: Blue Promotional Sidebar
          ========================================================= */}
      <div className="hidden md:flex w-[38%] bg-[#0052CC] p-12 flex-col justify-between text-white select-none">
        <div>
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">J</div>
            <span className="font-semibold text-lg tracking-wide">Expense Tracker</span>
          </div>

          {/* Main Value Proposition */}
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            You're one step away from financial clarity.
          </h1>
          <p className="text-blue-100/80 text-sm mb-16 leading-relaxed">
            Join thousands of people already tracking smarter, spending better, and saving more.
          </p>

          {/* Progress Tracker / Setup Steps */}
          <div className="space-y-8">
            <p className="text-xs font-semibold tracking-wider text-blue-200/60 uppercase">Setup Steps</p>
            
            {/* Step 1 (Active Step) */}
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-white text-[#0052CC] flex items-center justify-center font-bold text-sm shadow-sm">
                1
              </div>
              <div>
                <p className="font-semibold text-sm">Your details</p>
                <p className="text-xs text-blue-100/70">Name & email address</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 relative">
              {/* Connecting line between circles */}
              <div className="absolute -top-7 left-[18px] w-[1px] h-6 bg-blue-400/40"></div>
              <div className="w-9 h-9 rounded-full border border-blue-400/40 text-blue-200 flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <p className="font-semibold text-sm text-blue-200">Secure your account</p>
                <p className="text-xs text-blue-200/50">Create a password</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 relative">
              <div className="absolute -top-7 left-[18px] w-[1px] h-6 bg-blue-400/40"></div>
              <div className="w-9 h-9 rounded-full border border-blue-400/40 text-blue-200 flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <p className="font-semibold text-sm text-blue-200">Set your budget</p>
                <p className="text-xs text-blue-200/50">Monthly spending limit</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Testimonial Box */}
        <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
          <p className="text-sm font-medium leading-relaxed mb-4 text-blue-50">
            "Setting up took less than 2 minutes. Now I know exactly where every naira goes."
          </p>
          <p className="text-xs font-semibold text-blue-200">- Nwachukwu Pascal</p>
        </div>
      </div>

      {/* =========================================================
          RIGHT SIDE: Interactive Form Section
          ========================================================= */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white">
        <div className="w-full max-w-[460px]">
          
          {/* Navigation Tabs (Log In / Sign Up switching display) */}
          <div className="flex gap-6 mb-10 border-b border-slate-100 text-sm font-medium">
            <Link href="/login" className="pb-3 text-slate-400 hover:text-slate-600 transition">Log in</Link>
            <button type="button" className="pb-3 text-[#0052CC] border-b-2 border-[#0052CC] font-semibold">Sign up</button>
          </div>

          {/* Form Header */}
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
          <p className="text-sm text-slate-400 mb-8">Let's start with your basic information</p>

          {/* Information Input Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Dual Column Row for Names */}
            <div className="flex gap-4">
              <div className="flex-1">
               <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">First Name</label>
               <input type="text" name="firstName" id="firstName" placeholder="Pascal" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:bg-white transition" />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Last Name</label>
                <input type="text" name="lastName" id="lastName" placeholder="Nwachukwu" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:bg-white transition" />
              </div>
            </div>

            {/* Email Address Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email address</label>
              <input type="email" name="email" id="email" placeholder="you@gmail.com" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:bg-white transition" />
            </div>

            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone number</label>
              <input type="tel" name="phone" id="phone" placeholder="+234 000 000 000" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:bg-white transition" />
            </div>

            {/* Decorative Content Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-[1px] bg-slate-200"></div>
              <span className="px-4 text-xs text-slate-400 font-medium bg-white">Or</span>
              <div className="flex-1 h-[1px] bg-slate-200"></div>
            </div>

            {/* Third-Party Authentication: Google Federated Sign Up Button */}
            <button type="button" className="w-full flex items-center justify-center gap-2.5 p-3.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition">
              <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
</svg>
            </button>

            {/* Form Submission Confirmation Action */}
            <button type="submit" className="w-full bg-[#0052CC] text-white p-3.5 rounded-lg text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition shadow-sm shadow-blue-600/10">
              Continue →
            </button>
          </form>

          {/* Core Footer Link Context */}
          <p className="text-center mt-8 text-sm text-slate-500">
  Already have an account? <Link href="/login" className="text-[#0052CC] font-medium hover:underline">Sign in</Link>
</p>
        </div>
      </div>
    </div>
  );
}