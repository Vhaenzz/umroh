"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { CompanyProfile } from "@/data/company";

/**
 * TOP HERO SECTION (Konsep Ventour - Gambar 1)
 * Tampilan awal minimalis & sinematik dengan background video/image menara masjid,
 * logo & tagline brand di tengah, serta bar 4 pilar layanan di bagian bawah.
 */
export default function HeroSection({ company }: { company: CompanyProfile }) {
  const trustPillars = [
    {
      title: "Keberangkatan Pasti",
      desc: "Keberangkatan sesuai jadwal",
      icon: (
        <svg className="w-6 h-6 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
    {
      title: "Harga Kompetitif",
      desc: "Biaya hemat, fasilitas terbaik",
      icon: (
        <svg className="w-6 h-6 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      title: "Pelayanan Responsif",
      desc: "Pelayanan cepat dan ramah",
      icon: (
        <svg className="w-6 h-6 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Perlengkapan Eksklusif",
      desc: "Fasilitas premium lengkap",
      icon: (
        <svg className="w-6 h-6 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] w-full flex flex-col justify-between overflow-hidden bg-slate-dark text-white select-none">
      
      {/* ── Background Video / High-Res Image ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover hidden sm:block opacity-75"
          poster="/images/kaaba-courtyard.png"
        >
          <source
            src="https://ventour-wp.s3.ap-southeast-3.amazonaws.com/wp-content/uploads/2026/04/30054426/REVISI-VIDEO-WEBSITE-IT_2.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fallback Image for Mobile & Slow Network */}
        <Image
          src="/images/kaaba-courtyard.png"
          alt="Suasana Ibadah Tanah Suci"
          fill
          priority
          sizes="100vw"
          className="object-cover sm:hidden"
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* ── Center Content: Big Brand Identity & Tagline (Gambar 1) ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Brand Logo & Name */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-box bg-teal-primary text-gold-accent font-serif font-bold text-2xl sm:text-3xl flex items-center justify-center border-2 border-gold-accent/40 shadow-elevated">
              RM
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase drop-shadow-lg">
              {company.brandName}
            </h1>
          </div>

          {/* Subtitle / Tagline */}
          <div className="space-y-2">
            <p className="font-sans text-xs sm:text-sm lg:text-base font-bold tracking-[0.2em] text-gold-light uppercase drop-shadow-md">
              TERPERCAYA, TERBUKTI, RECOMMENDED
            </p>
            <p className="font-sans text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
              Penyelenggara Resmi Ibadah Umroh &amp; Haji Khusus Berizin Kemenag RI No. {company.legal.ppiu}
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/umroh"
              className="px-6 py-3 rounded-button bg-gold-accent hover:bg-gold-hover text-slate-dark text-xs sm:text-sm font-bold shadow-goldGlow transition-all duration-200 flex items-center gap-2"
            >
              <span>Jelajahi Paket Umroh</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/haji"
              className="px-5 py-3 rounded-button bg-black/40 backdrop-blur-md border border-white/30 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold transition-all duration-200"
            >
              Program Haji Khusus
            </Link>
          </div>

        </div>
      </div>

      {/* ── Bottom Floating 4 Pillars Trust Bar (Gambar 1 Glassmorphism Strip) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="bg-[#121c19]/90 backdrop-blur-md rounded-card border border-white/15 p-4 sm:p-6 shadow-elevated">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {trustPillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className={`flex items-center gap-3.5 ${idx > 0 ? "pt-3 sm:pt-0 sm:pl-5" : ""}`}
              >
                <div className="p-2.5 rounded-button bg-white/5 border border-white/10 shrink-0">
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
