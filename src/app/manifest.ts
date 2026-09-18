import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Risalah Madina — Umroh & Haji",
    short_name: "Risalah Madina",
    description: "Penyelenggara Perjalanan Ibadah Umroh & Haji Khusus Resmi Kemenag RI",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B3B2E",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
