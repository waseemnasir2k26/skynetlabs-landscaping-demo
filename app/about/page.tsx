import { CTABanner } from "@/components/sections/CTABanner";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { TrustRow } from "@/components/sections/TrustRow";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `About — ${siteConfig.brand.name}`,
  description: `Founded in ${siteConfig.location.city}. ${siteConfig.brand.tagline}`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="container py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">About us</p>
        <h1 className="mt-2 max-w-2xl font-heading text-4xl font-bold md:text-5xl">
          Founded in {siteConfig.location.city}. Trusted across {(siteConfig.service_area.hero_cities?.length ?? 0) + siteConfig.service_area.service_area_cities.length} cities.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {siteConfig.brand.tagline} We do good work, charge fair prices, and stand behind everything we deliver. That's it.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold">Our story</h2>
            <p className="mt-3 text-muted-foreground">
              Started small in {siteConfig.location.city}, grew through referrals, never compromised on quality. Today we're a team of licensed {siteConfig.niche_label.toLowerCase()} professionals serving {siteConfig.service_area.service_area_cities.length} cities across the region.
            </p>
            <p className="mt-3 text-muted-foreground">
              Every job carries a written warranty. Every quote is line-item. Every team member is background-checked and trained. That's the contract.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold">What sets us apart</h2>
            <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-2">
              <li>Licensed, bonded, fully insured in all operating regions</li>
              <li>24-hour quote turnaround, no exceptions</li>
              <li>Transparent line-item pricing — no surprises on invoices</li>
              <li>Photo-documented work + before/after evidence</li>
              <li>Lifetime warranty on premium installations</li>
              <li>Same-day emergency response in hero cities</li>
            </ul>
          </div>
        </div>
      </section>

      <TrustRow />
      <TestimonialCarousel />
      <CTABanner />
    </>
  );
}
