import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { dummyPackages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Katalog Paket Umroh — Pondok Abdurrahman bin Auf",
  description:
    "Bandingkan jadwal, maskapai, hotel, itinerary, fasilitas, dan pilihan kamar paket Umroh.",
};

export default function UmrohCatalogPage() {
  // Filter dummy packages for Umroh (or all umroh packages)
  const umrohPackages = dummyPackages.filter((p) => p.isUmroh);

  return (
    <main>
      <PackageCatalogView
        initialPackages={umrohPackages}
        badgeLabel="Jadwal Keberangkatan Umroh"
        title="Katalog Paket Umroh 1448H / 2026M"
        subtitle="Bandingkan tanggal, kota embarkasi, durasi, hotel, fasilitas, dan harga sebelum menghubungi admin. Detail kuota dan komponen biaya perlu dikonfirmasi sebelum mendaftar."
        defaultPackageType="all"
      />
    </main>
  );
}
