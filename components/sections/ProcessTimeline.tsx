import { siteConfig } from "@/lib/config";

const DEFAULT_STEPS = [
  { n: 1, title: "Free Estimate", blurb: "Tell us what you need. We respond with a transparent quote within 24 hours." },
  { n: 2, title: "Schedule Service", blurb: "Pick a time that works. Same-day appointments available for emergencies." },
  { n: 3, title: "Quality Work", blurb: "Licensed, insured pros. Photo-documented work and a written guarantee." },
  { n: 4, title: "Follow-Up", blurb: "Free follow-up check within 30 days. Lifetime relationship, not a one-off." },
];

export function ProcessTimeline() {
  // v2: read from config.process; v1: use hardcoded defaults
  const steps = siteConfig.process ?? DEFAULT_STEPS;

  return (
    <section className="py-20 md:py-24" style={{ background: "var(--bg, #fff)" }}>
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--ink, #111)", opacity: 0.45, fontFamily: "var(--font-mono, ui-monospace)" }}
          >
            How it works
          </p>
          <h2
            className="text-3xl font-normal md:text-4xl"
            style={{ fontFamily: "var(--font-display, var(--font-heading))", color: "var(--ink, #111)" }}
          >
            {steps.length} steps. Zero surprises.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              style={{ paddingTop: s.n % 2 === 0 && steps.length === 4 ? "2rem" : "0" }}
            >
              <div
                className="text-5xl font-normal leading-none"
                style={{
                  fontFamily: "var(--font-mono, ui-monospace)",
                  color: "var(--accent2, var(--ink))",
                  opacity: 0.18,
                }}
              >
                {String(s.n).padStart(2, "0")}
              </div>
              <h3
                className="mt-4 text-xl font-normal"
                style={{ fontFamily: "var(--font-display, var(--font-heading))", color: "var(--ink, #111)" }}
              >
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink, #111)", opacity: 0.6 }}>
                {s.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
