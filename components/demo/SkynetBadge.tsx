"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

const STORAGE_KEY = "skynetlabs-badge-dismissed";

export function SkynetBadge() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={siteConfig.demo_disclosure.fiverr_cta_url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-2 text-xs font-medium shadow-lg backdrop-blur-md transition-all hover:bg-background hover:shadow-xl max-md:bottom-20 max-md:right-4 max-md:scale-90"
          style={{ boxShadow: `0 10px 30px -10px ${siteConfig.theme?.primary ?? "#7A2E2A"}40` }}
        >
          <Sparkles
            className="h-3.5 w-3.5"
            style={{ color: siteConfig.theme?.primary ?? "var(--accent2, #7A2E2A)" }}
            aria-hidden
          />
          <span className="font-heading">Built by SkynetLabs</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismiss}
            className="ml-1 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
