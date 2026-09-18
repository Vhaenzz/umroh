"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import type { CompanyProfile } from "@/data/company";

/**
 * TOP HERO SECTION (Konsep Ventour - Screenshot 1 & 2)
 * Mobile-first optimization with 2-column feature grid on mobile,
 * auto-playing video background across mobile and desktop,
 * clamp-based proportional typography, and 85vh height for scroll affordance.
 */
export default function HeroSection({ company }: { company: CompanyProfile }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const trustPillars = [
    {
      title: "Keberangkatan Pasti",
      desc: "Sesuai jadwal",
      fullDesc: "Keberangkatan sesuai jadwal",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Harga Kompetitif",
      desc: "Fasilitas terbaik",
      fullDesc: "Biaya hemat, fasilitas terbaik",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
    {
      title: "Pelayanan Responsif",
      desc: "Cepat dan ramah",
      fullDesc: "Pelayanan cepat dan ramah",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Perlengkapan Eksklusif",
      desc: "Fasilitas lengkap",
      fullDesc: "Fasilitas premium lengkap",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
  ];

  const heroImage = company.media?.heroUrl || "/images/minaret-hero.jpg";
  const heroVideo = company.media?.heroVideoUrl || "https://ventour-wp.s3.ap-southeast-3.amazonaws.com/wp-content/uploads/2026/04/30054426/REVISI-VIDEO-WEBSITE-IT_2.mp4";

  // Ensure video plays on mobile iOS/Android
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback gracefully to poster image if battery saver / strict policy blocks autoplay
      });
    }
  }, []);

  return (
    <section className="relative min-h-[82vh] max-h-[88vh] sm:min-h-[600px] sm:max-h-none lg:min-h-[720px] w-full flex flex-col justify-between overflow-hidden bg-slate-dark text-white select-none">
      
      {/* ── Background Video with Seamless Mobile Autoplay + High-Res Poster ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={heroImage}
          alt={`Suasana Ibadah ${company.brandName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {heroVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen pointer-events-none"
            poster={heroImage}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}

        {/* Cinematic Multi-layered Vignette for AA Text Contrast */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/85 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      </div>

      {/* ── Top Spacer (Balanced for Navbar) ── */}
      <div className="h-6 sm:h-12" />

      {/* ── Center Content: Responsive, Proportional Brand Typography (Clamp Sizing) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-4 sm:py-8 my-auto">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-2 sm:space-y-3.5">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center justify-center gap-2 sm:gap-3.5">
            {/* Elegant Gold Logo Emblem */}
            <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-gold-accent drop-shadow-md">
                <path
                  d="M8 38L24 10L40 38H31L24 24L17 38H8Z"
                  fill="currentColor"
                />
                <path
                  d="M24 28L28 36H20L24 28Z"
                  fill="#F5D77F"
                />
              </svg>
            </div>

            <h1 className="font-sans font-extrabold tracking-tight text-white uppercase drop-shadow-lg text-[clamp(1.35rem,5.4vw,3.25rem)] leading-none">
              {company.brandName}
            </h1>
          </div>

          {/* Clean Subtitle / Tagline with Responsive Letter Spacing */}
          <p className="font-sans text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.16em] sm:tracking-[0.24em] text-white/90 uppercase drop-shadow-md">
            TERPERCAYA, TERBUKTI, RECOMMENDED
          </p>

        </div>
      </div>

      {/* ── Bottom Floating 4 Pillars Trust Bar (2-Column Grid on Mobile, 4-Col on Desktop) ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-5 sm:pb-8 lg:pb-10">
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/15 p-3 sm:p-5 lg:p-6 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6 divide-y-0 divide-x-0 lg:divide-x divide-white/10">
            {trustPillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className={`flex items-center gap-2 sm:gap-3.5 ${
                  idx > 0 ? "lg:pl-5" : ""
                }`}
              >
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 border border-white/15 shrink-0 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans font-bold text-[11px] sm:text-xs lg:text-sm text-white leading-tight truncate sm:whitespace-normal">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[9px] sm:text-[11px] text-white/75 mt-0.5 leading-tight truncate sm:whitespace-normal">
                    <span className="sm:hidden">{pillar.desc}</span>
                    <span className="hidden sm:inline">{pillar.fullDesc}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
