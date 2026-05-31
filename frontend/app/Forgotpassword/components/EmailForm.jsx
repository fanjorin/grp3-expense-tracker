"use client";
// ↑ Required because this component has user interaction:
//   typing in the email field and clicking the button

// ─────────────────────────────────────────────────────────────
// COMPONENT: EmailForm.jsx
// ─────────────────────────────────────────────────────────────
// Renders the email input field and "Send reset code" button.
//
// WHY A SEPARATE COMPONENT?
// The form has its own state and logic — pulling it out of
// the main page keeps things clean and separated.
// The backend team only needs to look at this ONE file to
// know where to plug in the API call.


"use client";

import { useState } from "react";

export default function EmailForm() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      console.log("Sending reset code to:", email);
      // TODO: Backend team adds API call here
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
          className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-3 rounded-lg text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        {isLoading ? "Sending..." : "Send reset code"}
      </button>

    </form>
  );
}
