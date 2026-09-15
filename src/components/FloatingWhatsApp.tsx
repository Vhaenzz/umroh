"use client";

import React, { useState, useRef, useEffect } from "react";

/**
 * FLOATING WHATSAPP BUTTON (MULTI-CS ROUTING)
 * Displays a floating button on bottom right.
 * On click, opens a popover (desktop) or bottom sheet (mobile) showing available CS options.
 */
export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // PLACEHOLDER CS DATA — Format valid tapi dummy, tandai jelas di komentar
  const csList = [
    {
      id: "cs-1",
      name: "Ust. Fulan",
      role: "Konsultan Bimbingan & Paket Umroh",
      phone: "6281200000001",
      avatar: "UF",
      status: "Online • Respons Cepat",
    },
    {
      id: "cs-2",
      name: "Ibu Fulanah",
      role: "Layanan Pendaftaran & Dokumen Haji",
      phone: "6281200000002",
      avatar: "IF",
      status: "Online • Siap Membantu",
    },
  ];

  // Close panel on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Generate WhatsApp Deep Link
  const getWaLink = (phone: string, name: string) => {
    const message = encodeURIComponent(
      `Assalamu'alaikum ${name}, saya ingin berkonsultasi mengenai jadwal dan informasi paket Umroh/Haji.`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <div
      ref={panelRef}
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end"
    >
      {/* MULTI-CS PANEL (Popover on Desktop, Bottom Sheet feel on Mobile) */}
      <div
        className={`w-[calc(100vw-2.5rem)] sm:w-80 bg-warm-surface rounded-card border border-warm-border shadow-elevated transition-all duration-300 transform origin-bottom-right mb-3 overflow-hidden ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Panel Header */}
        <div className="bg-teal-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm leading-tight text-white">
                Konsultasi WhatsApp
              </h3>
              <p className="text-[11px] text-teal-100/80 font-sans">
                Pilih Tim CS Kami untuk Bantuan
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="text-white/70 hover:text-white p-1 rounded-badge hover:bg-white/10"
            aria-label="Tutup panel konsultasi"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Panel Body: CS Options */}
        <div className="p-3 bg-warm-bg space-y-2">
          {csList.map((cs) => (
            <a
              key={cs.id}
              href={getWaLink(cs.phone, cs.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-button bg-warm-surface hover:bg-gold-light border border-warm-border hover:border-gold-border transition-all duration-200 flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                {/* Avatar Badge */}
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-primary font-bold text-xs flex items-center justify-center border border-teal-primary/20 group-hover:bg-gold-accent group-hover:text-white transition-colors">
                  {cs.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-teal-primary font-sans group-hover:text-teal-900">
                      {cs.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-[11px] text-slate-muted font-sans">
                    {cs.role}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                    {cs.status}
                  </div>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Panel Footer Notice */}
        <div className="p-2.5 bg-warm-muted border-t border-warm-border text-center">
          <p className="text-[10px] text-slate-caption font-sans">
            Bimbingan ramah syariah • Bebas konsultasi paket & jadwal
          </p>
        </div>
      </div>

      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="min-h-13 px-4 rounded-full bg-teal-primary hover:bg-teal-900 text-white shadow-elevated flex items-center gap-3 group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-accent border-2 border-warm-surface"
        aria-expanded={isOpen}
        aria-label="Tanya CS via WhatsApp"
      >
        <div className="relative">
          <svg className="w-6 h-6 fill-current text-emerald-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>

        <span className="font-sans font-semibold text-xs text-white hidden sm:inline-block pr-1">
          Konsultasi WA
        </span>
      </button>
    </div>
  );
}
