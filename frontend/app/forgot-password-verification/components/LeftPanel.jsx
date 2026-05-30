// ─────────────────────────────────────────────────────────────
// COMPONENT: LeftPanel.jsx
// LOCATION:  forgot-password-verification/components/LeftPanel.jsx
// ─────────────────────────────────────────────────────────────
// This is the blue sidebar on the left side of the page.
// It shows:
//   - The Expense Tracker logo
//   - A headline and subtext
//   - 3 steps (step 1 completed, step 2 active, step 3 upcoming)
//   - A testimonial quote at the bottom
// ─────────────────────────────────────────────────────────────

export default function LeftPanel() {

  // ── STEPS DATA ─────
  // Array of objects — each object = one step in the sidebar
  // status can be:
  //   "completed" → green checkmark (already done)
  //   "active"    → white circle (currently on this step)
  //   "upcoming"  → faded circle (not reached yet)
  const steps = [
    {
      number: 1,
      title: "Enter your email",
      subtitle: "We'll send a reset code",
      status: "completed", // ✓ user already entered their email
    },
    {
      number: 2,
      title: "Enter reset code",
      subtitle: "Check your inbox",
      status: "active",    // ← user is currently on this step
    },
    {
      number: 3,
      title: "Create new password",
      subtitle: "Make it strong!",
      status: "upcoming",  // not reached yet
    },
  ];

  return (
    // Blue sidebar
    // "hidden md:flex" → hidden on mobile, visible on medium+ screens
    <div className="hidden md:flex bg-blue-800 text-white w-72 flex-shrink-0 p-8 flex-col gap-5 min-h-full">

      {/* ── Logo ── */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="font-semibold text-sm">Expense Tracker</span>
      </div>

      {/* ── Main headline ── */}
      <h1 className="text-2xl font-bold leading-snug">
        Don&rsquo;t worry. Resetting your password is easy
      </h1>

      {/* ── Supporting text ── */}
      <p className="text-sm text-blue-200 leading-relaxed">
        Follow the steps on the right and you&rsquo;ll be back in your dashboard in no time
      </p>

      {/* ── "SETUP STEPS" label ── */}
      <p className="text-xs font-bold tracking-widest text-blue-300 uppercase">
        Setup Steps
      </p>

      {/* ── Steps list ──
          We loop through the steps array and render each one */}
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col">

            {/* Step row: circle + text side by side */}
            <div className="flex items-start gap-3">

              {/* Circle indicator — looks different based on status */}
              {step.status === "completed" ? (
                // GREEN circle with checkmark = step is done
                <div className="w-7 h-7 min-w-[28px] rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              ) : step.status === "active" ? (
                // WHITE circle with number = current step
                <div className="w-7 h-7 min-w-[28px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-800 text-xs font-bold">{step.number}</span>
                </div>
              ) : (
                // OUTLINED circle = upcoming step
                <div className="w-7 h-7 min-w-[28px] rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-300 text-xs font-bold">{step.number}</span>
                </div>
              )}

              {/* Step title and subtitle */}
              <div>
                <p className={`text-sm font-semibold ${step.status === "upcoming" ? "text-blue-300" : "text-white"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-blue-300">{step.subtitle}</p>
              </div>

            </div>

            {/* Vertical line connecting steps — hidden after last step */}
            {index < steps.length - 1 && (
              <div className="ml-[13px] w-0.5 h-5 bg-blue-500 mt-1" />
            )}

          </div>
        ))}
      </div>

      {/* ── Testimonial quote — pushed to bottom of sidebar ── */}
      <div className="mt-auto bg-blue-700 bg-opacity-50 rounded-xl p-4">
        <p className="text-sm text-white italic leading-relaxed">
          &ldquo;Reset was so smooth. I was back in my account within 2 minutes.&rdquo;
        </p>
        <p className="text-xs text-blue-300 mt-2">– Nwachukwu Pascal</p>
      </div>

    </div>
  );
}