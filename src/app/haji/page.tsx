import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { getSiteData } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteData();
  return { title: `Katalog Paket Haji Plus & Khusus — ${company.brandName}`, description: "Bandingkan jadwal, akomodasi, itinerary, fasilitas, dan pilihan paket Haji yang tersedia." };
}

export default async function HajiCatalogPage() {
  const { packages } = await getSiteData();
  const hajiPackages = packages.filter((p) => p.isHaji);

  return (
    <main>
      <PackageCatalogView
        initialPackages={hajiPackages}
        badgeLabel="Informasi Haji Khusus"
        title="Perencanaan Haji Khusus"
        subtitle="Pelajari detail paket, akomodasi, itinerary, dan komponen biaya. Ketersediaan kuota serta dokumen perlu dikonfirmasi sebelum pendaftaran."
        defaultPackageType="khusus"
      />
    </main>
  );
}
