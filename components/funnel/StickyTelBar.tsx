"use client";
import * as React from "react";
import { Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

/**
 * Sticky mobile call bar — visible after hero scrolls past (IntersectionObserver on #hero-sentinel).
 * Reads config.funnel.sticky_tel and config.copy.sticky_mobile_bar text.
 */
export function StickyTelBar() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // Try IntersectionObserver on hero sentinel element first
    const sentinel = document.getElementById("hero-sentinel");
    if (sentinel && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        ([entry]) => setShow(!entry.isIntersecting),
        { threshold: 0 },
      );
      obs.observe(sentinel);
      return () => obs.disconnect();
    }
    // Fallback: scroll offset
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = siteConfig.funnel?.sticky_tel || siteConfig.owner.contact_phone || "";
  const label = siteConfig.copy?.sticky_mobile_bar ?? `Call ${tel}`;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 grid grid-cols-2 border-t bg-background/95 shadow-2xl backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        borderColor: "rgba(0,0,0,0.1)",
        paddingBottom: "env(safe-area-inset-bottom, 0)",
      }}
    >
      <a
        href={`tel:${tel}`}
        className="flex h-14 items-center justify-center gap-2 border-r text-sm font-semibold"
        style={{ borderColor: "rgba(0,0,0,0.1)", color: "var(--ink, #111)" }}
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>
      <a
        href="#quote"
        className="flex h-14 items-center justify-center gap-1.5 text-sm font-semibold"
        style={{ background: "var(--accent2, var(--accent))", color: "#fff" }}
      >
        {label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
