import { siteConfig } from "@/lib/config";

/**
 * v2 Trust Strip — muted band below hero.
 * Reads config.trust_strip (5 strings). Falls back to legacy TrustRow data if absent.
 */
export function TrustStrip() {
  const items: string[] = siteConfig.trust_strip ?? [
    `${siteConfig.location.city} licensed & insured`,
    "1,200+ satisfied clients",
    "4.9 / 5 verified reviews",
    "12+ years operating",
    "Free, transparent quotes",
  ];

  return (
    <section
      className="overflow-x-auto"
      style={{
        background: "var(--surface, #F9FAFB)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="flex min-w-max items-center gap-0 px-6 py-4 md:px-12 md:min-w-0 md:flex-wrap md:justify-center"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="px-4 text-xs font-medium tracking-widest uppercase"
              style={{
                color: "var(--ink, #111)",
                opacity: 0.6,
                fontFamily: "var(--font-mono, ui-monospace)",
                scrollSnapAlign: "start",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
            {i < items.length - 1 && (
              <span
                style={{ color: "var(--ink, #111)", opacity: 0.25, fontSize: "8px" }}
                aria-hidden
              >
                ·
              </span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
