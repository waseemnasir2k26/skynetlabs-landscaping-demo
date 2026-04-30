import type { Metadata, Viewport } from "next";
import {
  Inter,
  Playfair_Display,
  Lora,
  Montserrat,
  Poppins,
  Manrope,
  Space_Grotesk,
  DM_Sans,
  // v2 additions
  Instrument_Serif,
  Cormorant_Garamond,
  Fraunces,
  Source_Serif_4,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  JetBrains_Mono,
} from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkynetBadge } from "@/components/demo/SkynetBadge";
import { StickyTelBar } from "@/components/funnel/StickyTelBar";
import { ExitIntentModal } from "@/components/funnel/ExitIntentModal";
import { siteConfig } from "@/lib/config";
import { hexToHsl } from "@/lib/theme";
import { buildLocalBusinessJsonLd, buildMetadata } from "@/lib/seo";
import "./globals.css";

// ── Legacy fonts (preserved) ──────────────────────────────────────────────────
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

// ── v2 fonts ──────────────────────────────────────────────────────────────────
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-source-serif-4",
  display: "swap",
});
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// ── Font registry ─────────────────────────────────────────────────────────────
const FONT_REGISTRY: Record<string, { variable: string; cssVar: string }> = {
  // legacy
  Inter: { variable: inter.variable, cssVar: "--font-inter" },
  "Playfair Display": { variable: playfair.variable, cssVar: "--font-playfair" },
  Lora: { variable: lora.variable, cssVar: "--font-lora" },
  Montserrat: { variable: montserrat.variable, cssVar: "--font-montserrat" },
  Poppins: { variable: poppins.variable, cssVar: "--font-poppins" },
  Manrope: { variable: manrope.variable, cssVar: "--font-manrope" },
  "Space Grotesk": { variable: spaceGrotesk.variable, cssVar: "--font-space-grotesk" },
  "DM Sans": { variable: dmSans.variable, cssVar: "--font-dm-sans" },
  // v2
  "Instrument Serif": { variable: instrumentSerif.variable, cssVar: "--font-instrument-serif" },
  "Cormorant Garamond": { variable: cormorant.variable, cssVar: "--font-cormorant" },
  Fraunces: { variable: fraunces.variable, cssVar: "--font-fraunces" },
  "Source Serif 4": { variable: sourceSerif4.variable, cssVar: "--font-source-serif-4" },
  // fallback aliases — premium fonts map to open-source equivalents
  "GT Sectra": { variable: cormorant.variable, cssVar: "--font-cormorant" },
  "Lyon Display": { variable: cormorant.variable, cssVar: "--font-cormorant" },
  "Reckless Neue": { variable: cormorant.variable, cssVar: "--font-cormorant" },
  Canela: { variable: cormorant.variable, cssVar: "--font-cormorant" },
  "Caslon Doric": { variable: cormorant.variable, cssVar: "--font-cormorant" },
  "GT America Mono": { variable: jetbrainsMono.variable, cssVar: "--font-jetbrains-mono" },
  Söhne: { variable: inter.variable, cssVar: "--font-inter" },
  "Söhne Breit": { variable: spaceGrotesk.variable, cssVar: "--font-space-grotesk" },
  Geist: { variable: inter.variable, cssVar: "--font-inter" },
  "IBM Plex Sans": { variable: ibmPlexSans.variable, cssVar: "--font-ibm-plex-sans" },
  "IBM Plex Mono": { variable: ibmPlexMono.variable, cssVar: "--font-ibm-plex-mono" },
  "JetBrains Mono": { variable: jetbrainsMono.variable, cssVar: "--font-jetbrains-mono" },
  "Inter Tight": { variable: inter.variable, cssVar: "--font-inter" },
  Tiempos: { variable: sourceSerif4.variable, cssVar: "--font-source-serif-4" },
  "Tiempos Text": { variable: sourceSerif4.variable, cssVar: "--font-source-serif-4" },
};

const ALL_FONT_VARS = [
  inter.variable,
  playfair.variable,
  lora.variable,
  montserrat.variable,
  poppins.variable,
  manrope.variable,
  spaceGrotesk.variable,
  dmSans.variable,
  instrumentSerif.variable,
  cormorant.variable,
  fraunces.variable,
  sourceSerif4.variable,
  ibmPlexSans.variable,
  ibmPlexMono.variable,
  jetbrainsMono.variable,
].join(" ");

