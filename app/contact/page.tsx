import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Contact — ${siteConfig.brand.name}`,
  description: `Get a free quote in ${siteConfig.location.city}. ${siteConfig.brand.tagline}`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Get in touch
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">
            Free quote within 24 hours.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Tell us what you need. We'll send a transparent line-item estimate by email — no obligation, no pressure.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Phone</div>
                <a
                  href={`tel:${siteConfig.owner.contact_phone}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {siteConfig.owner.contact_phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Email</div>
                <a
                  href={`mailto:${siteConfig.owner.contact_email}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {siteConfig.owner.contact_email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Primary HQ</div>
                <div className="text-muted-foreground">{siteConfig.service_area.primary_city}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Hours</div>
                <div className="text-muted-foreground">
                  Mon–Fri 7am–9pm · Sat–Sun 8am–6pm · 24/7 emergency
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold">Request a free quote</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ~24-hour turnaround · No obligation
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
