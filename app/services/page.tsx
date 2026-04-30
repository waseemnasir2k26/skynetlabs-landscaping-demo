import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata = buildMetadata({
  title: `Services — ${siteConfig.brand.name}`,
  description: `Full ${siteConfig.niche_label.toLowerCase()} services serving ${siteConfig.location.city} and 30+ cities. Free quotes within 24 hours.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="container py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Services</p>
        <h1 className="mt-2 max-w-2xl font-heading text-4xl font-bold md:text-5xl">
          Complete {siteConfig.niche_label} services in {siteConfig.location.city}.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {siteConfig.brand.tagline} — every service backed by a written warranty and a 24-hour quote turnaround.
        </p>
      </section>
      <ServicesGrid columns={3} />
      <CTABanner />
    </>
  );
}