export const metadata: Metadata = buildMetadata({});

export const viewport: Viewport = {
  themeColor: siteConfig.theme?.primary ?? siteConfig.palette?.accent ?? "#7A2E2A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // v1: use theme.font_heading/font_body; v2: those fields are absent
  const legacyHeadingFont = siteConfig.theme?.font_heading ?? "Instrument Serif";
  const legacyBodyFont = siteConfig.theme?.font_body ?? "Inter";
  const headingEntry = FONT_REGISTRY[legacyHeadingFont] ?? FONT_REGISTRY.Inter;
  const bodyEntry = FONT_REGISTRY[legacyBodyFont] ?? FONT_REGISTRY.Inter;

  // v2: resolve display + body from fonts.display / fonts.body if present
  const v2Fonts = siteConfig.fonts;
  const displayEntry = v2Fonts
    ? (FONT_REGISTRY[v2Fonts.display] ?? FONT_REGISTRY.Inter)
    : headingEntry;
  const bodyV2Entry = v2Fonts
    ? (FONT_REGISTRY[v2Fonts.body] ?? FONT_REGISTRY.Inter)
    : bodyEntry;
  // mono: v2 configs send null explicitly; fall back to JetBrains Mono
  const monoEntry = (v2Fonts?.mono && v2Fonts.mono !== null)
    ? (FONT_REGISTRY[v2Fonts.mono] ?? FONT_REGISTRY["JetBrains Mono"])
    : FONT_REGISTRY["JetBrains Mono"];

  // v1 theme mode (optional in v2)
  const themeMode = siteConfig.theme?.mode === "auto" ? "system" : (siteConfig.theme?.mode ?? "light");
  const enableSystem = siteConfig.theme?.mode === "auto";

  // v2 palette — use config.palette if present, else fallback to legacy theme colors
  const p = siteConfig.palette;
  const legacyBg = "#FFFFFF";
  const legacySurface = "#F9FAFB";
  const legacyInk = "#111827";

  const paletteVars = p
    ? `
  --bg: ${p.bg};
  --surface: ${p.surface};
  --ink: ${p.ink};
  --accent2: ${p.accent};
  --detail: ${p.detail};`
    : `
  --bg: ${legacyBg};
  --surface: ${legacySurface};
  --ink: ${legacyInk};
  --accent2: ${siteConfig.theme?.accent ?? "#C8A35B"};
  --detail: ${siteConfig.theme?.secondary ?? "#EDE3D2"};`;

  // Legacy HSL-based CSS vars (only when theme is present)
  const legacyThemeVars = siteConfig.theme
    ? `
      --primary: ${hexToHsl(siteConfig.theme.primary)};
      --accent: ${hexToHsl(siteConfig.theme.accent)};
      --secondary: ${hexToHsl(siteConfig.theme.secondary)};
      --ring: ${hexToHsl(siteConfig.theme.primary)};`
    : `
      --primary: ${hexToHsl(p?.accent ?? "#7A2E2A")};
      --accent: ${hexToHsl(p?.detail ?? "#C8A35B")};
      --secondary: ${hexToHsl(p?.surface ?? "#EDE3D2")};
      --ring: ${hexToHsl(p?.accent ?? "#7A2E2A")};`;

  const themeStyle = `
    :root {${legacyThemeVars}
      --font-heading: var(${headingEntry.cssVar});
      --font-body: var(${bodyEntry.cssVar});
      --font-display: var(${displayEntry.cssVar});
      --font-body-v2: var(${bodyV2Entry.cssVar});
      --font-mono: var(${monoEntry.cssVar});${paletteVars}
    }
  `;

  return (
    <html lang={siteConfig.location.country === "UK" ? "en-GB" : "en-US"} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
        <link rel="preconnect" href="https://api.web3forms.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessJsonLd()) }}
        />
      </head>
      <body className={ALL_FONT_VARS}>
        <ThemeProvider defaultTheme={themeMode as "light" | "dark" | "system"} enableSystem={enableSystem}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <SkynetBadge />
          <StickyTelBar />
          <ExitIntentModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
