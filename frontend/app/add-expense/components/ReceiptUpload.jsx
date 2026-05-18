"use client";

import { useState } from "react";

export default function ReceiptUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      <h2 className="font-semibold text-gray-800 text-lg mb-4">
        Receipt <span className="text-gray-400 font-normal text-sm">(Optional)</span>
      </h2>

      {/* Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); setUploaded(true); }}
        onClick={() => setUploaded(true)}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
          }`}
      >
        {uploaded ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">✅</span>
            <p className="text-sm font-medium text-green-600">Receipt uploaded</p>
            <button
              onClick={(e) => { e.stopPropagation(); setUploaded(false); }}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {/* Upload Icon */}
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
              <span className="text-2xl">☁️</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">Upload receipt</p>
            <p className="text-xs text-gray-400">Drag and drop or click to browse</p>
            <p className="text-xs text-gray-400">PNG, JPG or PDF (Max. 5MB)</p>
          </div>
        )}
      </div>

    </div>
  );
}