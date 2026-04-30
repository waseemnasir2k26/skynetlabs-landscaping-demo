import config from "@/site.config.json";
import { SiteConfigSchema, type SiteConfig } from "./schema";

const result = SiteConfigSchema.safeParse(config);

if (!result.success) {
  // eslint-disable-next-line no-console
  console.error("[site.config.json] validation failed:");
  // eslint-disable-next-line no-console
  console.error(JSON.stringify(result.error.format(), null, 2));
  throw new Error("Invalid site.config.json — see errors above.");
}

export const siteConfig: SiteConfig = result.data;
