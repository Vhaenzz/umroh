import type { Metadata } from "next";
import { getSiteData } from "@/lib/cms/store";
import FinancingSection from "@/components/FinancingSection";

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteData();
  return { title: `Pembiayaan — ${company.brandName}`, description: "Pilihan pembayaran dan skema tabungan Umroh serta Haji Khusus." };
}

export default async function PembiayaanPage() {
  const { company } = await getSiteData();
  return <main><FinancingSection company={company} /></main>;
}
