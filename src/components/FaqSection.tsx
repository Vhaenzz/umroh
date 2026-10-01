"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import type { CompanyProfile } from "@/data/company";
import { getFaqItems, type FaqItem } from "@/data/faq";

/**
 * FAQ SECTION — Pertanyaan yang Sering Diajukan
 * Menjawab keberatan utama calon jemaah sebelum mereka perlu menghubungi admin.
 */

export default function FaqSection({
  company,
  compact = false,
  isHeadingH1 = false,
}: {
  company: CompanyProfile;
  compact?: boolean;
  isHeadingH1?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>("cara-daftar");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const faqs = getFaqItems(company);
  const categories = useMemo(() => Array.from(new Set(faqs.map((faq) => faq.category))), [faqs]);
  const filteredFaqs = useMemo(() => faqs.filter((faq) => {
    const term = searchKeyword.trim().toLowerCase();
    return (category === "all" || faq.category === category) && (!term || `${faq.question} ${faq.answer}`.toLowerCase().includes(term));
  }), [faqs, category, searchKeyword]);
  const displayFaqs = compact ? filteredFaqs.slice(0, 5) : filteredFaqs;

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="scroll-mt-24 py-12 sm:py-16 bg-warm-surface border-t border-warm-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-gold-hover">Tanya jawab</p>
          {isHeadingH1 ? (
            <h1 className="font-serif text-3xl sm:text-[2.2rem] font-bold text-teal-primary leading-tight">
              Pertanyaan yang Sering Diajukan
            </h1>
          ) : (
            <h2 className="font-serif text-3xl sm:text-[2.2rem] font-bold text-teal-primary leading-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
          )}
          <p className="font-sans text-sm text-slate-muted mt-2 leading-relaxed">
            Informasi lengkap dan transparan seputar pendaftaran, dokumen, dan fasilitas perjalanan ibadah.
          </p>
        </div>


        {!compact && (
          <div className="mb-8 space-y-3">
            <label htmlFor="faq-search" className="sr-only">Cari pertanyaan</label>
            <input id="faq-search" type="search" value={searchKeyword} onChange={(event) => setSearchKeyword(event.target.value)} placeholder="Cari pertanyaan tentang paket, dokumen, atau pembayaran" className="min-h-12 w-full rounded-button border border-warm-border bg-warm-bg px-4 text-sm text-slate-dark placeholder:text-slate-caption focus:border-teal-primary focus:outline-none focus:ring-2 focus:ring-teal-primary/15" />
            <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Kategori pertanyaan">
              <button type="button" onClick={() => setCategory("all")} className={`min-h-11 shrink-0 rounded-button border px-4 py-2 text-xs font-bold ${category === "all" ? "border-teal-primary bg-teal-primary text-white" : "border-warm-border text-slate-body hover:border-teal-primary"}`}>Semua</button>
              {categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`min-h-11 shrink-0 rounded-button border px-4 py-2 text-xs font-bold ${category === item ? "border-teal-primary bg-teal-primary text-white" : "border-warm-border text-slate-body hover:border-teal-primary"}`}>{item}</button>)}
            </div>
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {displayFaqs.map((faq, index) => {
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
          {displayFaqs.length === 0 && <div className="rounded-card border border-warm-border bg-warm-bg p-8 text-center"><h3 className="font-serif text-xl font-bold text-teal-primary">Pertanyaan tidak ditemukan</h3><p className="mt-2 text-sm text-slate-muted">Coba kata kunci lain atau tampilkan semua kategori.</p><button type="button" onClick={() => { setSearchKeyword(""); setCategory("all"); }} className="mt-4 min-h-11 rounded-button bg-teal-primary px-4 py-3 text-sm font-bold text-white">Tampilkan semua</button></div>}
        </div>

        {compact && (
          <div className="mt-6 text-center">
            <Link href="/faq" className="inline-flex min-h-11 items-center rounded-button border border-teal-primary px-5 py-3 text-sm font-bold text-teal-primary hover:bg-teal-primary hover:text-white">
              Baca semua pertanyaan
              <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        )}

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
