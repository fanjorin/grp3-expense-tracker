import Link from "next/link";

export default function AddExpenseHeader() {
  return (
    <div className="flex items-center gap-5">
      {/* Back Button */}
      <Link 
        href="/dashboard" 
        className="w-11 h-11 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all shadow-sm group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
      </Link>
      
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Log Transaction</h1>
        <p className="text-slate-500 text-sm font-medium">
          Manually enter your spending or income details below.
        </p>
      </div>
    </div>
  );
}