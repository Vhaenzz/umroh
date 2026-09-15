import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { dummyPackages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Katalog Paket Umroh Resmi & Terpercaya — Yayasan Travel",
  description:
    "Pilihan paket Umroh Reguler, Umroh Plus, dan VVIP dengan kepastian jadwal keberangkatan, hotel ring 1 pelataran Masjidil Haram, dan bimbingan syariah.",
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
        subtitle="Temukan paket ibadah umroh terbaik yang sesuai dengan jadwal, kota embarkasi, dan anggaran keluarga Anda. Semua harga transparan tanpa biaya tersembunyi."
        defaultPackageType="all"
      />
    </main>
  );
}
