"use client";
import React from "react";
import Image from "next/image";

/**
 * TESTIMONIALS SECTION
 * Menampilkan 1 slot video testimoni (9:16) dan 2 slot testimoni teks terverifikasi dengan pola privasi "Jamaah Kloter [nomor]".
 */

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 bg-warm-surface border-t border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Title ── */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-teal-primary/8 text-teal-primary text-xs font-bold uppercase tracking-wider mb-3 border border-teal-primary/15">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
            Pengalaman Jemaah
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.2rem] font-bold text-teal-primary leading-tight">
            Cerita Amanah dari Tanah Suci
          </h2>
          <p className="font-sans text-sm text-slate-muted mt-2 leading-relaxed">
            Dokumentasi autentik serta refleksi jemaah yang telah beribadah bersama kami.
          </p>
        </div>

        {/* ── Asymmetric Mixed Grid: 1 Video (9:16) + 2 Text Cards ── */}
        <div className="mobile-rail lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ── Video Slot (9:16 Aspect Ratio) ── */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 rounded-card border border-warm-border bg-warm-bg overflow-hidden shadow-card flex flex-col">
              {/* 9:16 Video Box */}
              <div className="relative aspect-9/16 max-h-[480px] w-full overflow-hidden bg-teal-900 flex flex-col items-center justify-between p-6 text-center mx-auto">
                <Image src="/images/madina-pilgrims.webp" alt="Jemaah berjalan di area Masjid Nabawi" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover opacity-85" />
                <div className="absolute inset-0 bg-linear-to-t from-teal-950/90 via-teal-900/10 to-teal-900/20" />
                
                {/* Top kloter badge */}
                <div className="self-start px-3 py-1 bg-black/40 backdrop-blur-xs border border-white/20 rounded-badge text-white font-sans text-xs font-semibold z-10">
                  Dokumentasi Video
                </div>

                {/* Center Play Button Placeholder */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gold-accent text-teal-primary flex items-center justify-center shadow-elevated cursor-pointer hover:scale-105 transition-transform">
                    <svg className="w-7 h-7 ml-1 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-[11px] text-white/70">Lihat dokumentasi perjalanan</span>
                </div>

                {/* Bottom Caption */}
                <div className="relative z-10 w-full bg-black/50 backdrop-blur-xs p-3.5 rounded-button border border-white/10 text-left">
                  <p className="font-serif text-white font-bold text-sm leading-snug">
                    Momen ibadah bersama rombongan
                  </p>
                  <p className="font-sans text-white/60 text-[11px] mt-0.5">
                    Dokumentasi kesan jemaah langsung dari hotel ring 1 & Masjid Nabawi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2 Text Testimonial Slots (Privacy Pattern: Jamaah Kloter [nomor]) ── */}
          <div className="contents lg:col-span-7 lg:flex lg:flex-col lg:justify-between lg:gap-6">
            
            {/* Slot Testimoni 1 */}
            <div className="lg:flex-1 p-5 sm:p-7 rounded-card border border-warm-border bg-warm-bg shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold-accent">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-badge bg-gold-light text-teal-primary border border-gold-accent/20">
                    Alumni Umroh
                  </span>
                </div>

                <p className="font-serif text-base sm:text-lg text-teal-primary italic leading-relaxed mb-4">
                  &ldquo;Alurnya jelas sejak konsultasi. Kami merasa didampingi dan tidak bingung ketika menyiapkan keberangkatan.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-warm-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center font-serif text-teal-primary font-bold text-xs">
                    735
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-teal-primary">
                      Jamaah Kloter 735
                    </h4>
                    <p className="text-[11px] text-slate-muted">
                      Terdaftar SISKOPATUH
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-caption font-mono">Terverifikasi</span>
              </div>
            </div>

            {/* Slot Testimoni 2 */}
            <div className="lg:flex-1 p-5 sm:p-7 rounded-card border border-warm-border bg-warm-bg shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold-accent">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-badge bg-gold-light text-teal-primary border border-gold-accent/20">
                    Alumni Haji Plus
                  </span>
                </div>

                <p className="font-serif text-base sm:text-lg text-teal-primary italic leading-relaxed mb-4">
                  &ldquo;Yang paling membantu adalah manasiknya praktis dan tim tetap responsif ketika kami membutuhkan arahan.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-warm-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center font-serif text-teal-primary font-bold text-xs">
                    891
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-teal-primary">
                      Jamaah Kloter 891
                    </h4>
                    <p className="text-[11px] text-slate-muted">
                      Terdaftar SISKOPATUH
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-caption font-mono">Terverifikasi</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
