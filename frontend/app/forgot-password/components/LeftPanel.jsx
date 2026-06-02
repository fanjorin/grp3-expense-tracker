// ─────────────────────────────────────────────────────────────
// COMPONENT: LeftPanel.jsx
// ─────────────────────────────────────────────────────────────
// The blue sidebar shown on the left side of the page.
// Shows branding, 3 reset steps, and a testimonial quote.
//
// WHY A SEPARATE COMPONENT?
// The left panel is a self-contained section with no interaction
// — pulling it out keeps the main page clean and focused.
// It also makes it easy to reuse across all forgot-password steps.
// ─────────────────────────────────────────────────────────────
import Logo from "@/app/components/Logo";
export default function LeftPanel() {
  // ── STEPS DATA ───
  // The 3 steps shown in the sidebar.
  // On this page (step 1), only step 1 is active.
  // Steps 2 and 3 are upcoming (not yet reached).
  const steps = [
    {
      number: 1,
      title: "Enter your email",
      subtitle: "We'll send a reset code",
      status: "active", // user is currently here
    },
    {
      number: 2,
      title: "Enter reset code",
      subtitle: "Check your inbox",
      status: "upcoming", // not reached yet
    },
    {
      number: 3,
      title: "Create new password",
      subtitle: "Make it strong!",
      status: "upcoming", // not reached yet
    },
  ];

  return (
    // Blue sidebar — hidden on mobile, visible from medium screens
    <div className="hidden md:flex bg-blue-600 text-white w-72 flex-shrink-0 p-8 flex-col gap-5 min-h-full">
      {/* ── Logo ── */}
      <Logo textColor="text-white" />

      {/* ── Headline ── */}
      <h1 className="text-2xl font-bold leading-snug">
        Don&rsquo;t worry. Resetting your password is easy
      </h1>

      {/* ── Subtext ── */}
      <p className="text-sm text-blue-200 leading-relaxed">
        Follow the steps on the right and you&rsquo;ll be back in your dashboard
        in no time
      </p>

      {/* ── Steps label ── */}
      <p className="text-xs font-bold tracking-widest text-blue-300 uppercase">
        Setup Steps
      </p>

      {/* ── Steps list ── */}
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col">
            <div className="flex items-start gap-3">
              {/* ── Circle indicator ──
                  active   → white circle with blue number
                  upcoming → faded outlined circle            */}
              {step.status === "active" ? (
                <div className="w-7 h-7 min-w-[28px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-800 text-xs font-bold">
                    {step.number}
                  </span>
                </div>
              ) : (
                <div className="w-7 h-7 min-w-[28px] rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-300 text-xs font-bold">
                    {step.number}
                  </span>
                </div>
              )}

              {/* Step title and subtitle */}
              <div>
                <p
                  className={`text-sm font-semibold ${step.status === "upcoming" ? "text-blue-300" : "text-white"}`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-blue-300">{step.subtitle}</p>
              </div>
            </div>

            {/* Vertical connector line — not shown after last step */}
            {index < steps.length - 1 && (
              <div className="ml-[13px] w-0.5 h-5 bg-blue-500 mt-1" />
            )}
          </div>
        ))}
      </div>

      {/* ── Testimonial — pushed to bottom ── */}
      <div className="mt-auto bg-blue-500 bg-opacity-50 rounded-xl p-4">
        <p className="text-sm text-white italic leading-relaxed">
          &ldquo;Reset was so smooth. I was back in my account within 2
          minutes.&rdquo;
        </p>
        <p className="text-xs text-blue-300 mt-2">– Akorede Ahmed</p>
      </div>
    </div>
  );
}
