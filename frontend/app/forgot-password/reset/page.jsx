"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/app/components/Logo";
import { authAPI } from "@/services/api";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.resetPassword({
        email,
        code,
        newPassword: formData.password,
      });

      if (response.success) {
        alert("Password reset successfully. Please log in.");
        router.push("/login");
      } else {
        setError(response.error || "Failed to reset password.");
      }
    } catch (err) {
      setError("Connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden min-h-[500px]">
      {/* Sidebar */}
      <div className="hidden md:flex bg-blue-600 text-white w-72 flex-shrink-0 p-8 flex-col gap-5">
        <Logo textColor="text-white" />
        <h1 className="text-2xl font-bold leading-snug">
          Create a strong new password
        </h1>
        <p className="text-sm text-blue-200">
          Almost there! Just one last step and you'll be back in.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white flex-1 p-10 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Enter a new password for {email}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-sm transition-all disabled:opacity-70"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
