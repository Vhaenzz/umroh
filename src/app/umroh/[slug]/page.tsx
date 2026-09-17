import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dummyPackages, getPackageBySlug } from "@/data/packages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return dummyPackages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    return {
      title: "Paket Tidak Ditemukan — Pondok Abdurrahman bin Auf",
    };
  }

  return {
    title: `${pkg.name} — Detail Paket, Harga & Jadwal | Pondok Abdurrahman bin Auf`,
    description: `Detail jadwal, fasilitas, rincian harga per kamar, maskapai ${pkg.airline}, dan akomodasi ${pkg.hotelMakkah} untuk ${pkg.name}.`,
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const roomPrices = pkg.roomPricing || [
    {
      type: "Quad",
      label: "Kamar Quad (Sekamar Ber-4)",
      capacity: "4 Orang / Kamar",
      price: pkg.discountedPrice,
      numeric: pkg.priceNumeric,
      description: "Paling hemat, sharing kamar 4 orang.",
      isPopular: true,
    },
    {
      type: "Triple",
      label: "Kamar Triple (Sekamar Ber-3)",
      capacity: "3 Orang / Kamar",
      price: "Rp 38.900.000",
      numeric: 38900000,
      description: "Nyaman untuk 3 orang / keluarga kecil.",
      isPopular: false,
    },
    {
      type: "Double",
      label: "Kamar Double (Sekamar Ber-2)",
      capacity: "2 Orang / Kamar",
      price: "Rp 41.900.000",
      numeric: 41900000,
      description: "Privasi maksimal untuk pasangan suami-istri.",
      isPopular: false,
    },
  ];

  const galleryItems = pkg.gallery || [
    {
      id: "gal-1",
      label: "Akomodasi Makkah",
      tag: "Hotel Makkah Bintang 4",
      caption: "Akomodasi Nyaman Dekat Pelataran Masjidil Haram",
    },
    {
      id: "gal-2",
      label: "Akomodasi Madinah",
      tag: "Hotel Madinah Bintang 4",
      caption: "Akomodasi Strategis Selangkah ke Masjid Nabawi",
    },
    {
      id: "gal-3",
      label: "City tour Thaif",
      tag: "City Tour Thaif",
      caption: "Napak Tilas Sejarah & Suasana Sejuk Perkebunan Thaif",
    },
    {
      id: "gal-4",
      label: "Bimbingan manasik",
      tag: "Bimbingan Manasik",
      caption: "Manasik Komprehensif 3x Pertemuan Sebelum Keberangkatan",
    },
  ];

  const itineraryDays = pkg.itinerary || [];
  const facilitiesIncluded = pkg.facilitiesIncluded || [
    "City Tour Thaif",
    "Manasik 3x",
    "Perlengkapan Umroh",
    "Muthawif Berpengalaman",
    "Tiket Pesawat PP Saudia Airlines Direct",
    "Visa Umroh & Asuransi Perjalanan",
    "Hotel Makkah & Madinah Bintang 4",
    "Makan 3x Sehari Menu Nusantara",
  ];

  const facilitiesExcluded = pkg.facilitiesExcluded || [
    "Biaya Pembuatan / Perpanjangan Paspor",
    "Vaksin Meningitis / Polio",
    "Pengeluaran Pribadi (Laundry, Roaming Internet, Kursi Roda Mandiri)",
  ];

  return (
    <div className="bg-warm-bg min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* ── 1. BREADCRUMBS ── */}
        <nav aria-label="Breadcrumb" className="text-xs font-sans text-slate-caption flex items-center gap-2">
          <Link href="/" className="hover:text-teal-primary transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/umroh" className="hover:text-teal-primary transition-colors">
            Paket Umroh
          </Link>
          <span>/</span>
          <span className="text-teal-primary font-semibold truncate max-w-[200px] sm:max-w-md">
            {pkg.name}
          </span>
        </nav>

        {/* ── 2. HEADER TITLE & META BADGES ── */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Category */}
            <span className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider rounded-badge shadow-xs ${pkg.categoryColor}`}>
              {pkg.category}
            </span>

            {/* Quota Status */}
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-badge text-[11px] sm:text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              {pkg.statusType === "soldout" ? "Kuota terisi penuh" : "Jadwal tersedia"}
            </span>

            {/* Flight Type Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-badge text-[11px] sm:text-xs font-semibold bg-teal-primary/8 text-teal-primary border border-teal-primary/15 font-sans">
              <svg className="w-3.5 h-3.5 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              {pkg.flightType || "Direct Flight"}
            </span>

          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-primary leading-tight">
            {pkg.name}
          </h1>

          <p className="font-sans text-sm sm:text-base text-slate-body leading-relaxed max-w-4xl">
            Perjalanan ibadah {pkg.duration} dari {pkg.departureCity} dengan {pkg.flightType.toLowerCase()} bersama <strong className="text-teal-primary">{pkg.airline}</strong>. Tinjau itinerary, fasilitas, akomodasi, dan tipe kamar pada halaman ini sebelum mendaftar.
          </p>
        </div>

        {/* ── 3. Galeri paket ── */}
        <section aria-labelledby="gallery-heading" className="space-y-3">
          <h2 id="gallery-heading" className="sr-only">Galeri Dokumentasi Paket</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Slot 1 (Besar - Kiri) */}
            <div className="md:col-span-6 relative rounded-card overflow-hidden border border-warm-border bg-warm-surface shadow-card">
              <div className="aspect-4/3 w-full bg-linear-to-br from-teal-900 via-teal-primary to-teal-950 flex flex-col items-center justify-center p-6 text-center relative group">
                <div className="absolute inset-0 subtle-grain opacity-25 pointer-events-none" />
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="font-serif text-white font-bold text-sm sm:text-base leading-snug">
                  {galleryItems[0].label}
                </p>
                <p className="font-sans text-gold-accent text-xs font-semibold mt-1">
                  {galleryItems[0].tag}
                </p>
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/40 backdrop-blur-xs rounded-badge text-white font-mono text-[10px] font-bold">
                  Foto 1 / 4
                </span>
                <span className="absolute bottom-3 inset-x-3 text-[11px] text-white/70 font-sans text-center truncate">
                  {galleryItems[0].caption}
                </span>
              </div>
            </div>

            {/* Slot 2, 3, 4 (Kanan) */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {galleryItems.slice(1, 4).map((item, idx) => (
                <div
                  key={item.id}
                  className={`relative rounded-card overflow-hidden border border-warm-border bg-warm-surface shadow-card ${
                    idx === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className={`aspect-4/3 sm:aspect-auto ${idx === 2 ? "sm:h-44" : "sm:h-44"} w-full bg-linear-to-br from-teal-800 to-teal-900 flex flex-col items-center justify-center p-4 text-center relative`}>
                    <div className="absolute inset-0 subtle-grain opacity-20 pointer-events-none" />
                    <p className="font-serif text-white font-bold text-xs sm:text-sm leading-snug">
                      {item.label}
                    </p>
                    <p className="font-sans text-gold-accent text-[11px] font-semibold mt-0.5">
                      {item.tag}
                    </p>
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/40 backdrop-blur-xs rounded-badge text-white font-mono text-[10px] font-bold">
                      Foto {idx + 2} / 4
                    </span>
                    <span className="absolute bottom-2 inset-x-2 text-[10px] text-white/60 font-sans text-center truncate">
                      {item.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-caption font-sans text-right italic">
            *Dokumentasi asli akomodasi &amp; kegiatan jemaah akan dimuat sesuai izin publikasi
          </p>
        </section>

        {/* ── 4. KEY SPECIFICATIONS SUMMARY STRIP ── */}
        <section aria-labelledby="specs-heading" className="bg-warm-surface rounded-card border border-warm-border p-5 sm:p-7 shadow-card">
          <h2 id="specs-heading" className="text-xs font-bold uppercase tracking-wider text-slate-caption font-sans mb-4">
            Informasi Kunci Keberangkatan
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-warm-border">
            
            {/* Tanggal */}
            <div className="pt-2 sm:pt-0 sm:px-3 first:px-0">
              <span className="text-[11px] text-slate-muted block font-sans">Tanggal Berangkat</span>
              <span className="font-sans font-bold text-sm text-teal-primary mt-0.5 block">
                {pkg.departureDate}
              </span>
              <span className="text-[10px] text-slate-muted block font-mono">Konfirmasi sebelum daftar</span>
            </div>

            {/* Durasi */}
            <div className="pt-2 sm:pt-0 sm:px-3">
              <span className="text-[11px] text-slate-muted block font-sans">Durasi Paket</span>
              <span className="font-sans font-bold text-sm text-teal-primary mt-0.5 block">
                {pkg.duration}
              </span>
              <span className="text-[10px] text-slate-caption block font-mono">Makkah &amp; Madinah</span>
            </div>

            {/* Maskapai */}
            <div className="pt-2 sm:pt-0 sm:px-3">
              <span className="text-[11px] text-slate-muted block font-sans">Penerbangan</span>
              <span className="font-sans font-bold text-sm text-teal-primary mt-0.5 block truncate" title={pkg.airline}>
                {pkg.airline}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block">{pkg.flightType}</span>
            </div>

            {/* Embarkasi */}
            <div className="pt-2 sm:pt-0 sm:px-3">
              <span className="text-[11px] text-slate-muted block font-sans">Kota Embarkasi</span>
              <span className="font-sans font-bold text-sm text-teal-primary mt-0.5 block">
                {pkg.departureCity}
              </span>
              <span className="text-[10px] text-slate-caption block">Bandara Soetta</span>
            </div>

            {/* Hotel Makkah */}
            <div className="pt-2 sm:pt-0 sm:px-3">
              <span className="text-[11px] text-slate-muted block font-sans">Hotel Makkah</span>
              <span className="font-sans font-bold text-xs text-teal-primary mt-0.5 block truncate" title={pkg.hotelMakkah}>
                {pkg.hotelMakkah}
              </span>
              <span className="text-[10px] text-slate-muted font-semibold block">Nama &amp; jarak dikonfirmasi</span>
            </div>

            {/* Hotel Madinah */}
            <div className="pt-2 sm:pt-0 sm:px-3">
              <span className="text-[11px] text-slate-muted block font-sans">Hotel Madinah</span>
              <span className="font-sans font-bold text-xs text-teal-primary mt-0.5 block truncate" title={pkg.hotelMadinah}>
                {pkg.hotelMadinah}
              </span>
              <span className="text-[10px] text-slate-muted font-semibold block">Nama &amp; jarak dikonfirmasi</span>
            </div>

          </div>
        </section>

        {/* ── 5. RINCIAN HARGA PER TIPE KAMAR (STACKED CARDS ON MOBILE) ── */}
        <section aria-labelledby="pricing-heading" className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-warm-border pb-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-gold-light text-teal-primary text-xs font-bold uppercase tracking-wider mb-1 border border-gold-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                Transparansi Biaya
              </div>
              <h2 id="pricing-heading" className="font-serif text-2xl sm:text-3xl font-bold text-teal-primary">
                Rincian Harga Paket per Tipe Kamar
              </h2>
            </div>
            <p className="text-xs text-slate-muted font-sans">
              Harga per jemaah dan komponen biaya
            </p>
          </div>

          {/*
            RESPONSIVE PRICING STRUCTURE:
            Mobile: Stacked vertical cards with clear pricing breakdown without horizontal scrolling.
            Desktop: 3-column side-by-side comparison cards.
          */}
          <div className="mobile-rail sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {roomPrices.map((room) => (
                <div
                  key={room.type}
                  className={`rounded-card border p-6 flex flex-col justify-between transition-all duration-200 relative ${
                    room.isPopular
                      ? "bg-warm-surface border-teal-primary shadow-elevated ring-2 ring-teal-primary/20"
                      : "bg-warm-surface border-warm-border shadow-card hover:border-teal-primary/30"
                  }`}
                >
                  {room.isPopular && (
                    <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gold-accent text-teal-900 text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      Paling Diminati
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-serif text-xl font-bold text-teal-primary">
                        {room.label}
                      </h3>
                      <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-badge bg-teal-primary/8 text-teal-primary">
                        {room.capacity}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-slate-body leading-relaxed mb-4">
                      {room.description}
                    </p>

                    <div className="p-3.5 rounded-button bg-warm-bg border border-warm-border mb-4">
                      <span className="text-[10px] text-slate-caption uppercase font-bold block font-sans">
                        Biaya Paket / Orang
                      </span>
                      <span className="font-sans text-2xl sm:text-[1.65rem] font-bold text-teal-primary block mt-0.5">
                        {room.price}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold block font-sans mt-0.5">
                        Fasilitas mengikuti daftar paket
                      </span>
                    </div>
                  </div>

                  <p className="pt-2 text-xs text-slate-muted leading-relaxed">
                    Tipe kamar dikonfirmasi bersama admin sebelum pendaftaran.
                  </p>
                </div>
              ))}
          </div>
        </section>

        {/* ── 6. FASILITAS TERMASUK & TIDAK TERMASUK (BADGES & LIST) ── */}
        <section aria-labelledby="facilities-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Termasuk (7 Kolom) */}
          <div className="lg:col-span-7 bg-warm-surface rounded-card border border-warm-border p-6 sm:p-7 shadow-card space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Fasilitas Lengkap
              </div>
              <h2 id="facilities-heading" className="font-serif text-2xl font-bold text-teal-primary">
                Fasilitas Termasuk dalam Biaya Paket
              </h2>
            </div>

            {/* Featured Highlight Badges */}
            <div className="flex flex-wrap gap-2 pt-1 pb-2">
              {["City Tour Thaif", "Manasik 3x", "Perlengkapan Umroh", "Muthawif Berpengalaman"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-badge bg-teal-primary text-white text-xs font-bold shadow-xs"
                >
                  <span>✓</span>
                  <span>{badge}</span>
                </span>
              ))}
            </div>

            {/* Detailed Included List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-warm-border/60 font-sans text-xs text-slate-body">
              {facilitiesIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tidak Termasuk (5 Kolom) */}
          <div className="lg:col-span-5 bg-warm-surface rounded-card border border-warm-border p-6 sm:p-7 shadow-card space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-2 border border-red-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Biaya Tambahan
              </div>
              <h3 className="font-serif text-2xl font-bold text-teal-primary">
                Biaya Belum Termasuk
              </h3>
            </div>

            <p className="font-sans text-xs text-slate-muted leading-relaxed">
              Biaya personal yang tidak tercakup dalam paket reguler kami:
            </p>

            <ul className="space-y-2.5 font-sans text-xs text-slate-body">
              {facilitiesExcluded.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✕
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-3 bg-warm-muted/70 rounded-button border border-warm-border text-[11px] text-slate-caption font-sans">
              💡 Seluruh rincian biaya di atas bersifat mengikat dan tertuang jelas pada Akad Perjanjian Perjalanan Ibadah Umroh.
            </div>
          </div>

        </section>

        {/* ── 7. ITINERARY RINCI 10 HARI (DAY-BY-DAY TIMELINE) ── */}
        <section aria-labelledby="itinerary-heading" className="bg-warm-surface rounded-card border border-warm-border p-6 sm:p-8 shadow-card space-y-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-teal-primary/8 text-teal-primary text-xs font-bold uppercase tracking-wider mb-2 border border-teal-primary/15">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
              Rencana Perjalanan
            </div>
            <h2 id="itinerary-heading" className="font-serif text-2xl sm:text-3xl font-bold text-teal-primary">
              Itinerary Perjalanan 10 Hari
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-muted mt-1 leading-relaxed">
              Jadwal tersusun optimal agar jemaah dapat beribadah khusyuk tanpa kelelahan yang berlebihan.
            </p>
          </div>

          {/* 10 Baris Placeholder Timeline */}
          <div className="space-y-4 border-l-2 border-teal-primary/20 ml-3 sm:ml-4 pl-4 sm:pl-6">
            {itineraryDays.map((item) => (
              <div key={item.day} className="relative group">
                {/* Timeline node dot */}
                <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 w-4 h-4 rounded-full bg-teal-primary border-2 border-white shadow-xs group-hover:scale-125 transition-transform" />

                <div className="p-4 rounded-card border border-warm-border bg-warm-bg hover:border-teal-primary/30 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-serif font-bold text-base text-teal-primary">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-badge bg-gold-light text-teal-primary border border-gold-accent/20">
                      📍 {item.location}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-slate-body leading-relaxed">
                    {item.activity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-caption font-sans italic pt-2">
            *Jadwal itinerary dapat disesuaikan di lapangan mengikuti kondisi lalu lintas, izin tasreh Raudhah (Nusuk), dan kebijakan otoritas Arab Saudi tanpa mengurangi hak ibadah jemaah.
          </p>
        </section>

        {/* ── 8. LARGE CTA BOX ── */}
        <section aria-labelledby="cta-heading" className="rounded-box bg-teal-primary text-white p-8 sm:p-12 shadow-elevated relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-gold-accent/20 text-gold-accent text-xs font-bold uppercase tracking-wider border border-gold-accent/30">
              Konsultasi &amp; Pendaftaran Resmi
            </span>

            <h2 id="cta-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-bg leading-tight">
              Tertarik dengan Paket {pkg.name}?
            </h2>

            <p className="font-sans text-sm sm:text-base text-slate-100/90 leading-relaxed max-w-xl mx-auto">
              Periksa kembali detail paket, komponen biaya, dokumen, dan pilihan kamar sebelum menghubungi kanal resmi.
            </p>

            {/* One clear next step; contact details are shown only after verification. */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/umroh"
                id="cta-detail-katalog"
                className="w-full sm:w-auto min-h-13 px-7 py-3.5 rounded-button bg-gold-accent hover:bg-gold-hover text-teal-900 font-sans font-bold text-sm shadow-card flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>Kembali ke Katalog Paket</span>
              </Link>

              <Link
                href="/umroh"
                id="cta-detail-paket-lain"
                className="w-full sm:w-auto min-h-13 px-7 py-3.5 rounded-button border border-white/30 hover:bg-white/10 text-white font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Lihat Paket Lain</span>
              </Link>
            </div>

            <p className="text-xs text-white/70 font-sans pt-2">
              Kanal kontak resmi akan ditampilkan setelah data layanan terverifikasi.
            </p>
          </div>
        </section>

      </div>

      {/* ── 9. STICKY BOTTOM BAR FOR MOBILE HIGH-CONVERSION ── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-warm-surface border-t border-warm-border p-3.5 px-4 shadow-elevated flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] text-slate-caption block uppercase font-bold font-sans">
            Mulai Dari (Quad)
          </span>
          <span className="font-sans font-bold text-base text-teal-primary block truncate">
            {pkg.discountedPrice}
          </span>
        </div>

        <Link
          href="/umroh"
          id="mobile-sticky-cta-katalog"
          className="min-h-11 px-5 py-2.5 rounded-button bg-teal-primary text-white font-sans text-xs font-bold shadow-card flex items-center gap-2 shrink-0 active:scale-[0.98]"
        >
          <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          <span>Lihat Katalog</span>
        </Link>
      </div>

    </div>
  );
}
