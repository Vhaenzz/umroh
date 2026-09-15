"use client";
import React from "react";

/**
 * TRUST BAR — Strip horizontal kepercayaan
 * Referensi: Alsha (badge PPIU, SISKOPATUH, zero-cancel track record)
 *            Ventour (feature strip icon-box: Keberangkatan Pasti, Harga Kompetitif,
 *                     Pelayanan Responsif, Perlengkapan Eksklusif)
 *
 * Di mobile: scroll-snap horizontal.
 * Di desktop: flex row dengan divider vertikal.
 */

const trustItems = [
  {
    id: "ppiu",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    label: "Izin PPIU Resmi",
    /* PLACEHOLDER — nomor SK PPIU Yayasan */
    sublabel: "SK No. [PLACEHOLDER] Kemenag RI",
  },
  {
    id: "siskopatuh",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    label: "Aktif SISKOPATUH",
    sublabel: "Terverifikasi Kemenag RI",
  },
  {
    id: "keberangkatan",
    /* Ikon "Keberangkatan Pasti" — persis tema Ventour */
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    label: "Keberangkatan Pasti",
    sublabel: "Sesuai jadwal, tanpa batal",
  },
  {
    id: "pelayanan",
    /* Ikon "Pelayanan Responsif" — pola Ventour */
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    label: "Pelayanan Responsif",
    sublabel: "CS siap 07.00–22.00 WIB",
  },
  {
    id: "cabang",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Kantor Resmi",
    /* PLACEHOLDER — jumlah & lokasi cabang */
    sublabel: "[X] Cabang di Indonesia",
  },
];

export default function TrustBar() {
  return (
    <div className="bg-warm-surface border-y border-warm-border py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Desktop: flex row dengan dividers ── */}
        <div className="hidden md:flex items-stretch justify-between gap-0 divide-x divide-warm-border">
          {trustItems.map((item) => (
            <div
              key={item.id}
              className="flex-1 flex flex-col items-center gap-2 px-4 py-3 text-center group hover:bg-teal-primary/3 transition-colors rounded-md"
            >
              <div className="text-teal-primary/70 group-hover:text-teal-primary transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="font-sans font-bold text-[13px] text-teal-primary leading-tight">
                  {item.label}
                </p>
                <p className="font-sans text-[11px] text-slate-caption mt-0.5 leading-tight">
                  {item.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile: horizontal scroll-snap ── */}
        <div
          className="md:hidden flex gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-hide divide-x divide-warm-border"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {trustItems.map((item) => (
            <div
              key={item.id}
              className="shrink-0 snap-start w-[72vw] max-w-60 flex flex-col items-center gap-2 px-4 py-3 text-center"
            >
              <div className="text-teal-primary/70">{item.icon}</div>
              <div>
                <p className="font-sans font-bold text-[13px] text-teal-primary leading-tight">
                  {item.label}
                </p>
                <p className="font-sans text-[11px] text-slate-caption mt-0.5 leading-tight">
                  {item.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
