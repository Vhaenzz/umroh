import type { Metadata } from "next";
import { DocumentationPageContent } from "@/components/SiteContentPages";
import { getSiteData } from "@/lib/cms/store";

export const metadata: Metadata = { title: "Dokumentasi Perjalanan — Risalah Madina Tour", description: "Dokumentasi perjalanan dan tim pendamping Risalah Madina Tour." };

export default async function DokumentasiPage() {
  const { company } = await getSiteData();
  return <DocumentationPageContent company={company} />;
}
