"use client";
import React from "react";
import Image from "next/image";

/**
 * COMPANY PROFILE SECTION — Profil Singkat Pondok Abdurrahman bin Auf
 * Layout: 2-column dengan visual media box besar di satu sisi & ringkasan profil di sisi lain.
 */

export default function CompanyProfileSection() {
  return (
    <section id="tentang" className="scroll-mt-24 py-12 sm:py-16 bg-warm-bg border-t border-warm-border relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 subtle-grain opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── LEFT COLUMN: Authentic Office / Team Media Placeholder ── */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-card overflow-hidden shadow-elevated border border-warm-border bg-warm-surface">
              <div className="relative aspect-4/3 overflow-hidden bg-teal-primary">
                <Image src="/images/travel-team.jpg" alt="Tim layanan travel yang mendampingi jemaah" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-teal-900/80 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rounded-badge border border-white/20 bg-teal-900/70 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm">
                  Tim pendamping jemaah
                </div>
                <p className="absolute bottom-4 left-5 right-5 font-serif text-lg font-bold leading-tight text-white">
                  Hadir sebelum berangkat, mendampingi sampai pulang
                </p>
              </div>

              {/* Bottom detail strip */}
              <div className="p-4 bg-warm-surface border-t border-warm-border flex items-center justify-between text-xs font-sans">
                <div className="flex items-center gap-2 text-teal-primary font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Pelayanan Berkelanjutan</span>
                </div>
                <span className="text-slate-caption text-[11px]">Layanan tatap muka &amp; online</span>
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
                Melayani Jemaah dengan Amanah
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-slate-body leading-relaxed">
              Kami membantu calon jemaah memahami pilihan paket, menyiapkan dokumen, dan menjalani manasik dengan alur yang jelas. Informasi harga, fasilitas, dan jadwal disampaikan terbuka sejak konsultasi pertama.
            </p>

            {/* Factual service points; legal badges stay hidden until their source is available. */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-card bg-warm-surface border border-warm-border shadow-xs">
                <div className="flex items-center gap-2 text-teal-primary mb-1">
                  <svg className="w-4 h-4 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-serif font-bold text-xs">Detail paket</span>
                </div>
                <p className="text-[11px] text-slate-muted font-sans">
                  Jadwal, hotel, itinerary, dan fasilitas ditulis pada halaman paket.
                </p>
              </div>

              <div className="p-3.5 rounded-card bg-warm-surface border border-warm-border shadow-xs">
                <div className="flex items-center gap-2 text-teal-primary mb-1">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-serif font-bold text-xs">Dokumen perjalanan</span>
                </div>
                <p className="text-[11px] text-slate-muted font-sans">
                  Persyaratan dan tenggat perlu dikonfirmasi sesuai tanggal keberangkatan.
                </p>
              </div>

              <div className="p-3.5 rounded-card bg-warm-surface border border-warm-border shadow-xs">
                <div className="flex items-center gap-2 text-teal-primary mb-1">
                  <svg className="w-4 h-4 text-teal-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="font-serif font-bold text-xs">Pendampingan</span>
                </div>
                <p className="text-[11px] text-slate-muted font-sans">
                  Informasi manasik dan proses pendaftaran dijelaskan sebelum pembayaran.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
