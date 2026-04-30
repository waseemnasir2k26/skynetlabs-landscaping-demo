import Link from "next/link";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function ServiceAreaWidget() {
  const { service_area } = siteConfig;
  // v1 configs have hero_cities; v2 configs use service_area_cities only
  const heroCitySlugs = (service_area.hero_cities ?? []).map((c) => ({
    label: `${c.city}, ${c.region}`,
    slug: c.city.toLowerCase().replace(/\s+/g, "-"),
  }));
  const hasUK = (service_area.hero_cities ?? []).some((c) => c.country === "UK");
  const totalCities = service_area.service_area_cities.length
    + (service_area.hero_cities?.length ?? 0);

  return (
    <section
      id="service-area"
      className="py-20 md:py-24"
      style={{
        background: "var(--surface, #F9FAFB)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--ink, #111)", opacity: 0.45, fontFamily: "var(--font-mono, ui-monospace)" }}
            >
              Service Area
            </p>
            <h2
              className="text-3xl font-normal md:text-4xl"
              style={{ fontFamily: "var(--font-display, var(--font-heading))", color: "var(--ink, #111)" }}
            >
              Serving {totalCities}+ cities{hasUK ? " across the US & UK" : ""}.
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--ink, #111)", opacity: 0.6 }}>
              From{" "}
              <strong style={{ opacity: 1 }}>{service_area.primary_city}</strong> outward —
              local response, local accountability.
            </p>
            <div
              className="mt-6 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm"
              style={{ borderColor: "rgba(0,0,0,0.12)", color: "var(--ink, #111)" }}
            >
              <MapPin className="h-4 w-4" style={{ color: "var(--accent2, #7A2E2A)" }} />
              <span className="font-medium">{service_area.primary_city}</span>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            {heroCitySlugs.length > 0 && (
              <>
                <div
                  className="mb-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--ink, #111)", opacity: 0.4, fontFamily: "var(--font-mono, ui-monospace)" }}
                >
                  Hero Cities — Full Coverage
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {heroCitySlugs.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/locations/${c.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all hover:opacity-70"
                      style={{ borderColor: "var(--accent2, #7A2E2A)", color: "var(--accent2, #7A2E2A)" }}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {c.label}
                    </Link>
                  ))}
                </div>
              </>
            )}

            <div
              className="mb-3 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--ink, #111)", opacity: 0.4, fontFamily: "var(--font-mono, ui-monospace)" }}
            >
              Also Serving · {service_area.service_area_cities.length} Cities
            </div>
            <div className="flex flex-wrap gap-1.5">
              {service_area.service_area_cities.map((c) => (
                <span
                  key={c}
                  className="inline-block rounded-full border px-3 py-1 text-xs"
                  style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink, #111)", opacity: 0.65 }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
