import React from "react";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import FeaturedPackagesSection from "@/components/FeaturedPackagesSection";
import FinancingSection from "@/components/FinancingSection";
import WhyUsSection from "@/components/WhyUsSection";
import CompanyProfileSection from "@/components/CompanyProfileSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaBannerSection from "@/components/CtaBannerSection";
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

      {/* 4. Skema pembiayaan dan perlengkapan */}
      <FinancingSection company={company} />

      {/* 5. Kenapa Memilih Kami (Why Us) */}
      <WhyUsSection />

      {/* 6. Profil Singkat Yayasan / Travel */}
      <CompanyProfileSection company={company} />

      {/* 7. Dokumentasi perjalanan */}
      <TestimonialsSection />

      {/* 8. FAQ (Accordion) */}
      <FaqSection company={company} />

      {/* 9. CTA Penutup */}
      <CtaBannerSection />
    </main>
  );
}
