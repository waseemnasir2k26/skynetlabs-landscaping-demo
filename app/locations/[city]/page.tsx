import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type Props = { params: { city: string } };

export function generateStaticParams() {
  return (siteConfig.service_area.hero_cities ?? []).map((c) => ({
    city: c.city.toLowerCase().replace(/\s+/g, "-"),
  }));
}

function findCity(slug: string) {
  return (siteConfig.service_area.hero_cities ?? []).find(
    (c) => c.city.toLowerCase().replace(/\s+/g, "-") === slug,
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const c = findCity(params.city);
  if (!c) return {};
  return buildMetadata({
    title: `${siteConfig.niche_label} ${c.city}, ${c.region} | ${siteConfig.brand.name}`,
    description: `${siteConfig.brand.tagline} Trusted ${siteConfig.niche_label.toLowerCase()} pros in ${c.city}. Free quote within 24 hours.`,
    path: `/locations/${params.city}`,
    ogTitle: `${siteConfig.niche_label} ${c.city}`,
    ogSubtitle: c.rationale ?? siteConfig.brand.tagline,
  });
}

export default function LocationPage({ params }: Props) {
  const c = findCity(params.city);
  if (!c) notFound();

  return (
    <>
      <section className="container py-16 md:py-24">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Home
        </Link>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <MapPin className="h-3.5 w-3.5" />
          {c.city}, {c.region}
        </div>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold md:text-5xl">
          {siteConfig.niche_label} services in {c.city}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Trusted {siteConfig.niche_label.toLowerCase()} provider serving {c.city}, {c.region} —
          plus the surrounding metro. Local response, local accountability, transparent pricing.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild={false} size="lg">
            <a href="#quote">
              Free {c.city} quote <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild={false} size="lg" variant="outline">
            <a href={`tel:${siteConfig.owner.contact_phone}`}>
              Call {siteConfig.owner.contact_phone}
            </a>
          </Button>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Why {c.city} chooses us.
            </h2>
            <p className="mt-4 text-muted-foreground">{c.rationale ?? siteConfig.brand.tagline}</p>
            <ul className="mt-6 space-y-3">
              {[
                `Licensed in ${c.region}`,
                `Local technicians based in ${c.city}`,
                "60-minute response on emergencies",
                "Free transparent quotes — line-item, no surprises",
                "5-star average across hundreds of reviews",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-background p-6">
            <h3 className="font-heading text-xl font-semibold">{c.city} coverage details</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              We serve {c.city} from our nearest depot — including all neighborhoods, suburbs, and surrounding metro areas. Same-day appointments available.
            </p>
            <p className="mt-4 text-sm">
              <strong className="text-foreground">Operating hours:</strong> 7am–9pm weekdays, 8am–6pm weekends. 24/7 emergency response.
            </p>
            <p className="mt-2 text-sm">
              <strong className="text-foreground">Service radius:</strong> ~50 miles around {c.city}.
            </p>
          </div>
        </div>
      </section>

      <ServicesGrid />
      <TestimonialCarousel />
      <CTABanner />
    </>
  );
}
