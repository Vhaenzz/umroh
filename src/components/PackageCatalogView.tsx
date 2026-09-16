"use client";
import React, { useState, useMemo, useEffect } from "react";
import PackageCard from "@/components/PackageCard";
import { Package, FilterState } from "@/types/package";

interface PackageCatalogViewProps {
  initialPackages: Package[];
  title: string;
  subtitle: string;
  badgeLabel: string;
  defaultPackageType?: string;
}

const initialFilterState: FilterState = {
  month: "all",
  city: "all",
  duration: "all",
  priceRange: "all",
  packageType: "all",
};

export default function PackageCatalogView({
  initialPackages,
  title,
  subtitle,
  badgeLabel,
  defaultPackageType = "all",
}: PackageCatalogViewProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...initialFilterState,
    packageType: defaultPackageType,
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Lock body scroll when mobile bottom sheet is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);

  // Close filter sheet on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileFilterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter option choices derived from available data
  const monthOptions = useMemo(() => {
    const months = Array.from(new Set(initialPackages.map((p) => p.departureMonth)));
    return [{ value: "all", label: "Semua Bulan" }, ...months.map((m) => ({ value: m, label: m }))];
  }, [initialPackages]);

  const cityOptions = useMemo(() => {
    const cities = Array.from(new Set(initialPackages.map((p) => p.departureCity)));
    return [{ value: "all", label: "Semua Kota" }, ...cities.map((c) => ({ value: c, label: c }))];
  }, [initialPackages]);

  const durationOptions = [
    { value: "all", label: "Semua Durasi" },
    { value: "short", label: "9 - 10 Hari (Reguler)" },
    { value: "medium", label: "12 - 14 Hari (Plus / Liburan)" },
    { value: "long", label: "> 20 Hari (Haji Khusus)" },
  ];

  const priceOptions = [
    { value: "all", label: "Semua Kisaran Harga" },
    { value: "under-35", label: "< Rp 35 Juta" },
    { value: "35-45", label: "Rp 35 Juta - Rp 45 Juta" },
    { value: "above-45", label: "> Rp 45 Juta" },
  ];

  const typeOptions = [
    { value: "all", label: "Semua Tipe Paket" },
    { value: "reguler", label: "Umroh Reguler" },
    { value: "plus", label: "Umroh Plus" },
    { value: "khusus", label: "Haji Khusus" },
  ];

  // Filtering logic
  const filteredPackages = useMemo(() => {
    return initialPackages.filter((pkg) => {
      // Search keyword filter
      if (
        searchKeyword &&
        !pkg.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        !pkg.airline.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        !pkg.hotelMakkah.toLowerCase().includes(searchKeyword.toLowerCase())
      ) {
        return false;
      }

      // Month filter
      if (filters.month !== "all" && pkg.departureMonth !== filters.month) {
        return false;
      }

      // City filter
      if (filters.city !== "all" && pkg.departureCity !== filters.city) {
        return false;
      }

      // Duration filter
      if (filters.duration === "short" && (pkg.durationDays < 9 || pkg.durationDays > 10)) {
        return false;
      }
      if (filters.duration === "medium" && (pkg.durationDays < 11 || pkg.durationDays > 15)) {
        return false;
      }
      if (filters.duration === "long" && pkg.durationDays < 16) {
        return false;
      }

      // Price filter
      if (filters.priceRange === "under-35" && pkg.priceNumeric >= 35000000) {
        return false;
      }
      if (filters.priceRange === "35-45" && (pkg.priceNumeric < 35000000 || pkg.priceNumeric > 45000000)) {
        return false;
      }
      if (filters.priceRange === "above-45" && pkg.priceNumeric <= 45000000) {
        return false;
      }

      // Package type filter
      if (filters.packageType !== "all" && pkg.packageType !== filters.packageType) {
        return false;
      }

      return true;
    });
  }, [initialPackages, filters, searchKeyword]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.month !== "all") count++;
    if (filters.city !== "all") count++;
    if (filters.duration !== "all") count++;
    if (filters.priceRange !== "all") count++;
    if (filters.packageType !== "all") count++;
    if (searchKeyword.trim() !== "") count++;
    return count;
  }, [filters, searchKeyword]);

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    setSearchKeyword("");
  };

  return (
    <div className="bg-warm-bg min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ── Page Header Banner ── */}
        <div className="bg-warm-surface rounded-box border border-warm-border p-6 sm:p-10 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-teal-primary/8 text-teal-primary text-xs font-bold uppercase tracking-wider mb-3 border border-teal-primary/15">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
              {badgeLabel}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-primary leading-tight">
              {title}
            </h1>
            <p className="font-sans text-sm sm:text-base text-slate-muted mt-3 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* ── Search Bar & Mobile Filter Trigger Bar ── */}
        <div className="bg-warm-surface rounded-card border border-warm-border p-4 sm:p-5 shadow-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Quick Search */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Cari nama paket, maskapai, hotel..."
              className="w-full pl-10 pr-4 py-2.5 rounded-button border border-warm-border bg-warm-bg text-sm font-sans text-slate-dark focus:outline-none focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-all"
            />
            <svg
              className="w-4 h-4 text-slate-caption absolute left-3.5 top-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchKeyword && (
              <button
                type="button"
                onClick={() => setSearchKeyword("")}
                className="absolute right-3 top-3 text-xs text-slate-caption hover:text-slate-dark"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results Counter & Filter Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs font-sans text-slate-muted">
              Menampilkan <strong className="text-teal-primary font-bold">{filteredPackages.length}</strong> dari {initialPackages.length} paket
            </span>

            {/* Mobile & Tablet Trigger Button (<1024px) */}
            <button
              type="button"
              id="btn-open-mobile-filter"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-button bg-teal-primary text-white font-sans text-xs font-bold shadow-card hover:bg-teal-900 transition-all"
            >
              <svg className="w-4 h-4 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold-accent text-teal-900 text-[10px] font-bold flex items-center justify-center font-mono">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Active Filters Tag Bar ── */}
        {activeFilterCount > 0 && (
          <div className="flex items-center flex-wrap gap-2 pt-1">
            <span className="text-xs text-slate-caption font-sans">Filter Aktif:</span>
            
            {filters.month !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-medium border border-teal-primary/20">
                <span>Bulan: {filters.month}</span>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, month: "all" })}
                  className="hover:text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            )}

            {filters.city !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-medium border border-teal-primary/20">
                <span>Kota: {filters.city}</span>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, city: "all" })}
                  className="hover:text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            )}

            {filters.duration !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-medium border border-teal-primary/20">
                <span>Durasi: {durationOptions.find((d) => d.value === filters.duration)?.label}</span>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, duration: "all" })}
                  className="hover:text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            )}

            {filters.priceRange !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-medium border border-teal-primary/20">
                <span>Harga: {priceOptions.find((p) => p.value === filters.priceRange)?.label}</span>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, priceRange: "all" })}
                  className="hover:text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            )}

            {filters.packageType !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-medium border border-teal-primary/20">
                <span>Tipe: {typeOptions.find((t) => t.value === filters.packageType)?.label}</span>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, packageType: "all" })}
                  className="hover:text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-status-soldout hover:underline font-bold ml-2 font-sans"
            >
              Reset Semua Filter
            </button>
          </div>
        )}

        {/* ── Main Catalog Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── DESKTOP SIDEBAR FILTER (≥1024px) ── */}
          <aside className="hidden lg:block lg:col-span-4 bg-warm-surface rounded-card border border-warm-border p-6 shadow-card sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-warm-border">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-teal-primary">
                <svg className="w-5 h-5 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filter Pencarian</span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-teal-primary hover:text-gold-accent font-bold font-sans transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            {/* 1. Tipe Paket */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-caption font-sans block">
                Tipe Paket
              </label>
              <div className="space-y-1.5">
                {typeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilters({ ...filters, packageType: opt.value })}
                    className={`w-full text-left px-3 py-2 rounded-button text-xs font-sans font-semibold transition-all flex items-center justify-between ${
                      filters.packageType === opt.value
                        ? "bg-teal-primary text-white shadow-xs"
                        : "bg-warm-bg hover:bg-warm-muted text-slate-body border border-warm-border/60"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {filters.packageType === opt.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Bulan Keberangkatan */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-caption font-sans block">
                Bulan Keberangkatan
              </label>
              <select
                value={filters.month}
                onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                className="w-full px-3 py-2.5 rounded-button border border-warm-border bg-warm-bg text-xs font-sans text-slate-dark focus:outline-none focus:border-teal-primary"
              >
                {monthOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Kota Keberangkatan (Embarkasi) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-caption font-sans block">
                Kota Keberangkatan
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-3 py-2.5 rounded-button border border-warm-border bg-warm-bg text-xs font-sans text-slate-dark focus:outline-none focus:border-teal-primary"
              >
                {cityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Durasi Perjalanan */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-caption font-sans block">
                Durasi Perjalanan
              </label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                className="w-full px-3 py-2.5 rounded-button border border-warm-border bg-warm-bg text-xs font-sans text-slate-dark focus:outline-none focus:border-teal-primary"
              >
                {durationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Range Harga */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-caption font-sans block">
                Kisaran Harga
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full px-3 py-2.5 rounded-button border border-warm-border bg-warm-bg text-xs font-sans text-slate-dark focus:outline-none focus:border-teal-primary"
              >
                {priceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Action */}
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2.5 rounded-button border border-warm-border text-slate-muted hover:text-slate-dark hover:bg-warm-muted text-xs font-bold font-sans transition-colors"
              >
                Bersihkan Semua Filter
              </button>
            )}
          </aside>

          {/* ── RESULTS GRID / EMPTY STATE ── */}
          <div className="lg:col-span-8 space-y-6">
            {filteredPackages.length > 0 ? (
              <div className="mobile-rail md:grid-cols-2 gap-5 lg:gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              /* ── Actionable Empty State ── */
              <div className="bg-warm-surface rounded-card border border-warm-border p-8 sm:p-12 text-center shadow-card space-y-4">
                <div className="w-16 h-16 rounded-full bg-teal-primary/8 text-teal-primary flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-teal-primary">
                  Belum Ada Paket yang Cocok
                </h3>
                <p className="font-sans text-sm text-slate-muted max-w-md mx-auto leading-relaxed">
                  Tidak ada jadwal atau paket yang memenuhi kombinasi filter yang Anda pilih. Coba sesuaikan bulan, kota, atau kisaran harga.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-6 py-3 rounded-button bg-teal-primary hover:bg-teal-900 text-white font-sans text-xs font-bold shadow-card transition-all"
                  >
                    Reset Filter Pencarian
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ── MOBILE & TABLET BOTTOM SHEET FILTER MODAL (<1024px) ── */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
        >
          {/* Backdrop with fade-in */}
          <div
            className="fixed inset-0 bg-slate-dark/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Bottom Sheet Panel sliding up */}
          <div className="relative z-10 w-full max-h-[85vh] bg-warm-surface rounded-t-[24px] border-t border-warm-border shadow-elevated flex flex-col animate-in slide-in-from-bottom duration-300">
            
            {/* Drag Handle & Top Header */}
            <div className="p-4 sm:p-5 border-b border-warm-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-gold-accent" />
                <h3 id="mobile-filter-title" className="font-serif text-lg font-bold text-teal-primary">
                  Filter Paket Ibadah
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs text-status-soldout hover:underline font-bold font-sans"
                  >
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-warm-muted flex items-center justify-center text-slate-dark hover:bg-warm-border transition-colors font-bold text-sm"
                  aria-label="Tutup filter"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Filter Options */}
            <div className="p-5 overflow-y-auto space-y-5 flex-1 font-sans">
              
              {/* 1. Tipe Paket */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-caption block mb-2">
                  Tipe Paket
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {typeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFilters({ ...filters, packageType: opt.value })}
                      className={`min-h-[44px] px-3 py-2 rounded-button text-xs font-semibold text-center transition-all ${
                        filters.packageType === opt.value
                          ? "bg-teal-primary text-white shadow-xs"
                          : "bg-warm-bg text-slate-body border border-warm-border/80 hover:bg-warm-muted"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Bulan Keberangkatan */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-caption block mb-2">
                  Bulan Keberangkatan
                </label>
                <select
                  value={filters.month}
                  onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2.5 rounded-button border border-warm-border bg-warm-bg text-sm text-slate-dark focus:outline-none focus:border-teal-primary"
                >
                  {monthOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Kota Keberangkatan */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-caption block mb-2">
                  Kota Keberangkatan (Embarkasi)
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2.5 rounded-button border border-warm-border bg-warm-bg text-sm text-slate-dark focus:outline-none focus:border-teal-primary"
                >
                  {cityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Durasi */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-caption block mb-2">
                  Durasi Perjalanan
                </label>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2.5 rounded-button border border-warm-border bg-warm-bg text-sm text-slate-dark focus:outline-none focus:border-teal-primary"
                >
                  {durationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Range Harga */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-caption block mb-2">
                  Kisaran Harga
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2.5 rounded-button border border-warm-border bg-warm-bg text-sm text-slate-dark focus:outline-none focus:border-teal-primary"
                >
                  {priceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* ── Sticky Bottom Action Bar with Match Count ── */}
            <div className="p-4 border-t border-warm-border bg-warm-surface flex items-center gap-3">
              <button
                type="button"
                id="btn-apply-mobile-filter"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full min-h-12 py-3 px-6 rounded-button bg-teal-primary hover:bg-teal-900 active:scale-[0.98] text-white font-sans text-sm font-bold shadow-card flex items-center justify-center gap-2 transition-all"
              >
                <span>Tampilkan {filteredPackages.length} Paket</span>
                <svg className="w-4 h-4 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
