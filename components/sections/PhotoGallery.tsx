"use client";
import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

const PLACEHOLDERS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/gallery/0${n}.jpg`);

export function PhotoGallery() {
  // v2: use config.photos.gallery if present, else fall back to local placeholders
  const photos = siteConfig.photos?.gallery ?? PLACEHOLDERS;

  return (
    <section className="container py-20 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Recent Work
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
            See what we deliver in {siteConfig.location.city}.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {photos.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative aspect-square overflow-hidden rounded-lg bg-muted"
          >
            <Image
              src={src}
              alt={`${siteConfig.niche_label} project ${i + 1} in ${siteConfig.location.city}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
