import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pondok Abdurrahman bin Auf — Paket Umroh & Haji",
  description: "Bandingkan paket Umroh dan Haji berdasarkan jadwal, hotel, itinerary, fasilitas, dan pilihan kamar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Header />

        {/* Main Content Area */}
        <div className="flex-1 pb-16">
          {children}
        </div>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
