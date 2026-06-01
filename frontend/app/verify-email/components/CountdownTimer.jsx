"use client";
// ↑ Required because this component uses useState and useEffect
//   to run a live countdown timer

// ─────────────────────────────────────────────────────────────
// COMPONENT: CountdownTimer.jsx
// ─────────────────────────────────────────────────────────────
// Shows "Code expires in MM:SS" and counts down from 10 minutes.
// When it reaches 00:00 it shows a "Resend Code" button instead.
//
// HOW IT WORKS:
// useEffect sets up an "interval" — a function that runs every
// 1000 milliseconds (1 second) and subtracts 1 from the timer.
// When the timer hits 0, the interval is cleared (stopped).
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

export default function CountdownTimer() {

  // ── TIMER STATE ───
  // Stores remaining seconds. Starts at 600 = 10 minutes.
  const [seconds, setSeconds] = useState(600);

  // ── COUNTDOWN EFFECT ──
  // useEffect runs code AFTER the component appears on screen.
  // The function inside runs every 1 second (1000ms).
  useEffect(() => {

    // Don't run if timer already hit 0
    if (seconds <= 0) return;

    // Set up the interval — runs every 1 second
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1); // subtract 1 second
    }, 1000);

    // CLEANUP: when the component is removed from the screen,
    // or when seconds changes, clear the old interval first
    // This prevents memory leaks
    return () => clearInterval(interval);

  }, [seconds]); // re-run this effect whenever 'seconds' changes

  // ── FORMAT TIME ──
  // Converts raw seconds into MM:SS format
  // e.g. 125 seconds → "02:05"
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);          // whole minutes
    const remainingSeconds = totalSeconds % 60;             // leftover seconds
    const mm = String(minutes).padStart(2, "0");            
    const ss = String(remainingSeconds).padStart(2, "0");   
    return `${mm}:${ss}`;
  };

  // ── HANDLE RESEND ───
  // Called when user clicks "Resend Code"
  // Resets timer back to 10 minutes
  const handleResend = () => {
    setSeconds(600);
    // TODO: call backend API to resend the reset code email
    console.log("Resending reset code...");
  };

  // ── RENDER ───
  return (
    <div className="text-center my-2">

      {seconds > 0 ? (
        // ── Timer is still running — show countdown ──
        <p className="text-sm font-semibold text-yellow-500">
          Code expires in {formatTime(seconds)}
        </p>
      ) : (
        // ── Timer hit 0 — show Resend button ──
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-500">Code expired.</p>
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
