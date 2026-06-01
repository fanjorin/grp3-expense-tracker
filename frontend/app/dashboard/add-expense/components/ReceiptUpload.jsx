"use client";

import { useState } from "react";

export default function ReceiptUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-shadow duration-300">

      <div className="flex items-center gap-3 mb-8">
        <span className="p-2 bg-green-50 rounded-xl text-green-600 text-lg">📸</span>
        <div>
          <h2 className="font-bold text-slate-900 text-lg leading-tight">Receipt</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Optional upload</p>
        </div>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); setUploaded(true); }}
        onClick={() => setUploaded(true)}
        className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-500
          ${isDragging
            ? "border-blue-500 bg-blue-50/50 scale-[1.02] shadow-inner"
            : uploaded
            ? "border-green-400 bg-green-50/30"
            : "border-slate-200 bg-slate-50/50 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:shadow-blue-600/5 hover:-translate-y-1"
          }`}
      >
        {uploaded ? (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl shadow-sm">✅</div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-green-700">Receipt Attached</p>
              <button
                onClick={(e) => { e.stopPropagation(); setUploaded(false); }}
                className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
              >
                Remove File
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span className="text-3xl">☁️</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-slate-700">Upload Image</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Click or drag & drop</p>
            </div>
          </div>
        )}
      </div>

      {!uploaded && (
        <p className="text-center mt-6 text-[10px] text-slate-300 font-medium uppercase tracking-widest">
          Supports PNG, JPG or PDF
        </p>
      )}

    </div>
  );
}