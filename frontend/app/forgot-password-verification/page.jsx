"use client";
import { useState } from "react";
import Link from "next/link";
import LeftPanel from "./components/LeftPanel";
import EmailIcon from "./components/Mailicon";
import OtpBoxes from "./components/OTPboxes";
import ExpiryTimer from "./components/Timer";

export default function CheckInboxPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleContinue = () => {
    const fullCode = code.join("");
    if (fullCode.length < 6 || code.includes("")) {
      alert("Please enter the complete 6-digit reset code.");
      return;
    }
    console.log("Reset code submitted:", fullCode);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden min-h-[540px]">
        <LeftPanel />
        <div className="bg-white flex-1 p-10 flex flex-col items-center justify-center">
          <div className="w-full max-w-md text-center">
            <EmailIcon />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your inbox</h2>
            <p className="text-sm text-gray-500 mb-2 leading-relaxed">
              We sent a reset code to you@gmail.com. Enter the reset code to be able to change your password.
            </p>
            <OtpBoxes code={code} setCode={setCode} />
            <ExpiryTimer />
            <button
              type="button"
              onClick={handleContinue}
              className="w-full bg-blue-800 hover:bg-blue-900 active:scale-[0.99] text-white font-semibold py-3 rounded-lg text-sm transition-all mt-4"
            >
              Continue
            </button>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-blue-800 transition-colors mt-4"
            >
              <span>←</span>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}