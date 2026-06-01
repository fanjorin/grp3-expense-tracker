"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import LeftPanel from "./components/LeftPanel";
import EmailIcon from "./components/Mailicon";
import OtpBoxes from "./components/OTPboxes";
import ExpiryTimer from "./components/Timer";
import { authAPI } from "../../../services/api";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'you@gmail.com';

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    const fullCode = code.join("");
    if (fullCode.length < 6 || code.includes("")) {
      setError("Please enter the complete 6-digit reset code.");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.verifyCode({ email, code: fullCode });
      if (response.success) {
        // If valid → navigate to /forgot-password/reset
        router.push(`/forgot-password/reset?email=${encodeURIComponent(email)}&code=${fullCode}`);
      } else {
        setError(response.error || "Invalid verification code.");
      }
    } catch (err) {
      setError("Connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden min-h-[540px]">
      <LeftPanel />
      <div className="bg-white flex-1 p-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md text-center">
          <EmailIcon />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your inbox</h2>
          <p className="text-sm text-gray-500 mb-2 leading-relaxed">
            We sent a reset code to <span className="font-semibold">{email}</span>. Enter the reset code to be able to change your password.
          </p>
          
          {error && (
            <div className="mt-4 p-2 bg-red-50 text-red-600 text-xs rounded border border-red-100">
              {error}
            </div>
          )}

          <OtpBoxes code={code} setCode={(newCode) => { setCode(newCode); setError(""); }} />
          <ExpiryTimer email={email} />
          
          <button
            type="button"
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-3 rounded-lg text-sm transition-all mt-4 disabled:opacity-70"
          >
            {isLoading ? "Verifying..." : "Continue"}
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
  );
}

export default function CheckInboxPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
