"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, StatusType } from "@/types/package";
import { getPackageLifecycle } from "@/lib/package";

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
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-800",
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

interface PackageCardProps {
  pkg: Package;
  compareSelected?: boolean;
  onToggleCompare?: (pkg: Package) => void;
}

export default function PackageCard({ pkg, compareSelected = false, onToggleCompare }: PackageCardProps) {
  const status = statusConfig[pkg.statusType];
  const lifecycle = getPackageLifecycle(pkg);
  const isSoldOut = lifecycle === "sold_out" || pkg.statusType === "soldout";
  const statusLabel = lifecycle === "departed"
    ? "Telah berangkat"
    : isSoldOut
      ? "Kuota terisi penuh"
      : pkg.statusType === "pending"
        ? "Perlu dikonfirmasi"
        : pkg.statusType === "warning"
          ? "Kuota terbatas"
          : "Jadwal tersedia";
  const packageImage = pkg.isHaji
    ? "/images/madina-pilgrims.webp"
    : pkg.slug.includes("dubai")
      ? "/images/travel-team.jpg"
      : "/images/kaaba-courtyard.png";

  return (
    <article
      className="bg-warm-surface rounded-card border border-warm-border shadow-card overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-elevated transition-all duration-200 group relative"
      aria-label={`Paket: ${pkg.name}`}
    >
      {/* ── Card Header: real image-led thumbnail, mengikuti Alsha ── */}
      <div className="relative h-36 overflow-hidden bg-teal-primary p-3.5 flex flex-col justify-between">
        <Image src={packageImage} alt={`Dokumentasi ${pkg.name}`} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 30vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-black/20" />

        {/* ── Top row: status badge + duration badge ── */}
        <div className="flex justify-between items-start gap-2 relative z-10">
          {/* Status badge — Alsha pattern: warna + teks + dot */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge text-xs font-bold border ${status.bg} ${status.text} ${status.border} shadow-xs`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`} />
            {statusLabel}
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

        {/* Category is kept in the body so the image stays quiet. */}
      </div>

      {/* ── Card Body ── */}
      <div className="flex-1 flex flex-col p-4 sm:p-5">

        {/* Package Name */}
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold-hover">{pkg.category}</p>
        <h3 className="font-sans text-lg font-bold text-teal-primary leading-snug group-hover:text-teal-700 transition-colors mb-3">
          {pkg.name}
        </h3>

        {/* ── Detail List (pola Alsha .alsha-list) ── */}
        <ul className="space-y-0 text-[13px] font-sans text-slate-body border-t border-b border-warm-border/60 py-2 mb-3">
            {[
            { key: "Keberangkatan", val: pkg.departureDate, bold: true },
            { key: "Embarkasi", val: pkg.departureCity, bold: false },
            { key: "Hotel Makkah", val: pkg.hotelMakkah, bold: false },
            { key: "Hotel Madinah", val: pkg.hotelMadinah, bold: false },
          ].map((row, index) => (
            <li key={row.key} className={`${index > 1 ? "hidden sm:flex" : "flex"} items-start justify-between gap-3 py-1.5 border-b border-warm-border/40 last:border-0`}>
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
            <span className="text-[10px] uppercase font-bold text-slate-caption block">Mulai dari / orang</span>
            {pkg.originalPrice && (
              <span className="text-xs text-slate-caption line-through font-mono block">{pkg.originalPrice}</span>
            )}
            <span className={`text-base font-bold font-sans block ${isSoldOut ? "text-slate-muted" : "text-status-soldout"}`}>
              {pkg.roomPricing?.length ? pkg.roomPricing.reduce((lowest, room) => room.numeric > 0 && room.numeric < lowest ? room.numeric : lowest, Number.MAX_SAFE_INTEGER) !== Number.MAX_SAFE_INTEGER ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(pkg.roomPricing.reduce((lowest, room) => room.numeric > 0 && room.numeric < lowest ? room.numeric : lowest, Number.MAX_SAFE_INTEGER)) : pkg.discountedPrice : pkg.discountedPrice}
            </span>
          </div>

          {/* One clear next step; contact details are shown only when verified. */}
          <div className="flex items-center gap-2 shrink-0">
            {onToggleCompare && <label className="flex min-h-10 items-center gap-1.5 rounded-button border border-warm-border px-2.5 text-[11px] font-bold text-slate-body"><input type="checkbox" checked={compareSelected} onChange={() => onToggleCompare(pkg)} /> Bandingkan</label>}
            {isSoldOut ? (
              <Link
                href={pkg.isHaji ? "/haji" : "/umroh"}
                id={`catalog-${pkg.id}`}
                className="px-3.5 py-2 rounded-button bg-white text-slate-dark border border-warm-border hover:bg-warm-muted text-xs font-bold transition-colors shadow-xs"
              >
                Lihat Paket Aktif
              </Link>
            ) : (
              <Link
                href={`/${pkg.isHaji ? "haji" : "umroh"}/${pkg.slug}`}
                id={`detail-${pkg.id}`}
                className="px-3.5 py-2 rounded-button bg-gold-accent text-slate-dark text-xs font-bold hover:bg-gold-hover transition-colors shadow-card flex items-center gap-1"
              >
                Lihat Detail
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
