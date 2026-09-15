"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * HEADER GLOBAL COMPONENT
 * Sticky header with responsive navigation, mobile drawer with thumb-reach optimization,
 * and smooth animated hamburger icon.
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Navigation Links
  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Paket Umroh", href: "/umroh" },
    { name: "Paket Haji", href: "/haji" },
    { name: "Tentang Kami", href: "/#tentang" },
    { name: "Testimoni", href: "/#testimoni" },
    { name: "FAQ", href: "/#faq" },
  ];

  // Detect scroll for subtle shadow adjustment
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-warm-bg/95 backdrop-blur-md border-warm-border shadow-card py-3"
            : "bg-warm-bg/90 backdrop-blur-sm border-warm-border/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold-accent rounded-button"
            aria-label="Yayasan Travel Beranda"
          >
            {/* Logo Badge: Text-based placeholder "YT" inside rounded box */}
            {/* PLACEHOLDER — logo sementara sampai logo resmi tersedia */}
            <div className="w-10 h-10 rounded-button bg-teal-primary text-gold-accent font-serif font-bold text-xl flex items-center justify-center shadow-sm group-hover:bg-teal-900 transition-colors">
              YT
            </div>
            <div className="flex flex-col">
              {/* PLACEHOLDER — menunggu nama brand final dari Yayasan */}
              <span className="font-serif text-lg font-bold text-teal-primary leading-none tracking-tight">
                Yayasan Travel
              </span>
              <span className="text-[10px] font-sans text-slate-muted uppercase tracking-wider font-semibold mt-0.5">
                Haji & Umroh Resmi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (>=1024px) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-button text-xs font-semibold font-sans transition-all duration-200 ${
                    isActive
                      ? "text-teal-primary bg-warm-muted"
                      : "text-slate-body hover:text-teal-primary hover:bg-warm-muted/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/6281200000001?text=Assalamu%27alaikum%2C%20saya%20ingin%20konsultasi%20tentang%20paket%20ibadah"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-button bg-teal-primary hover:bg-teal-900 text-white font-sans text-xs font-semibold shadow-card transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Konsultasi Gratis</span>
              <svg
                className="w-3.5 h-3.5 text-gold-accent transform group-hover:translate-x-0.5 transition-transform"
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
            </a>
          </div>

          {/* Tablet & Mobile Hamburger Button (<=1023px) */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Compact CTA for Mobile/Tablet */}
            <a
              href="https://wa.me/6281200000001?text=Assalamu%27alaikum%2C%20saya%20ingin%20konsultasi%20tentang%20paket%20ibadah"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:flex hidden px-3.5 py-2 rounded-button bg-teal-primary text-white text-xs font-semibold items-center gap-1.5 shadow-sm"
            >
              <span>Konsultasi</span>
            </a>

            {/* Hamburger Icon with Animated Morphing (Smooth Lines Transition) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="w-11 h-11 rounded-button bg-warm-muted hover:bg-warm-border text-teal-primary flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gold-accent"
              aria-expanded={isMobileMenuOpen}
              aria-label="Buka menu navigasi"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span
                  className={`w-5 h-0.5 bg-teal-primary rounded-full transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-teal-primary rounded-full transition-all duration-200 ease-in-out ${
                    isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-teal-primary rounded-full transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY & PANEL (With Thumb-Reach Optimization & Smooth Scale/Fade Animation) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className={`absolute inset-0 bg-slate-dark/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Content Panel (Optimized for thumb reach: items in easy reach) */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-warm-bg shadow-elevated border-l border-warm-border flex flex-col justify-between transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-warm-border flex items-center justify-between bg-warm-surface">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-badge bg-teal-primary text-gold-accent font-serif font-bold text-base flex items-center justify-center">
                YT
              </div>
              <span className="font-serif font-bold text-teal-primary text-base">
                Yayasan Travel
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              type="button"
              className="w-9 h-9 rounded-button bg-warm-muted text-slate-muted hover:text-teal-primary flex items-center justify-center"
              aria-label="Tutup menu"
            >
              <svg
                className="w-5 h-5"
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

          {/* Navigation Items (Middle Section - Easily reachable by thumb) */}
          <div className="px-5 py-6 overflow-y-auto space-y-1.5 flex-1 flex flex-col justify-center">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-caption mb-2 px-3">
              Navigasi Utama
            </div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-button text-sm font-semibold font-sans transition-all duration-200 ${
                    isActive
                      ? "bg-teal-primary text-white shadow-sm"
                      : "text-slate-body hover:bg-warm-muted hover:text-teal-primary"
                  }`}
                >
                  <span>{link.name}</span>
                  <svg
                    className={`w-4 h-4 ${
                      isActive ? "text-gold-accent" : "text-slate-caption"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA Block (Thumb Reach Priority) */}
          <div className="p-5 border-t border-warm-border bg-warm-surface space-y-3">
            <a
              href="https://wa.me/6281200000001?text=Assalamu%27alaikum%2C%20saya%20ingin%20konsultasi%20tentang%20paket%20ibadah"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-12 px-5 py-3 rounded-button bg-teal-primary text-white font-sans text-sm font-semibold shadow-card flex items-center justify-center gap-2"
            >
              <span>Konsultasi Syariah via WA</span>
              <svg
                className="w-4 h-4 text-gold-accent"
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
            </a>

            <div className="text-center text-[11px] text-slate-caption">
              {/* PLACEHOLDER — info layanan */}
              Layanan CS Aktif: 08.00 - 20.00 WIB
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
