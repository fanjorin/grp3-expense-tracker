"use client";

import { useState, useEffect } from "react";
import { authAPI } from "@/services/api";

export default function ProfileSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        if (response?.success) {
          const user = response.data;
          setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
          });
          // Update local storage to keep it in sync
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await authAPI.updateProfile(formData);
      if (response?.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        // Update local storage
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        setMessage({
          type: "error",
          text: response?.error || "Failed to update profile",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Connection error. Please try again.",
      });
    } finally {
      setIsSaving(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-pulse h-96"></div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-8 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <span className="p-2 bg-blue-50 rounded-xl text-blue-600 text-lg">
          👤
        </span>
        <div>
          <h2 className="font-bold text-slate-900 text-lg leading-tight">
            Profile Information
          </h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">
            Update your personal details
          </p>
        </div>
      </div>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs font-bold border animate-in fade-in slide-in-from-top-2 ${
            message.type === "success"
              ? "bg-green-50 text-green-600 border-green-100"
              : "bg-red-50 text-red-600 border-red-100"
          }`}
        >
          {message.type === "success" ? "✅" : "⚠️"} {message.text}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
        {/* Avatar */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
              👤
            </span>
          </div>
          <button className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-[#0052CC] text-white rounded-xl w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer hover:bg-blue-700 hover:scale-110 transition-all duration-200 shadow-lg shadow-blue-600/20">
            <span className="text-xs sm:text-sm">📷</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-slate-50">
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className="bg-[#0052CC] text-white text-sm px-8 py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/10 hover:-translate-y-0.5 transition-all duration-200 font-bold tracking-tight disabled:opacity-70"
            >
              {isSaving ? "SAVING..." : "Update Profile →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
