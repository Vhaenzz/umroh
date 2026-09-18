"use client";
import React from "react";
import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import type { Package } from "@/types/package";

/**
 * FEATURED PACKAGES SECTION
 * Menampilkan 3 paket terpopuler di halaman Beranda.
 */
export default function FeaturedPackagesSection({ packages }: { packages: Package[] }) {
  const featuredList = packages.slice(0, 3);

  return (
    <section id="umroh" className="scroll-mt-24 py-12 sm:py-16 bg-warm-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-warm-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-teal-primary/8 text-teal-primary text-xs font-bold uppercase tracking-wider mb-2 border border-teal-primary/15">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
              Paket Pilihan
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-primary leading-tight">
              Pilihan Paket Umroh &amp; Haji Terpopuler
            </h2>
            <p className="text-xs sm:text-sm text-slate-muted mt-2 font-sans max-w-xl">
              Pilihan jadwal terdekat dengan hotel terkonfirmasi dan rincian harga transparan.
            </p>
          </div>

          {/* "Lihat Semua" CTA */}
          <Link
            href="/umroh"
            id="see-all-packages"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-teal-primary hover:text-gold-hover transition-colors font-sans group whitespace-nowrap"
          >
            <span>Lihat Semua Paket</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* ── Package Grid / Mobile Rail ── */}
        <div className="mobile-rail sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {featuredList.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* ── Mobile: Lihat Semua button ── */}
        <div className="sm:hidden text-center pt-2">
          <Link
            href="/umroh"
            id="see-all-mobile"
            className="w-full py-3 px-5 rounded-button bg-warm-surface border border-warm-border text-teal-primary text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs hover:bg-warm-muted"
          >
            <span>Lihat Semua Paket Umroh &amp; Haji</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
