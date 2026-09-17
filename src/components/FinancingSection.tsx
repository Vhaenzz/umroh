import type { CompanyProfile } from "@/data/company";

export default function FinancingSection({ company }: { company: CompanyProfile }) {
  return (
    <section id="pembiayaan" className="border-t border-warm-border bg-warm-surface py-12 sm:py-16 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-hover">Rencana biaya</p>
          <h2 className="font-sans text-2xl font-bold leading-tight text-teal-primary sm:text-3xl">Tiga langkah ke Baitullah</h2>
          <p className="mt-3 text-sm leading-6 text-slate-body sm:text-base">
            Skema di bawah ini mengikuti profil layanan Risalah Madina Tour. Nilai program, fasilitas, dan harga tetap perlu dikonfirmasi sebelum pembayaran.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-card border border-warm-border bg-warm-bg p-5 sm:p-6">
            <h3 className="font-sans text-lg font-bold text-teal-primary">Pilihan pembayaran</h3>
            <div className="mt-4 space-y-3">
              {company.financing.options.map((option, index) => (
                <div key={option} className="flex gap-3 border-b border-warm-border pb-3 last:border-0 last:pb-0">
                  <span className="font-mono text-sm font-bold text-gold-hover">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-6 text-slate-body">{option}</span>
                </div>
              ))}
            </div>
            <dl className="mt-5 space-y-3 border-t border-warm-border pt-4 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-slate-muted">DP Umrah</dt><dd className="text-right font-bold text-teal-primary">{company.financing.umrahDp}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-muted">DP Haji</dt><dd className="text-right font-bold text-teal-primary">{company.financing.hajjDp}</dd></div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-slate-muted">Catatan: {company.financing.note}</p>
          </div>

          <div className="rounded-card border border-warm-border bg-warm-bg p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="font-sans text-lg font-bold text-teal-primary">Tabungan Umroh</h3>
                <p className="mt-1 text-sm text-slate-muted">Estimasi total biaya Rp 32.500.000 per paket.</p>
              </div>
              <span className="text-xs text-slate-muted">Per bulan / per hari</span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                <thead><tr className="border-b border-warm-border text-xs uppercase tracking-wider text-slate-muted"><th className="px-3 py-3">Jangka waktu</th><th className="px-3 py-3">Angsuran</th><th className="px-3 py-3">Menabung</th></tr></thead>
                <tbody>
                  {company.financing.umrahSavings.map((row) => (
                    <tr key={row.term} className="border-b border-warm-border/70 last:border-0"><td className="px-3 py-3 font-semibold text-teal-primary">{row.term}</td><td className="px-3 py-3 text-slate-body">{row.monthly}</td><td className="px-3 py-3 text-slate-body">{row.daily}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 border-t border-warm-border pt-5">
              <h4 className="font-sans text-base font-bold text-teal-primary">Tabungan Haji Khusus</h4>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[38rem] border-collapse text-sm">
                  <thead><tr className="border-b border-warm-border text-left text-xs uppercase tracking-wider text-slate-muted"><th className="px-3 py-3">Paket</th><th className="px-3 py-3">Deposit porsi</th><th className="px-3 py-3">Bulanan</th><th className="px-3 py-3">Total tabungan</th></tr></thead>
                  <tbody>
                    {company.financing.hajjSavings.map((row) => (
                      <tr key={row.name} className="border-b border-warm-border/70 last:border-0"><td className="px-3 py-3 font-semibold text-teal-primary">{row.name}</td><td className="px-3 py-3 text-slate-body">{row.deposit}</td><td className="px-3 py-3 text-slate-body">{row.monthly}</td><td className="px-3 py-3 text-slate-body">{row.total}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-muted">Setoran bulanan berlangsung selama 72 bulan. Kurs USD mengikuti nilai tukar saat transaksi.</p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-card border border-warm-border bg-warm-bg p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><h3 className="font-sans text-lg font-bold text-teal-primary">Perlengkapan Umroh Premium</h3><p className="mt-1 text-sm text-slate-muted">Perlengkapan yang tercantum pada profil layanan.</p></div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-body">{company.equipment.map((item) => <span key={item}>✓ {item}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
