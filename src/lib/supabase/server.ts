import { createClient } from "@supabase/supabase-js";
import type { SiteData } from "@/lib/cms/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function getClient(accessToken?: string) {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
  });
}

export async function getSupabaseSiteData(): Promise<SiteData | null> {
  const client = getClient();
  if (!client) return null;
  const { data, error } = await client.from("cms_site_data").select("company, packages").eq("id", true).maybeSingle();
  if (error || !data || !data.company || !Array.isArray(data.packages)) return null;
  return { company: data.company as SiteData["company"], packages: data.packages as SiteData["packages"] };
}

export async function authorizeSupabase(accessToken: string) {
  const client = getClient(accessToken);
  if (!client) return null;
  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user) return null;
  const { data: member, error: memberError } = await client.from("cms_members").select("role").eq("user_id", userData.user.id).maybeSingle();
  if (memberError || !member || !["admin", "editor"].includes(member.role)) return null;
  return { client, user: userData.user, role: member.role as "admin" | "editor" };
}

export async function writeSupabaseSiteData(data: SiteData, accessToken: string) {
  const authorization = await authorizeSupabase(accessToken);
  if (!authorization) return null;
  const { error } = await authorization.client.from("cms_site_data").upsert({
    id: true,
    company: data.company,
    packages: data.packages,
    updated_at: new Date().toISOString(),
    updated_by: authorization.user.id,
  }, { onConflict: "id" });
  if (error) throw new Error(error.message);
  return data;
}
