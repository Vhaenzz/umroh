import React from "react";
import Link from "next/link";

/**
 * GLOBAL FOOTER COMPONENT
 * Responsive layout: 4 balanced columns on desktop (>=1024px), 2 columns on tablet (768px-1023px), 1 column on mobile (<768px).
 * Displays legal credentials, official banking transparency, contact info, and navigation links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-dark text-white border-t border-warm-border/20 pt-14 pb-12 relative z-20 overflow-hidden">
      {/* Subtle overlay texture */}
      <div className="absolute inset-0 subtle-grain opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main Grid: 4 Columns (Desktop) / 2 Columns (Tablet) / 1 Column (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* COLUMN 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-button bg-teal-primary text-gold-accent font-serif font-bold text-xl flex items-center justify-center border border-gold-accent/30 shadow-sm">
                YT
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  Yayasan Travel
                </h3>
                <p className="text-[10px] font-sans text-gold-accent uppercase tracking-wider font-semibold">
                  Haji & Umroh Resmi
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-caption leading-relaxed font-sans">
              Penyelenggara perjalanan ibadah Haji & Umroh terpercaya dengan komitmen kenyamanan, transparansi biaya, dan bimbingan ibadah sesuai sunnah sejak 2012.
            </p>

            {/* Contact info placeholder */}
            <div className="space-y-2 pt-1 text-xs text-slate-caption font-sans">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Konsultasi perjalanan ibadah dari Jakarta dan online.</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>WhatsApp konsultasi: 0812-0000-0001</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Navigasi Utama */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-accent font-sans">
              Navigasi Situs
            </h4>
            <ul className="space-y-2 text-xs text-slate-caption font-sans">
              <li>
                <Link href="/#umroh" className="hover:text-white transition-colors">
                  Paket Umroh Reguler & Plus
                </Link>
              </li>
              <li>
                <Link href="/#haji" className="hover:text-white transition-colors">
                  Paket Haji Khusus & Furoda
                </Link>
              </li>
              <li>
                <Link href="/#tentang" className="hover:text-white transition-colors">
                  Tentang Kami & Legalitas
                </Link>
              </li>
              <li>
                <Link href="/#testimoni" className="hover:text-white transition-colors">
                  Testimoni & Dokumentasi Jamaah
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ & Syarat Pendaftaran
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Layanan & Kemitraan */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-accent font-sans">
              Layanan & Kemitraan
            </h4>
            <ul className="space-y-2 text-xs text-slate-caption font-sans">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Pembiayaan / Cicilan Syariah
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Pusat Bantuan & Kebijakan Reschedule
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Program Kemitraan & Perwakilan Daerah
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Jadwal Bimbingan Manasik Terpadu
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Profil Muthawwif & Tour Leader
                </span>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Legalitas & Transparansi Rekening */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-accent font-sans">
              Legalitas & Rekening Resmi
            </h4>

            <div className="p-3.5 rounded-card bg-white/5 border border-white/10 space-y-3 font-sans text-xs">
              {/* PPIU License Placeholder */}
              <div>
                <span className="text-[10px] text-slate-caption block">Izin PPIU Kemenag RI:</span>
                <span className="font-semibold text-white font-mono text-[11px]">
                  Dokumen legalitas tersedia saat konsultasi
                </span>
              </div>

              {/* SISKOPATUH Status Placeholder */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] text-slate-caption block">Status SISKOPATUH:</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verifikasi dijelaskan sebelum daftar
                </span>
              </div>

              {/* Official Bank Account Placeholder */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] text-slate-caption block">Rekening Resmi Pembayaran:</span>
                <span className="font-semibold text-gold-accent font-mono text-[11px] block">
                  Rekening resmi diberikan bersama invoice
                </span>
                <span className="text-[10px] text-slate-caption">
                  Pastikan nama penerima sesuai invoice
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Social Media & Bottom Divider */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-caption">
          {/* Copyright notice */}
          <div>
            © {currentYear} Yayasan Travel. Seluruh hak cipta dilindungi undang-undang.
            <span className="block sm:inline sm:ml-2 text-gold-accent/80 text-[11px]">
            Perjalanan ibadah dengan informasi yang jelas.
            </span>
          </div>

          {/* Social Media Icons Placeholder */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-accent transition-colors" aria-label="Instagram">
              Instagram
            </a>
            <span>•</span>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-accent transition-colors" aria-label="Facebook">
              Facebook
            </a>
            <span>•</span>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-accent transition-colors" aria-label="YouTube">
              YouTube Shorts
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
