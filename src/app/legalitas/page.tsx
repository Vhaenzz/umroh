import type { Metadata } from "next";
import { getSiteData } from "@/lib/cms/store";
import { LegalityPageContent } from "@/components/SiteContentPages";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteData();
  return { title: `Legalitas — ${company.brandName}`, description: "Legalitas, sertifikasi, dan rekening resmi Risalah Madina Tour." };
}

export default async function LegalitasPage() {
  const { company } = await getSiteData();
  return <LegalityPageContent company={company} />;
}
