import Image from "next/image";
import { siteConfig } from "@/lib/config";

/**
 * v2 CaseStudy — single featured project.
 * Reads config.case_study ({photo_url, quote, stats: [{value, label}]}).
 * If absent, renders nothing.
 */
export function CaseStudy() {
  const cs = siteConfig.case_study;
  if (!cs) return null;

  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--surface, #F9FAFB)" }}
    >
      <div className="container">
        <p
          className="mb-8 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--ink, #111)", opacity: 0.45, fontFamily: "var(--font-mono, ui-monospace)" }}
        >
          Featured project
        </p>

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Photo */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={cs.photo_url}
              alt="Case study"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <blockquote
              className="text-2xl font-normal leading-relaxed md:text-3xl"
              style={{
                fontFamily: "var(--font-display, var(--font-heading))",
                fontStyle: "italic",
                color: "var(--ink, #111)",
              }}
            >
              &ldquo;{cs.quote}&rdquo;
            </blockquote>

            {/* Stats */}
            <div className="flex gap-8">
              {cs.stats.map((stat, i) => (
                <div key={i} style={{ borderLeft: "2px solid var(--accent2, #7A2E2A)", paddingLeft: "1rem" }}>
                  <p
                    className="text-3xl font-normal"
                    style={{ fontFamily: "var(--font-display, var(--font-heading))", color: "var(--ink, #111)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-1 text-xs uppercase tracking-wider"
                    style={{ color: "var(--ink, #111)", opacity: 0.5 }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
