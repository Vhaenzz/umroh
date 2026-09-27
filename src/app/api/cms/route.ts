import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getDefaultSiteData } from "@/lib/cms/default-data";
import { getSiteData, SITE_DATA_CACHE_TAG, writeSiteData } from "@/lib/cms/store";
import type { SiteData } from "@/lib/cms/types";
import { authorizeSupabase, isSupabaseConfigured, writeSupabaseSiteData } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function getBearerToken(request: NextRequest) {
  const value = request.headers.get("authorization");
  return value?.startsWith("Bearer ") ? value.slice(7) : "";
}

function canMutate(request: NextRequest) {
  const configuredToken = process.env.CMS_ADMIN_TOKEN;
  if (process.env.NODE_ENV !== "production" && !configuredToken) return true;
  return Boolean(
    configuredToken && request.headers.get("authorization") === `Bearer ${configuredToken}`,
  );
}

function isSiteData(value: unknown): value is SiteData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SiteData>;
  return Boolean(candidate.company && Array.isArray(candidate.packages));
}

function invalidateSiteData() {
  revalidateTag(SITE_DATA_CACHE_TAG, "max");
  revalidatePath("/", "layout");
}

export async function GET() {
  return NextResponse.json(await getSiteData());
}

export async function PUT(request: NextRequest) {
  const accessToken = getBearerToken(request);
  if (isSupabaseConfigured) {
    if (!accessToken || !(await authorizeSupabase(accessToken))) {
      return NextResponse.json({ error: "Login Supabase dengan role editor/admin diperlukan." }, { status: 401 });
    }
  } else if (!canMutate(request)) {
    return NextResponse.json(
      { error: "CMS_ADMIN_TOKEN diperlukan untuk menyimpan perubahan." },
      { status: 401 },
    );
  }

  const body: unknown = await request.json();
  if (body && typeof body === "object" && "reset" in body && body.reset === true) {
    const seed = getDefaultSiteData();
    const saved = isSupabaseConfigured ? await writeSupabaseSiteData(seed, accessToken) : await writeSiteData(seed);
    invalidateSiteData();
    return NextResponse.json(saved);
  }

  if (!isSiteData(body)) {
    return NextResponse.json({ error: "Format data CMS tidak valid." }, { status: 400 });
  }

  const saved = isSupabaseConfigured ? await writeSupabaseSiteData(body, accessToken) : await writeSiteData(body);
  invalidateSiteData();
  return NextResponse.json(saved);
}
