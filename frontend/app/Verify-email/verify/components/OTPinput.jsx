"use client";
// ↑ Required because this component has user interaction:
//   typing in boxes and auto-moving focus between them

// ─────────────────────────────────────────────────────────────
// COMPONENT: OtpInput.jsx
// ─────────────────────────────────────────────────────────────
// Renders 6 individual input boxes for the reset code.
//
// SMART BEHAVIOUR:
// - When you type a digit in one box, focus AUTOMATICALLY
//   moves to the next box — no need to click each one
// - When you press Backspace on an empty box, focus moves
//   BACK to the previous box
// - Only accepts single digits (0-9)
//
// HOW IT CONNECTS TO THE BACKEND:
// The parent page (page.jsx) passes in:
//   otp      → the current array of 6 digits
//   setOtp   → function to update those digits
// This pattern is called "lifting state up" — the data
// lives in the parent so the parent can send it to the API.
// ─────────────────────────────────────────────────────────────

import { useRef } from "react";
// useRef → lets us directly access DOM elements (the input boxes)
//          so we can move focus between them programmatically

export default function OtpInput({ otp, setOtp }) {
  // otp    → array of 6 strings, e.g. ["1","2","","","",""]
  // setOtp → function from parent to update the array

  // ── REFS FOR EACH INPUT BOX ────────────────────────────────
  // inputRefs is an array of 6 "references" — one per box.
  // This lets us call inputRefs[2].current.focus() to move
  // the cursor to box number 3, for example.
  const inputRefs = useRef([]);

  // ── HANDLE TYPING ──────────────────────────────────────────
  // Called every time the user types in any box
  // index → which box (0 to 5)
  // value → what was typed
  const handleChange = (index, value) => {

    // Only allow single digits 0-9
    // The regex /^[0-9]$/ means "exactly one digit"
    if (!/^[0-9]$/.test(value) && value !== "") return;

    // Update the otp array at the correct position
    const newOtp = [...otp]; // copy the array first
    newOtp[index] = value;   // update the box that changed
    setOtp(newOtp);          // save back to parent

    // Auto-move focus to the NEXT box if a digit was typed
    // and we're not already on the last box
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // ── HANDLE BACKSPACE ───────────────────────────────────────
  // Called when any key is pressed — we only care about Backspace
  const handleKeyDown = (index, e) => {
    // If Backspace pressed AND the box is already empty,
    // move focus BACK to the previous box
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // ── HANDLE PASTE ───────────────────────────────────────────
  // If user pastes a 6-digit code (e.g. from their SMS app),
  // fill all boxes automatically
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").trim();

    // Only process if it looks like a 6-digit code
    if (/^\d{6}$/.test(pastedText)) {
      const digits = pastedText.split(""); // ["1","2","3","4","5","6"]
      setOtp(digits);
      // Move focus to the last box after paste
      inputRefs.current[5].focus();
    }
  };

  // ── RENDER ─────────────────────────────────────────────────
  return (
    // Row of 6 input boxes
    <div className="flex gap-3 justify-center my-6">

      {/* Loop through otp array — render one box per digit */}
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          // ↑ Store reference to this DOM element so we can focus it

          type="text"
          inputMode="numeric"   // shows number keyboard on mobile
          maxLength={1}         // only 1 character per box
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste} // handle paste on any box

          className={`w-11 h-12 text-center text-lg font-semibold border-2 rounded-lg outline-none transition-all
            ${digit
              ? "border-blue-600 bg-blue-50 text-blue-800"  // filled box — blue
              : "border-gray-300 bg-gray-100 text-gray-900"  // empty box — grey
            }
            focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100`}
        />
      ))}

    </div>
  );
}