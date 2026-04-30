"use client";
import * as React from "react";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { siteConfig } from "@/lib/config";

export function LeadMagnetBlock() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const magnet = siteConfig.funnel?.exit_intent_lead_magnet ?? siteConfig.lead_magnet;
  if (!magnet) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = siteConfig.contact.form_endpoint;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            email,
            source: "lead_magnet_block",
            niche: siteConfig.niche,
            city: siteConfig.location.city,
          }),
        });
      } catch {
        /* ignore */
      }
    }
    setSubmitted(true);
  };

  return (
    <section className="container py-20 md:py-24">
      <div
        className="overflow-hidden rounded-3xl p-10 md:p-16"
        style={{
          background: `linear-gradient(135deg, ${siteConfig.theme?.primary ?? siteConfig.palette?.accent ?? "#7A2E2A"} 0%, ${siteConfig.theme?.accent ?? siteConfig.palette?.detail ?? "#C8A35B"} 100%)`,
          color: "white",
        }}
      >
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <Download className="h-3.5 w-3.5" />
              Free Download
            </div>
            <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
              {magnet.title}
            </h2>
            <p className="mt-4 max-w-md text-base text-white/80">
              Practical, no-fluff guide — written by our {siteConfig.location.city} team.
              Single email, unsubscribe anytime.
            </p>
          </div>

          <div>
            {submitted ? (
              <div className="rounded-xl bg-white/15 p-6 backdrop-blur">
                <p className="font-heading text-xl font-semibold">✓ Check your inbox</p>
                <p className="mt-2 text-sm text-white/80">
                  Delivered within 60 seconds. Mark as not-spam if it lands in promotions.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-3 rounded-xl bg-white/15 p-5 backdrop-blur sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-white/70" />
                  <Input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/30 bg-white/10 pl-10 text-white placeholder:text-white/60"
                  />
                </div>
                <Button type="submit" size="lg" variant="secondary">
                  Get the guide →
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
