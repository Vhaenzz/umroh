import type { Metadata } from "next";
import { getSiteData } from "@/lib/cms/store";
import FaqSection from "@/components/FaqSection";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteData();
  return { title: `FAQ — ${company.brandName}`, description: "Pertanyaan umum tentang pendaftaran, pembayaran, dokumen, dan perjalanan." };
}

export default async function FaqPage() {
  const { company } = await getSiteData();
  return <main><FaqSection company={company} /></main>;
}
