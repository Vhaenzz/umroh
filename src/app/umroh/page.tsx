import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { getSiteData } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteData();
  return { title: `Katalog Paket Umroh — ${company.brandName}`, description: "Bandingkan jadwal, maskapai, hotel, itinerary, fasilitas, dan pilihan kamar paket Umroh." };
}

export default async function UmrohCatalogPage() {
  const { packages } = await getSiteData();
  const umrohPackages = packages.filter((p) => p.isUmroh);

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
