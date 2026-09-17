import type { Package } from "@/types/package";

export function getWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
}

export function getPackageWhatsAppUrl(phone: string, pkg: Package) {
  const message = [
    "Assalamu'alaikum, saya ingin bertanya mengenai:",
    "",
    pkg.name,
    `Keberangkatan: ${pkg.departureDate}`,
    `Durasi: ${pkg.duration}`,
    "",
    "Saya ingin mengetahui ketersediaan dan proses pendaftarannya.",
  ].join("\n");
  return `https://wa.me/${getWhatsAppNumber(phone)}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl(phone: string) {
  return `https://wa.me/${getWhatsAppNumber(phone)}?text=${encodeURIComponent("Assalamu'alaikum, saya ingin berkonsultasi mengenai paket Umroh/Haji.")}`;
}
