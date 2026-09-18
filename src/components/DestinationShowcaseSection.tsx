"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { companyProfile, type CompanyProfile } from "@/data/company";

interface DestinationItem {
  id: string;
  title: string;
  sub: string;
  desc: string;
  img: string;
}

const defaultDestinations: DestinationItem[] = (companyProfile.destinationsList as unknown as DestinationItem[]) || [];

export default function DestinationShowcaseSection({ company }: { company: CompanyProfile }) {
  const destinations: DestinationItem[] = company.destinationsList && company.destinationsList.length > 0
    ? company.destinationsList
    : defaultDestinations;

  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Automatic auto-scroll interval every 4.5 seconds
  useEffect(() => {
    if (!destinations.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % destinations.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [destinations.length]);

  const activeDest = destinations[current] || destinations[0] || {
    id: "turki",
    title: "Turki",
    sub: "Umroh Plus Turki",
    desc: "Perjalanan ibadah dan wisata halal bersejarah.",
    img: "/images/destinations/turki.jpg",
  };

  // Mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      // Swipe left -> Next
      setCurrent((prev) => (prev + 1) % destinations.length);
    } else if (diff < -40) {
      // Swipe right -> Prev
      setCurrent((prev) => (prev > 0 ? prev - 1 : destinations.length - 1));
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] w-full bg-[#0b1015] text-white overflow-hidden py-12 sm:py-16 my-8 sm:my-12 select-none flex items-center"
      aria-label="Eksplorasi Destinasi Wisata Halal & Umroh Plus"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Background Crossfade ── */}
      {destinations.map((dest, idx) => (
        <div
          key={dest.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <Image
            src={dest.img}
            alt={`Latar ${dest.title}`}
            fill
            sizes="100vw"
            priority={idx === 0}
            className="object-cover object-center"
          />
          {/* Natural Film Vignette */}
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b1015] via-transparent to-black/40" />
        </div>
      ))}

      {/* ── Left Timeline Dots (Ventour Design) ── */}
      <div className="hidden lg:flex flex-col items-center justify-between absolute left-8 xl:left-14 top-1/2 -translate-y-1/2 h-64 z-20">
        <div className="w-[1.5px] h-full bg-white/20 absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none" />
        {destinations.map((dest, i) => (
          <button
            key={dest.id}
            type="button"
            onClick={() => setCurrent(i)}
            className={`relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white scale-150 ring-4 ring-white/30"
                : "bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Pilih destinasi ${dest.title}`}
          />
        ))}
      </div>

      {/* ── Main Content Grid ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:pl-28 lg:pr-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── Left Descriptive Column ── */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
              {activeDest.title}
            </h2>

            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-md font-normal">
              {activeDest.desc}
            </p>

            {/* Micro Indicator on Mobile/Tablet */}
            <div className="flex items-center gap-2 pt-2 lg:hidden">
              {destinations.map((dest, i) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-white" : "w-2 bg-white/30"
                  }`}
                  aria-label={`Pilih ${dest.title}`}
                />
              ))}
            </div>
          </div>

          {/* ── Right Carousel Cards Column ── */}
          <div className="lg:col-span-7 overflow-hidden">
            <div
              className="flex gap-4 sm:gap-6 transition-transform duration-700 ease-in-out py-2"
              style={{
                transform: `translateX(-${current * 280}px)`,
              }}
            >
              {destinations.map((item, index) => {
                const isActive = index === current;
                return (
                  <div
                    key={item.id}
                    onClick={() => setCurrent(index)}
                    className={`w-[260px] sm:w-[320px] shrink-0 cursor-pointer transition-all duration-500 select-none ${
                      isActive ? "scale-100 opacity-100" : "scale-95 opacity-50 hover:opacity-80"
                    }`}
                  >
                    {/* Top card header with label & dots */}
                    <div className="flex items-center justify-between mb-2.5 px-1">
                      <span className="text-xs sm:text-sm font-semibold text-white/90 truncate max-w-[200px]">
                        {item.sub}
                      </span>
                      <div className="flex gap-1 shrink-0">
                        {destinations.map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`w-1 h-1 rounded-full transition-all ${
                              dotIdx === index ? "bg-white w-2" : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Image Card Container */}
                    <div
                      className={`relative h-[320px] sm:h-[380px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 shadow-2xl ${
                        isActive
                          ? "border-white/50 ring-2 ring-white/20 shadow-white/10"
                          : "border-white/15"
                      }`}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 260px, 320px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
