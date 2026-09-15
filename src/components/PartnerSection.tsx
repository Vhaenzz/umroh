"use client";
import React from "react";

/**
 * PARTNER SECTION — Logo Maskapai & Hotel Rekanan
 * 5 kotak placeholder abu-abu dengan label kecil menunggu logo resmi dari partner.
 */

const partners = [
  { id: 1, label: "[Logo Maskapai]", type: "Maskapai Penerbangan" },
  { id: 2, label: "[Logo Maskapai]", type: "Maskapai Penerbangan" },
  { id: 3, label: "[Logo Hotel]", type: "Hotel Bintang Makkah" },
  { id: 4, label: "[Logo Hotel]", type: "Hotel Bintang Madinah" },
  { id: 5, label: "[Logo Partner]", type: "Pembiayaan Syariah" },
];

export default function PartnerSection() {
  return (
    <section className="py-10 sm:py-12 bg-warm-bg border-t border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-caption font-sans">
            Partner Resmi Maskapai &amp; Jaringan Hotel
          </p>
          <p className="text-xs text-slate-muted mt-1 font-sans">
            Bekerja sama dengan maskapai penerbangan internasional dan jaringan akomodasi ring 1 Tanah Suci.
          </p>
        </div>

        {/* 5 Gray Placeholder Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {partners.map((p) => (
            <div
              key={p.id}
              className="h-20 sm:h-24 rounded-card border border-dashed border-warm-border/80 bg-warm-muted/60 flex flex-col items-center justify-center p-3 text-center transition-all duration-200 hover:bg-warm-muted last:col-span-2 sm:last:col-span-1"
            >
              <span className="font-mono text-xs font-bold text-slate-muted">
                {p.label}
              </span>
              <span className="text-[10px] text-slate-caption mt-1 font-sans">
                {p.type}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-slate-caption mt-4 font-sans italic">
          *Menunggu konfirmasi penempatan logo resmi dari mitra terkait
        </p>

      </div>
    </section>
  );
}
