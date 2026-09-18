"use client";

import React from "react";
import Image from "next/image";
import type { CompanyProfile } from "@/data/company";

/**
 * TOP HERO SECTION (Konsep Ventour - Screenshot 1)
 * Tampilan awal minimalis & sinematik:
 * - Background menara masjid/video dengan ambient lighting
 * - Logo & Tagline elegan di tengah tanpa tombol berantakan
 * - Floating glassmorphism bar 4 pilar di bagian bawah
 */
export default function HeroSection({ company }: { company: CompanyProfile }) {
  const trustPillars = [
    {
      title: "Keberangkatan Pasti",
      desc: "Keberangkatan sesuai jadwal",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Harga Kompetitif",
      desc: "Biaya hemat, fasilitas terbaik",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
    {
      title: "Pelayanan Responsif",
      desc: "Pelayanan cepat dan ramah",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Perlengkapan Eksklusif",
      desc: "Fasilitas premium lengkap",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
  ];

  const heroImage = company.media?.heroUrl || "/images/minaret-hero.jpg";
  const heroVideo = company.media?.heroVideoUrl || "https://ventour-wp.s3.ap-southeast-3.amazonaws.com/wp-content/uploads/2026/04/30054426/REVISI-VIDEO-WEBSITE-IT_2.mp4";

  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[760px] w-full flex flex-col justify-between overflow-hidden bg-slate-dark text-white select-none">
      {/* ── Atmospheric Background (Video + High-Res Minaret Fallback) ── */}
      <div className="absolute inset-0 z-0">
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
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover hidden sm:block opacity-60 mix-blend-screen"
            poster={heroImage}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}

        {/* Soft Vignette and Gradients for Proportional Contrast */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      {/* ── Top Spacer (for navbar balance) ── */}
      <div className="h-12 sm:h-20" />

      {/* ── Center Content: Clean, Proportional Brand Typography (Ventour Style) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-3 sm:space-y-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {/* Elegant Gold Logo Emblem */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
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

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase drop-shadow-lg">
              {company.brandName}
            </h1>
          </div>

          {/* Clean Subtitle / Tagline with Wide Letter Spacing */}
          <p className="font-sans text-xs sm:text-sm lg:text-base font-semibold tracking-[0.25em] text-white/90 uppercase drop-shadow-md">
            TERPERCAYA, TERBUKTI, RECOMMENDED
          </p>

        </div>
      </div>

      {/* ── Bottom Floating 4 Pillars Trust Bar (Glassmorphism Strip) ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="bg-black/45 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/15 p-4 sm:p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {trustPillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className={`flex items-center gap-3.5 ${idx > 0 ? "pt-3 sm:pt-0 sm:pl-5" : ""}`}
              >
                <div className="p-2 rounded-xl bg-white/10 border border-white/15 shrink-0">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xs sm:text-sm text-white leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[11px] text-white/70 mt-0.5 leading-tight">
                    {pillar.desc}
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
