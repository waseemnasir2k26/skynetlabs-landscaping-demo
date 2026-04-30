import { ImageResponse } from "@vercel/og";
import { siteConfig } from "@/lib/config";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.brand.name;
  const subtitle = searchParams.get("subtitle") ?? siteConfig.brand.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(135deg, ${siteConfig.theme?.primary ?? siteConfig.palette?.accent ?? "#7A2E2A"} 0%, ${siteConfig.theme?.accent ?? siteConfig.palette?.detail ?? "#C8A35B"} 100%)`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "20px", opacity: 0.9 }}>
          <div style={{ width: "12px", height: "12px", background: "white", borderRadius: "50%" }} />
          {siteConfig.brand.name}
        </div>
        <div>
          <div style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {title}
          </div>
          <div style={{ marginTop: "24px", fontSize: "28px", opacity: 0.9, maxWidth: "900px" }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", opacity: 0.85 }}>
          <span>{siteConfig.location.city}, {siteConfig.location.region}</span>
          <span>Built by SkynetLabs ↗</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
