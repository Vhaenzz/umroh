export const companyProfile = {
  legalName: "PT. Risalah Madina Bunga Tiara",
  brandName: "Risalah Madina Tour",
  address: "Jl. Sekar Kemuning II No. 18, Karyamulya, Kesambi, Kota Cirebon, Jawa Barat 45131",
  phone: "0812-7223-0999",
  email: "risalahmadinatour.id@gmail.com",
  instagramHandle: "@risalahmadinatour.id",
  legal: {
    ppiu: "91204028510220002",
    deed: "No. 02 tanggal 04 April 2014",
    kemenkumham: "AHU-0049403.AH.01.02.TAHUN 2025",
    nib: "9120402851022",
    npwp: "0763 2349 7844 8000",
    pihk: "PIHK 916 Tahun 2020",
  },
  certification: {
    name: "Sertifikat Penyelenggara Umrah dan Haji Khusus",
    number: "IMS-SUHK-145",
    issuer: "PT. Inti Multima Sertifikasi (LSUHK-011-IDN, terakreditasi KAN)",
    registeredAddress: "Saladin Square Blok B-12, Jl. Margonda Raya 39, Kel. Depok, Kec. Pancoran Mas, Kota Depok, Jawa Barat",
    basis: "Keputusan Menteri Agama RI Nomor 1251 Tahun 2021",
    accreditation: "C",
    issuedAt: "10 Juli 2025",
    surveillanceDeadline: "09 Maret 2028",
    validUntil: "10 Juli 2025 s.d. 09 Juli 2030",
  },
  services: [
    "Umroh Reguler dan Plus negara lain",
    "Tour domestik dan internasional",
    "Haji Khusus",
    "Badal Haji dan Umroh",
  ],
  destinations: ["Mekah", "Madinah", "Mesir", "Dubai", "Turki", "China", "Aqsha", "Uzbekistan"],
  leaders: [
    {
      name: "dr. Hj. Astry Avianty, SpM",
      role: "Direktur Utama PT Risalah Madina",
      description: "Dokter Spesialis Mata di 3 Rumah Sakit, dosen Fakultas Kedokteran Universitas Gunung Jati Cirebon, dan dokter pendamping jamaah Umroh dan Haji Plus.",
    },
    {
      name: "dr. H. Pahmi Budiman S.B, Sp-THT",
      role: "Komisaris Utama PT Risalah Madina",
      description: "Dokter Spesialis THT di 3 Rumah Sakit, dosen Fakultas Kedokteran Universitas Gunung Jati Cirebon, dan dokter pendamping jamaah Umroh dan Haji Plus.",
    },
    {
      name: "Hj. Tengku Marina",
      role: "Direktur Marketing PT Risalah Madina",
      description: "Entrepreneur dan fashion maker, expert marketer dengan 20 tahun pengalaman, berpengalaman di dunia travel Umroh lebih dari 14 tahun, dan telah memberangkatkan lebih dari 5.000 jamaah.",
    },
  ],
  financing: {
    umrahDp: "Rp 5.000.000 (sudah termasuk perlengkapan)",
    hajjDp: "USD 5.000 (sudah termasuk biaya admin USD 500)",
    note: "DP tidak dapat dikembalikan, namun dapat diwariskan.",
    options: [
      "Bayar cash atau lunas",
      "Berangkat dulu, bayar belakangan",
      "Menabung dengan niat",
      "Menjalankan usaha atau agen travel",
    ],
    umrahSavings: [
      { term: "6 Bulan", monthly: "Rp 5.450.000", daily: "Rp 185.000" },
      { term: "1 Tahun", monthly: "Rp 2.750.000", daily: "Rp 90.000" },
      { term: "2 Tahun", monthly: "Rp 1.400.000", daily: "Rp 50.000" },
      { term: "3 Tahun", monthly: "Rp 950.000", daily: "Rp 35.000" },
    ],
    hajjSavings: [
      { name: "DP 1", deposit: "USD 4.500", monthly: "Rp 2.856.000", term: "72 Bulan", total: "Rp 210.000.000" },
      { name: "DP 2", deposit: "USD 3.500", monthly: "Rp 3.078.000", term: "72 Bulan", total: "Rp 221.616.000" },
      { name: "DP 3", deposit: "USD 2.500", monthly: "Rp 3.300.000", term: "72 Bulan", total: "Rp 237.600.000" },
    ],
  },
  bankAccounts: [
    { bank: "Bank Syariah Indonesia (BSI)", account: "6666000275" },
    { bank: "Bank Jawa Barat (BJB)", account: "2312022312027" },
    { bank: "Bank Muamalat", account: "1390200709" },
  ],
  equipment: ["Koper bagasi", "Koper kabin", "Kain ihram / mukena", "Tas punggung", "Slayer", "Buku doa", "Sabuk / ikat pinggang"],
} as const;

type Mutable<T> = T extends readonly (infer U)[]
  ? Mutable<U>[]
  : T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends object
          ? { -readonly [K in keyof T]: Mutable<T[K]> }
          : T;

export type CompanyProfile = Mutable<typeof companyProfile>;
export type CompanyLeader = (typeof companyProfile.leaders)[number];
