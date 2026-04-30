import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  const allCities = [
    siteConfig.service_area.primary_city,
    ...(siteConfig.service_area.hero_cities ?? []).map((c) => `${c.city}, ${c.region}`),
    ...siteConfig.service_area.service_area_cities,
  ];

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-heading text-xl font-bold">{siteConfig.brand.name}</div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              {siteConfig.brand.tagline}
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a
                href={`tel:${siteConfig.owner.contact_phone}`}
                className="flex items-center gap-1.5 hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.owner.contact_phone}
              </a>
              <a
                href={`mailto:${siteConfig.owner.contact_email}`}
                className="flex items-center gap-1.5 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.owner.contact_email}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">Pages</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/about-this-demo" className="hover:text-primary">About This Demo</Link></li>
            </ul>
          </div>

          {(siteConfig.service_area.hero_cities ?? []).length > 0 && (
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">Hero Cities</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {(siteConfig.service_area.hero_cities ?? []).map((c) => (
                  <li key={`${c.city}-${c.region}`}>
                    <Link
                      href={`/locations/${c.city.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-primary"
                    >
                      {c.city}, {c.region}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
            Serving {allCities.length} cities across {siteConfig.location.country === "UK" ? "the UK" : "the United States"}
          </h3>

          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
            {allCities.map((c) => (
              <li key={c}>
                <span className="hover:text-primary">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.name}. Demonstration website. Business depicted is fictional.
          </p>
          <p>
            Built by{" "}
            <a
              href={siteConfig.demo_disclosure.fiverr_cta_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary"
            >
              SkynetLabs ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
