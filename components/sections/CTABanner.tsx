import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/config";

export function CTABanner() {
  return (
    <section id="quote" className="bg-foreground py-20 text-background md:py-28">
      <div className="container grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: siteConfig.theme?.accent ?? "var(--detail, #C8A35B)" }}>
            Get started today
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold md:text-5xl">
            Free quote within 24 hours.
          </h2>
          <p className="mt-4 max-w-md text-base text-background/70">
            No obligation. No pressure. We'll send a transparent, line-item estimate by email — pick us when you're ready.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild={false} size="lg" variant="primary">
              <a href={`tel:${siteConfig.owner.contact_phone}`}>
                <Phone className="h-5 w-5" />
                Call {siteConfig.owner.contact_phone}
              </a>
            </Button>
            <Button asChild={false} size="lg" variant="outline" className="border-background/30 text-background hover:bg-background hover:text-foreground">
              <a href="/contact">
                Schedule a call <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl bg-background p-6 text-foreground md:p-8">
          <h3 className="font-heading text-xl font-semibold">Request a free quote</h3>
          <p className="mt-1 text-sm text-muted-foreground">~24-hour turnaround</p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
