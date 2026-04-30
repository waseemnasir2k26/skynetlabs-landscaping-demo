import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { siteConfig } from "@/lib/config";

type IconKey = keyof typeof Icons;

export function ServicesGrid({ columns = 3 }: { columns?: 2 | 3 }) {
  const cls = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="services" className="container py-20 md:py-28">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Services</p>
        <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
          Everything you need, done right.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Backed by {siteConfig.location.country === "UK" ? "fully accredited" : "fully licensed"}{" "}
          experts. Free, transparent quotes — no surprise charges.
        </p>
      </div>

      <div className={`grid gap-5 ${cls}`}>
        {siteConfig.services.map((s) => {
          const IconCmp = (Icons[s.icon as IconKey] as React.ComponentType<{ className?: string }>) ?? Icons.Sparkles;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg"
                style={{
                  background: `${siteConfig.theme?.primary ?? "var(--accent2, #7A2E2A)"}15`,
                  color: siteConfig.theme?.primary ?? "var(--accent2, #7A2E2A)",
                }}
              >
                <IconCmp className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary">
                Get a quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
