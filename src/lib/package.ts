import type { Package, PackageLifecycle } from "@/types/package";

const monthMap: Record<string, string> = { Januari: "01", Februari: "02", Maret: "03", April: "04", Mei: "05", Juni: "06", Juli: "07", Agustus: "08", September: "09", Oktober: "10", November: "11", Desember: "12" };

export function parseDepartureDate(value: string) {
  const match = value.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!match || !monthMap[match[2]]) return Number.MAX_SAFE_INTEGER;
  return Date.parse(`${match[3]}-${monthMap[match[2]]}-${match[1].padStart(2, "0")}`);
}

export function getPackageLifecycle(pkg: Package): PackageLifecycle {
  if (pkg.lifecycle) return pkg.lifecycle;
  if (pkg.statusType === "soldout") return "sold_out";
  return parseDepartureDate(pkg.departureDate) < Date.now() ? "departed" : "upcoming";
}
