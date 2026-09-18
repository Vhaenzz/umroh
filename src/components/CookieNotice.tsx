"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't acknowledged before
    const hasConsent = window.localStorage.getItem("rm_cookie_consent");
    if (!hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    window.localStorage.setItem("rm_cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Pemberitahuan Privasi & Cookie"
      className="fixed bottom-20 sm:bottom-5 left-4 right-4 sm:right-auto sm:max-w-sm z-30 animate-in slide-in-from-bottom-3 duration-300 font-sans"
    >
      <div className="bg-slate-dark/95 backdrop-blur-md text-white border border-white/15 p-3.5 sm:p-4 rounded-card shadow-elevated text-xs space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <span className="font-bold text-gold-accent flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gold-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Kenyamanan &amp; Privasi Anda</span>
          </span>
          <button
            type="button"
            onClick={handleAccept}
            className="text-white/60 hover:text-white text-sm font-bold"
            aria-label="Tutup pemberitahuan"
          >
            ✕
          </button>
        </div>

        <p className="text-white/80 leading-relaxed text-[11px]">
          Website ini menggunakan cookie teknis untuk mengoptimalkan penelusuran jadwal paket ibadah. Baca selengkapnya di{" "}
          <Link href="/privacy-policy" className="text-gold-light underline hover:text-white">
            Kebijakan Privasi
          </Link>.
        </p>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={handleAccept}
            className="px-3.5 py-1.5 rounded-button bg-gold-accent hover:bg-gold-hover text-slate-dark text-xs font-bold transition-colors shadow-xs"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </aside>
  );
}
