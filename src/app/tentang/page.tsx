import type { Metadata } from "next";
import { getSiteData } from "@/lib/cms/store";
import { AboutPageContent } from "@/components/SiteContentPages";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteData();
  return { title: `Tentang Kami — ${company.brandName}`, description: `Profil, layanan, dan tim ${company.brandName}.` };
}

export default async function TentangPage() {
  const { company } = await getSiteData();
  return <AboutPageContent company={company} />;
}
