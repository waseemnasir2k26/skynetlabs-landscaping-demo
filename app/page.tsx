import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesEditorial } from "@/components/sections/ServicesEditorial";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { TestimonialsEditorial } from "@/components/sections/TestimonialsEditorial";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { FAQv2 } from "@/components/sections/FAQv2";
import { LeadMagnetV2 } from "@/components/sections/LeadMagnetV2";
import { ServiceAreaWidget } from "@/components/sections/ServiceAreaWidget";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust Strip (v2 — replaces TrustRow) */}
      <TrustStrip />

      {/* 3. Services — editorial 3-col */}
      <ServicesEditorial />

      {/* 4. Process Timeline (existing) */}
      <ProcessTimeline />

      {/* 5. Case Study (new, optional) */}
      <CaseStudy />

      {/* 6. Testimonials — 3-card editorial */}
      <TestimonialsEditorial />

      {/* 7. Gallery — reads config.photos.gallery array */}
      {(siteConfig.modules?.photo_gallery !== false) && <PhotoGallery />}

      {/* 8. FAQ */}
      {(siteConfig.modules?.faq !== false) && <FAQv2 />}

      {/* 9. Lead Magnet */}
      <LeadMagnetV2 />

      {/* 10. Service Area Map */}
      {(siteConfig.modules?.service_area_map !== false) && <ServiceAreaWidget />}
    </>
  );
}
