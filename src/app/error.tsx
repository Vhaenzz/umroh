"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center p-6 bg-warm-bg font-sans">
      <div className="max-w-md w-full text-center space-y-5 bg-warm-surface border border-red-200 p-8 rounded-card shadow-card">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl font-bold">
          !
        </div>
        <h2 className="font-serif text-2xl font-bold text-teal-primary">
          Terjadi Kendala Memuat Halaman
        </h2>
        <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
          Mohon maaf, terjadi kendala saat memproses data. Silakan coba muat ulang atau kembali ke halaman beranda.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-button bg-teal-primary hover:bg-teal-900 text-white text-xs font-bold shadow-card transition-all"
          >
            Coba Muat Ulang
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2.5 rounded-button border border-warm-border bg-warm-bg hover:bg-warm-muted text-slate-dark text-xs font-semibold"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
