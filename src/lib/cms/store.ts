import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getDefaultSiteData } from "@/lib/cms/default-data";
import type { SiteData } from "@/lib/cms/types";
import { getSupabaseSiteData, isSupabaseConfigured } from "@/lib/supabase/server";

const contentDirectory = path.join(process.cwd(), "content");
const contentPath = path.join(contentDirectory, "site-data.json");

function isSiteData(value: unknown): value is SiteData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SiteData>;
  return Boolean(candidate.company && Array.isArray(candidate.packages));
}

export async function getSiteData(): Promise<SiteData> {
  if (isSupabaseConfigured) {
    const remoteData = await getSupabaseSiteData();
    if (remoteData) return remoteData;
  }

  try {
    const raw = await readFile(contentPath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (isSiteData(parsed)) return parsed;
  } catch {
    // The first request uses the checked-in seed and creates the local store.
  }

  const seed = getDefaultSiteData();
  await writeSiteData(seed);
  return seed;
}

export async function writeSiteData(data: SiteData): Promise<SiteData> {
  await mkdir(contentDirectory, { recursive: true });
  await writeFile(contentPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return data;
}

export function getContentPath() {
  return contentPath;
}
