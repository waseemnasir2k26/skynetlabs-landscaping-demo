"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function TestimonialCarousel() {
  const items = siteConfig.testimonials;
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return null;
  const t = items[idx];

  return (
    <section className="bg-muted/30 py-20 md:py-24">
      <div className="container">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">
          What clients say
        </p>
        <div className="mx-auto mt-10 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-5 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                ))}
              </div>
              <blockquote className="font-heading text-2xl font-medium md:text-3xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <strong className="text-foreground">{t.name}</strong>{" "}
                <span className="text-muted-foreground">— {t.role}{t.city ? `, ${t.city}` : ""}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
                className="rounded-full border border-border bg-background p-2 hover:bg-muted"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => setIdx((i) => (i + 1) % items.length)}
                className="rounded-full border border-border bg-background p-2 hover:bg-muted"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
