"use client";
import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { siteConfig } from "@/lib/config";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = React.useState<"idle" | "sending" | "ok" | "err">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const endpoint = siteConfig.contact.form_endpoint;

    if (!endpoint) {
      const params = new URLSearchParams();
      formData.forEach((v, k) => params.append(k, String(v)));
      window.location.href = `mailto:${siteConfig.owner.contact_email}?subject=Quote%20Request&body=${encodeURIComponent(params.toString())}`;
      setStatus("ok");
      return;
    }

    try {
      const payload: Record<string, unknown> = {};
      formData.forEach((v, k) => (payload[k] = v));
      payload.source = "contact_form";
      payload.niche = siteConfig.niche;
      payload.city = siteConfig.location.city;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  };

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <h3 className="font-heading text-xl font-semibold">Quote request received ✓</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We respond within 24 hours. For urgent matters, call {siteConfig.owner.contact_phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "grid gap-4 md:grid-cols-2"}>
      <Input name="name" required placeholder="Full name" />
      <Input name="email" type="email" required placeholder="Email address" />
      <Input name="phone" type="tel" placeholder="Phone number" />
      <Input name="city" placeholder="Your city" defaultValue={siteConfig.location.city} />
      <select
        name="service"
        className="md:col-span-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">Select a service</option>
        {siteConfig.services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.name}
          </option>
        ))}
      </select>
      <Textarea
        name="message"
        placeholder="Tell us what you need..."
        className="md:col-span-2"
        rows={4}
      />
      <Button
        type="submit"
        size="lg"
        className="md:col-span-2"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : (
          <>
            Get my free quote <Send className="h-4 w-4" />
          </>
        )}
      </Button>
      {status === "err" && (
        <p className="md:col-span-2 text-sm text-destructive">
          Something went wrong. Please email {siteConfig.owner.contact_email} directly.
        </p>
      )}
    </form>
  );
}
