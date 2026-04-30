"use client";
import * as React from "react";
import { Gift, Mail } from "lucide-react";
import { Dialog, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { siteConfig } from "@/lib/config";

const SESSION_KEY = "skynetlabs-exit-intent-shown";

export function ExitIntentModal() {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 4) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setOpen(true);
        document.removeEventListener("mouseout", handler);
      }
    };

    const t = setTimeout(() => document.addEventListener("mouseout", handler), 8000);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseout", handler);
    };
  }, []);

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
            source: "exit_intent",
            niche: siteConfig.niche,
            city: siteConfig.location.city,
          }),
        });
      } catch {
        // Silent fail; UX still proceeds.
      }
    }
    setSubmitted(true);
  };

  const magnet = siteConfig.funnel?.exit_intent_lead_magnet ?? siteConfig.lead_magnet
    ? { title: siteConfig.lead_magnet?.title ?? "Get our free guide" }
    : null;
  if (!magnet) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="text-center">
        <div
          className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: `${siteConfig.theme?.accent ?? "var(--accent2,#7A2E2A)"}20`, color: siteConfig.theme?.accent ?? "var(--accent2, #7A2E2A)" }}
        >
          <Gift className="h-7 w-7" />
        </div>
        <DialogTitle>Wait — get this free first.</DialogTitle>
        <DialogDescription>{magnet.title}</DialogDescription>

        {submitted ? (
          <div className="mt-6 rounded-lg bg-muted p-4 text-sm">
            ✓ Sent. Check your inbox in the next 60 seconds.
          </div>
        ) : (
          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send me the guide →
            </Button>
            <p className="text-[11px] text-muted-foreground">
              Single email. Unsubscribe any time.
            </p>
          </form>
        )}
      </div>
    </Dialog>
  );
}
