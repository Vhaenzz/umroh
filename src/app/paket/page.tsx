import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { dummyPackages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Semua Paket Haji & Umroh — Yayasan Travel",
  description:
    "Jadwal lengkap keberangkatan paket Umroh Reguler, Umroh Plus, dan Haji Khusus dengan fasilitas hotel bintang dekat masjid dan harga transparan.",
};

export default function AllPackagesPage() {
  return (
    <main>
      <PackageCatalogView
        initialPackages={dummyPackages}
        badgeLabel="Katalog Lengkap"
        title="Seluruh Paket Ibadah Umroh & Haji"
        subtitle="Pilih dan bandingkan paket perjalanan ibadah sesuai kebutuhan keluarga Anda. Terintegrasi SISKOPATUH dan berizin PPIU resmi Kemenag RI."
        defaultPackageType="all"
      />
    </main>
  );
}
