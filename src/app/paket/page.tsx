import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { dummyPackages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Semua Paket Haji & Umroh — Pondok Abdurrahman bin Auf",
  description:
    "Katalog paket Haji dan Umroh dengan jadwal, fasilitas, itinerary, dan harga yang dapat dibandingkan.",
};

export default function AllPackagesPage() {
  return (
    <main>
      <PackageCatalogView
        initialPackages={dummyPackages}
        badgeLabel="Katalog Lengkap"
        title="Seluruh Paket Ibadah Umroh & Haji"
        subtitle="Pilih dan bandingkan paket berdasarkan jadwal, kota embarkasi, durasi, hotel, fasilitas, dan tipe kamar. Konfirmasi data terbaru sebelum mendaftar."
        defaultPackageType="all"
      />
    </main>
  );
}
