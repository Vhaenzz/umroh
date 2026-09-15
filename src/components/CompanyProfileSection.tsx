"use client";
import React from "react";

/**
 * COMPANY PROFILE SECTION — Profil Singkat Yayasan / Travel
 * Layout: 2-column dengan visual media box besar di satu sisi & ringkasan profil di sisi lain.
 */

export default function CompanyProfileSection() {
  return (
    <section className="py-12 sm:py-16 bg-warm-bg border-t border-warm-border relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 subtle-grain opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── LEFT COLUMN: Authentic Office / Team Media Placeholder ── */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-card overflow-hidden shadow-elevated border border-warm-border bg-warm-surface">
              {/* Media box 4:3 */}
              <div className="aspect-4/3 bg-linear-to-br from-teal-primary to-teal-900 flex flex-col items-center justify-center p-6 text-center relative">
                <div className="absolute inset-0 subtle-grain opacity-20 pointer-events-none" />
                
                {/* Office/Building icon placeholder */}
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>

                <p className="font-serif text-white font-bold text-sm leading-snug mb-1">
                  [FOTO KANTOR/TIM ASLI — MENUNGGU ASET DARI YAYASAN]
                </p>
                <p className="font-sans text-white/60 text-xs max-w-xs">
                  Dokumentasi kantor pusat, tim operasional, atau pembimbing ibadah resmi.
                </p>

                <div className="absolute top-3 left-3 px-2.5 py-1 bg-teal-primary/80 backdrop-blur-xs border border-white/15 rounded-badge text-white text-[10px] font-bold">
                  Profil Yayasan
                </div>
              </div>

              {/* Bottom detail strip */}
              <div className="p-4 bg-warm-surface border-t border-warm-border flex items-center justify-between text-xs font-sans">
                <div className="flex items-center gap-2 text-teal-primary font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Pelayanan Berkelanjutan</span>
                </div>
                <span className="text-slate-caption font-mono text-[11px]">Terakreditasi</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Content & Trust Badges ── */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-teal-primary/8 text-teal-primary text-xs font-bold uppercase tracking-wider mb-3 border border-teal-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                Profil Singkat
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-teal-primary leading-tight">
                Melayani Jemaah dengan Amanah Sejak{" "}
                <span className="text-gold-accent">[TAHUN — PLACEHOLDER]</span>
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-slate-body leading-relaxed">
              [PLACEHOLDER — 2-3 kalimat profil singkat perusahaan, legalitas, dan nilai yang dipegang. Menunggu draft dari Yayasan.]
            </p>

            {/* Badges strip (mengikuti trust bar Fase 2) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-card bg-warm-surface border border-warm-border shadow-xs">
                <div className="flex items-center gap-2 text-teal-primary mb-1">
                  <svg className="w-4 h-4 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-serif font-bold text-xs">Izin PPIU Resmi</span>
                </div>
                <p className="text-[11px] text-slate-muted font-sans">
                  SK No. [PLACEHOLDER] Kemenag RI
                </p>
              </div>

              <div className="p-3.5 rounded-card bg-warm-surface border border-warm-border shadow-xs">
                <div className="flex items-center gap-2 text-teal-primary mb-1">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-serif font-bold text-xs">Aktif SISKOPATUH</span>
                </div>
                <p className="text-[11px] text-slate-muted font-sans">
                  Sistem Komputerisasi Kemenag
                </p>
              </div>

              <div className="p-3.5 rounded-card bg-warm-surface border border-warm-border shadow-xs">
                <div className="flex items-center gap-2 text-teal-primary mb-1">
                  <svg className="w-4 h-4 text-teal-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="font-serif font-bold text-xs">Kantor Resmi</span>
                </div>
                <p className="text-[11px] text-slate-muted font-sans">
                  [X] Cabang di Indonesia
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
