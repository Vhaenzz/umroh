import type { Metadata } from "next";
import CmsDashboard from "@/components/CmsDashboard";

export const metadata: Metadata = {
  title: "CMS Konten — Risalah Madina Tour",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <CmsDashboard />;
}
