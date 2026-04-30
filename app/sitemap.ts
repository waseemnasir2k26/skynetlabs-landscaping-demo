import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/services", "/about", "/contact", "/about-this-demo"];
  const servicePaths = siteConfig.services.map((s) => s.slug ? `/services/${s.slug}` : null).filter(Boolean) as string[];
  const locationPaths = (siteConfig.service_area.hero_cities ?? []).map(
    (c) => `/locations/${c.city.toLowerCase().replace(/\s+/g, "-")}`,
  );

  return [...staticPaths, ...servicePaths, ...locationPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : path.startsWith("/locations") ? 0.8 : 0.7,
  }));
}
