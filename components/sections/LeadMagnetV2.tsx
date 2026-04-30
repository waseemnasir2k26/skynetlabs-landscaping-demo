"use client";
import * as React from "react";
import { siteConfig } from "@/lib/config";

/**
 * v2 Lead Magnet — reads config.lead_magnet ({title, subtitle, cta}).
 * Falls back to legacy config.funnel.exit_intent_lead_magnet.
 * Inline email-only form → POST to Web3Forms. Success state inline.
 */
export function LeadMagnetV2() {
  const lm = siteConfig.lead_magnet
    ?? (siteConfig.funnel?.exit_intent_lead_magnet
      ? {
          title: siteConfig.funnel.exit_intent_lead_magnet.title,
          subtitle: `Practical advice from our ${siteConfig.location.city} team. One email, unsubscribe anytime.`,
          cta: "Send me the guide →",
        }
      : null);

  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  if (!lm) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = siteConfig.contact.form_endpoint;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            email,
            source: "lead_magnet_v2",
            niche: siteConfig.niche,
            city: siteConfig.location.city,
          }),
        });
      } catch {
        /* non-blocking */
      }
    }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "var(--surface, #F9FAFB)" }}
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="mb-4 text-3xl font-normal md:text-4xl"
            style={{ fontFamily: "var(--font-display, var(--font-heading))", color: "var(--ink, #111)", fontStyle: "italic" }}
          >
            {lm.title}
          </h2>
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "var(--ink, #111)", opacity: 0.6 }}
          >
            {lm.subtitle}
          </p>

          {submitted ? (
            <p
              className="text-base font-medium"
              style={{ color: "var(--accent2, #3D5A3A)" }}
            >
              ✓ Check your inbox — delivered within 60 seconds.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-none border-b px-0 py-2 text-sm outline-none sm:w-72"
                style={{
                  borderColor: "rgba(0,0,0,0.2)",
                  background: "transparent",
                  color: "var(--ink, #111)",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 rounded-full border px-6 py-2.5 text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
                style={{
                  borderColor: "var(--ink, #111)",
                  color: "var(--ink, #111)",
                  background: "transparent",
                  fontStyle: "italic",
                }}
              >
                {loading ? "Sending…" : lm.cta}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
