"use client";
import React from "react";

/**
 * CTA BANNER SECTION — Section CTA Penutup
 * Menampilkan ajakan konsultasi gratis via WhatsApp dan navigasi ke paket ibadah.
 */

export default function CtaBannerSection() {
  return (
    <section className="py-14 sm:py-20 bg-teal-primary text-white relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      {/* Subtle gold glow blur in corner */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-gold-accent/20 text-gold-accent text-xs font-bold uppercase tracking-wider mb-4 border border-gold-accent/30">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
          Langkah Awal Ibadah
        </span>
        
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-bg leading-tight max-w-3xl mx-auto">
          Wujudkan Niat Ibadah Anda Tahun Ini
        </h2>

        <p className="font-sans text-sm sm:text-base text-slate-100/90 mt-4 max-w-2xl mx-auto leading-relaxed">
          Ceritakan rencana perjalanan Anda. Kami bantu membandingkan jadwal, fasilitas, dan pilihan kamar dengan jelas.
        </p>

        {/* Action Buttons: Dual CTA */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/6281200000001?text=Assalamu%27alaikum%2C+saya+ingin+konsultasi+gratis+mengenai+rencana+ibadah+Haji+%2F+Umroh"
            target="_blank"
            rel="noopener noreferrer"
            id="cta-penutup-wa"
            className="w-full sm:w-auto px-7 py-3.5 rounded-button bg-gold-accent hover:bg-gold-hover text-teal-900 font-sans font-bold text-sm shadow-card flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>Konsultasi Gratis via WhatsApp</span>
          </a>

          <a
            href="#paket-unggulan"
            id="cta-penutup-lihat-paket"
            className="w-full sm:w-auto px-7 py-3.5 rounded-button border border-white/30 hover:bg-white/10 text-white font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          >
            <span>Lihat Semua Paket</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Reassurance text */}
        <p className="mt-6 text-xs text-white/70 font-sans">
          Konsultasi ramah tanpa komitmen • Pendampingan pendaftaran resmi berizin PPIU Kemenag
        </p>

      </div>
    </section>
  );
}
