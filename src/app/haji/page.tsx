import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { HajiOverviewSection } from "@/components/SiteContentPages";
import { getSiteData } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteData();
  return { title: `Katalog Paket Haji Plus & Khusus — ${company.brandName}`, description: "Bandingkan jadwal, akomodasi, itinerary, fasilitas, dan pilihan paket Haji yang tersedia." };
}

export default async function HajiCatalogPage() {
  const { company, packages } = await getSiteData();
  const hajiPackages = packages.filter((p) => p.isHaji);

  return (
    <main>
      <HajiOverviewSection company={company} />
      <PackageCatalogView
        initialPackages={hajiPackages}
        badgeLabel="Informasi Haji Khusus"
        title="Program Haji Khusus yang tersedia"
        subtitle="Bandingkan jadwal, akomodasi, itinerary, dan komponen biaya. Bila belum ada keberangkatan yang tampil, konsultasikan rencana dan kuota melalui kanal resmi."
        defaultPackageType="khusus"
      />
    </main>
  );
}
