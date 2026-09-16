"use client";
import React from "react";
import Image from "next/image";

/**
 * HERO SECTION
 * Referensi utama: Alsha (video background overlay, trust badge PPIU, CTA dual)
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

            {/* ── Trust Badge: PPIU Kemenag ── */}
            {/* PLACEHOLDER — nomor izin PPIU & akreditasi final dari Yayasan */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-primary/8 border border-teal-primary/20 text-teal-primary text-[11px] sm:text-xs font-semibold max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="truncate sm:whitespace-normal">Izin PPIU Resmi Kemenag RI • <span className="text-gold-accent font-bold">Dokumen tersedia saat konsultasi</span></span>
            </div>

            {/* ── Headline ── */}
            <div className="space-y-4">
              {/* PLACEHOLDER — headline final dari tim marketing Yayasan */}
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-teal-primary leading-[1.2]">
                Wujudkan Perjalanan Ibadah yang{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10">Tenang &amp; Terpercaya</span>
                  {/* Gold underline accent — seperti pola Alsha */}
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-gold-accent opacity-40"
                    viewBox="0 0 300 8"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 6 Q75 1 150 5 T300 3"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* PLACEHOLDER — value prop spesifik menunggu arahan Yayasan */}
              <p className="font-sans text-sm sm:text-base text-slate-body leading-relaxed max-w-xl">
                Layanan Haji &amp; Umroh dengan <strong className="text-teal-primary font-semibold">bimbingan manasik penuh</strong>,
                transparansi biaya tanpa beban tersembunyi, dan kepastian akomodasi ring satu pelataran Masjidil Haram &amp; Masjid Nabawi.
              </p>
            </div>

            {/* ── Key Trust Points (terinspirasi feature strip Ventour) ── */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 font-sans text-sm text-slate-body">
              {[
                { icon: "✓", label: "Keberangkatan Pasti Sesuai Jadwal" },
                { icon: "✓", label: "Hotel Ring 1 Masjidil Haram" },
                { icon: "✓", label: "Tour Leader Berpengalaman" },
                { icon: "✓", label: "Harga Transparan, Tanpa Biaya Tersembunyi" },
              ].map((point) => (
                <li key={point.label} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-teal-primary/10 text-teal-primary text-[10px] font-bold flex items-center justify-center">
                    {point.icon}
                  </span>
                  <span className="text-xs sm:text-[13px] leading-tight">{point.label}</span>
                </li>
              ))}
            </ul>

            {/* ── Dual CTAs (pola Alsha: Lihat Jadwal + Hubungi Kami) ── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#paket-unggulan"
                id="hero-cta-lihat-paket"
                className="min-h-13 px-7 py-3.5 rounded-button bg-teal-primary hover:bg-teal-900 active:scale-[0.98] text-white font-sans text-sm font-bold shadow-card transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Lihat Paket Umroh</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              {/* PLACEHOLDER — nomor WA CS Utama */}
              <a
                href="https://wa.me/6281200000001?text=Assalamu%27alaikum%2C+saya+ingin+konsultasi+paket+Haji+%2F+Umroh"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-wa-konsultasi"
                className="min-h-13 px-7 py-3.5 rounded-button border border-teal-primary/30 bg-warm-surface hover:bg-teal-primary/5 active:scale-[0.98] text-teal-primary font-sans text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
              >
                <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>

            {/* ── Micro Social Proof (pola: rating + jumlah jamaah) ── */}
            <div className="flex items-center gap-3 pt-2 border-t border-warm-border/60">
              <div className="flex text-amber-500 text-base leading-none tracking-tighter" aria-label="Rating 4,9 dari 5">
                {[0, 1, 2, 3, 4].map((star) => (
                  <svg key={star} className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m10 1.5 2.62 5.31 5.86.85-4.24 4.13 1 5.84L10 14.87 4.76 17.63l1-5.84L1.52 7.66l5.86-.85L10 1.5Z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-slate-muted font-sans">
                Rating <strong className="text-slate-dark">4.9/5</strong> · Pendampingan dari pendaftaran sampai pulang
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
                  <span className="font-semibold text-teal-primary">Hotel Ring 1</span>
                </div>
                <span className="text-[11px] text-slate-caption font-mono">± 150m Masjidil Haram</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
