import { Package } from "@/types/package";

// DATA DUMMY — 6 paket contoh (Semua data berstatus dummy untuk keperluan pengembangan & visualisasi)
export const dummyPackages: Package[] = [
  // DATA DUMMY: Paket 1 — Umroh Reguler Plus Thaif 10 Hari (Paket Utama Detail Fase 4)
  {
    id: "umroh-reguler-plus-thaif-10-hari",
    name: "Umroh Reguler Plus Thaif 10 Hari",
    slug: "umroh-reguler-plus-thaif-10-hari",
    category: "Umroh Reguler",
    packageType: "reguler",
    categoryColor: "bg-teal-primary",
    departureDate: "24 Sep 2026",
    departureMonth: "September 2026",
    duration: "10 Hari",
    durationDays: 10,
    departureCity: "Jakarta (CGK)",
    flightType: "Direct Flight",
    airline: "Saudia Airlines (Direct)",
    statusType: "available",
    originalPrice: "Rp 38.500.000",
    discountedPrice: "Rp 36.900.000",
    priceNumeric: 36900000,
    hotelMakkah: "Nama hotel dikonfirmasi sebelum daftar",
    hotelMadinah: "Nama hotel dikonfirmasi sebelum daftar",
    hotelMakkahDetail: "Nama hotel, kelas, dan jarak disampaikan sebelum pendaftaran.",
    hotelMadinahDetail: "Nama hotel, kelas, dan jarak disampaikan sebelum pendaftaran.",
    isUmroh: true,
    isHaji: false,

    // DATA DUMMY: Rincian Harga per Tipe Kamar
    roomPricing: [
      {
        type: "Quad",
        label: "Kamar Quad (Sekamar Ber-4)",
        capacity: "4 Orang / Kamar",
        price: "Rp 36.900.000",
        numeric: 36900000,
        description: "Paling hemat, cocok untuk rombongan keluarga atau jemaah perorangan yang ingin sharing kamar.",
        isPopular: true,
      },
      {
        type: "Triple",
        label: "Kamar Triple (Sekamar Ber-3)",
        capacity: "3 Orang / Kamar",
        price: "Rp 38.900.000",
        numeric: 38900000,
        description: "Pilihan nyaman untuk keluarga kecil (ayah, ibu, 1 anak) atau 3 sekawan.",
        isPopular: false,
      },
      {
        type: "Double",
        label: "Kamar Double (Sekamar Ber-2)",
        capacity: "2 Orang / Kamar",
        price: "Rp 41.900.000",
        numeric: 41900000,
        description: "Privasi maksimal, sangat direkomendasikan untuk pasangan suami istri atau lansia berdua.",
        isPopular: false,
      },
    ],

    // DATA DUMMY: Fasilitas Termasuk
    facilitiesIncluded: [
      "City Tour Thaif",
      "Manasik 3x",
      "Perlengkapan Umroh",
      "Muthawif Berpengalaman",
      "Tiket Pesawat PP Saudia Airlines Direct",
      "Visa Umroh & Asuransi Perjalanan",
      "Hotel Makkah & Madinah Bintang 4",
      "Makan 3x Sehari Menu Nusantara",
      "Air Zamzam 5 Liter (Sesuai Regulasi Maskapai)",
      "Transportasi Bus AC Eksekutif Full Perjalanan",
    ],

    facilitiesExcluded: [
      "Biaya Pembuatan Paspor Baru / Perpanjangan",
      "Suntik Vaksin Meningitis / Polio",
      "Pengeluaran Pribadi (Laundry, Roaming Internet, Kursi Roda Mandiri)",
      "Kelebihan Bagasi Pesawat Di Luar Ketentuan Maskapai",
    ],

    // DATA DUMMY: Galeri Foto (4 Slot Placeholder)
    gallery: [
      {
        id: "gal-1",
        label: "Akomodasi Makkah",
        tag: "Hotel Makkah Bintang 4",
        caption: "Akomodasi Nyaman Dekat Pelataran Masjidil Haram",
      },
      {
        id: "gal-2",
        label: "Akomodasi Madinah",
        tag: "Hotel Madinah Bintang 4",
        caption: "Akomodasi Strategis Selangkah ke Masjid Nabawi",
      },
      {
        id: "gal-3",
        label: "City tour Thaif",
        tag: "City Tour Thaif",
        caption: "Napak Tilas Sejarah & Suasana Sejuk Perkebunan Thaif",
      },
      {
        id: "gal-4",
        label: "Bimbingan manasik",
        tag: "Bimbingan Manasik",
        caption: "Manasik Komprehensif 3x Pertemuan Sebelum Keberangkatan",
      },
    ],

    // DATA DUMMY: 10 Hari Itinerary Lengkap
    itinerary: [
      {
        day: 1,
        title: "Hari 1: Keberangkatan Jakarta (CGK) — Madinah",
        activity: "Berkumpul di Lounge Bandara Soekarno-Hatta terminal 3, pembagian boarding pass, briefing akhir, penerbangan direct flight Saudia Airlines menuju Madinah, tiba dan check-in hotel Madinah.",
        location: "Jakarta & Madinah",
      },
      {
        day: 2,
        title: "Hari 2: Ziarah Raudhah & Ibadah Masjid Nabawi",
        activity: "Memperbanyak ibadah di Masjid Nabawi, ziarah ke Makam Rasulullah SAW, Abu Bakar Ash-Shiddiq, Umar bin Khattab, dan masuk ke Raudhah Al-Jannah sesuai jadwal tasreh/Nusuk.",
        location: "Madinah Al-Munawwarah",
      },
      {
        day: 3,
        title: "Hari 3: Ziarah Kota Madinah & Masjid Quba",
        activity: "Ziarah luar kota Madinah: Shalat sunnah di Masjid Quba, Jabal Uhud dan Makam Syuhada Uhud, Masjid Qiblatain, serta Kebun Kurma Madinah.",
        location: "Madinah Al-Munawwarah",
      },
      {
        day: 4,
        title: "Hari 4: Miqat di Bir Ali — Perjalanan ke Makkah",
        activity: "Persiapan pakaian ihram dari hotel, checkout, menuju Masjid Bir Ali untuk berniat ihram umroh, perjalanan menuju Makkah Al-Mukarramah, dan check-in hotel Makkah.",
        location: "Bir Ali & Makkah",
      },
      {
        day: 5,
        title: "Hari 5: Pelaksanaan Umroh Pertama",
        activity: "Pelaksanaan ibadah Umroh Pertama bersama Muthawwif pembimbing: Thawaf mengelilingi Ka'bah, Sa'i antara Shafa dan Marwah, serta Tahallul.",
        location: "Masjidil Haram, Makkah",
      },
      {
        day: 6,
        title: "Hari 6: City Tour Kota Thaif & Napak Tilas Sejarah",
        activity: "Perjalanan ke Kota Thaif: Mengunjungi Masjid Abdullah bin Abbas, Masjid Kuk, pabrik parfum mawar Al-Hada, Cable Car Teleferik, dan Miqat Qarnul Manazil.",
        location: "Thaif & Makkah",
      },
      {
        day: 7,
        title: "Hari 7: Ibadah Mandiri di Masjidil Haram",
        activity: "Memperbanyak ibadah sunnah, tadarus Al-Qur'an, thawaf sunnah, dan iktikaf di pelataran Ka'bah Masjidil Haram bersama pembimbing ibadah.",
        location: "Masjidil Haram, Makkah",
      },
      {
        day: 8,
        title: "Hari 8: Ziarah Kota Makkah (Jabal Tsur & Arafah)",
        activity: "Ziarah napak tilas haji: Jabal Tsur, Padang Arafah dan Jabal Rahmah, Muzdalifah, Mina, serta Jabal Nur. Pengambilan miqat Ji'ranah untuk umroh kedua.",
        location: "Makkah Al-Mukarramah",
      },
      {
        day: 9,
        title: "Hari 9: Thawaf Wada' & Menuju Bandara Jeddah",
        activity: "Pelaksanaan Thawaf Wada', persiapan checkout koper, perjalanan bus menuju Bandara Internasional King Abdulaziz Jeddah, proses imigrasi dan bagasi.",
        location: "Makkah & Jeddah",
      },
      {
        day: 10,
        title: "Hari 10: Tiba di Jakarta (CGK) — Indonesia",
        activity: "Penerbangan Saudia Airlines tiba di Bandara Soekarno-Hatta (CGK), pembagian air zamzam, perpisahan rombongan, dan kembali ke keluarga.",
        location: "Jakarta (CGK)",
      },
    ],
  },

  // DATA DUMMY: Paket 2 (Umroh Plus Dubai 12 Hari)
  {
    id: "umroh-plus-dubai-12-hari",
    name: "Umroh Plus Dubai 12 Hari",
    slug: "umroh-plus-dubai-12-hari",
    category: "Umroh Plus",
    packageType: "plus",
    categoryColor: "bg-gold-accent",
    departureDate: "7 Okt 2026",
    departureMonth: "Oktober 2026",
    duration: "12 Hari",
    durationDays: 12,
    departureCity: "Surabaya (SUB)",
    flightType: "1x Transit",
    airline: "Etihad Airways",
    statusType: "warning",
    originalPrice: null,
    discountedPrice: "Rp 42.900.000",
    priceNumeric: 42900000,
    hotelMakkah: "Nama hotel dikonfirmasi sebelum daftar",
    hotelMadinah: "Nama hotel dikonfirmasi sebelum daftar",
    isUmroh: true,
    isHaji: false,
    roomPricing: [
      { type: "Quad", label: "Quad (Ber-4)", capacity: "4 Orang", price: "Rp 42.900.000", numeric: 42900000, description: "Kamar quad hemat plus tour Dubai" },
      { type: "Triple", label: "Triple (Ber-3)", capacity: "3 Orang", price: "Rp 45.500.000", numeric: 45500000, description: "Kamar triple nyaman" },
      { type: "Double", label: "Double (Ber-2)", capacity: "2 Orang", price: "Rp 48.900.000", numeric: 48900000, description: "Kamar double privat" },
    ],
  },

  // DATA DUMMY: Paket 3 (Haji Plus 26 Hari)
  {
    id: "haji-plus-26-hari",
    name: "Haji Plus 26 Hari",
    slug: "haji-plus-26-hari",
    category: "Haji Khusus",
    packageType: "khusus",
    categoryColor: "bg-slate-dark",
    departureDate: "Musim Haji 1448H",
    departureMonth: "Musim Haji 1448H",
    duration: "26 Hari",
    durationDays: 26,
    departureCity: "Jakarta (CGK)",
    flightType: "Direct Flight",
    airline: "Garuda Indonesia",
    statusType: "soldout",
    originalPrice: null,
    discountedPrice: "Hubungi Kami",
    priceNumeric: 185000000,
    hotelMakkah: "Akomodasi Makkah & Mina dikonfirmasi",
    hotelMadinah: "Akomodasi Madinah dikonfirmasi",
    isUmroh: false,
    isHaji: true,
  },

  // DATA DUMMY: Paket 4 (Umroh Hemat Awal Musim 9 Hari)
  {
    id: "umroh-hemat-awal-musim-9-hari",
    name: "Umroh Hemat Awal Musim 9 Hari",
    slug: "umroh-hemat-awal-musim-9-hari",
    category: "Umroh Reguler",
    packageType: "reguler",
    categoryColor: "bg-teal-primary",
    departureDate: "15 Nov 2026",
    departureMonth: "November 2026",
    duration: "9 Hari",
    durationDays: 9,
    departureCity: "Solo (SOC)",
    flightType: "Direct Flight",
    airline: "Batik Air (Direct)",
    statusType: "available",
    originalPrice: "Rp 33.500.000",
    discountedPrice: "Rp 31.500.000",
    priceNumeric: 31500000,
    hotelMakkah: "Anjum Makkah (perlu konfirmasi)",
    hotelMadinah: "Grand Plaza Madinah (perlu konfirmasi)",
    isUmroh: true,
    isHaji: false,
  },

  // DATA DUMMY: Paket 5 (Umroh Plus Turki & Cappadocia 14 Hari)
  {
    id: "umroh-plus-turki-cappadocia-14-hari",
    name: "Umroh Plus Turki & Cappadocia 14 Hari",
    slug: "umroh-plus-turki-cappadocia-14-hari",
    category: "Umroh Plus",
    packageType: "plus",
    categoryColor: "bg-gold-accent",
    departureDate: "5 Des 2026",
    departureMonth: "Desember 2026",
    duration: "14 Hari",
    durationDays: 14,
    departureCity: "Jakarta (CGK)",
    flightType: "Direct Flight",
    airline: "Turkish Airlines",
    statusType: "warning",
    originalPrice: "Rp 49.000.000",
    discountedPrice: "Rp 46.500.000",
    priceNumeric: 46500000,
    hotelMakkah: "★5 Fairmont Makkah Clock Royal Tower",
    hotelMadinah: "★5 Frontel Al Harithia",
    isUmroh: true,
    isHaji: false,
  },

  // DATA DUMMY: Paket 6 (Umroh Akhir Tahun VVIP 12 Hari)
  {
    id: "umroh-akhir-tahun-vvip-12-hari",
    name: "Umroh Akhir Tahun VVIP 12 Hari",
    slug: "umroh-akhir-tahun-vvip-12-hari",
    category: "Umroh Reguler",
    packageType: "reguler",
    categoryColor: "bg-teal-primary",
    departureDate: "22 Des 2026",
    departureMonth: "Desember 2026",
    duration: "12 Hari",
    durationDays: 12,
    departureCity: "Surabaya (SUB)",
    flightType: "Direct Flight",
    airline: "Saudia Airlines (Direct)",
    statusType: "soldout",
    originalPrice: null,
    discountedPrice: "Rp 49.800.000",
    priceNumeric: 49800000,
    hotelMakkah: "★5 Raffles Makkah Palace (Pelataran)",
    hotelMadinah: "★5 The Oberoi Madinah",
    isUmroh: true,
    isHaji: false,
  },
];

// Helper to find a package by slug, with fallback to first package if slug matches aliases
export function getPackageBySlug(slug: string): Package | undefined {
  const normalized = slug.toLowerCase();
  if (normalized === "umroh-reguler-10-hari" || normalized === "umroh-reguler-plus-thaif-10-hari") {
    return dummyPackages[0];
  }
  return dummyPackages.find((p) => p.slug.toLowerCase() === normalized) || dummyPackages[0];
}
