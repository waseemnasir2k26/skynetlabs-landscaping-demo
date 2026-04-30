import { siteConfig } from "@/lib/config";

/**
 * v2 Testimonials — editorial 3-card layout, NOT carousel.
 * Reads config.testimonials_v2 (quote, name, role, city, photo_url?).
 * Falls back to config.testimonials (same shape).
 * No star ratings. Small-caps name + role + city. Hairline border between cards.
 */
export function TestimonialsEditorial() {
  const items = siteConfig.testimonials_v2 ?? siteConfig.testimonials;

  if (items.length === 0) return null;

  return (
    <section className="py-24 md:py-32" style={{ background: "var(--surface, #F9FAFB)" }}>
      <div className="container">
        <p
          className="mb-12 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--ink, #111)", opacity: 0.45, fontFamily: "var(--font-mono, ui-monospace)" }}
        >
          Client voices
        </p>

        <div className="grid divide-x-0 divide-y md:grid-cols-3 md:divide-x md:divide-y-0"
          style={{ borderTop: "1px solid rgba(0,0,0,0.1)", borderBottom: "1px solid rgba(0,0,0,0.1)" }}
        >
          {items.slice(0, 3).map((t, i) => (
            <figure
              key={i}
              className="flex flex-col gap-6 px-0 py-10 md:px-8 md:py-8"
              style={{ borderColor: "rgba(0,0,0,0.08)" }}
            >
              <blockquote
                className="text-xl font-normal leading-relaxed md:text-2xl"
                style={{
                  fontFamily: "var(--font-display, var(--font-heading))",
                  fontStyle: "italic",
                  color: "var(--ink, #111)",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4">
                {"photo_url" in t && t.photo_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.photo_url as string}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                )}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--ink, #111)", fontVariant: "small-caps" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--ink, #111)", opacity: 0.5 }}
                  >
                    {t.role}
                    {t.city ? ` · ${t.city}` : ""}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
