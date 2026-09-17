export type StatusType = "available" | "warning" | "soldout" | "pending";
export type PackageCategoryType = "reguler" | "plus" | "khusus";

export interface RoomPrice {
  type: "Quad" | "Triple" | "Double";
  label: string;
  capacity: string;
  price: string;
  numeric: number;
  description: string;
  isPopular?: boolean;
}

export interface GalleryItem {
  id: string;
  label: string;
  tag: string;
  caption: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activity: string;
  location: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  category: string;
  packageType: PackageCategoryType;
  categoryColor: string; // badge background class
  departureDate: string;
  departureMonth: string; // e.g. "September 2026", "Oktober 2026"
  duration: string;
  durationDays: number; // e.g. 9, 10, 12, 14, 26
  departureCity: string; // e.g. "Jakarta (CGK)", "Surabaya (SUB)", "Solo (SOC)"
  flightType: string; // e.g. "Direct Flight" | "1x Transit"
  airline: string;
  statusType: StatusType;
  originalPrice: string | null;
  discountedPrice: string;
  priceNumeric: number; // in IDR (0 for 'Hubungi Kami' / custom)
  hotelMakkah: string;
  hotelMadinah: string;
  hotelMakkahDetail?: string;
  hotelMadinahDetail?: string;
  isUmroh: boolean;
  isHaji: boolean;
  
  // Detail Page Specifications (Fase 4)
  roomPricing?: RoomPrice[];
  facilitiesIncluded?: string[];
  facilitiesExcluded?: string[];
  itinerary?: ItineraryDay[];
  gallery?: GalleryItem[];
}

export interface FilterState {
  month: string;
  city: string;
  duration: string;
  priceRange: string;
  packageType: string;
}
