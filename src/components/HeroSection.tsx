"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CompanyProfile } from "@/data/company";
import { getGeneralWhatsAppUrl } from "@/lib/contact";

interface HeroSlide {
  id: string;
  title: string;
  sub: string;
  desc: string;
  badge: string;
  image: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "makkah",
    title: "Mekkah",
    sub: "Ibadah Umroh Khusyuk & Terjadwal",
    desc: "Wujudkan rindu ke Baitullah dengan bimbingan ibadah terpercaya, akomodasi hotel dekat masjid, dan transparansi rincian biaya sejak awal.",
    badge: "Paket Umroh 1448H",
    image: "/images/kaaba-courtyard.png",
    ctaLink: "/umroh",
  },
  {
    id: "madinah",
    title: "Madinah",
    sub: "Ziarah Nabawi & Pendampingan Penuh",
    desc: "Rasakan ketenangan beribadah di Masjid Nabawi dan ziarah Raudhah dengan izin tasreh resmi serta muthowwif berpengalaman.",
    badge: "Ziarah Berkah",
    image: "/images/madina-pilgrims.webp",
    ctaLink: "/umroh",
  },
  {
    id: "turki",
    title: "Turki",
    sub: "Umroh Plus Wisata Sejarah Islam",
    desc: "Padukan ibadah suci di Tanah Suci dengan napak tilas keagungan peradaban Islam di Istanbul, Cappadocia, dan Blue Mosque.",
    badge: "Umroh Plus Pilihan",
    image: "/images/travel-team.jpg",
    ctaLink: "/umroh",
  },
  {
    id: "thaif",
    title: "Thaif",
    sub: "City Tour Pegunungan Sejuk & Teleferik",
    desc: "Nikmati perjalanan ziarah sejarah dakwah Rasulullah di Thaif, kebun mawar yang harum, dan panorama alam pegunungan yang menyejukkan.",
    badge: "Free City Tour",
    image: "/images/kaaba-courtyard.png",
    ctaLink: "/umroh",
  },
];

export default function HeroSection({ company }: { company: CompanyProfile }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = heroSlides[activeIndex];
  const waUrl = getGeneralWhatsAppUrl(company.phone);

  return (
    <section
      className="relative min-h-[580px] lg:min-h-[640px] w-full bg-slate-dark text-white overflow-hidden flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Carousel Destinasi & Paket Ibadah"
    >
      {/* ── Background Image Layer with Crossfade ── */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <Image
            src={slide.image}
            alt={`Latar belakang destinasi ${slide.title}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* ── Atmospheric Ambient Gradients ── */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-dark via-slate-dark/75 to-slate-dark/50 z-10" />
      <div className="absolute inset-0 bg-linear-to-r from-teal-950/90 via-teal-900/60 to-transparent z-10 hidden md:block" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-accent/15 rounded-full blur-3xl z-10 pointer-events-none" />

      {/* ── Left Vertical Navigation Dots (Desktop ≥1024px) ── */}
      <div className="hidden lg:flex flex-col items-center gap-3 absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 z-20">
        <div className="w-px h-12 bg-white/20" />
        {heroSlides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`group flex items-center gap-2 transition-all p-1`}
            aria-label={`Buka slide ${slide.title}`}
          >
            <span
              className={`w-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "h-8 bg-gold-accent shadow-goldGlow"
                  : "h-2.5 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
        <div className="w-px h-12 bg-white/20" />
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ── Left Column: Inspiring Headline & Action CTAs ── */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Category / Scope Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-bold text-gold-accent shadow-xs">
              <span className="w-2 h-2 rounded-full bg-gold-accent animate-pulse" />
              <span>{activeSlide.badge} — {company.brandName}</span>
            </div>

            {/* Destination Big Title */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none drop-shadow-md">
                {activeSlide.title}
              </h1>
              <p className="font-sans text-base sm:text-xl font-semibold text-gold-light/95 leading-snug">
                {activeSlide.sub}
              </p>
            </div>

            {/* Narrative Description */}
            <p className="font-sans text-xs sm:text-sm lg:text-base text-slate-100/90 leading-relaxed max-w-xl">
              {activeSlide.desc}
            </p>

            {/* Key Trust Highlights (Ventour Concept) */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 max-w-lg font-sans text-xs">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs border border-white/10 px-3 py-2 rounded-button">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">✓</span>
                <span className="text-white/90">Jadwal Pasti Berangkat</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs border border-white/10 px-3 py-2 rounded-button">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">✓</span>
                <span className="text-white/90">Hotel Dekat Masjid</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs border border-white/10 px-3 py-2 rounded-button">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">✓</span>
                <span className="text-white/90">Bimbingan Sesuai Sunnah</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xs border border-white/10 px-3 py-2 rounded-button">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">✓</span>
                <span className="text-white/90">Biaya Transparan</span>
              </div>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/umroh"
                id="hero-cta-lihat-paket"
                className="min-h-12 px-7 py-3.5 rounded-button bg-gold-accent hover:bg-gold-hover active:scale-[0.98] text-slate-dark font-sans text-xs sm:text-sm font-bold shadow-goldGlow transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Lihat Katalog Paket</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-konsultasi-wa"
                className="min-h-12 px-6 py-3.5 rounded-button border border-white/30 bg-black/30 backdrop-blur-xs hover:bg-white/10 active:scale-[0.98] text-white font-sans text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>Konsultasi Cepat WhatsApp</span>
              </a>
            </div>

          </div>

          {/* ── Right Column: Interactive Destination Cards Slider (Ventour Concept) ── */}
          <div className="lg:col-span-5 relative">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-white/70 font-sans pb-1">
                <span>Destinasi Ibadah &amp; Wisata</span>
                <span className="font-mono font-bold text-gold-accent">
                  0{activeIndex + 1} / 0{heroSlides.length}
                </span>
              </div>

              {/* Cards row with smooth scroll & selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`text-left rounded-card p-2.5 transition-all duration-300 relative overflow-hidden group border ${
                        isActive
                          ? "bg-teal-900/80 border-gold-accent shadow-elevated scale-[1.02] ring-1 ring-gold-accent/40"
                          : "bg-black/35 border-white/15 hover:bg-black/55 hover:border-white/30 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="relative h-24 w-full rounded-button overflow-hidden mb-2 bg-slate-800">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          sizes="180px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white uppercase tracking-wider font-mono">
                          {slide.badge}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-white block">
                          {slide.title}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-accent shadow-xs" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-gold-accent h-full transition-all duration-500 ease-out"
                  style={{ width: `${((activeIndex + 1) / heroSlides.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
