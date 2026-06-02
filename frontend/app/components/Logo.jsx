import Link from "next/link";

export default function Logo({ textColor = "text-blue-600" }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      {/* Blue Square with Wallet Icon */}
      <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <circle cx="16" cy="14" r="1.5" fill="white" stroke="none" />
        </svg>
      </div>

      {/* Text */}
      <span className={`${textColor} font-bold text-lg tracking-tight`}>
        PennyWise AI
      </span>
    </Link>
  );
}
