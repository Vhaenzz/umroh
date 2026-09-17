import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteData } from "@/lib/cms/store";
import "./globals.css";

export const dynamic = "force-dynamic";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { company } = await getSiteData();
  return {
    title: `${company.brandName} — Paket Umroh & Haji`,
    description: "Bandingkan paket Umroh dan Haji berdasarkan jadwal, hotel, itinerary, fasilitas, dan pilihan kamar.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { company } = await getSiteData();

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-warm-bg text-slate-dark flex flex-col selection:bg-gold-accent/20 selection:text-teal-primary"
      >
        {/* Global Header */}
        <Header company={company} />

        {/* Main Content Area */}
        <div className="flex-1 pb-16">
          {children}
        </div>

        {/* Global Footer */}
        <Footer company={company} />
      </body>
    </html>
  );
}
