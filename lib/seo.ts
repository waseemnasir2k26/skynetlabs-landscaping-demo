import type { Metadata } from "next";
import { siteConfig } from "./config";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export function buildMetadata(opts: {
  title?: string;
  description?: string;
  path?: string;
  ogTitle?: string;
  ogSubtitle?: string;
}): Metadata {
  const title = opts.title ?? siteConfig.seo.title;
  const description = opts.description ?? siteConfig.seo.description;
  const path = opts.path ?? "/";
  const canonical = `${SITE_URL}${path}`;
  const ogTitle = opts.ogTitle ?? title;
  const ogSubtitle = opts.ogSubtitle ?? siteConfig.brand.tagline;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}`;

  return {
    title,
    description,
    keywords: siteConfig.seo.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical },
    robots: siteConfig.seo.noindex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: siteConfig.brand.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
      type: "website",
      locale: siteConfig.location.country === "UK" ? "en_GB" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    other: {
      "skynetlabs:demo": "true",
      "skynetlabs:niche": siteConfig.niche,
    },
  };
}

export function buildLocalBusinessJsonLd() {
  const allCities = [
    siteConfig.service_area.primary_city,
    ...(siteConfig.service_area.hero_cities ?? []).map((c) => `${c.city}, ${c.region}`),
    ...siteConfig.service_area.service_area_cities,
  ];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brand.name,
    description: siteConfig.brand.tagline,
    url: SITE_URL,
    telephone: siteConfig.owner.contact_phone,
    email: siteConfig.owner.contact_email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    areaServed: allCities.map((city) => ({ "@type": "City", name: city })),
    disambiguatingDescription:
      "Demonstration website. Business depicted is fictional. Built as a portfolio + lead-gen template by SkynetLabs.",
    publisher: {
      "@type": "Organization",
      name: "SkynetLabs",
      url: siteConfig.owner.hub_url,
    },
  };
}

export function buildFaqJsonLd(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export { SITE_URL };
