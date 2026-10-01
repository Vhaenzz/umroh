import type { CompanyProfile } from "@/data/company";

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export function getFaqItems(company: CompanyProfile): FaqItem[] {
  return [
    {
      id: "cara-daftar",
      category: "Pendaftaran",
      question: "Bagaimana cara mendaftar umroh?",
      answer: "Mulai dari konsultasi kebutuhan dan pilihan jadwal, lanjut melengkapi dokumen, memilih tipe kamar, lalu menerima invoice resmi dan jadwal manasik.",
    },
    {
      id: "harga-termasuk",
      category: "Paket & biaya",
      question: "Apa saja yang termasuk dalam harga paket?",
      answer: "Buka detail setiap paket untuk melihat tiket, visa, hotel, makan, itinerary, manasik, dan perlengkapan yang termasuk. Komponen yang belum termasuk ditulis terpisah agar mudah diperiksa.",
    },
    {
      id: "dp-umrah",
      category: "Paket & biaya",
      question: "Berapa DP Umrah dan bagaimana aturannya?",
      answer: `DP Umrah tercantum sebesar ${company.financing.umrahDp}. Menurut profil layanan, DP tidak dapat dikembalikan namun dapat diwariskan. Minta ketentuan tertulis sebelum membayar.`,
    },
    {
      id: "visa-kesehatan",
      category: "Dokumen",
      question: "Bagaimana dengan visa, paspor, dan vaksin?",
      answer: "Paspor, visa, dan persyaratan kesehatan mengikuti ketentuan perjalanan yang berlaku. Detail dokumen dan tenggatnya perlu dikonfirmasi berdasarkan tanggal keberangkatan paket yang dipilih.",
    },
    {
      id: "tipe-kamar",
      category: "Paket & biaya",
      question: "Apa perbedaan kamar quad, triple, dan double?",
      answer: "Quad untuk empat orang, triple untuk tiga orang, dan double untuk dua orang. Harga tiap tipe kamar ditampilkan pada halaman detail paket dan dikonfirmasi kembali sebelum pendaftaran.",
    },
    {
      id: "hotel-itinerary",
      category: "Perjalanan",
      question: "Seberapa jauh hotel dari masjid dan bagaimana itinerary-nya?",
      answer: "Jarak hotel, nama hotel, rute, dan aktivitas harus diperiksa pada detail paket karena dapat berbeda antar keberangkatan. Jangan mengandalkan label umum seperti hotel pilihan.",
    },
    {
      id: "lansia",
      category: "Perjalanan",
      question: "Apakah paket cocok untuk lansia?",
      answer: "Kesesuaian bergantung pada kondisi kesehatan, jarak hotel, ritme itinerary, dan kebutuhan pendampingan. Pilih paket setelah meninjau detailnya dan siapkan informasi kebutuhan jemaah saat pendaftaran.",
    },
    {
      id: "pembatalan",
      category: "Pembayaran",
      question: "Bagaimana aturan DP, pembatalan, dan perubahan jadwal?",
      answer: "Ketentuannya dapat berbeda menurut tiket, visa, hotel, dan kebijakan maskapai. Minta seluruh biaya, tenggat pembayaran, serta aturan reschedule atau refund tertulis sebelum membayar.",
    },
    {
      id: "pembayaran",
      category: "Pembayaran",
      question: "Ke rekening mana pembayaran dilakukan?",
      answer: `Profil layanan mencantumkan rekening atas nama Risalah Madina: BSI ${company.bankAccounts[0]?.account || "6666000275"}, BJB ${company.bankAccounts[1]?.account || "2312022312027"}, dan Bank Muamalat ${company.bankAccounts[2]?.account || "1390200709"}. Konfirmasi kembali nama penerima sebelum transfer.`,
    },
    {
      id: "haji-khusus",
      category: "Haji Khusus",
      question: "Bagaimana skema Haji Khusus?",
      answer: `DP Haji tercantum ${company.financing.hajjDp}. Program tabungan menggunakan tenor 72 bulan dan estimasi masa tunggu 6 tahun; nilai USD mengikuti kurs saat transaksi.`,
    },
    {
      id: "cara-daftar-lanjutan",
      category: "Pendaftaran",
      question: "Apa langkah setelah menemukan paket yang cocok?",
      answer: "Simpan detail paket, periksa komponen biaya dan dokumen, lalu hubungi kanal resmi yang tercantum di website untuk konfirmasi kuota dan proses pendaftaran.",
    },
  ];
}
