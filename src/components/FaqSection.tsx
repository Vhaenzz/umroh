"use client";
import React, { useState } from "react";
import Link from "next/link";

/**
 * FAQ SECTION — Pertanyaan yang Sering Diajukan
 * Menjawab keberatan utama calon jemaah sebelum mereka perlu menghubungi admin.
 */

const faqs = [
  {
    id: "cara-daftar",
    question: "Bagaimana cara mendaftar umroh?",
    answer: "Mulai dari konsultasi kebutuhan dan pilihan jadwal, lanjut melengkapi dokumen, memilih tipe kamar, lalu menerima invoice resmi dan jadwal manasik.",
  },
  {
    id: "harga-termasuk",
    question: "Apa saja yang termasuk dalam harga paket?",
    answer: "Buka detail setiap paket untuk melihat tiket, visa, hotel, makan, itinerary, manasik, dan perlengkapan yang termasuk. Komponen yang belum termasuk ditulis terpisah agar mudah diperiksa.",
  },
  {
    id: "visa-kesehatan",
    question: "Bagaimana dengan visa, paspor, dan vaksin?",
    answer: "Paspor, visa, dan persyaratan kesehatan mengikuti ketentuan perjalanan yang berlaku. Detail dokumen dan tenggatnya perlu dikonfirmasi berdasarkan tanggal keberangkatan paket yang dipilih.",
  },
  {
    id: "tipe-kamar",
    question: "Apa perbedaan kamar quad, triple, dan double?",
    answer: "Quad untuk empat orang, triple untuk tiga orang, dan double untuk dua orang. Harga tiap tipe kamar ditampilkan pada halaman detail paket dan dikonfirmasi kembali sebelum pendaftaran.",
  },
  {
    id: "hotel-itinerary",
    question: "Seberapa jauh hotel dari masjid dan bagaimana itinerary-nya?",
    answer: "Jarak hotel, nama hotel, rute, dan aktivitas harus diperiksa pada detail paket karena dapat berbeda antar keberangkatan. Jangan mengandalkan label umum seperti hotel pilihan.",
  },
  {
    id: "lansia",
    question: "Apakah paket cocok untuk lansia?",
    answer: "Kesesuaian bergantung pada kondisi kesehatan, jarak hotel, ritme itinerary, dan kebutuhan pendampingan. Pilih paket setelah meninjau detailnya dan siapkan informasi kebutuhan jemaah saat pendaftaran.",
  },
  {
    id: "pembatalan",
    question: "Bagaimana aturan DP, pembatalan, dan perubahan jadwal?",
    answer: "Ketentuannya dapat berbeda menurut tiket, visa, hotel, dan kebijakan maskapai. Minta seluruh biaya, tenggat pembayaran, serta aturan reschedule atau refund tertulis sebelum membayar.",
  },
  {
    id: "cara-daftar-lanjutan",
    question: "Apa langkah setelah menemukan paket yang cocok?",
    answer: "Simpan detail paket, periksa komponen biaya dan dokumen, lalu hubungi kanal resmi yang tercantum di website untuk konfirmasi kuota dan proses pendaftaran.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("cara-daftar");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="scroll-mt-24 py-12 sm:py-16 bg-warm-surface border-t border-warm-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-badge bg-gold-light text-teal-primary text-xs font-bold uppercase tracking-wider mb-3 border border-gold-accent/20">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
            Tanya Jawab
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.2rem] font-bold text-teal-primary leading-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="font-sans text-sm text-slate-muted mt-2 leading-relaxed">
            Informasi lengkap dan transparan seputar pendaftaran, dokumen, dan fasilitas perjalanan ibadah.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-card border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-teal-primary/30 bg-warm-bg shadow-sm"
                    : "border-warm-border bg-warm-bg hover:border-teal-primary/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-sans font-bold text-sm text-teal-primary hover:text-teal-900 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-primary/8 text-teal-primary text-xs font-mono flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="leading-snug">{faq.question}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 ${
                      isOpen ? "rotate-180 bg-teal-primary text-white" : "bg-teal-primary/8 text-teal-primary"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-body leading-relaxed border-t border-warm-border/40 font-sans sm:pl-14">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Micro Help Note */}
        <div className="mt-8 text-center bg-warm-muted/50 p-4 rounded-button border border-warm-border/60">
          <p className="text-xs text-slate-muted font-sans">
            Memiliki pertanyaan lain yang belum terjawab?{" "}
            <Link
              href="/umroh"
              className="text-teal-primary font-bold hover:underline"
            >
              Kembali ke katalog paket &rarr;
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
