import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return siteConfig.services.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = siteConfig.services.find((s) => s.slug === params.slug);
  if (!service) return {};
  const title = service.name ?? service.title ?? params.slug;
  const description = service.description ?? service.blurb ?? siteConfig.brand.tagline;
  return buildMetadata({
    title: `${title} in ${siteConfig.location.city} | ${siteConfig.brand.name}`,
    description,
    path: `/services/${params.slug}`,
    ogTitle: title,
    ogSubtitle: `${siteConfig.location.city} · Free quote within 24 hours`,
  });
}

export default function ServicePage({ params }: Props) {
  const service = siteConfig.services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const serviceTitle = service.name ?? service.title ?? params.slug;
  const serviceDescription = service.description ?? service.blurb ?? siteConfig.brand.tagline;

  const benefits = [
    "Licensed & fully insured pros",
    "Transparent line-item quotes",
    "Free 24-hour estimate",
    "Written workmanship warranty",
    "Same-day emergency response available",
  ];

  return (
    <>
      <section className="container py-16 md:py-24">
        <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">
          ← All services
        </Link>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold md:text-5xl">
          {serviceTitle} in {siteConfig.location.city}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{serviceDescription}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild={false} size="lg">
            <a href="#quote">
              Get a free quote <ArrowRight className="h-5 w-5" />
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
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Why {siteConfig.location.city} chooses us for {serviceTitle.toLowerCase()}.
            </h2>
            <ul className="mt-6 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-base">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold">Service area</h3>
            <p className="mt-2 text-muted-foreground">
              Primary HQ: {siteConfig.service_area.primary_city}. Hero coverage in:
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {(siteConfig.service_area.hero_cities ?? []).map((c) => (
                <li key={`${c.city}-${c.region}`}>
                  <Link
                    href={`/locations/${c.city.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-primary hover:underline"
                  >
                    {serviceTitle} {c.city} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TestimonialCarousel />
      <CTABanner />
    </>
  );
}
