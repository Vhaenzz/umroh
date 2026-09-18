import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-warm-bg">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-3 border-teal-primary/20 border-t-teal-primary animate-spin" />
        <span className="font-sans text-xs font-semibold text-slate-muted uppercase tracking-wider animate-pulse">
          Memuat Informasi...
        </span>
      </div>
    </div>
  );
}
