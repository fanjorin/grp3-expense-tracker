// ─────────────────────────────────────────────────────────────
// COMPONENT: EmailIcon.jsx
// ─────────────────────────────────────────────────────────────
// Displays the circular envelope icon at the top of the
// "Check your inbox" section.
//
// WHY A SEPARATE COMPONENT?
// Icons with custom styling are good candidates for their own
// component — it keeps the main page clean and this icon
// could be reused elsewhere in the app.
// ─────────────────────────────────────────────────────────────

export default function EmailIcon() {
  return (
    // Outer light blue circle
    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">

      {/* Inner slightly darker circle */}
      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">

        {/* Envelope SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-label="Email icon"
        >
          {/* Envelope outline */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
          />
        </svg>

      </div>
    </div>
  );
}
