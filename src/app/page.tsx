import React from "react";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import FeaturedPackagesSection from "@/components/FeaturedPackagesSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaBannerSection from "@/components/CtaBannerSection";
import { HowItWorksSection, LegalityTeaser } from "@/components/SiteContentPages";
import { getSiteData } from "@/lib/cms/store";

export default async function BerandaPage() {
  const { company, packages } = await getSiteData();

  return (
    <main>
      {/* 1. Hero Section */}
      <HeroSection company={company} />

      {/* 2. Horizontal Trust Bar */}
      <TrustBar company={company} />

      {/* 3. Featured Packages Section */}
      <FeaturedPackagesSection packages={packages} />

      {/* 4. Kenapa Memilih Kami (Why Us) */}
      <WhyUsSection />

      {/* 5. Alur keberangkatan */}
      <HowItWorksSection company={company} />

      {/* 6. Teaser legalitas */}
      <LegalityTeaser company={company} />

      {/* 7. Dokumentasi perjalanan */}
      <TestimonialsSection company={company} />

      {/* 8. FAQ (Accordion) */}
      <FaqSection company={company} compact />

      {/* 9. CTA Penutup */}
      <CtaBannerSection company={company} />
    </main>
  );
}
