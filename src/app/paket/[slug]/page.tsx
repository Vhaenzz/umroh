import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LegacyPaketRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/umroh/${slug}`);
}
