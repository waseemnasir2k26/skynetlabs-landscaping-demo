import { DemoDisclosureCard } from "@/components/demo/DemoDisclosureCard";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: `About this demo — ${siteConfig.brand.name}`,
  description: `Demonstration website. Business depicted is fictional. Built by SkynetLabs as a portfolio + forkable starter for ${siteConfig.niche_label.toLowerCase()} businesses.`,
  alternates: { canonical: `${SITE_URL}/about-this-demo` },
  robots: { index: true, follow: true },
};

const REAL_VS_FICTIONAL = [
  ["Design + UI", true, false],
  ["Code (Next.js, R3F, Tailwind)", true, false],
  ["Architecture + funnel logic", true, false],
  ["Business name", false, true],
  ["Phone number + address", false, true],
  ["Reviews / testimonials", false, true],
  ["Photos (placeholder stock)", false, true],
] as const;

export default function AboutThisDemoPage() {
  return (
    <section className="container py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Disclosure</p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl font-bold md:text-5xl">
        About this demo site
      </h1>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6 text-base text-foreground/90">
          <p>
            This is a <strong>demonstration website</strong> by SkynetLabs / Waseem Nasir — one of 20 cinematic niche-vertical templates built as a public portfolio + forkable open-source starter.
          </p>
          <p>
            <strong>The business depicted on this site is fictional.</strong> The brand name, address, phone number, and customer reviews are all illustrative — designed to showcase how a real {siteConfig.niche_label.toLowerCase()} business could present itself online.
          </p>
          <p>
            What's <strong>real</strong>: the design, the code (Next.js 14, React Three Fiber, Tailwind, Framer Motion), the conversion-funnel architecture, the SEO + JSON-LD wiring, and the build pipeline.
          </p>
          <p>
            What's <strong>fictional</strong>: the business identity, contact details, photos, and reviews.
          </p>

          <h2 className="font-heading text-2xl font-bold">Real vs fictional</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Element</th>
                  <th className="px-4 py-3 text-left font-semibold">Real</th>
                  <th className="px-4 py-3 text-left font-semibold">Fictional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {REAL_VS_FICTIONAL.map(([label, isReal, isFiction]) => (
                  <tr key={label}>
                    <td className="px-4 py-3">{label}</td>
                    <td className="px-4 py-3 text-primary">{isReal ? "✓" : ""}</td>
                    <td className="px-4 py-3 text-muted-foreground">{isFiction ? "✓" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-heading text-2xl font-bold">Why this exists</h2>
          <p>
            Two reasons. First, it's a portfolio — you can see SkynetLabs design + build chops without us pitching you. Second, it's open source under MIT — you can fork the GitHub repo, swap the config, and ship your own {siteConfig.niche_label.toLowerCase()} business site in an afternoon.
          </p>

          <h2 className="font-heading text-2xl font-bold">License</h2>
          <p>
            <strong>MIT.</strong> Fork freely. Attribution appreciated but not required.
          </p>
        </div>

        <aside>
          <DemoDisclosureCard />
        </aside>
      </div>
    </section>
  );
}
