"use client";

import { useEffect, useMemo, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Package, PackageLifecycle, RoomPrice } from "@/types/package";
import type { SiteData } from "@/lib/cms/types";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/browser";
import CmsMediaUpload from "@/components/CmsMediaUpload";

type Tab = "packages" | "company" | "financing" | "payments" | "media" | "transfer";
type FieldValue = unknown;

const inputClass =
  "mt-1 w-full rounded-button border border-warm-border bg-white px-3 py-2.5 text-sm text-slate-dark outline-none transition focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/10";
const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-slate-muted";

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "email";
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input className={inputClass} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function LinesEditor({
  label,
  values,
  onChange,
  addLabel = "Tambah baris",
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  addLabel?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className={labelClass}>{label}</span>
        <button type="button" className="text-xs font-bold text-teal-primary hover:text-gold-hover" onClick={() => onChange([...values, ""])}>{addLabel}</button>
      </div>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div className="flex gap-2" key={`${label}-${index}`}>
            <input className={inputClass.replace("mt-1 ", "")} value={value} onChange={(event) => onChange(values.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} />
            <button type="button" className="w-10 shrink-0 rounded-button border border-warm-border text-slate-muted hover:border-red-200 hover:text-red-600" aria-label={`Hapus ${label} ${index + 1}`} onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function emptyPackage(index: number): Package {
  const id = `paket-baru-${Date.now()}-${index}`;
  const room = (type: RoomPrice["type"], capacity: string): RoomPrice => ({ type, label: `${type} (ubah label)`, capacity, price: "", numeric: 0, description: "" });
  return {
    id,
    name: "Paket baru",
    slug: id,
    category: "Umroh Spesial",
    packageType: "reguler",
    categoryColor: "bg-teal-primary",
    departureDate: "",
    departureMonth: "",
    duration: "",
    durationDays: 0,
    departureCity: "",
    flightType: "",
    airline: "",
    statusType: "pending",
    originalPrice: null,
    discountedPrice: "",
    priceNumeric: 0,
    hotelMakkah: "",
    hotelMadinah: "",
    hotelMakkahDetail: "",
    hotelMadinahDetail: "",
    isUmroh: true,
    isHaji: false,
    roomPricing: [room("Quad", "4 Orang"), room("Triple", "3 Orang"), room("Double", "2 Orang")],
    facilitiesIncluded: [],
    facilitiesExcluded: [],
    itinerary: [],
    gallery: [],
  };
}

function normalizeSiteData(value: SiteData): SiteData {
  const next = structuredClone(value);
  next.company.media = next.company.media || { heroUrl: "", aboutUrl: "", documentationUrls: ["", "", ""] };
  next.company.media.documentationUrls = [...(next.company.media.documentationUrls || []), "", "", ""].slice(0, 3);
  next.company.leaders = next.company.leaders.map((leader) => ({ ...leader, imageUrl: leader.imageUrl || "" }));
  next.packages = next.packages.map((pkg) => ({ ...pkg, gallery: pkg.gallery || [] }));
  return next;
}

function MediaManager({ data, supabase, selectedPackageId, setSelectedPackageId, updateCompany, updateLeader, updateDocumentationImage, updateGalleryItem, addGalleryItem, removeGalleryItem, saveData, saving, message, error }: { data: SiteData; supabase: SupabaseClient | null; selectedPackageId: string | null; setSelectedPackageId: (value: string) => void; updateCompany: (path: string, value: FieldValue) => void; updateLeader: (index: number, key: "name" | "role" | "description" | "imageUrl", value: string) => void; updateDocumentationImage: (index: number, value: string) => void; updateGalleryItem: (index: number, key: "label" | "tag" | "caption" | "alt" | "imageUrl", value: string) => void; addGalleryItem: () => void; removeGalleryItem: (index: number) => void; saveData: () => Promise<void>; saving: boolean; message: string; error: string }) {
  const company = data.company;
  const selectedPackage = data.packages.find((item) => item.id === selectedPackageId) || null;
  return <main className="min-h-screen bg-[#f4f1e9] px-4 py-6 text-slate-dark sm:px-7 sm:py-10"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-4 border-b border-warm-border pb-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-hover">Content management system</p><h1 className="mt-2 font-serif text-3xl font-bold text-teal-primary sm:text-4xl">Media website</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-muted">Kelola foto homepage, dokumentasi, profil pimpinan, dan galeri paket dari satu tempat.</p></div><div className="flex flex-wrap gap-2"><a href="/admin" className="inline-flex min-h-11 items-center rounded-button border border-warm-border bg-white px-4 py-3 text-xs font-bold text-teal-primary">Kembali ke CMS</a><button type="button" onClick={() => void saveData()} disabled={saving} className="min-h-11 rounded-button bg-gold-accent px-4 py-3 text-xs font-bold text-slate-dark disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan perubahan"}</button></div></div>{(message || error) && <div className={`mt-5 rounded-button border px-4 py-3 text-sm ${error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>{error || message}</div>}<div className="mt-7 space-y-6"><section className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><h2 className="font-serif text-2xl font-bold text-teal-primary">Media website</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-muted">Upload ke Supabase Storage atau masukkan URL gambar. Bucket yang digunakan: <code>cms-media</code>.</p><div className="mt-6 grid gap-5 lg:grid-cols-3"><CmsMediaUpload label="Foto utama homepage" value={company.media?.heroUrl} folder="site/hero" supabase={supabase} onChange={(value) => updateCompany("media.heroUrl", value)} /><CmsMediaUpload label="Foto halaman Tentang" value={company.media?.aboutUrl} folder="site/about" supabase={supabase} onChange={(value) => updateCompany("media.aboutUrl", value)} />{[0, 1, 2].map((index) => <CmsMediaUpload key={index} label={`Dokumentasi ${index + 1}`} value={company.media?.documentationUrls?.[index]} folder={`site/documentation-${index + 1}`} supabase={supabase} onChange={(value) => updateDocumentationImage(index, value)} />)}</div></section><section className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><h2 className="font-serif text-2xl font-bold text-teal-primary">Foto tiga pimpinan</h2><p className="mt-2 text-sm leading-6 text-slate-muted">Foto akan tampil di halaman Tentang. Tanpa foto, website menampilkan inisial.</p><div className="mt-6 grid gap-5 lg:grid-cols-3">{company.leaders.map((leader, index) => <div key={`${leader.name}-${index}`} className="space-y-4 rounded-card border border-warm-border p-4"><div><p className="text-sm font-bold text-teal-primary">{leader.name}</p><p className="mt-1 text-xs text-slate-muted">{leader.role}</p></div><CmsMediaUpload label="Foto profil" value={leader.imageUrl} folder={`leaders/${index + 1}`} supabase={supabase} onChange={(value) => updateLeader(index, "imageUrl", value)} /></div>)}</div></section><section className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-serif text-2xl font-bold text-teal-primary">Galeri foto paket</h2><p className="mt-2 text-sm leading-6 text-slate-muted">Tambahkan foto, judul, tag, caption, dan alt text untuk setiap paket.</p></div><label className="block sm:min-w-72"><span className={labelClass}>Pilih paket</span><select className={inputClass} value={selectedPackageId || ""} onChange={(event) => setSelectedPackageId(event.target.value)}>{data.packages.map((item) => <option key={item.id} value={item.id}>{item.name || item.slug}</option>)}</select></label></div>{selectedPackage && <div className="mt-6 space-y-4">{(selectedPackage.gallery || []).map((item, index) => <div key={item.id} className="grid gap-4 rounded-card border border-warm-border p-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end"><CmsMediaUpload label={`Foto ${index + 1}`} value={item.imageUrl} folder={`packages/${selectedPackage.slug}`} supabase={supabase} onChange={(value) => updateGalleryItem(index, "imageUrl", value)} /><Field label="Judul" value={item.label} onChange={(value) => updateGalleryItem(index, "label", value)} /><Field label="Tag" value={item.tag} onChange={(value) => updateGalleryItem(index, "tag", value)} /><Field label="Caption / alt text" value={item.caption} onChange={(value) => { updateGalleryItem(index, "caption", value); updateGalleryItem(index, "alt", value); }} /><button type="button" className="min-h-11 rounded-button border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50" onClick={() => removeGalleryItem(index)}>Hapus</button></div>)}<button type="button" onClick={addGalleryItem} className="min-h-11 rounded-button border border-teal-primary px-4 py-3 text-sm font-bold text-teal-primary hover:bg-teal-primary hover:text-white">+ Tambah foto galeri</button></div>}</section></div></div></main>;
}

export default function CmsDashboard() {
  const [data, setData] = useState<SiteData | null>(null);
  const [tab, setTab] = useState<Tab>("packages");
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authUser, setAuthUser] = useState("");
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const supabase = useMemo(() => typeof window === "undefined" ? null : createBrowserSupabase(), []);

  async function loadData() {
    setBusy(true);
    try {
      if (supabase) {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          setSessionToken(sessionData.session.access_token);
          setAuthUser(sessionData.session.user.email || "Admin Supabase");
        }
      }
      const response = await fetch("/api/cms", { cache: "no-store" });
      if (!response.ok) throw new Error("Data CMS tidak dapat dimuat.");
      const nextData = normalizeSiteData(await response.json() as SiteData);
      setData(nextData);
      setSelectedPackageId(nextData.packages[0]?.id || null);
      setError("");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Data CMS tidak dapat dimuat.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void loadData(), 0);
    return () => window.clearTimeout(timer);
    // loadData is intentionally called once on mount; it owns the initial remote/local hydration.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedPackage = useMemo(() => data?.packages.find((item) => item.id === selectedPackageId) || null, [data, selectedPackageId]);

  function updateCompany(path: string, value: FieldValue) {
    setData((current) => {
      if (!current) return current;
      const next = structuredClone(current);
      const [section, key] = path.split(".");
      const target = key ? (next.company as unknown as Record<string, Record<string, FieldValue>>)[section] : next.company as unknown as Record<string, FieldValue>;
      if (key) target[key] = value;
      else (next.company as unknown as Record<string, FieldValue>)[section] = value;
      return next;
    });
  }

  function updatePackage<K extends keyof Package>(key: K, value: Package[K]) {
    setData((current) => current ? { ...current, packages: current.packages.map((item) => item.id === selectedPackageId ? { ...item, [key]: value } : item) } : current);
  }

  function updatePackageArray(key: "facilitiesIncluded" | "facilitiesExcluded", values: string[]) {
    updatePackage(key, values);
  }

  function updateLeader(index: number, key: "name" | "role" | "description" | "imageUrl", value: string) {
    setData((current) => current ? { ...current, company: { ...current.company, leaders: current.company.leaders.map((leader, leaderIndex) => leaderIndex === index ? { ...leader, [key]: value } : leader) } } : current);
  }

  function updateDocumentationImage(index: number, value: string) {
    setData((current) => {
      if (!current) return current;
      const urls = [...(current.company.media?.documentationUrls || []), "", "", ""].slice(0, 3);
      urls[index] = value;
      return { ...current, company: { ...current.company, media: { ...current.company.media, documentationUrls: urls } } };
    });
  }

  function updateGalleryItem(index: number, key: "label" | "tag" | "caption" | "alt" | "imageUrl", value: string) {
    if (!selectedPackage) return;
    updatePackage("gallery", (selectedPackage.gallery || []).map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  }

  function addGalleryItem() {
    if (!selectedPackage) return;
    updatePackage("gallery", [...(selectedPackage.gallery || []), { id: `gallery-${Date.now()}`, label: "Dokumentasi baru", tag: "Perjalanan", caption: "", alt: "", imageUrl: "" }]);
  }

  function removeGalleryItem(index: number) {
    if (!selectedPackage) return;
    updatePackage("gallery", (selectedPackage.gallery || []).filter((_, itemIndex) => itemIndex !== index));
  }

  async function saveData() {
    if (!data) return;
    setSaving(true);
    setMessage("");
    setError("");
    try {
      window.localStorage.setItem("cms-admin-token", token);
      const authorizationToken = sessionToken || token;
      const response = await fetch("/api/cms", { method: "PUT", headers: { "Content-Type": "application/json", ...(authorizationToken ? { Authorization: `Bearer ${authorizationToken}` } : {}) }, body: JSON.stringify(data) });
      const result = await response.json() as SiteData & { error?: string };
      if (!response.ok) throw new Error(result.error || "Perubahan tidak dapat disimpan.");
      setData(result);
      setMessage(isSupabaseConfigured ? "Perubahan tersimpan ke Supabase dan akan tampil global." : "Perubahan tersimpan ke server lokal.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Perubahan tidak dapat disimpan.");
    } finally {
      setSaving(false);
    }
  }

  async function resetData() {
    if (!window.confirm("Kembalikan semua data CMS ke seed dari dokumen profil dan paket?")) return;
    setSaving(true);
    try {
      const authorizationToken = sessionToken || token;
      const response = await fetch("/api/cms", { method: "PUT", headers: { "Content-Type": "application/json", ...(authorizationToken ? { Authorization: `Bearer ${authorizationToken}` } : {}) }, body: JSON.stringify({ reset: true }) });
      if (!response.ok) throw new Error("Reset tidak diizinkan.");
      const nextData = await response.json() as SiteData;
      const normalizedData = normalizeSiteData(nextData);
      setData(normalizedData);
      setSelectedPackageId(normalizedData.packages[0]?.id || null);
      setMessage("Data dikembalikan ke seed awal.");
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "Reset gagal.");
    } finally {
      setSaving(false);
    }
  }

  async function signIn() {
    if (!supabase) return;
    setError("");
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (authError || !authData.session) {
      setError(authError?.message || "Login Supabase gagal.");
      return;
    }
    setSessionToken(authData.session.access_token);
    setAuthUser(authData.session.user.email || authEmail);
    setAuthPassword("");
    setMessage("Login Supabase berhasil. Role editor/admin diperlukan untuk menyimpan.");
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    setSessionToken("");
    setAuthUser("");
    setMessage("Sesi Supabase ditutup.");
  }

  function exportData() {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "risalah-madina-cms.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function importData(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as SiteData;
        if (!parsed.company || !Array.isArray(parsed.packages)) throw new Error("Struktur JSON tidak sesuai CMS.");
        const normalizedData = normalizeSiteData(parsed);
        setData(normalizedData);
        setSelectedPackageId(normalizedData.packages[0]?.id || null);
        setMessage("File diimpor ke editor. Tekan Simpan untuk menerapkannya.");
      } catch (importError) {
        setError(importError instanceof Error ? importError.message : "File JSON tidak valid.");
      }
    };
    reader.readAsText(file);
  }

  function addPackage() {
    const nextPackage = emptyPackage(data?.packages.length || 0);
    setData((current) => current ? { ...current, packages: [...current.packages, nextPackage] } : current);
    setSelectedPackageId(nextPackage.id);
    setTab("packages");
    setMessage("Paket baru ditambahkan ke editor.");
  }

  function deleteSelectedPackage() {
    if (!data || !selectedPackage || !window.confirm(`Hapus ${selectedPackage.name}?`)) return;
    const nextPackages = data.packages.filter((item) => item.id !== selectedPackage.id);
    setData({ ...data, packages: nextPackages });
    setSelectedPackageId(nextPackages[0]?.id || null);
    setMessage("Paket dihapus dari editor. Tekan Simpan untuk menerapkan.");
  }

  if (busy) return <main className="min-h-screen bg-warm-bg px-4 py-20 text-center text-slate-muted">Memuat ruang kerja CMS…</main>;
  if (!data) return <main className="min-h-screen bg-warm-bg px-4 py-20 text-center text-red-700">{error || "Data CMS tidak tersedia."}</main>;

  const company = data.company;
  const companyRecord = company as unknown as Record<string, string>;
  const legal = company.legal;
  const certification = company.certification;
  const financing = company.financing;

  if (tab === "media") return <MediaManager data={data} supabase={supabase} selectedPackageId={selectedPackageId} setSelectedPackageId={setSelectedPackageId} updateCompany={updateCompany} updateLeader={updateLeader} updateDocumentationImage={updateDocumentationImage} updateGalleryItem={updateGalleryItem} addGalleryItem={addGalleryItem} removeGalleryItem={removeGalleryItem} saveData={saveData} saving={saving} message={message} error={error} />;

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-dark">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[260px_1fr]">
        <aside className="bg-teal-primary p-5 text-white lg:min-h-screen lg:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-button border border-gold-accent/40 bg-teal-900 font-serif text-lg font-bold text-gold-accent">RM</span>
            <div><p className="font-bold">Ruang CMS</p><p className="text-xs text-white/60">Risalah Madina Tour</p></div>
          </div>
          <p className="mt-8 text-xs leading-5 text-white/60">Kelola konten yang tampil di website tanpa mengubah source code.</p>
          <nav className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {([['packages', 'Paket'], ['company', 'Profil & legal'], ['media', 'Media'], ['financing', 'Pembiayaan'], ['payments', 'Rekening'], ['transfer', 'Import / export']] as [Tab, string][]).map(([value, label]) => (
              <button key={value} type="button" onClick={() => setTab(value)} className={`rounded-button px-3 py-3 text-left text-sm font-semibold transition ${tab === value ? "bg-gold-accent text-slate-dark" : "text-white/75 hover:bg-white/10 hover:text-white"}`}>{label}</button>
            ))}
          </nav>
          <div className="mt-8 hidden rounded-card border border-white/10 bg-white/5 p-4 text-xs leading-5 text-white/60 lg:block">{isSupabaseConfigured ? "Perubahan tersimpan terpusat di Supabase dan terlihat oleh semua pengunjung." : <>Perubahan disimpan lokal di server ini. Untuk production, set <code className="text-gold-accent">CMS_ADMIN_TOKEN</code>.</>}</div>
        </aside>

        <section className="min-w-0 p-4 sm:p-7 lg:p-10">
          <header className="flex flex-col gap-5 border-b border-[#d8d2c4] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-hover">Content management system</p><h1 className="mt-2 font-serif text-3xl font-bold text-teal-primary sm:text-4xl">Editor website</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-muted">Edit data paket, informasi perusahaan, pembiayaan, dan rekening. Halaman publik membaca perubahan ini pada request berikutnya.</p></div>
            <div className="flex flex-wrap gap-2"><button type="button" onClick={resetData} className="rounded-button border border-warm-border bg-white px-3 py-2.5 text-xs font-bold text-slate-body hover:border-red-200 hover:text-red-700">Reset seed</button><button type="button" onClick={saveData} disabled={saving} className="rounded-button bg-gold-accent px-4 py-2.5 text-xs font-bold text-slate-dark shadow-card hover:bg-gold-hover disabled:cursor-wait disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan perubahan"}</button></div>
          </header>

          {isSupabaseConfigured && <section className="mt-5 rounded-card border border-teal-primary/20 bg-teal-primary/[0.04] p-4 sm:p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-teal-primary">Supabase Auth</p><p className="mt-1 text-sm text-slate-body">{authUser ? `Masuk sebagai ${authUser}` : "Login untuk mengubah data terpusat."}</p></div>{authUser ? <button type="button" onClick={signOut} className="rounded-button border border-warm-border bg-white px-3 py-2.5 text-xs font-bold text-slate-body">Keluar</button> : <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]"><input className={inputClass.replace("mt-1 ", "")} type="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="Email admin" aria-label="Email admin" /><input className={inputClass.replace("mt-1 ", "")} type="password" value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} placeholder="Password" aria-label="Password admin" /><button type="button" onClick={signIn} className="rounded-button bg-teal-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-teal-900">Login</button></div>}</div></section>}

          {(message || error) && <div className={`mt-5 rounded-button border px-4 py-3 text-sm ${error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>{error || message}</div>}

          {tab === "packages" && <div className="mt-7 grid gap-6 xl:grid-cols-[280px_1fr]">
            <div className="rounded-card border border-warm-border bg-white p-4 shadow-card">
              <div className="flex items-center justify-between gap-3"><h2 className="font-bold text-teal-primary">Paket ({data.packages.length})</h2><button type="button" onClick={addPackage} className="rounded-button bg-teal-primary px-3 py-2 text-xs font-bold text-white hover:bg-teal-900">+ Baru</button></div>
              <div className="mt-4 space-y-2">{data.packages.map((item) => <button type="button" key={item.id} onClick={() => setSelectedPackageId(item.id)} className={`w-full rounded-button border p-3 text-left transition ${selectedPackageId === item.id ? "border-teal-primary bg-teal-primary/5" : "border-warm-border hover:border-teal-primary/30"}`}><span className="block text-xs font-bold uppercase tracking-wider text-gold-hover">{item.packageType}</span><span className="mt-1 block text-sm font-semibold leading-5 text-slate-body">{item.name || "Tanpa nama"}</span><span className="mt-1 block text-xs text-slate-muted">{item.departureDate || "Tanggal belum diisi"}</span></button>)}</div>
            </div>
            {selectedPackage && <div className="space-y-6">
              <div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-gold-hover">Detail paket</p><h2 className="mt-1 font-serif text-2xl font-bold text-teal-primary">{selectedPackage.name || "Paket baru"}</h2></div><button type="button" onClick={deleteSelectedPackage} className="rounded-button border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50">Hapus</button></div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Nama paket" value={selectedPackage.name} onChange={(value) => updatePackage("name", value)} /><Field label="Slug URL" value={selectedPackage.slug} onChange={(value) => updatePackage("slug", value.toLowerCase().replace(/\s+/g, "-"))} /><Field label="Kategori label" value={selectedPackage.category} onChange={(value) => updatePackage("category", value)} /><Field label="Tanggal berangkat" value={selectedPackage.departureDate} onChange={(value) => updatePackage("departureDate", value)} /><Field label="Bulan keberangkatan" value={selectedPackage.departureMonth} onChange={(value) => updatePackage("departureMonth", value)} /><Field label="Durasi tampilan" value={selectedPackage.duration} onChange={(value) => updatePackage("duration", value)} /><Field label="Jumlah hari" type="number" value={selectedPackage.durationDays} onChange={(value) => updatePackage("durationDays", Number(value) || 0)} /><Field label="Kota embarkasi" value={selectedPackage.departureCity} onChange={(value) => updatePackage("departureCity", value)} /><Field label="Jenis penerbangan" value={selectedPackage.flightType} onChange={(value) => updatePackage("flightType", value)} /><Field label="Maskapai" value={selectedPackage.airline} onChange={(value) => updatePackage("airline", value)} /><Field label="Harga utama" value={selectedPackage.discountedPrice} onChange={(value) => updatePackage("discountedPrice", value)} /><Field label="Harga numerik" type="number" value={selectedPackage.priceNumeric} onChange={(value) => updatePackage("priceNumeric", Number(value) || 0)} /><Field label="Hotel Makkah" value={selectedPackage.hotelMakkah} onChange={(value) => updatePackage("hotelMakkah", value)} /><Field label="Hotel Madinah" value={selectedPackage.hotelMadinah} onChange={(value) => updatePackage("hotelMadinah", value)} /></div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3"><label className="block"><span className={labelClass}>Jenis paket</span><select className={inputClass} value={selectedPackage.packageType} onChange={(event) => updatePackage("packageType", event.target.value as Package["packageType"])}><option value="reguler">Umroh reguler</option><option value="plus">Umroh plus</option><option value="khusus">Haji khusus</option></select></label><label className="block"><span className={labelClass}>Status kuota</span><select className={inputClass} value={selectedPackage.statusType} onChange={(event) => updatePackage("statusType", event.target.value as Package["statusType"])}><option value="available">Jadwal tersedia</option><option value="pending">Perlu dikonfirmasi</option><option value="warning">Kuota terbatas</option><option value="soldout">Kuota penuh</option></select></label><label className="block"><span className={labelClass}>Tahap keberangkatan</span><select className={inputClass} value={selectedPackage.lifecycle || "upcoming"} onChange={(event) => updatePackage("lifecycle", event.target.value as PackageLifecycle)}><option value="draft">Draft</option><option value="upcoming">Akan datang</option><option value="low_seats">Kursi terbatas</option><option value="sold_out">Terjual penuh</option><option value="closed">Pendaftaran ditutup</option><option value="departed">Sudah berangkat</option><option value="archived">Arsip</option></select></label></div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="flex items-center gap-3 rounded-button border border-warm-border px-3 py-3 text-sm font-semibold"><input type="checkbox" checked={selectedPackage.isUmroh} onChange={(event) => updatePackage("isUmroh", event.target.checked)} /> Tampilkan sebagai Umroh</label><label className="flex items-center gap-3 rounded-button border border-warm-border px-3 py-3 text-sm font-semibold"><input type="checkbox" checked={selectedPackage.isHaji} onChange={(event) => updatePackage("isHaji", event.target.checked)} /> Tampilkan sebagai Haji</label></div>
              </div>
              <div className="grid gap-6 lg:grid-cols-2"><div className="rounded-card border border-warm-border bg-white p-5 shadow-card"><LinesEditor label="Fasilitas termasuk" values={selectedPackage.facilitiesIncluded || []} onChange={(values) => updatePackageArray("facilitiesIncluded", values)} /><div className="mt-6"><LinesEditor label="Fasilitas belum termasuk" values={selectedPackage.facilitiesExcluded || []} onChange={(values) => updatePackageArray("facilitiesExcluded", values)} /></div></div><div className="rounded-card border border-warm-border bg-white p-5 shadow-card"><h3 className={labelClass}>Harga per tipe kamar</h3><div className="mt-3 space-y-3">{(selectedPackage.roomPricing || []).map((room, index) => <div className="rounded-button border border-warm-border p-3" key={room.type}><div className="grid gap-2 sm:grid-cols-2"><Field label={room.type} value={room.price} onChange={(value) => updatePackage("roomPricing", selectedPackage.roomPricing?.map((item, roomIndex) => roomIndex === index ? { ...item, price: value } : item))} /><Field label="Harga numerik" type="number" value={room.numeric} onChange={(value) => updatePackage("roomPricing", selectedPackage.roomPricing?.map((item, roomIndex) => roomIndex === index ? { ...item, numeric: Number(value) || 0 } : item))} /></div><div className="mt-2"><Field label="Deskripsi" value={room.description} onChange={(value) => updatePackage("roomPricing", selectedPackage.roomPricing?.map((item, roomIndex) => roomIndex === index ? { ...item, description: value } : item))} /></div></div>)}</div></div></div>
            </div>}
          </div>}

          {tab === "company" && <div className="mt-7 space-y-6"><div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><h2 className="font-serif text-2xl font-bold text-teal-primary">Profil perusahaan</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Nama brand" value={companyRecord.brandName} onChange={(value) => updateCompany("brandName", value)} /><Field label="Nama legal" value={companyRecord.legalName} onChange={(value) => updateCompany("legalName", value)} /><Field label="Alamat" value={companyRecord.address} onChange={(value) => updateCompany("address", value)} /><Field label="Telepon" value={companyRecord.phone} onChange={(value) => updateCompany("phone", value)} /><Field label="Email" type="email" value={companyRecord.email} onChange={(value) => updateCompany("email", value)} /><Field label="Instagram" value={companyRecord.instagramHandle} onChange={(value) => updateCompany("instagramHandle", value)} /></div></div><div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><h2 className="font-serif text-2xl font-bold text-teal-primary">Legalitas & sertifikasi</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="SK PPIU" value={legal.ppiu} onChange={(value) => updateCompany("legal.ppiu", value)} /><Field label="SK PIHK" value={legal.pihk} onChange={(value) => updateCompany("legal.pihk", value)} /><Field label="Akte" value={legal.deed} onChange={(value) => updateCompany("legal.deed", value)} /><Field label="SK Kemenkumham" value={legal.kemenkumham} onChange={(value) => updateCompany("legal.kemenkumham", value)} /><Field label="NIB" value={legal.nib} onChange={(value) => updateCompany("legal.nib", value)} /><Field label="NPWP" value={legal.npwp} onChange={(value) => updateCompany("legal.npwp", value)} /><Field label="Nomor sertifikat" value={certification.number} onChange={(value) => updateCompany("certification.number", value)} /><Field label="Akreditasi" value={certification.accreditation} onChange={(value) => updateCompany("certification.accreditation", value)} /><Field label="Tanggal terbit" value={certification.issuedAt} onChange={(value) => updateCompany("certification.issuedAt", value)} /><Field label="Berlaku sampai" value={certification.validUntil} onChange={(value) => updateCompany("certification.validUntil", value)} /></div></div><div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><div className="grid gap-6 lg:grid-cols-3"><LinesEditor label="Layanan" values={company.services} onChange={(values) => updateCompany("services", values)} /><LinesEditor label="Destinasi" values={company.destinations} onChange={(values) => updateCompany("destinations", values)} /><LinesEditor label="Perlengkapan" values={company.equipment} onChange={(values) => updateCompany("equipment", values)} /></div><div className="mt-7 border-t border-warm-border pt-6"><h3 className="font-serif text-xl font-bold text-teal-primary">Tim kepemimpinan</h3><div className="mt-4 grid gap-4 lg:grid-cols-3">{company.leaders.map((leader, index) => <div className="rounded-button border border-warm-border p-4" key={`${leader.name}-${index}`}><Field label="Nama" value={leader.name} onChange={(value) => setData({ ...data, company: { ...data.company, leaders: data.company.leaders.map((item, itemIndex) => itemIndex === index ? { ...item, name: value } : item) } })} /><div className="mt-3"><Field label="Peran" value={leader.role} onChange={(value) => setData({ ...data, company: { ...data.company, leaders: data.company.leaders.map((item, itemIndex) => itemIndex === index ? { ...item, role: value } : item) } })} /></div><label className="mt-3 block"><span className={labelClass}>Deskripsi</span><textarea className={`${inputClass} min-h-28`} value={leader.description} onChange={(event) => setData({ ...data, company: { ...data.company, leaders: data.company.leaders.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) } })} /></label></div>)}</div></div></div></div>}

          {tab === "financing" && <div className="mt-7 space-y-6"><div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><h2 className="font-serif text-2xl font-bold text-teal-primary">Pembiayaan & tabungan</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="DP Umrah" value={financing.umrahDp} onChange={(value) => updateCompany("financing.umrahDp", value)} /><Field label="DP Haji" value={financing.hajjDp} onChange={(value) => updateCompany("financing.hajjDp", value)} /></div><label className="mt-4 block"><span className={labelClass}>Catatan DP</span><textarea className={`${inputClass} min-h-24`} value={financing.note} onChange={(event) => updateCompany("financing.note", event.target.value)} /></label><div className="mt-6"><LinesEditor label="Pilihan pembayaran" values={financing.options} onChange={(values) => updateCompany("financing.options", values)} /></div></div><div className="grid gap-6 xl:grid-cols-2"><div className="rounded-card border border-warm-border bg-white p-5 shadow-card"><h3 className="font-serif text-xl font-bold text-teal-primary">Tabungan Umrah</h3><div className="mt-4 space-y-3">{financing.umrahSavings.map((row, index) => <div className="grid gap-2 rounded-button border border-warm-border p-3 sm:grid-cols-3" key={`${row.term}-${index}`}><Field label="Jangka waktu" value={row.term} onChange={(value) => updateCompany("financing.umrahSavings", financing.umrahSavings.map((item, itemIndex) => itemIndex === index ? { ...item, term: value } : item))} /><Field label="Angsuran" value={row.monthly} onChange={(value) => updateCompany("financing.umrahSavings", financing.umrahSavings.map((item, itemIndex) => itemIndex === index ? { ...item, monthly: value } : item))} /><Field label="Harian" value={row.daily} onChange={(value) => updateCompany("financing.umrahSavings", financing.umrahSavings.map((item, itemIndex) => itemIndex === index ? { ...item, daily: value } : item))} /></div>)}</div></div><div className="rounded-card border border-warm-border bg-white p-5 shadow-card"><h3 className="font-serif text-xl font-bold text-teal-primary">Tabungan Haji</h3><div className="mt-4 space-y-3">{financing.hajjSavings.map((row, index) => <div className="grid gap-2 rounded-button border border-warm-border p-3 sm:grid-cols-2" key={`${row.name}-${index}`}><Field label="Nama paket" value={row.name} onChange={(value) => updateCompany("financing.hajjSavings", financing.hajjSavings.map((item, itemIndex) => itemIndex === index ? { ...item, name: value } : item))} /><Field label="Deposit" value={row.deposit} onChange={(value) => updateCompany("financing.hajjSavings", financing.hajjSavings.map((item, itemIndex) => itemIndex === index ? { ...item, deposit: value } : item))} /><Field label="Bulanan" value={row.monthly} onChange={(value) => updateCompany("financing.hajjSavings", financing.hajjSavings.map((item, itemIndex) => itemIndex === index ? { ...item, monthly: value } : item))} /><Field label="Tenor" value={row.term} onChange={(value) => updateCompany("financing.hajjSavings", financing.hajjSavings.map((item, itemIndex) => itemIndex === index ? { ...item, term: value } : item))} /><Field label="Total" value={row.total} onChange={(value) => updateCompany("financing.hajjSavings", financing.hajjSavings.map((item, itemIndex) => itemIndex === index ? { ...item, total: value } : item))} /></div>)}</div></div></div></div>}

          {tab === "payments" && <div className="mt-7 rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><h2 className="font-serif text-2xl font-bold text-teal-primary">Rekening pembayaran</h2><p className="mt-2 text-sm text-slate-muted">Pastikan nama bank dan nomor rekening sesuai dokumen resmi sebelum dipublikasikan.</p><div className="mt-6 grid gap-4 lg:grid-cols-3">{company.bankAccounts.map((account, index) => <div className="rounded-button border border-warm-border p-4" key={`${account.bank}-${index}`}><Field label="Nama bank" value={account.bank} onChange={(value) => setData({ ...data, company: { ...data.company, bankAccounts: data.company.bankAccounts.map((item, itemIndex) => itemIndex === index ? { ...item, bank: value } : item) } })} /><div className="mt-3"><Field label="Nomor rekening" value={account.account} onChange={(value) => setData({ ...data, company: { ...data.company, bankAccounts: data.company.bankAccounts.map((item, itemIndex) => itemIndex === index ? { ...item, account: value } : item) } })} /></div></div>)}</div></div>}

          {tab === "transfer" && <div className="mt-7 grid gap-6 lg:grid-cols-2"><div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7"><h2 className="font-serif text-2xl font-bold text-teal-primary">Import & export</h2><p className="mt-2 text-sm leading-6 text-slate-muted">Gunakan JSON untuk backup atau memindahkan isi CMS. File baru belum diterapkan sampai kamu menekan Simpan perubahan.</p><div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={exportData} className="rounded-button bg-teal-primary px-4 py-3 text-xs font-bold text-white hover:bg-teal-900">Download JSON</button><label className="cursor-pointer rounded-button border border-warm-border bg-white px-4 py-3 text-xs font-bold text-teal-primary hover:border-teal-primary/40">Pilih JSON<input className="sr-only" type="file" accept="application/json" onChange={(event) => { const file = event.target.files?.[0]; if (file) importData(file); }} /></label></div></div><div className="rounded-card border border-amber-200 bg-amber-50 p-5 shadow-card sm:p-7"><h2 className="font-serif text-2xl font-bold text-amber-900">Mode penyimpanan</h2><p className="mt-3 text-sm leading-6 text-amber-900/80">{isSupabaseConfigured ? "Supabase aktif: data disimpan terpusat dan bisa dikelola oleh banyak user sesuai role." : "Mode lokal aktif: data disimpan di filesystem server ini. Set environment Supabase untuk penyimpanan terpusat multi-user."}</p>{!isSupabaseConfigured && <label className="mt-6 block"><span className={labelClass}>Token admin (opsional di development)</span><input className={inputClass} type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="CMS_ADMIN_TOKEN" /></label>}</div></div>}
        </section>
      </div>
    </main>
  );
}
