"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { buildFaqJsonLd } from "@/lib/seo";

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "How fast can you respond?",
    a: "Standard quotes within 24 hours. Emergencies — same-day or 60-minute on-site response, depending on service area.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Fully licensed in every operating region, plus public liability + workers' comp insurance. Documentation provided on request.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Always. No-obligation quotes within 24 hours. We'll never pressure you into committing — pick us when you're ready.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major cards, ACH, financing on jobs over $1,000 (0% APR for qualified buyers), and net-30 invoicing for businesses.",
  },
  {
    q: "Do you offer warranties?",
    a: "Every job carries a written warranty. Standard work — 1 year parts + labor. Major installs — up to 25 years on premium products.",
  },
  {
    q: "What areas do you serve?",
    a: `Primary HQ in ${siteConfig.service_area.primary_city}. Extended service area across ${siteConfig.service_area.service_area_cities.length} cities in the region.`,
  },
];

export function FAQAccordion() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section className="container py-20 md:py-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(FAQ)) }}
      />
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">
          Common questions
        </p>
        <h2 className="mt-2 text-center font-heading text-3xl font-bold md:text-4xl">
          Anything you want to ask before getting a quote.
        </h2>

        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card">
          {FAQ.map((f, i) => (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/50"
                aria-expanded={open === i}
              >
                <span className="font-heading text-base font-semibold">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                />
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
                    <div className="px-6 pb-6 text-sm text-muted-foreground">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
