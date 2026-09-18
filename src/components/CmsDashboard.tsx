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
  "mt-1 w-full rounded-button border border-warm-border bg-white px-3 py-2 text-sm text-slate-dark outline-none transition focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/10";
const labelClass = "text-[11px] font-bold uppercase tracking-[0.1em] text-slate-muted block";

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
      <input
        className={inputClass}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function LinesEditor({
  label,
  values,
  onChange,
  addLabel = "+ Tambah baris",
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
        <button
          type="button"
          className="text-xs font-bold text-teal-primary hover:text-gold-hover transition-colors"
          onClick={() => onChange([...values, ""])}
        >
          {addLabel}
        </button>
      </div>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div className="flex gap-2" key={`${label}-${index}`}>
            <input
              className={inputClass.replace("mt-1 ", "")}
              value={value}
              onChange={(event) =>
                onChange(values.map((item, itemIndex) => (itemIndex === index ? event.target.value : item)))
              }
            />
            <button
              type="button"
              className="w-9 shrink-0 rounded-button border border-warm-border text-slate-muted hover:border-red-200 hover:text-red-600 transition-colors flex items-center justify-center font-bold"
              aria-label={`Hapus ${label} ${index + 1}`}
              onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function emptyPackage(index: number): Package {
  const id = `paket-baru-${Date.now()}-${index}`;
  const room = (type: RoomPrice["type"], capacity: string): RoomPrice => ({
    type,
    label: `${type} (Kamar ${capacity})`,
    capacity,
    price: "",
    numeric: 0,
    description: "",
  });
  return {
    id,
    name: "Paket Baru",
    slug: id,
    category: "Umroh Reguler",
    packageType: "reguler",
    categoryColor: "bg-teal-primary",
    departureDate: "",
    departureMonth: "",
    duration: "9 Hari",
    durationDays: 9,
    departureCity: "Jakarta (CGK)",
    flightType: "Direct Flight",
    airline: "Saudia Airlines",
    statusType: "available",
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

function MediaManager({
  data,
  supabase,
  selectedPackageId,
  setSelectedPackageId,
  updateCompany,
  updateLeader,
  updateDocumentationImage,
  updateGalleryItem,
  addGalleryItem,
  removeGalleryItem,
  saveData,
  saving,
  message,
  error,
}: {
  data: SiteData;
  supabase: SupabaseClient | null;
  selectedPackageId: string | null;
  setSelectedPackageId: (value: string) => void;
  updateCompany: (path: string, value: FieldValue) => void;
  updateLeader: (index: number, key: "name" | "role" | "description" | "imageUrl", value: string) => void;
  updateDocumentationImage: (index: number, value: string) => void;
  updateGalleryItem: (index: number, key: "label" | "tag" | "caption" | "alt" | "imageUrl", value: string) => void;
  addGalleryItem: () => void;
  removeGalleryItem: (index: number) => void;
  saveData: () => Promise<void>;
  saving: boolean;
  message: string;
  error: string;
}) {
  const company = data.company;
  const selectedPackage = data.packages.find((item) => item.id === selectedPackageId) || null;

  return (
    <main className="min-h-screen bg-[#f4f1e9] px-4 py-6 text-slate-dark sm:px-7 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-warm-border pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-hover">CMS Media Management</p>
            <h1 className="mt-1 font-serif text-3xl font-bold text-teal-primary sm:text-4xl">Galeri &amp; Aset Media</h1>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-muted">
              Kelola foto utama homepage, dokumentasi jamaah, profil pimpinan, dan galeri paket.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/admin"
              className="inline-flex min-h-10 items-center rounded-button border border-warm-border bg-white px-4 py-2 text-xs font-bold text-teal-primary hover:bg-warm-muted"
            >
              ← Kembali ke CMS
            </a>
            <button
              type="button"
              onClick={() => void saveData()}
              disabled={saving}
              className="min-h-10 rounded-button bg-gold-accent px-4 py-2 text-xs font-bold text-slate-dark hover:bg-gold-hover shadow-card disabled:opacity-60 transition-all"
            >
              {saving ? "Menyimpan…" : "Simpan Media"}
            </button>
          </div>
        </div>

        {(message || error) && (
          <div
            className={`rounded-button border px-4 py-3 text-sm ${
              error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {error || message}
          </div>
        )}

        <div className="space-y-6">
          <section className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-teal-primary">Foto Utama Website</h2>
            <p className="mt-1 text-xs text-slate-muted">
              Upload foto atau masukkan URL eksternal (Storage bucket: <code>cms-media</code>).
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <CmsMediaUpload
                label="Foto Hero Homepage"
                value={company.media?.heroUrl}
                folder="site/hero"
                supabase={supabase}
                onChange={(value) => updateCompany("media.heroUrl", value)}
              />
              <CmsMediaUpload
                label="Foto Halaman Tentang"
                value={company.media?.aboutUrl}
                folder="site/about"
                supabase={supabase}
                onChange={(value) => updateCompany("media.aboutUrl", value)}
              />
              {[0, 1, 2].map((index) => (
                <CmsMediaUpload
                  key={index}
                  label={`Dokumentasi ${index + 1}`}
                  value={company.media?.documentationUrls?.[index]}
                  folder={`site/documentation-${index + 1}`}
                  supabase={supabase}
                  onChange={(value) => updateDocumentationImage(index, value)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-teal-primary">Foto Tim Kepemimpinan</h2>
            <p className="mt-1 text-xs text-slate-muted">Foto ditampilkan pada halaman profil Tentang Kami.</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {company.leaders.map((leader, index) => (
                <div key={`${leader.name}-${index}`} className="space-y-3 rounded-card border border-warm-border p-4 bg-warm-bg">
                  <div>
                    <p className="text-sm font-bold text-teal-primary">{leader.name}</p>
                    <p className="text-[11px] text-slate-muted">{leader.role}</p>
                  </div>
                  <CmsMediaUpload
                    label="Foto Profil"
                    value={leader.imageUrl}
                    folder={`leaders/${index + 1}`}
                    supabase={supabase}
                    onChange={(value) => updateLeader(index, "imageUrl", value)}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-warm-border pb-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-teal-primary">Galeri Foto Paket</h2>
                <p className="mt-1 text-xs text-slate-muted">Foto detail fasilitas dan itinerary paket.</p>
              </div>
              <label className="block sm:min-w-72">
                <span className={labelClass}>Pilih Paket</span>
                <select
                  className={inputClass}
                  value={selectedPackageId || ""}
                  onChange={(event) => setSelectedPackageId(event.target.value)}
                >
                  {data.packages.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name || item.slug}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedPackage && (
              <div className="mt-5 space-y-4">
                {(selectedPackage.gallery || []).map((item, index) => (
                  <div
                    key={item.id}
                    className="grid gap-3 rounded-card border border-warm-border p-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end bg-warm-bg"
                  >
                    <CmsMediaUpload
                      label={`Foto ${index + 1}`}
                      value={item.imageUrl}
                      folder={`packages/${selectedPackage.slug}`}
                      supabase={supabase}
                      onChange={(value) => updateGalleryItem(index, "imageUrl", value)}
                    />
                    <Field label="Judul" value={item.label} onChange={(value) => updateGalleryItem(index, "label", value)} />
                    <Field label="Tag" value={item.tag} onChange={(value) => updateGalleryItem(index, "tag", value)} />
                    <Field
                      label="Caption / Alt Text"
                      value={item.caption}
                      onChange={(value) => {
                        updateGalleryItem(index, "caption", value);
                        updateGalleryItem(index, "alt", value);
                      }}
                    />
                    <button
                      type="button"
                      className="min-h-10 rounded-button border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50 transition-colors"
                      onClick={() => removeGalleryItem(index)}
                    >
                      Hapus
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="min-h-10 rounded-button border border-teal-primary px-4 py-2.5 text-xs font-bold text-teal-primary hover:bg-teal-primary hover:text-white transition-colors"
                >
                  + Tambah Foto Galeri
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
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
  const supabase = useMemo(() => (typeof window === "undefined" ? null : createBrowserSupabase()), []);

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
      const nextData = normalizeSiteData((await response.json()) as SiteData);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedPackage = useMemo(
    () => data?.packages.find((item) => item.id === selectedPackageId) || null,
    [data, selectedPackageId]
  );

  function updateCompany(path: string, value: FieldValue) {
    setData((current) => {
      if (!current) return current;
      const next = structuredClone(current);
      const [section, key] = path.split(".");
      const target = key
        ? (next.company as unknown as Record<string, Record<string, FieldValue>>)[section]
        : (next.company as unknown as Record<string, FieldValue>);
      if (key) target[key] = value;
      else (next.company as unknown as Record<string, FieldValue>)[section] = value;
      return next;
    });
  }

  function updatePackage<K extends keyof Package>(key: K, value: Package[K]) {
    setData((current) =>
      current
        ? {
            ...current,
            packages: current.packages.map((item) =>
              item.id === selectedPackageId ? { ...item, [key]: value } : item
            ),
          }
        : current
    );
  }

  function updatePackageArray(key: "facilitiesIncluded" | "facilitiesExcluded", values: string[]) {
    updatePackage(key, values);
  }

  function updateLeader(index: number, key: "name" | "role" | "description" | "imageUrl", value: string) {
    setData((current) =>
      current
        ? {
            ...current,
            company: {
              ...current.company,
              leaders: current.company.leaders.map((leader, leaderIndex) =>
                leaderIndex === index ? { ...leader, [key]: value } : leader
              ),
            },
          }
        : current
    );
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
    updatePackage(
      "gallery",
      (selectedPackage.gallery || []).map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    );
  }

  function addGalleryItem() {
    if (!selectedPackage) return;
    updatePackage("gallery", [
      ...(selectedPackage.gallery || []),
      { id: `gallery-${Date.now()}`, label: "Dokumentasi baru", tag: "Perjalanan", caption: "", alt: "", imageUrl: "" },
    ]);
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
      const response = await fetch("/api/cms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(authorizationToken ? { Authorization: `Bearer ${authorizationToken}` } : {}),
        },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as SiteData & { error?: string };
      if (!response.ok) throw new Error(result.error || "Perubahan tidak dapat disimpan.");
      setData(result);
      setMessage(
        isSupabaseConfigured
          ? "Perubahan tersimpan ke Supabase dan akan tampil global."
          : "Perubahan tersimpan ke server lokal."
      );
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
      const response = await fetch("/api/cms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(authorizationToken ? { Authorization: `Bearer ${authorizationToken}` } : {}),
        },
        body: JSON.stringify({ reset: true }),
      });
      if (!response.ok) throw new Error("Reset tidak diizinkan.");
      const nextData = (await response.json()) as SiteData;
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
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });
    if (authError || !authData.session) {
      setError(authError?.message || "Login Supabase gagal.");
      return;
    }
    setSessionToken(authData.session.access_token);
    setAuthUser(authData.session.user.email || authEmail);
    setAuthPassword("");
    setMessage("Login Supabase berhasil.");
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
    setData((current) => (current ? { ...current, packages: [...current.packages, nextPackage] } : current));
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

  if (busy)
    return (
      <main className="min-h-screen bg-warm-bg px-4 py-20 text-center text-slate-muted font-sans">
        Memuat ruang kerja CMS…
      </main>
    );
  if (!data)
    return (
      <main className="min-h-screen bg-warm-bg px-4 py-20 text-center text-red-700 font-sans">
        {error || "Data CMS tidak tersedia."}
      </main>
    );

  const company = data.company;
  const companyRecord = company as unknown as Record<string, string>;
  const legal = company.legal;
  const certification = company.certification;
  const financing = company.financing;

  if (tab === "media")
    return (
      <MediaManager
        data={data}
        supabase={supabase}
        selectedPackageId={selectedPackageId}
        setSelectedPackageId={setSelectedPackageId}
        updateCompany={updateCompany}
        updateLeader={updateLeader}
        updateDocumentationImage={updateDocumentationImage}
        updateGalleryItem={updateGalleryItem}
        addGalleryItem={addGalleryItem}
        removeGalleryItem={removeGalleryItem}
        saveData={saveData}
        saving={saving}
        message={message}
        error={error}
      />
    );

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-slate-dark font-sans">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[250px_1fr]">
        
        {/* CMS Sidebar */}
        <aside className="bg-teal-primary p-5 text-white lg:min-h-screen lg:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-button border border-gold-accent/40 bg-teal-900 font-serif text-lg font-bold text-gold-accent shadow-xs">
                RM
              </span>
              <div>
                <p className="font-bold font-serif leading-tight">Ruang CMS</p>
                <p className="text-[11px] text-white/60">Risalah Madina Tour</p>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-white/70">
              Kelola jadwal paket, profil perusahaan, legalitas, dan rekening resmi.
            </p>

            <nav className="mt-6 grid grid-cols-2 gap-1.5 lg:grid-cols-1">
              {(
                [
                  ["packages", "Paket Ibadah"],
                  ["company", "Profil & Legalitas"],
                  ["media", "Media Galeri"],
                  ["financing", "Pembiayaan"],
                  ["payments", "Rekening Bank"],
                  ["transfer", "Backup & Sync"],
                ] as [Tab, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTab(value)}
                  className={`rounded-button px-3 py-2.5 text-left text-xs sm:text-sm font-semibold transition-all ${
                    tab === value
                      ? "bg-gold-accent text-slate-dark shadow-xs font-bold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8 rounded-card border border-white/15 bg-white/5 p-3.5 text-xs text-white/70">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}
              />
              <strong className="text-white text-[11px]">
                {isSupabaseConfigured ? "Supabase Cloud" : "Penyimpanan Lokal"}
              </strong>
            </div>
            <p className="text-[11px] leading-relaxed">
              {isSupabaseConfigured
                ? "Data tersinkronisasi otomatis secara global."
                : "Data disimpan lokal pada server ini."}
            </p>
          </div>
        </aside>

        {/* CMS Content Body */}
        <section className="min-w-0 p-4 sm:p-7 lg:p-8 space-y-6">
          <header className="flex flex-col gap-4 border-b border-[#d8d2c4] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-hover">Content Management System</p>
              <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-teal-primary">
                {tab === "packages" && "Kelola Jadwal & Paket Ibadah"}
                {tab === "company" && "Profil Perusahaan & Legalitas"}
                {tab === "financing" && "Skema Tabungan & Pembiayaan"}
                {tab === "payments" && "Rekening Resmi Perusahaan"}
                {tab === "transfer" && "Backup, Import & Pengaturan"}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={resetData}
                className="rounded-button border border-warm-border bg-white px-3 py-2 text-xs font-bold text-slate-body hover:border-red-200 hover:text-red-700 transition-colors"
              >
                Reset Default
              </button>
              <button
                type="button"
                onClick={saveData}
                disabled={saving}
                className="rounded-button bg-gold-accent px-4 py-2 text-xs font-bold text-slate-dark shadow-card hover:bg-gold-hover disabled:cursor-wait disabled:opacity-60 transition-all flex items-center gap-1.5"
              >
                <span>{saving ? "Menyimpan…" : "Simpan Perubahan"}</span>
              </button>
            </div>
          </header>

          {isSupabaseConfigured && (
            <section className="rounded-card border border-teal-primary/20 bg-teal-primary/5 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-primary">Supabase Auth Session</p>
                  <p className="text-xs text-slate-body">
                    {authUser ? `Terhubung sebagai ${authUser}` : "Login untuk mengelola data terpusat."}
                  </p>
                </div>
                {authUser ? (
                  <button
                    type="button"
                    onClick={signOut}
                    className="rounded-button border border-warm-border bg-white px-3 py-1.5 text-xs font-bold text-slate-body hover:bg-warm-muted"
                  >
                    Keluar Sesi
                  </button>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                    <input
                      className={inputClass.replace("mt-1 ", "")}
                      type="email"
                      value={authEmail}
                      onChange={(event) => setAuthEmail(event.target.value)}
                      placeholder="Email admin"
                      aria-label="Email admin"
                    />
                    <input
                      className={inputClass.replace("mt-1 ", "")}
                      type="password"
                      value={authPassword}
                      onChange={(event) => setAuthPassword(event.target.value)}
                      placeholder="Password"
                      aria-label="Password admin"
                    />
                    <button
                      type="button"
                      onClick={signIn}
                      className="rounded-button bg-teal-primary px-4 py-1.5 text-xs font-bold text-white hover:bg-teal-900"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {(message || error) && (
            <div
              className={`rounded-button border px-4 py-3 text-sm font-medium ${
                error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"
              }`}
            >
              {error || message}
            </div>
          )}

          {/* TAB 1: PACKAGES */}
          {tab === "packages" && (
            <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
              {/* Package selector list */}
              <div className="rounded-card border border-warm-border bg-white p-4 shadow-card">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-warm-border">
                  <h2 className="font-bold text-sm text-teal-primary">Daftar Paket ({data.packages.length})</h2>
                  <button
                    type="button"
                    onClick={addPackage}
                    className="rounded-button bg-teal-primary px-2.5 py-1 text-xs font-bold text-white hover:bg-teal-900"
                  >
                    + Paket Baru
                  </button>
                </div>
                <div className="mt-3 space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {data.packages.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedPackageId(item.id)}
                      className={`w-full rounded-button border p-3 text-left transition-all ${
                        selectedPackageId === item.id
                          ? "border-teal-primary bg-teal-primary/8 shadow-xs"
                          : "border-warm-border hover:border-teal-primary/40 bg-warm-bg"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                          {item.category || item.packageType}
                        </span>
                        <span className="text-[10px] text-slate-caption font-mono">{item.duration}</span>
                      </div>
                      <span className="mt-1 block text-xs sm:text-sm font-bold leading-snug text-slate-dark truncate">
                        {item.name || "Tanpa nama"}
                      </span>
                      <span className="mt-1 block text-[11px] text-slate-muted">{item.departureDate || "Tanggal belum diisi"}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Detail Editor */}
              {selectedPackage && (
                <div className="space-y-5">
                  <div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-6">
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-warm-border">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-hover">Detail Paket</span>
                        <h2 className="font-serif text-xl font-bold text-teal-primary">{selectedPackage.name || "Paket Baru"}</h2>
                      </div>
                      <button
                        type="button"
                        onClick={deleteSelectedPackage}
                        className="rounded-button border border-red-200 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50 transition-colors"
                      >
                        Hapus Paket
                      </button>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <Field label="Nama Paket" value={selectedPackage.name} onChange={(value) => updatePackage("name", value)} />
                      <Field
                        label="Slug URL"
                        value={selectedPackage.slug}
                        onChange={(value) => updatePackage("slug", value.toLowerCase().replace(/\s+/g, "-"))}
                      />
                      <Field label="Kategori Tampilan" value={selectedPackage.category} onChange={(value) => updatePackage("category", value)} />
                      <Field label="Tanggal Keberangkatan" value={selectedPackage.departureDate} onChange={(value) => updatePackage("departureDate", value)} />
                      <Field label="Bulan Keberangkatan" value={selectedPackage.departureMonth} onChange={(value) => updatePackage("departureMonth", value)} />
                      <Field label="Durasi Tampilan (e.g. 9 Hari)" value={selectedPackage.duration} onChange={(value) => updatePackage("duration", value)} />
                      <Field
                        label="Jumlah Hari (Numerik)"
                        type="number"
                        value={selectedPackage.durationDays}
                        onChange={(value) => updatePackage("durationDays", Number(value) || 0)}
                      />
                      <Field label="Kota Embarkasi" value={selectedPackage.departureCity} onChange={(value) => updatePackage("departureCity", value)} />
                      <Field label="Jenis Penerbangan" value={selectedPackage.flightType} onChange={(value) => updatePackage("flightType", value)} />
                      <Field label="Maskapai Penerbangan" value={selectedPackage.airline} onChange={(value) => updatePackage("airline", value)} />
                      <Field label="Harga Tampilan" value={selectedPackage.discountedPrice} onChange={(value) => updatePackage("discountedPrice", value)} />
                      <Field
                        label="Harga Numerik (IDR)"
                        type="number"
                        value={selectedPackage.priceNumeric}
                        onChange={(value) => updatePackage("priceNumeric", Number(value) || 0)}
                      />
                      <Field label="Hotel Makkah" value={selectedPackage.hotelMakkah} onChange={(value) => updatePackage("hotelMakkah", value)} />
                      <Field label="Hotel Madinah" value={selectedPackage.hotelMadinah} onChange={(value) => updatePackage("hotelMadinah", value)} />
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <label className="block">
                        <span className={labelClass}>Jenis Paket</span>
                        <select
                          className={inputClass}
                          value={selectedPackage.packageType}
                          onChange={(event) => updatePackage("packageType", event.target.value as Package["packageType"])}
                        >
                          <option value="reguler">Umroh Reguler</option>
                          <option value="plus">Umroh Plus</option>
                          <option value="khusus">Haji Khusus</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className={labelClass}>Status Kuota</span>
                        <select
                          className={inputClass}
                          value={selectedPackage.statusType}
                          onChange={(event) => updatePackage("statusType", event.target.value as Package["statusType"])}
                        >
                          <option value="available">Jadwal Tersedia</option>
                          <option value="pending">Perlu Dikonfirmasi</option>
                          <option value="warning">Kuota Terbatas</option>
                          <option value="soldout">Kuota Penuh</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className={labelClass}>Lifecycle Status</span>
                        <select
                          className={inputClass}
                          value={selectedPackage.lifecycle || "upcoming"}
                          onChange={(event) => updatePackage("lifecycle", event.target.value as PackageLifecycle)}
                        >
                          <option value="draft">Draft</option>
                          <option value="upcoming">Akan Datang</option>
                          <option value="low_seats">Kursi Terbatas</option>
                          <option value="sold_out">Terjual Penuh</option>
                          <option value="closed">Pendaftaran Ditutup</option>
                          <option value="departed">Sudah Berangkat</option>
                          <option value="archived">Arsip</option>
                        </select>
                      </label>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="flex items-center gap-2.5 rounded-button border border-warm-border px-3.5 py-2.5 text-xs font-semibold bg-warm-bg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPackage.isUmroh}
                          onChange={(event) => updatePackage("isUmroh", event.target.checked)}
                          className="rounded text-teal-primary"
                        />
                        Tampilkan di Katalog Umroh
                      </label>
                      <label className="flex items-center gap-2.5 rounded-button border border-warm-border px-3.5 py-2.5 text-xs font-semibold bg-warm-bg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPackage.isHaji}
                          onChange={(event) => updatePackage("isHaji", event.target.checked)}
                          className="rounded text-teal-primary"
                        />
                        Tampilkan di Katalog Haji
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-card border border-warm-border bg-white p-5 shadow-card">
                      <LinesEditor
                        label="Fasilitas Termasuk"
                        values={selectedPackage.facilitiesIncluded || []}
                        onChange={(values) => updatePackageArray("facilitiesIncluded", values)}
                      />
                      <div className="mt-5">
                        <LinesEditor
                          label="Fasilitas Belum Termasuk"
                          values={selectedPackage.facilitiesExcluded || []}
                          onChange={(values) => updatePackageArray("facilitiesExcluded", values)}
                        />
                      </div>
                    </div>

                    <div className="rounded-card border border-warm-border bg-white p-5 shadow-card">
                      <h3 className={labelClass}>Rincian Harga Tipe Kamar</h3>
                      <div className="mt-3 space-y-3">
                        {(selectedPackage.roomPricing || []).map((room, index) => (
                          <div className="rounded-button border border-warm-border p-3 bg-warm-bg" key={room.type}>
                            <div className="grid gap-2 sm:grid-cols-2">
                              <Field
                                label={`Harga Kamar ${room.type}`}
                                value={room.price}
                                onChange={(value) =>
                                  updatePackage(
                                    "roomPricing",
                                    selectedPackage.roomPricing?.map((item, roomIndex) =>
                                      roomIndex === index ? { ...item, price: value } : item
                                    )
                                  )
                                }
                              />
                              <Field
                                label="Harga Numerik (IDR)"
                                type="number"
                                value={room.numeric}
                                onChange={(value) =>
                                  updatePackage(
                                    "roomPricing",
                                    selectedPackage.roomPricing?.map((item, roomIndex) =>
                                      roomIndex === index ? { ...item, numeric: Number(value) || 0 } : item
                                    )
                                  )
                                }
                              />
                            </div>
                            <div className="mt-2">
                              <Field
                                label="Keterangan Kamar"
                                value={room.description}
                                onChange={(value) =>
                                  updatePackage(
                                    "roomPricing",
                                    selectedPackage.roomPricing?.map((item, roomIndex) =>
                                      roomIndex === index ? { ...item, description: value } : item
                                    )
                                  )
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COMPANY */}
          {tab === "company" && (
            <div className="space-y-6">
              <div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-6">
                <h2 className="font-serif text-xl font-bold text-teal-primary">Identitas &amp; Kontak Perusahaan</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Nama Brand" value={companyRecord.brandName} onChange={(value) => updateCompany("brandName", value)} />
                  <Field label="Nama Legalitas PT" value={companyRecord.legalName} onChange={(value) => updateCompany("legalName", value)} />
                  <Field label="Alamat Kantor" value={companyRecord.address} onChange={(value) => updateCompany("address", value)} />
                  <Field label="Nomor WhatsApp" value={companyRecord.phone} onChange={(value) => updateCompany("phone", value)} />
                  <Field label="Email Resmi" type="email" value={companyRecord.email} onChange={(value) => updateCompany("email", value)} />
                  <Field label="Akun Instagram" value={companyRecord.instagramHandle} onChange={(value) => updateCompany("instagramHandle", value)} />
                </div>
              </div>

              <div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-6">
                <h2 className="font-serif text-xl font-bold text-teal-primary">Legalitas Resmi &amp; Izin PPIU</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="SK PPIU Kemenag" value={legal.ppiu} onChange={(value) => updateCompany("legal.ppiu", value)} />
                  <Field label="SK PIHK" value={legal.pihk} onChange={(value) => updateCompany("legal.pihk", value)} />
                  <Field label="Akte Notaris" value={legal.deed} onChange={(value) => updateCompany("legal.deed", value)} />
                  <Field label="SK Kemenkumham" value={legal.kemenkumham} onChange={(value) => updateCompany("legal.kemenkumham", value)} />
                  <Field label="NIB" value={legal.nib} onChange={(value) => updateCompany("legal.nib", value)} />
                  <Field label="NPWP Badan" value={legal.npwp} onChange={(value) => updateCompany("legal.npwp", value)} />
                  <Field label="Nomor Sertifikat Akreditasi" value={certification.number} onChange={(value) => updateCompany("certification.number", value)} />
                  <Field label="Tingkat Akreditasi" value={certification.accreditation} onChange={(value) => updateCompany("certification.accreditation", value)} />
                  <Field label="Tanggal Terbit" value={certification.issuedAt} onChange={(value) => updateCompany("certification.issuedAt", value)} />
                  <Field label="Masa Berlaku" value={certification.validUntil} onChange={(value) => updateCompany("certification.validUntil", value)} />
                </div>
              </div>

              <div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-6">
                <h3 className="font-serif text-lg font-bold text-teal-primary mb-3">Tim Manajemen &amp; Pimpinan</h3>
                <div className="grid gap-4 lg:grid-cols-3">
                  {company.leaders.map((leader, index) => (
                    <div className="rounded-button border border-warm-border p-4 bg-warm-bg" key={`${leader.name}-${index}`}>
                      <Field
                        label="Nama"
                        value={leader.name}
                        onChange={(value) =>
                          setData({
                            ...data,
                            company: {
                              ...data.company,
                              leaders: data.company.leaders.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, name: value } : item
                              ),
                            },
                          })
                        }
                      />
                      <div className="mt-3">
                        <Field
                          label="Jabatan / Peran"
                          value={leader.role}
                          onChange={(value) =>
                            setData({
                              ...data,
                              company: {
                                ...data.company,
                                leaders: data.company.leaders.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, role: value } : item
                                ),
                              },
                            })
                          }
                        />
                      </div>
                      <label className="mt-3 block">
                        <span className={labelClass}>Biografi Singkat</span>
                        <textarea
                          className={`${inputClass} min-h-24`}
                          value={leader.description}
                          onChange={(event) =>
                            setData({
                              ...data,
                              company: {
                                ...data.company,
                                leaders: data.company.leaders.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, description: event.target.value } : item
                                ),
                              },
                            })
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINANCING */}
          {tab === "financing" && (
            <div className="space-y-6">
              <div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-6">
                <h2 className="font-serif text-xl font-bold text-teal-primary">Ketentuan Pembiayaan &amp; DP</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="DP Umroh" value={financing.umrahDp} onChange={(value) => updateCompany("financing.umrahDp", value)} />
                  <Field label="DP Haji" value={financing.hajjDp} onChange={(value) => updateCompany("financing.hajjDp", value)} />
                </div>
                <label className="mt-4 block">
                  <span className={labelClass}>Catatan Ketentuan Pembayaran</span>
                  <textarea
                    className={`${inputClass} min-h-20`}
                    value={financing.note}
                    onChange={(event) => updateCompany("financing.note", event.target.value)}
                  />
                </label>
                <div className="mt-5">
                  <LinesEditor
                    label="Metode Pembayaran Resmi"
                    values={financing.options}
                    onChange={(values) => updateCompany("financing.options", values)}
                  />
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-card border border-warm-border bg-white p-5 shadow-card">
                  <h3 className="font-serif text-lg font-bold text-teal-primary">Simulasi Tabungan Umroh</h3>
                  <div className="mt-4 space-y-3">
                    {financing.umrahSavings.map((row, index) => (
                      <div className="grid gap-2 rounded-button border border-warm-border p-3 sm:grid-cols-3 bg-warm-bg" key={`${row.term}-${index}`}>
                        <Field
                          label="Jangka Waktu"
                          value={row.term}
                          onChange={(value) =>
                            updateCompany(
                              "financing.umrahSavings",
                              financing.umrahSavings.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, term: value } : item
                              )
                            )
                          }
                        />
                        <Field
                          label="Angsuran Bulanan"
                          value={row.monthly}
                          onChange={(value) =>
                            updateCompany(
                              "financing.umrahSavings",
                              financing.umrahSavings.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, monthly: value } : item
                              )
                            )
                          }
                        />
                        <Field
                          label="Setara Harian"
                          value={row.daily}
                          onChange={(value) =>
                            updateCompany(
                              "financing.umrahSavings",
                              financing.umrahSavings.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, daily: value } : item
                              )
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-card border border-warm-border bg-white p-5 shadow-card">
                  <h3 className="font-serif text-lg font-bold text-teal-primary">Simulasi Tabungan Haji</h3>
                  <div className="mt-4 space-y-3">
                    {financing.hajjSavings.map((row, index) => (
                      <div className="grid gap-2 rounded-button border border-warm-border p-3 sm:grid-cols-2 bg-warm-bg" key={`${row.name}-${index}`}>
                        <Field
                          label="Nama Program"
                          value={row.name}
                          onChange={(value) =>
                            updateCompany(
                              "financing.hajjSavings",
                              financing.hajjSavings.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, name: value } : item
                              )
                            )
                          }
                        />
                        <Field
                          label="Deposit Awal"
                          value={row.deposit}
                          onChange={(value) =>
                            updateCompany(
                              "financing.hajjSavings",
                              financing.hajjSavings.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, deposit: value } : item
                              )
                            )
                          }
                        />
                        <Field
                          label="Bulanan"
                          value={row.monthly}
                          onChange={(value) =>
                            updateCompany(
                              "financing.hajjSavings",
                              financing.hajjSavings.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, monthly: value } : item
                              )
                            )
                          }
                        />
                        <Field
                          label="Tenor"
                          value={row.term}
                          onChange={(value) =>
                            updateCompany(
                              "financing.hajjSavings",
                              financing.hajjSavings.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, term: value } : item
                              )
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENTS */}
          {tab === "payments" && (
            <div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-6">
              <h2 className="font-serif text-xl font-bold text-teal-primary">Rekening Bank Resmi Perusahaan</h2>
              <p className="mt-1 text-xs text-slate-muted">
                Rekening ini ditampilkan di footer dan halaman legalitas sebagai rujukan resmi jamaah.
              </p>
              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {company.bankAccounts.map((account, index) => (
                  <div className="rounded-button border border-warm-border p-4 bg-warm-bg" key={`${account.bank}-${index}`}>
                    <Field
                      label="Nama Bank"
                      value={account.bank}
                      onChange={(value) =>
                        setData({
                          ...data,
                          company: {
                            ...data.company,
                            bankAccounts: data.company.bankAccounts.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, bank: value } : item
                            ),
                          },
                        })
                      }
                    />
                    <div className="mt-3">
                      <Field
                        label="Nomor Rekening"
                        value={account.account}
                        onChange={(value) =>
                          setData({
                            ...data,
                            company: {
                              ...data.company,
                              bankAccounts: data.company.bankAccounts.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, account: value } : item
                              ),
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TRANSFER & BACKUP */}
          {tab === "transfer" && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-card border border-warm-border bg-white p-5 shadow-card sm:p-6">
                <h2 className="font-serif text-xl font-bold text-teal-primary">Backup &amp; Restore JSON</h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-muted">
                  Unduh seluruh database CMS dalam bentuk berkas JSON untuk backup atau transfer ke server lain.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={exportData}
                    className="rounded-button bg-teal-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-teal-900 shadow-card"
                  >
                    Unduh Backup JSON
                  </button>
                  <label className="cursor-pointer rounded-button border border-warm-border bg-white px-4 py-2.5 text-xs font-bold text-teal-primary hover:border-teal-primary/40 hover:bg-warm-muted transition-colors">
                    Unggah Restore JSON
                    <input
                      className="sr-only"
                      type="file"
                      accept="application/json"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) importData(file);
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-card border border-amber-200 bg-amber-50 p-5 shadow-card sm:p-6">
                <h2 className="font-serif text-xl font-bold text-amber-900">Status Server &amp; Database</h2>
                <p className="mt-2 text-xs leading-relaxed text-amber-900/80">
                  {isSupabaseConfigured
                    ? "Supabase aktif: Perubahan data tersimpan secara terpusat di cloud database PostgreSQL Supabase."
                    : "Penyimpanan lokal aktif: Data disimpan di berkas JSON filesystem server lokal."}
                </p>
                {!isSupabaseConfigured && (
                  <label className="mt-4 block">
                    <span className={labelClass}>Token Admin Lokal (Opsional)</span>
                    <input
                      className={inputClass}
                      type="password"
                      value={token}
                      onChange={(event) => setToken(event.target.value)}
                      placeholder="CMS_ADMIN_TOKEN"
                    />
                  </label>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
