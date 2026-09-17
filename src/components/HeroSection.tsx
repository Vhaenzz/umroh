"use client";
import React from "react";
import Image from "next/image";

/**
 * HERO SECTION
 * Referensi utama: Alsha (media-led hero, restrained accent, CTA dual)
 *                  Ventour (subtext value proposition, trust stripe horizontal)
 *
 * Struktur: Left-column teks + Right-column media placeholder (4:3)
 * Tidak memakai 100vh / full-height hero — lebih compact & trust-forward.
 */
export default function HeroSection() {
  return (
    <section className="relative bg-warm-bg overflow-hidden">
      {/* ── Subtle background grain texture ── */}
      <div className="absolute inset-0 subtle-grain opacity-30 pointer-events-none" />

      {/* ── Teal gradient wash kiri-bawah ── */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-1">

            {/* ── Headline ── */}
            <div className="space-y-4">
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-teal-primary leading-[1.2]">
                Umroh bersama Pondok Abdurrahman bin Auf
              </h1>

              <p className="font-sans text-sm sm:text-base text-slate-body leading-relaxed max-w-xl">
                Keberangkatan terjadwal dengan bimbingan ibadah sejak manasik, rincian biaya yang transparan, dan pendampingan jamaah hingga kembali ke Indonesia.
              </p>
            </div>

            {/* ── Key Trust Points (terinspirasi feature strip Ventour) ── */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 font-sans text-sm text-slate-body">
                {[
                { icon: "✓", label: "Tanggal keberangkatan tercantum" },
                { icon: "✓", label: "Pilihan hotel dan kamar terlihat jelas" },
                { icon: "✓", label: "Bimbingan sejak manasik" },
                { icon: "✓", label: "Rincian biaya sebelum mendaftar" },
              ].map((point) => (
                <li key={point.label} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-teal-primary/10 text-teal-primary text-[10px] font-bold flex items-center justify-center">
                    {point.icon}
                  </span>
                  <span className="text-xs sm:text-[13px] leading-tight">{point.label}</span>
                </li>
              ))}
            </ul>

            {/* ── Dual CTAs: detail paket dulu, pertanyaan umum sesudahnya ── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#umroh"
                id="hero-cta-lihat-paket"
                className="min-h-13 px-7 py-3.5 rounded-button bg-gold-accent hover:bg-gold-hover active:scale-[0.98] text-slate-dark font-sans text-sm font-bold shadow-card transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Lihat Paket Umroh</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#faq"
                id="hero-cta-info-pendaftaran"
                className="min-h-13 px-7 py-3.5 rounded-button border border-gold-accent/70 bg-warm-surface hover:bg-gold-light active:scale-[0.98] text-teal-primary font-sans text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
              >
                <svg className="w-4 h-4 text-gold-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5h8m-8 4h8m-8 4h5m-9 7h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
                </svg>
                <span>Lihat Info Pendaftaran</span>
              </a>
            </div>

            {/* ── Practical next step ── */}
            <div className="flex items-center gap-3 pt-2 border-t border-warm-border/60">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-light text-gold-hover" aria-hidden="true">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
              </span>
              <p className="text-xs text-slate-muted font-sans">
                Bandingkan jadwal, hotel, dan pilihan kamar sebelum berkonsultasi.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Dokumentasi perjalanan ── */}
          <div className="lg:col-span-5 order-2 lg:order-2">
            <div className="relative rounded-card overflow-hidden shadow-elevated border border-warm-border">
              <div className="relative aspect-4/3 overflow-hidden bg-teal-primary">
                <Image src="/images/kaaba-courtyard.png" alt="Suasana Masjidil Haram dan Ka'bah" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" priority />
                <div className="absolute inset-0 bg-linear-to-t from-teal-900/80 via-teal-900/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-badge border border-white/20 bg-teal-900/70 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
                  Dokumentasi perjalanan
                </div>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-white">
                  <div>
                    <p className="font-serif text-xl font-bold leading-tight">Masjidil Haram</p>
                    <p className="mt-1 text-xs text-white/75">Pendampingan ibadah yang tertata</p>
                  </div>
                  <span className="rounded-badge border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] font-semibold">Program 1446 H</span>
                </div>
              </div>

              {/* Card info strip bawah — terinspirasi Alsha card bottom strip */}
              <div className="bg-warm-surface border-t border-warm-border px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-body font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-semibold text-teal-primary">Akomodasi paket</span>
                </div>
                <span className="text-[11px] text-slate-muted font-mono">Cek nama hotel &amp; jaraknya</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
