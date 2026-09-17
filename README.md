This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## CMS Supabase multi-user

Schema database tersedia di [supabase/migrations/001_cms.sql](/Users/muhammadnizaralfaris/Documents/tour-and-travel/supabase/migrations/001_cms.sql). Jalankan seluruh file tersebut di Supabase SQL Editor.

1. Buat project Supabase.
2. Jalankan migration SQL.
3. Salin `.env.example` menjadi `.env.local`, lalu isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dari Project Settings → API.
4. Buat user admin/editor di Authentication → Users.
5. Masukkan UUID user ke SQL berikut:

```sql
insert into public.cms_members (user_id, role)
values ('UUID_USER_DARI_SUPABASE_AUTH', 'admin');
```

6. Jalankan aplikasi, buka `/admin`, login dengan user tersebut, lalu tekan **Simpan perubahan** untuk mengunggah data seed paket dan profil ke Supabase.

Jika environment Supabase belum diisi, aplikasi tetap menggunakan CMS file lokal sebagai fallback.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
