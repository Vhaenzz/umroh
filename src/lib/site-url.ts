export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://umroh.pondokabdurrahmanbinauf.web.id";
  return url.replace(/\/$/, "");
}

export function getAbsoluteUrl(path: string = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
