# PRD — Website Tour & Travel Haji (Reguler & Plus) dan Umroh

**Versi:** 1.0
**Disusun untuk:** NODE (Neural Operations & Digital Engineering)
**Status:** Draft untuk direview sebelum masuk fase eksekusi/prompting AI builder
**Referensi desain:** UMI Tour & Travel, Ventour Travel, Alsha Tours

---

## 1. Ringkasan & Tujuan

Membangun website company profile + katalog paket untuk biro perjalanan Haji (Reguler & Plus) dan Umroh, yang:

1. Menyampaikan **kepercayaan (trust)** secepat mungkin — ini industri di mana calon jemaah mempertaruhkan uang besar (puluhan juta rupiah) dan keberangkatan ibadah, jadi legalitas, testimoni, dan kejelasan harus terasa di atas fold.
2. Menyajikan **katalog paket** yang scannable — jemaah membandingkan banyak paket berdasarkan tanggal, harga, tipe kamar, dan fasilitas sebelum menghubungi CS.
3. Mendorong konversi ke **WhatsApp** sebagai kanal utama transaksi (bukan checkout online penuh) — pola konsisten di ketiga referensi.
4. Responsif penuh di semua resolusi (mobile kecil s.d. desktop lebar) tanpa terasa seperti "versi desktop yang dikecilkan" atau "versi mobile yang diregangkan".

### Sasaran pengguna
- Calon jemaah umroh/haji (35–65 tahun), sebagian besar mengakses dari **mobile**, tingkat melek digital bervariasi.
- Keluarga yang mendaftarkan orang tua (mendaftar dari desktop/laptop untuk riset, lalu japri via WA).
- Agen/mitra yang mencari partnership.
- Jemaah lama yang login untuk cek status dokumen/pembayaran (jika ada portal jemaah).

---

## 2. Insight dari 3 Referensi

Ringkasan pola yang **diambil dan disintesis**, bukan ditiru mentah — supaya hasil akhir terasa seperti web baru yang matang, bukan Frankenstein dari tiga situs.

### 2.1 UMI Tour & Travel — kekuatan: kejelasan status ketersediaan
- Kartu paket menampilkan **status kuota** secara eksplisit, termasuk status "Fully Booked" — ini penting untuk urgensi dan kejujuran, jangan disembunyikan.
- Struktur kartu paket: nama paket → tanggal keberangkatan → durasi → kuota tersedia → kota keberangkatan → maskapai → harga → CTA "Lihat Detail".
- Galeri dokumentasi keberangkatan digunakan sebagai bukti sosial visual (foto-foto jemaah nyata).
- Ada role-based login (Jemaah / Agen / Admin) — mengindikasikan kebutuhan portal multi-role di fase lanjutan.

### 2.2 Ventour Travel — kekuatan: kepercayaan lewat sistem & partner
- Trust dibangun lewat "Keberangkatan Pasti", "Harga Kompetitif", "Pelayanan Responsif", "Perlengkapan Eksklusif" — feature grid singkat dengan ikon, bukan paragraf panjang.
- Testimoni diatribusikan sebagai **"Jamaah Kloter [nomor]"**, bukan nama pribadi lengkap — pola privasi yang baik untuk direplikasi (hindari mengekspos nama lengkap + foto close-up tanpa consent yang jelas).
- Ada blog/artikel section aktif (SEO play) dan aplikasi mobile companion ("Ventour Mobile") untuk jemaah yang sudah terdaftar.
- Menampilkan logo maskapai & hotel partner sebagai trust signal.
- Ada jalur "Pembiayaan Syariah" — opsi cicilan/pembiayaan adalah kebutuhan nyata di industri ini, bukan sekadar nice-to-have.

