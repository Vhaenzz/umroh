import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import type { SiteData } from "@/lib/cms/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export interface SupabaseAuthContext {
  client: SupabaseClient;
  user: User;
  role: "admin" | "editor";
}

export type SupabaseWriteResult =
  | { success: true; data: SiteData }
  | { success: false; conflict: true; currentUpdatedAt?: string; message: string }
  | { success: false; conflict: false; message: string };

function getClient(accessToken?: string) {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: {
      ...(accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}),
      fetch: async (input, init) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
          return await fetch(input, { ...init, signal: controller.signal });
        } finally {
          clearTimeout(timeout);
        }
      },
    },
  });
}

export async function getSupabaseSiteData(): Promise<SiteData | null> {
  const client = getClient();
  if (!client) return null;
  const { data, error } = await client
    .from("cms_site_data")
    .select("company, packages, updated_at")
    .eq("id", true)
    .maybeSingle();
  if (error || !data || !data.company || !Array.isArray(data.packages)) return null;
  return {
    company: data.company as SiteData["company"],
    packages: data.packages as SiteData["packages"],
    updated_at: (data.updated_at as string) || undefined,
  };
}

export async function authorizeSupabase(accessToken: string): Promise<SupabaseAuthContext | null> {
  const client = getClient(accessToken);
  if (!client) return null;
  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user) return null;
  const { data: member, error: memberError } = await client
    .from("cms_members")
    .select("role")
    .eq("user_id", userData.user.id)
    .maybeSingle();
  if (memberError || !member || !["admin", "editor"].includes(member.role)) return null;
  return { client, user: userData.user, role: member.role as "admin" | "editor" };
}

export async function writeSupabaseSiteData(
  data: SiteData,
  auth: SupabaseAuthContext,
  expectedUpdatedAt?: string
): Promise<SupabaseWriteResult> {
  const { client, user } = auth;

  // Optimistic concurrency control (409 Conflict check)
  if (expectedUpdatedAt) {
    const { data: current, error: checkError } = await client
      .from("cms_site_data")
      .select("updated_at")
      .eq("id", true)
      .maybeSingle();

    if (!checkError && current?.updated_at) {
      const currentMs = new Date(current.updated_at).getTime();
      const expectedMs = new Date(expectedUpdatedAt).getTime();
      // If server timestamp is newer than expected by more than 1 second
      if (!Number.isNaN(currentMs) && !Number.isNaN(expectedMs) && Math.abs(currentMs - expectedMs) > 1000) {
        return {
          success: false,
          conflict: true,
          currentUpdatedAt: current.updated_at,
          message: "Data telah diperbarui oleh pengguna lain. Silakan muat ulang halaman untuk memperbarui sebelum menyimpan.",
        };
      }
    }
  }

  const newUpdatedAt = new Date().toISOString();
  const { error } = await client.from("cms_site_data").upsert(
    {
      id: true,
      company: data.company,
      packages: data.packages,
      updated_at: newUpdatedAt,
      updated_by: user.id,
    },
    { onConflict: "id" }
  );

  if (error) {
    return { success: false, conflict: false, message: error.message };
  }

  return {
    success: true,
    data: {
      ...data,
      updated_at: newUpdatedAt,
    },
  };
}

