import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function DemoDisclosureCard() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8">
      <div className="font-heading text-xs font-semibold uppercase tracking-widest text-primary">
        About this site
      </div>
      <h2 className="mt-2 font-heading text-2xl font-bold md:text-3xl">
        Demonstration website. Business depicted is fictional.
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        This is a portfolio demo by{" "}
        <a
          href={siteConfig.owner.hub_url}
          target="_blank"
          rel="noopener"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          SkynetLabs
        </a>{" "}
        / Waseem Nasir. Real design + code, fictional business name + address + reviews. Built as
        a forkable starter for {siteConfig.niche_label.toLowerCase()} businesses.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={siteConfig.demo_disclosure.fiverr_cta_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Hire SkynetLabs on Fiverr <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href="https://github.com/waseemnasir2k26"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <Github className="h-4 w-4" />
          Fork on GitHub
        </a>
        <Link
          href="/about-this-demo"
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Read full disclosure →
        </Link>
      </div>
    </div>
  );
}
