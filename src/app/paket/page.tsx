import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { getSiteData } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteData();
  return { title: `Semua Paket Haji & Umroh — ${company.brandName}`, description: "Katalog paket Haji dan Umroh dengan jadwal, fasilitas, itinerary, dan harga yang dapat dibandingkan." };
}

export default async function AllPackagesPage() {
  const { packages } = await getSiteData();
  return (
    <main>
      <PackageCatalogView
        initialPackages={packages}
        badgeLabel="Katalog Lengkap"
        title="Seluruh Paket Ibadah Umroh & Haji"
        subtitle="Pilih dan bandingkan paket berdasarkan jadwal, kota embarkasi, durasi, hotel, fasilitas, dan tipe kamar. Konfirmasi data terbaru sebelum mendaftar."
        defaultPackageType="all"
      />
    </main>
  );
}
