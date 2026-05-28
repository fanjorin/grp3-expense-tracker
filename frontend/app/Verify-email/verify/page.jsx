"use client";
// ↑ Required because this page uses useState for the OTP data

// ─────────────────────────────────────────────────────────────
// PAGE: Verify-email/verify/page.jsx
// URL:  /verify-email/verify
// ─────────────────────────────────────────────────────────────
// This is the "Check your inbox" page — Step 2 of the
// Verify Email flow.
//
// WHAT THIS PAGE DOES:
// - Shows the blue left panel (LeftPanel component)
// - Shows the envelope icon (EmailIcon component)
// - Shows 6 OTP input boxes (OtpInput component)
// - Shows a countdown timer (CountdownTimer component)
// - Has a Continue button that validates the code
//
// THIS PAGE IS THE "PARENT" — it owns the OTP state and
// passes it down to OtpInput as props. When the user clicks
// Continue, this page sends the OTP to the backend API.
//
// HOW COMPONENTS CONNECT:
// page.jsx
//   ├── LeftPanel.jsx      (no props needed — just displays info)
//   ├── EmailIcon.jsx      (no props needed — just an icon)
//   ├── OtpInput.jsx       (receives: otp, setOtp)
//   └── CountdownTimer.jsx (no props needed — manages own timer)

import { useState } from "react";
import Link from "next/link";

// ── Import our components ──
// Each import pulls in a component from the components/ folder
import LeftPanel from "./components/leftPanel";
import EmailIcon from "./components/Emailicon";
import OtpInput from "./components/OTPinput";
import CountdownTimer from "./components/CountdownTimer";

export default function VerifyPage() {

  // ── OTP STATE ────────────────────────────────────────────────
  // An array of 6 strings — one per input box.
  // Starts as 6 empty strings: ["", "", "", "", "", ""]
  // Lives HERE (in the parent) so we can read all 6 digits
  // when the user clicks Continue and send them to the API.
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // ── HANDLE CONTINUE ──────────────────────────────────────────
  const handleContinue = () => {

    // Join the 6 array items into one string e.g. "123456"
    const otpCode = otp.join("");

    // Check all 6 boxes are filled before submitting
    if (otpCode.length < 6 || otp.includes("")) {
      alert("Please enter the full 6-digit code.");
      return;
    }

    console.log("OTP submitted:", otpCode);
    // TODO: send otpCode to backend API for verification
    // If valid → navigate to /verify-email/new-password
  };

  // ── RENDER ──
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      {/* Card wrapper — holds both panels side by side */}
      <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden min-h-[560px]">

        {/* ── LEFT PANEL COMPONENT ──
            The entire blue sidebar is handled by LeftPanel.
            We just drop it here — no props needed. */}
        <LeftPanel />

        {/* ════════
            RIGHT PANEL — Check your inbox
            ════════ */}
        <div className="bg-white flex-1 p-10 flex flex-col items-center justify-center">
          <div className="w-full max-w-md text-center">

            {/* ── EMAIL ICON COMPONENT ──
                The circular envelope icon */}
            <EmailIcon />

            {/* ── Heading ── */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Check your inbox
            </h2>

            {/* ── Subtext — tells user what to do ── */}
            <p className="text-sm text-gray-500 mb-2 leading-relaxed">
              We sent a reset code to you@gmail.com. Enter the reset code to be able to change your password.
            </p>

            {/* ── OTP INPUT COMPONENT ──
                The 6 input boxes.
                We pass otp (the data) and setOtp (the updater)
                as "props" so OtpInput can read and update them. */}
            <OtpInput otp={otp} setOtp={setOtp} />

            {/* ── COUNTDOWN TIMER COMPONENT ──
                Shows "Code expires in MM:SS"
                Manages its own timer internally */}
            <CountdownTimer />

            {/* ── Continue button ── */}
            <button
              type="button"
              onClick={handleContinue}
              className="w-full bg-blue-800 hover:bg-blue-900 active:scale-[0.99] text-white font-semibold py-3 rounded-lg text-sm transition-all mt-4"
            >
              Continue
            </button>

            {/* ── Back to login link ── */}
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-blue-800 transition-colors mt-4"
            >
              {/* Left arrow */}
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
