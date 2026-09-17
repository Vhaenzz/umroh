import { redirect } from "next/navigation";
import { getSiteData } from "@/lib/cms/store";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LegacyPaketRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const { packages } = await getSiteData();
  const pkg = packages.find((item) => item.slug.toLowerCase() === slug.toLowerCase());
  redirect(`/${pkg?.isHaji ? "haji" : "umroh"}/${slug}`);
}