### 2.3 Alsha Tours — kekuatan: kelengkapan data paket & kanal komunikasi
Ini referensi paling matang dari sisi struktur data dan konversi:
- Kartu paket sangat lengkap: **seat tersisa (angka pasti)**, harga per tipe kamar (Quad/Triple/Double) dengan **harga coret (strikethrough) vs harga promo**, durasi, jenis penerbangan (direct/transit), maskapai, hotel per kota (Makkah/Madinah/kota tambahan) beserta kelas bintang, dan daftar fasilitas termasuk (city tour, kereta cepat, dsb).
- **Multi-CS routing**: klik "Konsultasi Gratis" memunculkan pilihan beberapa CS (dengan nama & nomor masing-masing) sebelum diarahkan ke WhatsApp — mendistribusikan beban dan terasa personal.
- FAQ accordion menjawab pertanyaan transaksional nyata: cara daftar, jam operasional, peluang kemitraan/agen, lokasi cabang.
- Jaringan cabang & agen ditampilkan sebagai bukti skala & legitimasi lokal.
- Nomor rekening resmi atas nama PT ditampilkan terbuka — transparansi pembayaran.
- Testimoni dalam bentuk **video pendek (shorts-style)** dengan judul deskriptif, bukan cuma teks — lebih meyakinkan untuk keputusan besar seperti ini.
- Badge legalitas eksplisit: nomor PPIU, status akreditasi, keanggotaan SISKOPATUH Kemenag.

### 2.4 Sintesis — arah desain final
Gabungkan: **kejelasan status kuota (UMI)** + **feature trust grid & testimoni beratribusi aman (Ventour)** + **kelengkapan data paket, multi-CS, FAQ, dan bukti legalitas (Alsha)** — dengan sistem desain kustom milik NODE, bukan tempelan visual dari ketiganya.

---

## 3. Informasi Arsitektur & Struktur Halaman

### 3.1 Peta situs
```
Beranda (/)
├── Paket Umroh (/umroh)
│   ├── Filter: bulan keberangkatan, durasi, kota keberangkatan, range harga, maskapai
│   └── Detail Paket (/umroh/[slug])
├── Paket Haji (/haji)
│   ├── Haji Reguler (/haji/reguler)
│   ├── Haji Plus (/haji/plus)
│   └── Detail Paket (/haji/[slug])
├── Tentang Kami (/tentang)
│   ├── Profil & legalitas (PPIU, akreditasi, SISKOPATUH)
│   ├── Tim & tour leader bersertifikat
│   └── Cabang & jaringan agen (/tentang/cabang)
├── Testimoni & Galeri (/testimoni)
├── Artikel/Blog (/artikel) — opsional fase 2, untuk SEO
├── FAQ (/faq)
├── Kontak (/kontak)
├── Portal Jemaah (/portal) — opsional fase 2, login jemaah terdaftar
└── Kemitraan/Agen (/mitra) — opsional
```

### 3.2 Struktur Beranda (urutan section, atas ke bawah)
1. **Header/Navbar** — sticky, logo, menu utama, tombol CTA WhatsApp selalu terlihat, hamburger menu di mobile dengan animasi native (bukan generic slide-in tanpa transisi).
2. **Hero** — headline value proposition + 1 CTA primer ("Konsultasi Gratis" / "Lihat Paket") + 1 CTA sekunder, gambar/video Ka'bah atau jemaah yang autentik (bukan stock generik).
3. **Trust bar** — badge legalitas ringkas (PPIU, Kemenag/SISKOPATUH, tahun berdiri) dalam satu baris horizontal, scroll-snap di mobile.
4. **Pilihan paket unggulan** — 3–6 kartu paket terlaris dengan data lengkap (lihat §4.1), tombol "Lihat Semua Paket".
5. **Kenapa memilih kami** — feature grid 4 poin dengan ikon (legalitas, harga, layanan, pengalaman) — singkat, scannable.
6. **Profil singkat perusahaan** — 1 paragraf + foto kantor/tim, link ke halaman Tentang lengkap.
7. **Testimoni** — campuran video pendek + kutipan teks, atribusi aman (nama depan + inisial, atau "Jamaah Kloter X").
8. **Partner maskapai & hotel** — logo strip.
9. **FAQ ringkas** — 4–6 pertanyaan teratas, link ke halaman FAQ lengkap.
10. **CTA penutup** — ajakan konsultasi/daftar dengan form singkat atau langsung WhatsApp.
11. **Footer** — kontak lengkap, alamat kantor pusat + cabang, media sosial, nomor rekening, sitemap link, copyright.
12. **Floating WhatsApp button** — persisten di semua halaman, pojok bawah, dengan opsi multi-CS jika CS lebih dari satu.

