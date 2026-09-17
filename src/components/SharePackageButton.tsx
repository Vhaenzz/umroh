"use client";

import { useState } from "react";

export default function SharePackageButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button type="button" onClick={share} className="inline-flex min-h-11 items-center gap-2 rounded-button border border-warm-border px-4 py-2.5 text-sm font-bold text-teal-primary hover:border-teal-primary hover:bg-warm-surface" aria-label={`Bagikan ${title}`}>
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
      </svg>
      {copied ? "Tautan tersalin" : "Bagikan paket"}
    </button>
  );
}
