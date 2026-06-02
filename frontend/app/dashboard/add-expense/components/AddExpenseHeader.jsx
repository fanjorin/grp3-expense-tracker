import Link from "next/link";

export default function AddExpenseHeader() {
  return (
    <div className="flex flex-row items-center gap-4 sm:gap-5">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="w-10 h-10 sm:w-11 sm:h-11 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all shadow-sm group shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-x-0.5 transition-transform"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </Link>

      <div className="flex flex-col gap-0.5 sm:gap-1">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Log Transaction
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium">
          Enter your spending or income details below.
        </p>
      </div>
    </div>
  );
}