---

## 4. Spesifikasi Komponen Kunci

### 4.1 Kartu Paket (Package Card)
Field wajib, disintesis dari ketiga referensi:

| Field | Wajib? | Catatan |
|---|---|---|
| Nama paket | Ya | Termasuk fasilitas plus jika ada (mis. "Umroh Plus Dubai") |
| Tanggal keberangkatan | Ya | Format jelas, bukan angka ambigu |
| Durasi (hari) | Ya | |
| Kota keberangkatan | Ya | Penting karena banyak kota embarkasi |
| Maskapai | Ya | + info direct/transit |
| Kuota/seat tersisa | Ya | Angka pasti jika tersedia; status "Fully Booked" jika habis — **jangan disembunyikan, ini bangun urgensi & kejujuran sekaligus** |
| Harga per tipe kamar | Ya | Quad / Triple / Double minimal; tampilkan harga coret jika ada promo |
| Kelas hotel | Ya | Bintang, nama hotel per kota (Makkah/Madinah/kota tambahan) |
| Fasilitas termasuk | Disarankan | City tour, kereta cepat, manasik, dll — sebagai badge/tag kecil |
| CTA | Ya | "Lihat Detail" → halaman detail paket, bukan langsung WA (biar user bisa baca detail dulu) |

Status kuota didesain sebagai indikator visual (bukan cuma teks) — warna berbeda untuk tersedia / hampir penuh / fully booked, tapi tetap accessible (jangan hanya mengandalkan warna, sertakan label teks).

### 4.2 Filter & Pencarian Paket
Halaman `/umroh` dan `/haji` butuh filter fungsional:
- Bulan/tanggal keberangkatan
- Kota keberangkatan (embarkasi)
- Durasi
- Range harga
- Tipe (reguler/plus, dan untuk haji: reguler/plus)

Di mobile, filter tampil sebagai bottom sheet atau collapsible panel — **bukan sidebar yang dipaksa jadi accordion tanpa mempertimbangkan urutan interaksi**.

### 4.3 Multi-CS / WhatsApp Routing
Ikuti pola Alsha: tombol "Konsultasi Gratis" membuka pilihan beberapa CS (nama + foto/avatar opsional + nomor), lalu deep-link ke WhatsApp dengan pesan pre-filled kontekstual (mis. menyertakan nama paket yang sedang dilihat).

### 4.4 Testimoni
- Gunakan kombinasi video pendek (jika tersedia asetnya) dan kutipan teks.
- Atribusi: nama depan + inisial belakang, atau identitas kelompok (kloter/rombongan) — **hindari menampilkan nama lengkap + nomor telepon/alamat pribadi jemaah** di testimoni publik.

### 4.5 FAQ
Accordion, minimal menjawab: cara daftar, metode pembayaran/cicilan, jam operasional, syarat dokumen, kebijakan pembatalan/reschedule, cara jadi agen/mitra.

### 4.6 Portal Jemaah (opsional, fase 2)
Jika dibutuhkan: login role-based (jemaah/agen/admin) untuk cek status dokumen, jadwal manasik, status pembayaran. Ini fitur besar — sebaiknya dipisah sebagai PRD/fase tersendiri, jangan digabung ke MVP.

---

## 5. Persyaratan Responsif

Prinsip: **desain untuk setiap breakpoint sebagai pengalaman yang disengaja**, bukan satu layout yang di-scale.

### Breakpoint minimum yang harus diuji
- Mobile kecil: 320–375px (mis. iPhone SE)
- Mobile standar: 390–428px
- Tablet portrait: 768px
- Tablet landscape / laptop kecil: 1024px
- Desktop standar: 1280–1440px
- Desktop lebar: 1920px+

