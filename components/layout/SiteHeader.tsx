"use client";
import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const showStickyCta = useTransform(scrollY, [0, 600], [0, 1]);
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: siteConfig.theme?.primary ?? "var(--accent2, #7A2E2A)" }}
            aria-hidden
          />
          {siteConfig.brand.name}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${siteConfig.owner.contact_phone}`}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.owner.contact_phone}
          </a>
          <motion.div style={{ opacity: showStickyCta }}>
            <Button asChild={false} size="sm">
              <a href="#quote">Get Free Quote →</a>
            </Button>
          </motion.div>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-md p-2 hover:bg-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border/40 bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container flex flex-col gap-4 py-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`tel:${siteConfig.owner.contact_phone}`}
            className="flex items-center gap-2 text-base font-medium"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.owner.contact_phone}
          </a>
          <Button asChild={false} size="md" className="mt-2">
            <a href="#quote" onClick={() => setOpen(false)}>
              Get Free Quote →
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
