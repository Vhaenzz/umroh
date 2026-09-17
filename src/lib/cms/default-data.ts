import { companyProfile } from "@/data/company";
import { packages } from "@/data/packages";
import type { SiteData } from "@/lib/cms/types";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function getDefaultSiteData(): SiteData {
  return {
    company: clone(companyProfile) as unknown as SiteData["company"],
    packages: clone(packages),
  };
}
