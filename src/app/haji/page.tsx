import React from "react";
import type { Metadata } from "next";
import PackageCatalogView from "@/components/PackageCatalogView";
import { dummyPackages } from "@/data/packages";

export const metadata: Metadata = {
  title: "Katalog Paket Haji Plus & Khusus — Yayasan Travel",
  description:
    "Pilihan paket Haji Khusus dan Haji Furoda resmi Kemenag RI dengan kepastian kuota, akomodasi maktab VIP, dan bimbingan ibadah intensif.",
};

export default function HajiCatalogPage() {
  const hajiPackages = dummyPackages.filter((p) => p.isHaji);

  return (
    <main>
      <PackageCatalogView
        initialPackages={hajiPackages.length > 0 ? hajiPackages : dummyPackages}
        badgeLabel="Pendaftaran Haji Resmi"
        title="Paket Haji Khusus & Plus 1448H"
        subtitle="Wujudkan panggilan suci rukun Islam kelima dengan kepastian porsi haji Kemenag RI, akomodasi tenda VIP Arafah & Mina, serta pembimbing ibadah berpengalaman."
        defaultPackageType="khusus"
      />
    </main>
  );
}
