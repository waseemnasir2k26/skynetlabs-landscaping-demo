import { Award, ShieldCheck, Star, Users } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function TrustRow() {
  const stats = [
    { Icon: Users, value: "1,200+", label: `${siteConfig.location.city} clients` },
    { Icon: Star, value: "4.9 / 5", label: "Verified reviews" },
    { Icon: ShieldCheck, value: "100%", label: "Licensed & insured" },
    { Icon: Award, value: "12+", label: "Years operating" },
  ];

  return (
    <section className="border-b border-border bg-background py-10">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: `${siteConfig.theme?.primary ?? "var(--accent2, #7A2E2A)"}15`, color: siteConfig.theme?.primary ?? "var(--accent2, #7A2E2A)" }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-heading text-xl font-bold tabular-nums">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
