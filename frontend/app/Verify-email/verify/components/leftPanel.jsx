// ─────────────────────────────────────────────────────────────
// COMPONENT: LeftPanel.jsx
// ─────────────────────────────────────────────────────────────
// This is the blue sidebar shown on the left side of the page.
// It shows the branding, the 3 reset steps, and a testimonial.
// ─────────────────────────────────────────────────────────────

import Logo from "../../../components/Logo";

export default function LeftPanel() {

  // ── STEPS DATA ───
  // status options:
  //   "completed" → green checkmark (step is done)
  //   "active"    → white circle with number (current step)
  //   "upcoming"  → faded outlined circle (not yet reached)
  const steps = [
    {
      number: 1,
      title: "Enter your email",
      subtitle: "We'll send a reset code",
      status: "completed",
    },
    {
      number: 2,
      title: "Enter reset code",
      subtitle: "Check your inbox",
      status: "active",
    },
    {
      number: 3,
      title: "Create new password",
      subtitle: "Make it strong!",
      status: "upcoming",
    },
  ];

  return (
    // Blue sidebar — hidden on mobile, visible from medium screens up
    <div className="hidden md:flex bg-blue-600 text-white w-72 flex-shrink-0 p-8 flex-col gap-5 min-h-full">

      {/* ── Logo ── */}
      <Logo textColor="text-white" />

      {/* ── Headline ── */}
      <h1 className="text-2xl font-bold leading-snug">
        Don&rsquo;t worry. Resetting your password is easy
      </h1>

      {/* ── Subtext ── */}
      <p className="text-sm text-blue-200 leading-relaxed">
        Follow the steps on the right and you&rsquo;ll be back in your dashboard in no time
      </p>

      {/* ── Steps label ── */}
      <p className="text-xs font-bold tracking-widest text-blue-300 uppercase">
        Setup Steps
      </p>

      {/* ── Steps list ── */}
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col">

            {/* One step row: circle + text */}
            <div className="flex items-start gap-3">

              {/* Circle indicator — 3 different looks based on status */}
              {step.status === "completed" ? (
                // GREEN checkmark = step is done
                <div className="w-7 h-7 min-w-[28px] rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              ) : step.status === "active" ? (
                // WHITE circle = current step
                <div className="w-7 h-7 min-w-[28px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xs font-bold">{step.number}</span>
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
          &ldquo;Reset was so smooth. I was back in my account within 2 minutes.&rdquo;
        </p>
        <p className="text-xs text-blue-300 mt-2">– Nwachukwu Pascal</p>
      </div>

    </div>
  );
}