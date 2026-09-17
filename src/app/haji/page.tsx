import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { dummyPackages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Katalog Paket Haji Plus & Khusus — Pondok Abdurrahman bin Auf",
  description:
    "Bandingkan jadwal, akomodasi, itinerary, fasilitas, dan pilihan paket Haji yang tersedia.",
};

export default function HajiCatalogPage() {
  const hajiPackages = dummyPackages.filter((p) => p.isHaji);

  return (
    <main>
      <PackageCatalogView
        initialPackages={hajiPackages.length > 0 ? hajiPackages : dummyPackages}
        badgeLabel="Pendaftaran Haji Resmi"
        title="Paket Haji Khusus & Plus 1448H"
        subtitle="Pelajari detail paket, akomodasi, itinerary, dan komponen biaya. Ketersediaan kuota serta dokumen perlu dikonfirmasi sebelum pendaftaran."
        defaultPackageType="khusus"
      />
    </main>
  );
}
