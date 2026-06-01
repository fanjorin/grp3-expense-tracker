"use client";

// ─────────────────────────────────────────────────────────────
// COMPONENT: OtpBoxes.jsx
// LOCATION:  Forgotpassword/check-inbox/Components/OtpBoxes.jsx
// ─────────────────────────────────────────────────────────────
// Renders 6 individual input boxes for the reset code.
//
// SMART FEATURES:
// 1. Auto-focus → when you type in box 1, cursor jumps to box 2
// 2. Backspace  → when you delete in an empty box, cursor goes back
// 3. Paste      → paste a 6-digit code and all boxes fill at once
// 4. Only digits → letters and symbols are blocked

// ─────────────────────────────────────────────────────────────

import { useRef } from "react";
// useRef → gives us direct access to each input box in the browser
//          so we can move the cursor between boxes programmatically

export default function OtpBoxes({ code, setCode }) {
  // code    → the current 6 digits (array from parent)
  // setCode → function to update them (from parent)

  // ── REFS ───
  // One ref per box — lets us call .focus() to move the cursor
  const boxRefs = useRef([]);

  // ── HANDLE TYPING ──
  // Runs every time the user types in any box
  const handleChange = (index, value) => {

    // Block anything that is not a single digit (0-9)
    if (!/^[0-9]$/.test(value) && value !== "") return;

    // Copy the current code array, update the changed box
    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode); // send updated array back to parent

    // Auto-move cursor to the NEXT box if a digit was typed
    if (value !== "" && index < 5) {
      boxRefs.current[index + 1].focus();
    }
  };

  // ── HANDLE BACKSPACE ───
  // Moves cursor BACK when backspace is pressed on an empty box
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      boxRefs.current[index - 1].focus();
    }
  };

  // ── HANDLE PASTE ────
  // If user pastes a 6-digit code, fill all boxes at once
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();

    // Only process if it's exactly 6 digits
    if (/^\d{6}$/.test(pasted)) {
      setCode(pasted.split("")); // ["1","2","3","4","5","6"]
      boxRefs.current[5].focus(); // move cursor to last box
    }
  };

  // ── RENDER ───
  return (
    // Row of 6 boxes
    <div className="flex gap-3 justify-center my-6">

      {/* Loop through the code array — one box per digit */}
      {code.map((digit, index) => (
        <input
          key={index}

          // Store a reference to this box so we can focus it later
          ref={(el) => (boxRefs.current[index] = el)}

          type="text"
          inputMode="numeric"  // shows number keyboard on mobile phones
          maxLength={1}        // only 1 character allowed per box
          value={digit}

          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}

          // Box turns blue when filled, grey when empty
          className={`w-11 h-12 text-center text-lg font-semibold border-2 rounded-lg outline-none transition-all
            ${digit
              ? "border-blue-600 bg-blue-50 text-blue-800"   // filled
              : "border-gray-300 bg-gray-100 text-gray-800"  // empty
            }
            focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100`}
        />
      ))}

    </div>
  );
}