### Ketentuan per breakpoint
- **Navigasi**: hamburger di ≤768px dengan menu yang benar-benar dioptimalkan untuk thumb reach (menu penting di bagian bawah/tengah layar, bukan menumpuk di atas), navbar horizontal penuh di ≥1024px.
- **Kartu paket**: 1 kolom di mobile kecil, bisa 2 kolom di tablet jika kartu didesain ringkas, 3 kolom di desktop. Jangan paksa grid 3 kolom yang di-squeeze jadi sempit di tablet.
- **Tabel data** (mis. rincian harga per tipe kamar): di mobile, ubah jadi stacked card per baris, bukan tabel horizontal yang di-scroll — kecuali memang didesain sebagai horizontal-scroll dengan indikator visual yang jelas.
- **Hero section**: rasio gambar dan headline harus proporsional di layar pendek (landscape mobile) — hero tidak boleh memakan seluruh viewport height di semua kondisi (lihat §6, "100vh hero").
- **Floating WhatsApp button**: posisi tidak boleh menutupi CTA penting atau konten yang sedang dibaca; harus dites di mode landscape mobile juga.
- **Touch target**: minimum 44×44px untuk semua elemen interaktif di mobile.

---

## 6. Peringatan Anti "AI Slop" — WAJIB DIPATUHI OLEH AI BUILDER

> Bagian ini ditujukan langsung ke AI/developer yang mengeksekusi pembuatan situs dari PRD ini. Pola-pola di bawah adalah ciri khas output AI generik yang terasa template, murah, dan tidak dipercaya untuk industri yang menyangkut uang besar dan ibadah. **Hindari semuanya secara eksplisit.**

### 6.1 Struktur & Layout
- **Jangan** membuat semua section vertikal seragam (gambar-teks-gambar-teks berulang tanpa variasi ritme). Variasikan lebar kolom, breakpoint grid, dan komposisi antar-section.
- **Jangan** memakai hero 100vh generik dengan headline besar di tengah + 1 tombol CTA melayang tanpa konteks visual — ini pola paling umum dari output AI page-builder dan langsung terasa template.
- **Jangan** membuat grid kartu yang selalu simetris sempurna 3-kolom/4-kolom di semua breakpoint tanpa pertimbangan konten aktual (jumlah paket ganjil, teks panjang-pendek, dsb).
- **Jangan** meletakkan section "Why Choose Us" sebagai 4 ikon generik (centang, bintang, jam, perisai) dengan teks template ("Kualitas Terbaik", "Layanan 24/7") tanpa spesifisitas nyata dari bisnis ini.

### 6.2 Visual & Styling
- **Jangan** memakai palet warna default AI generator: gradient ungu-biru generik, atau kombinasi warna "safe corporate" tanpa identitas. Untuk industri ini, eksplorasi warna yang terasa premium & islami tanpa jatuh ke klise hijau-emas berlebihan.
- **Jangan** memakai bayangan/shadow default yang sama di semua card (`box-shadow` generik tanpa penyesuaian), border-radius seragam 8px/12px di semua elemen tanpa hierarki.
- **Jangan** memakai font pairing default (Inter + Inter, atau Poppins di semua tempat) tanpa pertimbangan karakter brand.
- **Jangan** memakai icon set generik yang terasa acak (campur Font Awesome + Heroicons + emoji dalam satu halaman) — konsisten satu sistem ikon.
- **Jangan** memakai foto stock yang jelas terlihat stock (orang random tersenyum ke kamera, latar putih polos) untuk konten yang seharusnya autentik (dokumentasi jemaah, kantor asli, tim asli).

### 6.3 Interaksi & Animasi
- **Jangan** menambahkan animasi fade-in-on-scroll di SETIAP elemen tanpa kecuali — ini melelahkan mata dan terasa murah. Gunakan animasi secara selektif dan bermakna.
- **Jangan** membuat parallax scroll berlebihan yang justru mengganggu keterbacaan di mobile.
- **Jangan** membiarkan hover state desktop (mis. tombol yang hanya berfungsi saat `:hover`) menjadi satu-satunya cara mengakses informasi penting — pastikan semua fungsi tetap dapat diakses lewat tap di mobile.

