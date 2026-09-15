"use client";
import React from "react";
import Link from "next/link";
import { Package, StatusType } from "@/types/package";

// ── Status config object (pola Alsha: warna + teks eksplisit) ──
const statusConfig: Record<StatusType, { bg: string; text: string; border: string; dot: string }> = {
  available: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  warning: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  soldout: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-500",
  },
};

// ── Star rating renderer ──
export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-500 text-sm tracking-tighter" aria-label={`Rating ${rating} dari 5`}>
      {"★".repeat(Math.round(rating))}
    </span>
  );
}

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const status = statusConfig[pkg.statusType];
  const isSoldOut = pkg.statusType === "soldout";

  return (
    <article
      className="bg-warm-surface rounded-card border border-warm-border shadow-card overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-elevated transition-all duration-200 group relative"
      aria-label={`Paket: ${pkg.name}`}
    >
      {/* ── Card Header: Teal gradient (pola Alsha card thumb) ── */}
      <div className="relative h-44 bg-linear-to-br from-teal-primary to-teal-800 overflow-hidden p-4 flex flex-col justify-between">
        {/* Pattern overlay */}
        <div className="absolute inset-0 subtle-grain opacity-10 pointer-events-none" />

        {/* ── Top row: status badge + duration badge ── */}
        <div className="flex justify-between items-start gap-2 relative z-10">
          {/* Status badge — Alsha pattern: warna + teks + dot */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge text-xs font-bold border ${status.bg} ${status.text} ${status.border} shadow-xs`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot} ${pkg.statusType === "available" ? "animate-pulse" : ""}`} />
            {pkg.seatLeftText}
          </span>

          {/* Duration badge */}
          <span className="px-2.5 py-1 rounded-badge bg-black/40 text-white text-[11px] font-semibold backdrop-blur-xs font-mono">
            {pkg.duration}
          </span>
        </div>

        {/* ── Bottom: Airline + departure city ── */}
        <div className="flex items-center gap-2 self-start z-10 bg-black/30 backdrop-blur-xs border border-white/10 px-3 py-1.5 rounded-badge">
          <svg className="w-3.5 h-3.5 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span className="font-sans font-semibold text-[11px] text-white truncate max-w-40">{pkg.airline}</span>
        </div>

        {/* ── Category pill (pola Alsha badge--premium / Ventour category) ── */}
        <span className={`absolute top-4 -right-0.5 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider rounded-l-badge shadow-sm ${pkg.categoryColor}`}>
          {pkg.category}
        </span>
      </div>

      {/* ── Card Body ── */}
      <div className="flex-1 flex flex-col p-4 sm:p-5">

        {/* Rating & Reviews (pola Alsha .alsha-rating) */}
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={pkg.rating} />
          <span className="text-[11px] text-slate-muted font-sans">
            {pkg.rating.toFixed(1)} ({pkg.reviewCount} ulasan)
          </span>
        </div>

        {/* Package Name */}
        <h3 className="font-serif text-xl font-bold text-teal-primary leading-snug group-hover:text-teal-700 transition-colors mb-3">
          {pkg.name}
        </h3>

        {/* ── Detail List (pola Alsha .alsha-list) ── */}
        <ul className="space-y-0 text-xs font-sans text-slate-body border-t border-b border-warm-border/60 py-2 mb-3">
          {[
            { key: "Keberangkatan", val: pkg.departureDate, bold: true },
            { key: "Embarkasi", val: pkg.departureCity, bold: false },
            { key: "Hotel Makkah", val: pkg.hotelMakkah, bold: false },
            { key: "Hotel Madinah", val: pkg.hotelMadinah, bold: false },
          ].map((row) => (
            <li key={row.key} className="flex items-start justify-between gap-3 py-1.5 border-b border-warm-border/40 last:border-0">
              <span className="text-slate-muted shrink-0">{row.key}</span>
              <span className={`text-right truncate max-w-42.5 ${row.bold ? "font-bold text-teal-primary" : "font-semibold text-slate-dark"}`}>
                {row.val}
              </span>
            </li>
          ))}
        </ul>

        {/* Price + CTA row — Alsha .alsha-cta pattern */}
        <div className="mt-auto pt-3 flex items-center justify-between gap-3">
          {/* Price block */}
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-caption block">Biaya Paket</span>
            {pkg.originalPrice && (
              <span className="text-xs text-slate-caption line-through font-mono block">{pkg.originalPrice}</span>
            )}
            <span className={`text-base font-bold font-sans block ${isSoldOut ? "text-slate-muted" : "text-status-soldout"}`}>
              {pkg.discountedPrice}
            </span>
          </div>

          {/* CTA buttons — Alsha: "Lihat Detail" (solid) + "WA" (outline) */}
          <div className="flex gap-2 shrink-0">
            {isSoldOut ? (
              /* WA Waiting List */
              <a
                href={`https://wa.me/6281200000001?text=Assalamu%27alaikum%2C+saya+ingin+masuk+waiting+list+paket+${encodeURIComponent(pkg.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                id={`wa-waitlist-${pkg.id}`}
                className="px-3.5 py-2 rounded-button bg-white text-slate-dark border border-warm-border hover:bg-warm-muted text-xs font-bold transition-colors shadow-xs"
              >
                Waiting List
              </a>
            ) : (
              <>
                {/* Detail button (solid) */}
                <Link
                  href={`/umroh/${pkg.slug}`}
                  id={`detail-${pkg.id}`}
                  className="px-3.5 py-2 rounded-button bg-teal-primary text-white text-xs font-bold hover:bg-teal-900 transition-colors shadow-card flex items-center gap-1"
                >
                  Detail
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* WA outline button — Alsha alsha-btn-wa-outline pattern */}
                <a
                  href={`https://wa.me/6281200000001?text=Assalamu%27alaikum%2C+saya+ingin+info+paket+${encodeURIComponent(pkg.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`wa-${pkg.id}`}
                  className="px-2.5 py-2 rounded-button border border-teal-primary/40 bg-transparent text-teal-primary text-xs font-bold hover:bg-teal-primary hover:text-white hover:border-teal-primary transition-all flex items-center gap-1"
                  title="Tanya via WhatsApp"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                  WA
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
