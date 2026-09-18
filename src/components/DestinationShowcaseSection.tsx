"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CompanyProfile } from "@/data/company";
import { getGeneralWhatsAppUrl } from "@/lib/contact";

interface DestinationItem {
  id: string;
  title: string;
  sub: string;
  desc: string;
  img: string;
  link: string;
}

const destinations: DestinationItem[] = [
  {
    id: "turki",
    title: "Turki",
    sub: "Umroh Plus Turki",
    desc: "Nikmati ibadah umroh yang khusyuk dilanjutkan dengan perjalanan wisata ke Turki, menjelajahi keindahan sejarah Islam, budaya, dan destinasi ikonik yang memukau.",
    img: "/images/travel-team.jpg",
    link: "/umroh",
  },
  {
    id: "dubai",
    title: "Dubai",
    sub: "Umroh Plus Dubai",
    desc: "Rasakan ibadah umroh yang nyaman sekaligus pengalaman wisata modern di Dubai dengan destinasi kelas dunia, fasilitas mewah, dan suasana kota yang spektakuler.",
    img: "/images/travel-team.jpg",
    link: "/umroh",
  },
  {
    id: "mesir",
    title: "Mesir",
    sub: "Umroh Plus Mesir",
    desc: "Sempurnakan ibadah umroh Anda dengan perjalanan ke Mesir, mengunjungi jejak sejarah Islam dan peradaban dunia yang penuh makna dan inspirasi.",
    img: "/images/madina-pilgrims.webp",
    link: "/umroh",
  },
  {
    id: "al-ula",
    title: "Al Ula",
    sub: "City Tour Al Ula",
    desc: "Sempurnakan ibadah umroh Anda dengan perjalanan ke Al Ula, menikmati keindahan alam eksotis, situs bersejarah, dan suasana menenangkan penuh keagungan.",
    img: "/images/kaaba-courtyard.png",
    link: "/umroh",
  },
  {
    id: "thaif",
    title: "Thaif",
    sub: "City Tour Thaif",
    desc: "Nikmati ibadah umroh yang khusyuk dilanjutkan dengan kunjungan ke Thaif, kota sejuk dengan pemandangan pegunungan, kebun mawar, dan udara menyegarkan.",
    img: "/images/kaaba-courtyard.png",
    link: "/umroh",
  },
  {
    id: "mekkah",
    title: "Mekkah",
    sub: "Umroh Reguler Khusyuk",
    desc: "Raih kemabruran ibadah Umroh langsung di hadapan Ka'bah dan Masjidil Haram dengan hotel dekat serta bimbingan muthowwif berpengalaman.",
    img: "/images/kaaba-courtyard.png",
    link: "/umroh",
  },
];

export default function DestinationShowcaseSection({ company }: { company: CompanyProfile }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-scroll / Auto-slide timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % destinations.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeDest = destinations[current];
  const waUrl = getGeneralWhatsAppUrl(company.phone);

  return (
    <section
      className="relative min-h-[580px] lg:min-h-[660px] w-full bg-slate-dark text-white overflow-hidden py-14 lg:py-20 my-10 lg:my-14 transition-all duration-700 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Eksplorasi Destinasi Umroh & Wisata Halal"
    >
      {/* ── Dynamic Ambient Background Image with Smooth Crossfade ── */}
      {destinations.map((dest, idx) => (
        <div
          key={dest.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <Image
            src={dest.img}
            alt={`Latar ${dest.title}`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-dark via-transparent to-black/40" />
        </div>
      ))}

      {/* ── Left Navigation Dots (Ventour Style) ── */}
      <div className="hidden lg:flex flex-col items-center justify-between absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 h-72 z-20">
        <div className="w-0.5 h-full bg-white/20 absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none" />
        {destinations.map((dest, i) => (
          <button
            key={dest.id}
            type="button"
            onClick={() => setCurrent(i)}
            className={`relative z-10 w-3 h-3 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white scale-125 shadow-goldGlow ring-4 ring-gold-accent/40"
                : "bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Pilih destinasi ${dest.title}`}
          />
        ))}
      </div>

      {/* ── Main Layout Container ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:pl-28 lg:pr-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── Left Content Block ── */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-bold text-gold-accent">
              <span className="w-2 h-2 rounded-full bg-gold-accent animate-pulse" />
              <span>Destinasi Favorit Jemaah</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
                {activeDest.title}
              </h2>
              <p className="font-sans text-sm sm:text-base font-semibold text-gold-accent">
                {activeDest.sub}
              </p>
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-100/90 leading-relaxed max-w-md">
              {activeDest.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={activeDest.link}
                className="px-6 py-3 rounded-button bg-gold-accent hover:bg-gold-hover text-slate-dark text-xs sm:text-sm font-bold shadow-goldGlow transition-all duration-200 flex items-center gap-2"
              >
                <span>Lihat Jadwal Paket</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-button bg-black/40 backdrop-blur-md border border-white/25 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold transition-all duration-200"
              >
                Konsultasi WhatsApp
              </a>
            </div>
          </div>

          {/* ── Right Carousel Cards (Ventour Slider Style) ── */}
          <div className="lg:col-span-7 overflow-hidden">
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-5 transition-transform duration-700 ease-out py-4 overflow-x-auto lg:overflow-visible scrollbar-none"
              style={{
                transform: `translateX(-${current * (typeof window !== "undefined" && window.innerWidth < 640 ? 250 : 330)}px)`,
              }}
            >
              {destinations.map((item, index) => {
                const isActive = index === current;
                return (
                  <div
                    key={item.id}
                    onClick={() => setCurrent(index)}
                    className={`w-[240px] sm:w-[310px] shrink-0 cursor-pointer transition-all duration-500 ${
                      isActive ? "scale-100 opacity-100" : "scale-95 opacity-60 hover:opacity-90"
                    }`}
                  >
                    {/* Top card header with label & micro dots */}
                    <div className="flex items-center justify-between mb-2 px-1">
                      <span className="text-xs font-semibold text-white/90 truncate max-w-[180px]">
                        {item.sub}
                      </span>
                      <div className="flex gap-1 shrink-0">
                        {destinations.map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              dotIdx === index ? "bg-gold-accent w-3" : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Image Card Container */}
                    <div
                      className={`relative h-[320px] sm:h-[370px] w-full rounded-card overflow-hidden border transition-all duration-500 ${
                        isActive
                          ? "border-gold-accent/80 shadow-elevated ring-2 ring-gold-accent/30"
                          : "border-white/15"
                      }`}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="310px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="font-serif text-xl sm:text-2xl font-bold block drop-shadow-sm">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-gold-light/90 block mt-0.5">
                          Klik untuk memilih
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Micro Slider Controller for Mobile */}
            <div className="flex items-center justify-between pt-2 lg:hidden text-xs text-white/70">
              <button
                type="button"
                onClick={() => setCurrent((prev) => (prev > 0 ? prev - 1 : destinations.length - 1))}
                className="px-3 py-1 rounded-button bg-white/10 hover:bg-white/20"
              >
                ← Sebelumnya
              </button>
              <span className="font-mono text-gold-accent font-bold">
                0{current + 1} / 0{destinations.length}
              </span>
              <button
                type="button"
                onClick={() => setCurrent((prev) => (prev + 1) % destinations.length)}
                className="px-3 py-1 rounded-button bg-white/10 hover:bg-white/20"
              >
                Berikutnya →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
