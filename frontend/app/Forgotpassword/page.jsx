"use client";

import Link from "next/link";

// ── Import components ───
import LeftPanel from "./Components/LeftPanel";
import LockIcon from "./Components/LockIcon";
import EmailForm from "./Components/EmailForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      {/* Card — holds both panels side by side */}
      <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden min-h-[500px]">

        {/* ── LEFT PANEL COMPONENT ──
            Entire blue sidebar handled by LeftPanel.
         */}
        <LeftPanel />

        {/* ════════════════════════════════════════
            RIGHT PANEL — Forgot password form
            ════════════════════════════════════════ */}
        <div className="bg-white flex-1 p-10 flex flex-col items-center justify-center">
          <div className="w-full max-w-md">

            {/* ── LOCK ICON COMPONENT ── */}
            <LockIcon />

            {/* ── Heading ── */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Forgot your password
            </h2>

            {/* ── Subtext ── */}
            <p className="text-sm text-gray-500 mb-6 text-center leading-relaxed">
              No worries! Enter the email address linked to your account and we&rsquo;ll send you a reset code.
            </p>

            {/* ── EMAIL FORM COMPONENT ──
                Contains the email input and submit button.
                Manages its own state and validation. */}
            <EmailForm />

            {/* ── Back to login link ── */}
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-blue-800 transition-colors mt-5"
            >
              <span>←</span>
              Back to login
            </Link>

          </div>
        </div>
        {/* END RIGHT PANEL */}

      </div>
    </div>
  );
}
