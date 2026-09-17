import type { companyProfile } from "@/data/company";
import type { Package } from "@/types/package";

type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutable<U>[]
  : T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T;

export type EditableCompanyProfile = DeepMutable<typeof companyProfile>;

export interface SiteData {
  company: EditableCompanyProfile;
  packages: Package[];
}
