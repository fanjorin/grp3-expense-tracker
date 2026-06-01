"use client";

// ─────────────────────────────────────────────────────────────
// COMPONENT: ExpiryTimer.jsx
// LOCATION:  Forgotpassword/check-inbox/Components/ExpiryTimer.jsx
// ─────────────────────────────────────────────────────────────
//
// HOW THE TIMER WORKS:
// - useEffect sets up an "interval" — a function that runs
//   every 1000 milliseconds (1 second)
// - Every second it subtracts 1 from the seconds count
// - When seconds hits 0, the interval stops automatically
// - If user clicks "Resend Code", timer resets back to 10 mins
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

export default function ExpiryTimer() {

  // ── TIMER STATE ──────────────────────────────────────────────
  // Stores remaining time in seconds.
  // 600 seconds = 10 minutes
  const [seconds, setSeconds] = useState(600);

  // ── COUNTDOWN EFFECT ─────────────────────────────────────────
  // useEffect runs code after the component appears on screen.
  // The [] at the end means it only runs ONCE when page loads.
  useEffect(() => {

    // Stop the timer if it already hit zero
    if (seconds <= 0) return;

    // setInterval runs the function inside every 1000ms (1 second)
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // CLEANUP: clear the interval when component is removed
    return () => clearInterval(interval);

  }, [seconds]); // re-run whenever seconds changes

  // ── FORMAT TIME ───
  // Converts raw seconds into MM:SS display format
  // Example: 125 seconds → "02:05"
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);        // whole minutes
    const remaining = totalSeconds % 60;                  // leftover seconds
    const mm = String(minutes).padStart(2, "0");          // "02"
    const ss = String(remaining).padStart(2, "0");        // "05"
    return `${mm}:${ss}`;
  };

  // ── HANDLE RESEND ───
  // Resets the timer back to 10 minutes when user clicks resend
  const handleResend = () => {
    setSeconds(600); // reset to 10 minutes
    console.log("Resending reset code...");
    // TODO: Backend team adds API call here to resend the email
  };

  // ── RENDER ───
  return (
    <div className="text-center my-2">

      {seconds > 0 ? (
        // Timer still running — show countdown in yellow/orange
        <p className="text-sm font-semibold text-yellow-500">
          Code expires in {formatTime(seconds)}
        </p>
      ) : (
        // Timer hit zero — show resend option
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-gray-500">Your code has expired.</p>
          <button
            type="button"
            onClick={handleResend}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            Resend Code
          </button>
        </div>
      )}

    </div>
  );
}
