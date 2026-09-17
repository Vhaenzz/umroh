import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/cms/store";
import { getPackageWhatsAppUrl } from "@/lib/contact";
import SharePackageButton from "@/components/SharePackageButton";

export const dynamic = "force-dynamic";

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { company, packages } = await getSiteData();
  const pkg = packages.find((item) => item.slug.toLowerCase() === slug.toLowerCase() && item.isHaji);
  return { title: pkg ? `${pkg.name} — Haji Khusus | ${company.brandName}` : `Paket Haji Tidak Ditemukan — ${company.brandName}`, description: pkg ? `Detail program Haji Khusus ${pkg.name}, jadwal, biaya, fasilitas, dan proses pendaftaran.` : "Paket Haji Khusus tidak ditemukan." };
}

export default async function HajiDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { company, packages } = await getSiteData();
  const pkg = packages.find((item) => item.slug.toLowerCase() === slug.toLowerCase() && item.isHaji);
  if (!pkg) notFound();

  const included = pkg.facilitiesIncluded || [];
  const excluded = pkg.facilitiesExcluded || [];
  const itinerary = pkg.itinerary || [];
  const whatsappUrl = getPackageWhatsAppUrl(company.phone, pkg);

  return <main className="bg-warm-bg pb-24 lg:pb-0">
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-caption">
        <Link href="/" className="hover:text-teal-primary">Beranda</Link><span aria-hidden="true">/</span><Link href="/haji" className="hover:text-teal-primary">Haji Khusus</Link><span aria-hidden="true">/</span><span className="font-semibold text-teal-primary">{pkg.name}</span>
      </nav>

      <header className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
        <div>
          <div className="flex flex-wrap gap-2"><span className={`rounded-badge px-3 py-1 text-xs font-bold text-white ${pkg.categoryColor}`}>{pkg.category}</span><span className="rounded-badge border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">Perlu konfirmasi kuota</span></div>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-teal-primary sm:text-5xl">{pkg.name}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-body">Program Haji Khusus {pkg.duration} dari {pkg.departureCity}. Tinjau data program, komponen biaya, dan prosedur sebelum meminta konfirmasi tertulis.</p>
          <div className="mt-5 flex flex-wrap gap-3"><SharePackageButton title={pkg.name} /><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-button bg-teal-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-900">Konsultasi paket ini</a></div>
        </div>
        <aside className="rounded-card border border-teal-primary/20 bg-teal-primary p-5 text-white shadow-card lg:sticky lg:top-24"><p className="text-xs font-bold uppercase tracking-wider text-white/65">Mulai dari / orang</p><p className="mt-1 text-2xl font-bold text-gold-accent">{pkg.discountedPrice}</p><p className="mt-2 text-xs leading-5 text-white/75">Nilai paket, kurs, kuota, dan tipe kamar dikonfirmasi sebelum pendaftaran.</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-button bg-gold-accent px-4 py-3 text-sm font-bold text-slate-dark hover:bg-gold-hover">Tanyakan ketersediaan</a></aside>
      </header>

      <section aria-labelledby="haji-specs" className="rounded-card border border-warm-border bg-warm-surface p-5 shadow-card sm:p-7"><h2 id="haji-specs" className="text-xs font-bold uppercase tracking-wider text-slate-caption">Ringkasan program</h2><dl className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-4"><div><dt className="text-xs text-slate-muted">Keberangkatan</dt><dd className="mt-1 text-sm font-bold text-teal-primary">{pkg.departureDate}</dd></div><div><dt className="text-xs text-slate-muted">Durasi</dt><dd className="mt-1 text-sm font-bold text-teal-primary">{pkg.duration}</dd></div><div><dt className="text-xs text-slate-muted">Penerbangan</dt><dd className="mt-1 text-sm font-bold text-teal-primary">{pkg.airline}</dd></div><div><dt className="text-xs text-slate-muted">Embarkasi</dt><dd className="mt-1 text-sm font-bold text-teal-primary">{pkg.departureCity}</dd></div></dl></section>

      {pkg.roomPricing && pkg.roomPricing.length > 0 && <section aria-labelledby="haji-pricing" className="space-y-4"><div><p className="text-xs font-bold uppercase tracking-wider text-gold-hover">Rincian biaya</p><h2 id="haji-pricing" className="mt-1 font-serif text-3xl font-bold text-teal-primary">Pilihan tipe kamar</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{pkg.roomPricing.map((room) => <article key={room.type} className="rounded-card border border-warm-border bg-warm-surface p-5 shadow-card"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-teal-primary">{room.label}</h3>{room.isPopular && <span className="rounded-badge bg-gold-light px-2 py-1 text-[10px] font-bold text-teal-primary">Pilihan populer</span>}</div><p className="mt-3 text-xs text-slate-muted">{room.capacity}</p><p className="mt-1 text-xl font-bold text-status-soldout">{room.price}</p><p className="mt-3 text-sm leading-6 text-slate-body">{room.description}</p></article>)}</div></section>}

      <section className="grid gap-6 lg:grid-cols-2"><article className="rounded-card border border-warm-border bg-warm-surface p-6 shadow-card"><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Termasuk</p><h2 className="mt-2 font-serif text-2xl font-bold text-teal-primary">Fasilitas program</h2><ul className="mt-5 space-y-3 text-sm leading-6 text-slate-body">{included.map((item) => <li key={item} className="flex gap-2"><span className="font-bold text-emerald-700">✓</span>{item}</li>)}</ul></article><article className="rounded-card border border-warm-border bg-warm-surface p-6 shadow-card"><p className="text-xs font-bold uppercase tracking-wider text-red-700">Belum termasuk</p><h2 className="mt-2 font-serif text-2xl font-bold text-teal-primary">Biaya yang perlu ditanyakan</h2><ul className="mt-5 space-y-3 text-sm leading-6 text-slate-body">{excluded.map((item) => <li key={item} className="flex gap-2"><span className="font-bold text-red-700">×</span>{item}</li>)}</ul></article></section>

      {itinerary.length > 0 && <section aria-labelledby="haji-itinerary" className="rounded-card border border-warm-border bg-warm-surface p-6 shadow-card sm:p-8"><p className="text-xs font-bold uppercase tracking-wider text-gold-hover">Rencana perjalanan</p><h2 id="haji-itinerary" className="mt-1 font-serif text-3xl font-bold text-teal-primary">Itinerary {pkg.duration}</h2><div className="mt-5 space-y-3">{itinerary.map((item) => <details key={item.day} className="group rounded-button border border-warm-border bg-warm-bg"><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-bold text-teal-primary"><span>Hari {item.day} — {item.title}</span><span aria-hidden="true" className="text-lg group-open:rotate-45">+</span></summary><div className="border-t border-warm-border px-4 pb-4 pt-3 text-sm leading-6 text-slate-body"><p>{item.activity}</p><p className="mt-2 font-semibold text-teal-primary">Lokasi: {item.location}</p></div></details>)}</div></section>}

      <section aria-labelledby="haji-process" className="rounded-card bg-teal-primary p-6 text-white shadow-elevated sm:p-8"><h2 id="haji-process" className="font-serif text-3xl font-bold">Prosedur Haji Khusus</h2><div className="mt-5 grid gap-5 sm:grid-cols-3"><div><p className="font-mono text-xs font-bold text-gold-accent">01</p><h3 className="mt-2 font-bold">Konsultasi program</h3><p className="mt-1 text-sm leading-6 text-white/75">Cocokkan kuota, jadwal, dokumen, dan kondisi jemaah.</p></div><div><p className="font-mono text-xs font-bold text-gold-accent">02</p><h3 className="mt-2 font-bold">Verifikasi data</h3><p className="mt-1 text-sm leading-6 text-white/75">Minta invoice, aturan pembayaran, dan informasi rekening tertulis.</p></div><div><p className="font-mono text-xs font-bold text-gold-accent">03</p><h3 className="mt-2 font-bold">Persiapan berangkat</h3><p className="mt-1 text-sm leading-6 text-white/75">Lengkapi dokumen dan ikuti manasik sesuai arahan tim.</p></div></div></section>
    </div>
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-warm-border bg-warm-surface p-3 shadow-elevated lg:hidden"><div className="min-w-0"><p className="text-[10px] font-bold uppercase text-slate-caption">Konsultasi paket</p><p className="truncate text-sm font-bold text-teal-primary">{pkg.discountedPrice}</p></div><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="min-h-11 shrink-0 rounded-button bg-teal-primary px-4 py-3 text-xs font-bold text-white">WhatsApp admin</a></div>
  </main>;
}