### 6.4 Konten & Copy
- **Jangan** mengisi placeholder dengan teks Lorem Ipsum atau teks generik ("Layanan terbaik untuk Anda") yang dibiarkan sampai deployment — semua copy harus final atau ditandai jelas sebagai draft yang perlu direview klien.
- **Jangan** membuat testimoni palsu dengan nama dan foto yang jelas AI-generated atau stock — jika testimoni asli belum tersedia, gunakan placeholder yang **ditandai eksplisit** "[MENUNGGU TESTIMONI ASLI]", jangan mengarang.
- **Jangan** membuat statistik yang tidak dikonfirmasi ("10,000+ Jemaah Puas!", "99% Tingkat Kepuasan") tanpa sumber data nyata dari klien — ini industri legalitas ketat (Kemenag), klaim palsu berisiko hukum dan reputasi.

### 6.5 Teknis & Aksesibilitas
- **Jangan** hanya menguji di satu breakpoint (biasanya 1440px desktop atau 375px mobile) lalu mengasumsikan sisanya otomatis beres — breakpoint menengah (768–1024px) sering rusak jika tidak dites eksplisit.
- **Jangan** mengabaikan kontras warna teks-di-atas-gambar (mis. teks putih di atas foto terang tanpa overlay) — ini sering terjadi di hero section AI-generated.
- **Jangan** membuat halaman yang secara teknis "responsif" (tidak overflow) tapi secara pengalaman terasa seperti versi desktop yang di-squeeze — cek betul apakah hierarki informasi berubah sesuai konteks perangkat, bukan cuma ukurannya yang mengecil.
- **Jangan** lupa lazy-loading untuk galeri foto/video yang banyak (situs travel biasanya berat aset visual) — tapi juga jangan sampai lazy-loading membuat layout shift yang mengganggu (selalu definisikan aspect-ratio/dimensi placeholder).

---

## 7. Kebutuhan Teknis (Non-Fungsional)

- **Stack**: mengikuti stack NODE — Next.js, TypeScript, Tailwind/CSS custom, PostgreSQL + Supabase untuk data paket (jika dinamis), tanpa builder visual (code-first).
- **Performa**: target Lighthouse mobile ≥ 85 di halaman utama; optimasi gambar wajib (format modern, responsive images).
- **SEO**: metadata dinamis per halaman paket, structured data (schema.org TravelAgency/Product jika relevan), sitemap.xml.
- **Aksesibilitas**: kontras WCAG AA minimum, navigasi keyboard untuk semua interaksi, alt text untuk semua gambar bermakna.
- **CMS/Data paket**: paket sering berubah (tanggal, kuota, harga) — pertimbangkan admin panel sederhana atau minimal struktur data yang mudah diupdate tanpa redeploy penuh, bukan hardcode di komponen.

---

## 8. Yang Belum Diputuskan (Perlu Klarifikasi Sebelum Eksekusi)

- [ ] Apakah portal jemaah (login role-based) masuk MVP atau fase 2?
- [ ] Apakah ada sistem pembayaran online (payment gateway) atau tetap manual via transfer + WA?
- [ ] Berapa CS/admin yang akan menangani WhatsApp routing?
- [ ] Apakah blog/artikel jadi prioritas SEO di fase awal?
- [ ] Ketersediaan aset asli: foto kantor, video testimoni, logo partner maskapai/hotel — ini menentukan seberapa jauh kita bisa menghindari placeholder generik di §6.4.
- [ ] Nama brand, palet warna, dan tone visual final — belum ditentukan di PRD ini, jadi arahan desain di §6 bersifat prinsip (apa yang dihindari), bukan spesifikasi visual final.

---

*PRD ini adalah dokumen hidup — update seiring keputusan di §8 terjawab, sebelum dipecah menjadi prompt-prompt bertahap untuk AI builder.*
