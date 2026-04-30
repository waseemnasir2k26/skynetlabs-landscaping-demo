import { siteConfig } from "@/lib/config";

/**
 * v2 Services — editorial 3-col long-form prose.
 * Reads config.services_v2 (title + blurb). Falls back to config.services (name + description).
 */
export function ServicesEditorial() {
  // v2 services have {title, blurb}; v1 have {name, description, slug, icon}
  const items = siteConfig.services_v2
    ? siteConfig.services_v2.map((s) => ({ title: s.title, blurb: s.blurb, slug: s.slug ?? "" }))
    : siteConfig.services.map((s) => ({ title: s.name, blurb: s.description, slug: s.slug }));

  return (
    <section id="services" className="py-24 md:py-32" style={{ background: "var(--bg, #fff)" }}>
      <div className="container">
        {/* Section header */}
        <div className="mb-16 max-w-xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent2, var(--accent))", fontFamily: "var(--font-mono, ui-monospace)" }}
          >
            Services
          </p>
          <h2
            className="text-4xl font-normal leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display, var(--font-heading))", color: "var(--ink, #111)" }}
          >
            What we do best.
          </h2>
        </div>

        {/* 3-col staggered grid */}
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => (
            <article
              key={service.slug || i}
              className="flex flex-col gap-4"
              style={{ paddingTop: i % 3 === 1 ? "3rem" : "0" }} // stagger middle column
            >
              <h3
                className="text-2xl font-normal md:text-3xl"
                style={{
                  fontFamily: "var(--font-display, var(--font-heading))",
                  color: "var(--ink, #111)",
                  lineHeight: 1.2,
                }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--ink, #111)", opacity: 0.65, maxWidth: "34ch" }}
              >
                {service.blurb}
              </p>
              <a
                href={service.slug ? `/services/${service.slug}` : "#services"}
                className="text-sm font-medium underline underline-offset-4 decoration-1 hover:opacity-60 transition-opacity self-start"
                style={{ color: "var(--ink, #111)", fontStyle: "italic" }}
              >
                Learn more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
