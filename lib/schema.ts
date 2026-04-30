import { z } from "zod";

export const NICHE_SLUGS = [
  "hvac",
  "plumbing",
  "dental",
  "logistics",
  "medical_clinic",
  "real_estate",
  "restaurant_cafe",
  "gym_fitness",
  "beauty_salon",
  "law_firm",
  "accountant_cpa",
  "roofing",
  "landscaping",
  "pest_control",
  "auto_repair",
  "tutoring",
  "photography",
  "event_venue",
  "moving_company",
  "ecommerce",
] as const;

export const FLAGSHIP_NICHES = [
  "law_firm",
  "dental",
  "real_estate",
  "photography",
  "event_venue",
] as const;

const HEX = /^#[0-9a-fA-F]{6}$/;

export const HeroCitySchema = z.object({
  city: z.string().min(1),
  region: z.string().min(1),
  country: z.string().length(2),
  rationale: z.string().optional(),
});

export const ServiceAreaSchema = z.object({
  primary_city: z.string().min(1),
  hero_cities: z.array(HeroCitySchema).optional(),          // optional in v2 configs
  service_area_cities: z.array(z.string()).min(1),           // v2 has 30, v1 had 25
});

export const Hero3DSchema = z.object({
  variant: z.enum(["r3f-flagship", "mp4-loop"]).optional(),
  // v2 discriminated r3f_scene values
  r3f_scene: z.enum([
    "rotating-mesh", "gradient-shader", "floating-geo",
    "r3f-tooth", "r3f-film-canister", "r3f-marble-column", "r3f-floorplan", "r3f-mansion",
    "cinemagraph", "photo",
  ]).optional(),
  mp4_src: z.string().optional(),
  poster_src: z.string().default("/hero/poster.jpg"),
});

export const FunnelSchema = z.object({
  primary_cta: z.object({
    label: z.string().min(1).max(40),
    action: z.enum(["form", "tel", "calendly"]),
  }),
  secondary_cta: z.object({
    label: z.string().min(1).max(40),
    action: z.enum(["form", "tel", "calendly"]),
  }),
  sticky_tel: z.string().min(1),
  exit_intent_lead_magnet: z
    .object({
      title: z.string().min(1),
      pdf_url: z.string().optional(),
    })
    .optional(),
});

// v1 service shape — all required fields made optional so v2 configs (title+blurb) pass
export const ServiceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  name: z.string().min(1).max(80).optional(),
  description: z.string().min(1).max(400).optional(),
  icon: z.string().min(1).optional(),
  price_from: z.string().optional(),
  // v2 fields accepted directly in v1 array position
  title: z.string().min(1).max(120).optional(),
  blurb: z.string().min(1).optional(),
});

export const TestimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  quote: z.string().min(10).max(400),
  city: z.string().optional(),
  avatar_url: z.string().optional(),
});

// ── v2 sub-schemas ────────────────────────────────────────────────────────────

export const PaletteV2Schema = z.object({
  bg: z.string().regex(HEX),
  surface: z.string().regex(HEX),
  ink: z.string().regex(HEX),
  accent: z.string().regex(HEX),
  detail: z.string().regex(HEX),
});

export const FontsV2Schema = z.object({
  display: z.string(),
  body: z.string(),
  mono: z.string().nullable().optional(),  // v2 configs send null explicitly
});

export const TrustStripItemSchema = z.string().min(1).max(120);

export const ServiceV2Schema = z.object({
  title: z.string().min(1).max(80),
  blurb: z.string().min(1).max(400),
  slug: z.string().optional(),
});

export const TestimonialV2Schema = z.object({
  quote: z.string().min(10).max(400),
  name: z.string().min(1),
  role: z.string().min(1),
  city: z.string(),
  photo_url: z.string().optional(),
});

export const FAQItemSchema = z.object({ q: z.string().min(1), a: z.string().min(1) });

export const CaseStudySchema = z.object({
  photo_url: z.string(),
  quote: z.string().min(1),
  stats: z.array(z.object({ value: z.string(), label: z.string() })).length(3),
}).optional();

export const LeadMagnetV2Schema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  cta: z.string().min(1),
}).optional();

export const PhotosV2Schema = z.object({
  hero: z.string(),
  gallery: z.array(z.string()),
}).optional();

