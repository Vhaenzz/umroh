import type { Metadata } from "next";
import { DocumentationPageContent } from "@/components/SiteContentPages";

export const metadata: Metadata = { title: "Dokumentasi Perjalanan — Risalah Madina Tour", description: "Dokumentasi perjalanan dan tim pendamping Risalah Madina Tour." };

export default function DokumentasiPage() {
  return <DocumentationPageContent />;
}
