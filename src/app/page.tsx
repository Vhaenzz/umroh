import React from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedPackagesSection from "@/components/FeaturedPackagesSection";
import DestinationShowcaseSection from "@/components/DestinationShowcaseSection";
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
      {/* 1. Top Hero Section (Konsep Ventour: Video/Atmospheric background, Center Brand, Floating 4 Trust Pillars) */}
      <HeroSection company={company} />

      {/* 2. Featured Packages Section (Pilihan Paket Terpopuler) */}
      <FeaturedPackagesSection packages={packages} />

      {/* 3. Middle Destination Showcase Section (Konsep Ventour: Interactive Destination Slider with Auto-Scroll) */}
      <DestinationShowcaseSection company={company} />

      {/* 4. Kenapa Memilih Kami (Why Us) */}
      <WhyUsSection />

      {/* 5. Alur Keberangkatan */}
      <HowItWorksSection company={company} />

      {/* 6. Teaser Legalitas */}
      <LegalityTeaser company={company} />

      {/* 7. Dokumentasi Perjalanan */}
      <TestimonialsSection company={company} />

      {/* 8. FAQ (Accordion) */}
      <FaqSection company={company} compact />

      {/* 9. CTA Penutup */}
      <CtaBannerSection company={company} />
    </main>
  );
}
