"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { buildFaqJsonLd } from "@/lib/seo";

/**
 * v2 FAQ Accordion — reads config.faqs (array of {q, a}).
 * Falls back to legacy FAQAccordion generic questions if absent.
 * Closed by default. + indicator rotates 45° on open.
 * Injects schema.org FAQPage JSON-LD.
 */

const LEGACY_FAQ = [
  { q: "How fast can you respond?", a: "Standard quotes within 24 hours. Emergencies — same-day or 60-minute on-site response." },
  { q: "Are you licensed and insured?", a: "Yes. Fully licensed in every operating region, plus public liability + workers' comp insurance." },
  { q: "Do you offer free quotes?", a: "Always. No-obligation quotes within 24 hours." },
  { q: "What payment methods do you accept?", a: "All major cards, ACH, financing on jobs over $1,000, and net-30 invoicing for businesses." },
  { q: "Do you offer warranties?", a: "Every job carries a written warranty — 1 year parts + labor. Major installs up to 25 years." },
  {
    q: "What areas do you serve?",
    a: `Primary HQ in ${siteConfig.service_area.primary_city}. Extended service area across ${siteConfig.service_area.service_area_cities.length} cities in the region.`,
  },
  { q: "How do I get started?", a: "Fill in the contact form on this page or call us directly. We respond within 24 hours." },
  { q: "Do you work with commercial clients?", a: "Yes. We serve both residential and commercial clients with dedicated account managers for volume work." },
];

export function FAQv2() {
  const faqs = siteConfig.faqs ?? LEGACY_FAQ;
  const [open, setOpen] = React.useState<number | null>(null);

  const jsonLd = buildFaqJsonLd(faqs);

  return (
    <section className="py-24 md:py-32" style={{ background: "var(--bg, #fff)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--ink, #111)", opacity: 0.45, fontFamily: "var(--font-mono, ui-monospace)" }}
          >
            Frequently asked
          </p>
          <h2
            className="mb-12 text-3xl font-normal md:text-4xl"
            style={{ fontFamily: "var(--font-display, var(--font-heading))", color: "var(--ink, #111)" }}
          >
            Questions before you reach out.
          </h2>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-opacity hover:opacity-70"
                >
                  <span
                    className="text-base font-medium"
                    style={{ color: "var(--ink, #111)", fontFamily: "var(--font-body-v2, var(--font-body))" }}
                  >
                    {f.q}
                  </span>
                  <span
                    className="shrink-0 text-lg transition-transform duration-200"
                    style={{
                      color: "var(--accent2, var(--accent))",
                      transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-5 text-sm leading-relaxed"
                        style={{ color: "var(--ink, #111)", opacity: 0.65 }}
                      >
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
