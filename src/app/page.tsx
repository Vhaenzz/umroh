import React from "react";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import FeaturedPackagesSection from "@/components/FeaturedPackagesSection";
import WhyUsSection from "@/components/WhyUsSection";
import CompanyProfileSection from "@/components/CompanyProfileSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnerSection from "@/components/PartnerSection";
import FaqSection from "@/components/FaqSection";
import CtaBannerSection from "@/components/CtaBannerSection";

export default function BerandaPage() {
  return (
    <main>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Horizontal Trust Bar */}
      <TrustBar />

      {/* 3. Featured Packages Section */}
      <FeaturedPackagesSection />

      {/* 4. Kenapa Memilih Kami (Why Us) */}
      <WhyUsSection />

      {/* 5. Profil Singkat Yayasan / Travel */}
      <CompanyProfileSection />

      {/* 6. Testimoni (Video 9:16 + Teks dengan format privasi Kloter) */}
      <TestimonialsSection />

      {/* 7. Partner Maskapai & Jaringan Hotel */}
      <PartnerSection />

      {/* 8. FAQ (Accordion) */}
      <FaqSection />

      {/* 9. CTA Penutup */}
      <CtaBannerSection />
    </main>
  );
}
