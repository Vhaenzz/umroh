import type { CompanyProfile } from "@/data/company";
import type { Package } from "@/types/package";

export type EditableCompanyProfile = CompanyProfile;

export interface SiteData {
  company: EditableCompanyProfile;
  packages: Package[];
}