// ── original schema + v2 optional fields ──────────────────────────────────────

export const SiteConfigSchema = z.object({
  brand: z.object({
    name: z.string().min(1).max(60),
    tagline: z.string().min(1).max(120),
    logo: z.string().optional(),
  }),
  niche: z.string().min(1),
  niche_label: z.string().min(1),
  location: z.object({
    city: z.string().min(1),
    region: z.string().min(1),
    country: z.string().length(2),
  }),
  owner: z.object({
    name: z.string().default("Waseem Nasir"),
    agency: z.string().default("SkynetLabs"),
    fiverr_url: z.string().url(),
    hub_url: z.string().url(),
    contact_email: z.string().email(),
    contact_phone: z.string().optional(),
  }),
  // v1 theme — optional in v2 configs (palette replaces it)
  theme: z.object({
    primary: z.string().regex(HEX),
    secondary: z.string().regex(HEX),
    accent: z.string().regex(HEX),
    mode: z.enum(["light", "dark", "auto"]).default("auto"),
    font_heading: z.string().default("Playfair Display"),
    font_body: z.string().default("Inter"),
  }).optional(),
  // v1 hero flat object — optional in v2 configs (hero is a different shape)
  hero: z.object({
    headline: z.string().min(1).max(160).optional(),
    sub: z.string().min(1).max(280).optional(),
    image_url: z.string().min(1).optional(),
    cta_primary: z.object({ label: z.string().min(1).max(40), href: z.string().min(1) }).optional(),
    cta_secondary: z
      .object({ label: z.string().min(1).max(40), href: z.string().min(1) })
      .optional(),
    // v2 hero fields (discriminated union stored flat in v2 configs)
    kind: z.enum(["photo", "cinemagraph", "r3f"]).optional(),
    src: z.string().optional(),
    overlay: z.string().optional(),
    focalPoint: z.string().optional(),
    poster: z.string().optional(),
    h1: z.string().optional(),
  }).optional(),
  hero_3d: Hero3DSchema.nullable().optional(),
  funnel: FunnelSchema.optional(),
  service_area: ServiceAreaSchema,
  services: z.array(ServiceSchema).min(1).max(12),
  testimonials: z.array(TestimonialSchema).max(12).default([]),
  modules: z.object({
    booking_calendar: z.boolean().default(false),
    menu: z.boolean().default(false),
    service_area_map: z.boolean().default(true),
    product_grid: z.boolean().default(false),
    photo_gallery: z.boolean().default(true),
    faq: z.boolean().default(true),
    lead_magnet: z.boolean().default(true).optional(),
  }).optional(),
  contact: z.object({
    form_endpoint: z.string().url().optional(),
    calendly_url: z.string().url().optional(),
  }),
  seo: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(400),
    keywords: z.array(z.string()).max(40).default([]),
    noindex: z.boolean().default(true),
  }),
  demo_disclosure: z.object({
    enabled: z.boolean().default(true),
    fiverr_cta_url: z.string().url(),
    contact_cta_url: z.string().url(),
    portfolio_url: z.string().url(),
  }),
  // ── v2 optional fields (additive — existing configs remain valid) ──────────
  palette: PaletteV2Schema.optional(),
  fonts: FontsV2Schema.optional(),
  trust_strip: z.array(TrustStripItemSchema).min(3).max(10).optional(),
  services_v2: z.array(ServiceV2Schema).min(1).max(12).optional(),
  testimonials_v2: z.array(TestimonialV2Schema).min(1).max(12).optional(),
  faqs: z.array(FAQItemSchema).min(1).max(20).optional(),
  // v2 process steps
  process: z.array(z.object({
    n: z.number(),
    title: z.string().min(1),
    blurb: z.string().min(1),
  })).min(1).max(8).optional(),
  // v2 dark_mode flag
  dark_mode: z.boolean().optional(),
  case_study: CaseStudySchema,
  lead_magnet: LeadMagnetV2Schema,
  photos: PhotosV2Schema,
  copy: z.object({
    h1: z.string().optional(),
    sub: z.string().optional(),
    primary_cta: z.string().optional(),
    sticky_mobile_bar: z.string().optional(),
  }).optional(),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type NicheSlug = (typeof NICHE_SLUGS)[number];
