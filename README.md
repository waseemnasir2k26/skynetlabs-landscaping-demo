# SkynetLabs Garden Design Demo — Cinematic Landscaping + Garden Design Demo

> One of 20 cinematic niche demos by [SkynetLabs](https://skynetjoe.com).
> **Live demo:** https://skynetlabs-landscaping-demo.vercel.app
> **Fork to use:** MIT licensed. Clone, replace `site.config.json`, deploy.

## What this is

A premium, conversion-first marketing site template built with Next.js 14 + React Three Fiber + Tailwind. Showcases the Landscaping + Garden Design vertical with a cinematic 3D hero, dual primary/secondary CTAs, sticky tel bar, exit-intent capture, and a 30-city service-area widget for local SEO breadth.

The business depicted is fictional. This is a portfolio + lead-gen demo for [SkynetLabs](https://www.fiverr.com/agencies/skynetjoellc) agency work.

## Stack

- Next.js 14.2.15 (App Router) + React 18.3.1 + TypeScript 5.5
- Tailwind CSS 3.4 + tailwindcss-animate
- React Three Fiber + drei (3D hero on flagship niches)
- Framer Motion (UI motion)
- Zod (config validation at build time)
- Web3Forms (contact form) + Calendly (booking)
- @vercel/og (dynamic OG images)

## Features

- ✓ Cinematic 3D hero (R3F flagship) or pre-rendered MP4 loop (standard)
- ✓ Dual above-fold CTA — `Get Free Quote →` + `Call Now`
- ✓ Sticky mobile tel bar (always visible)
- ✓ Exit-intent lead-magnet modal (desktop, 1×/session)
- ✓ 30-city service-area widget + JSON-LD `areaServed`
- ✓ 5 hero location pages with deep unique copy
- ✓ Lighthouse mobile Perf ≥ 90 (≥ 85 on flagship R3F)
- ✓ Sticky `Built by SkynetLabs ↗` corner badge
- ✓ Full SEO — JSON-LD `LocalBusiness` schema, sitemap, robots, OG images
- ✓ `/about-this-demo` legal disclosure (always indexable)
- ✓ Demo `noindex,nofollow` for first 90 days

## Fork to use

```bash
git clone https://github.com/waseemnasir2k26/skynetlabs-landscaping-demo my-Landscaping + Garden Design-site
cd my-Landscaping + Garden Design-site
pnpm install
# Edit site.config.json with your business details
pnpm dev
```

Replace these in `site.config.json`:
- `brand` — your business name + tagline
- `location` — your primary city / state
- `owner` — your contact info, phone, email
- `theme` — your brand colors (hex)
- `services` — your services + descriptions
- `service_area` — your hero cities + service-area cities
- `contact.form_endpoint` — your Web3Forms / Formspree endpoint
- `contact.calendly_url` — your booking URL

Deploy to Vercel:
```bash
vercel --prod
```

## License

MIT. Fork freely.

## Built by

[Waseem Nasir](https://skynetjoe.com) — SkynetLabs · [Fiverr](https://www.fiverr.com/agencies/skynetjoellc) · [GitHub](https://github.com/waseemnasir2k26)
