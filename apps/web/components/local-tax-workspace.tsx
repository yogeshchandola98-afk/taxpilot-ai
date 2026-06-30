'use client';

import { useEffect, useMemo, useState } from 'react';
import { getTaxWorkspace, saveTaxWorkspace, clearTaxWorkspace, TaxWorkspaceData } from '@/lib/sqlite-db';

const defaultData: TaxWorkspaceData = {
  pan: '',
  financialYear: '2025-26',
  income: '',
  deductions: '',
  notes: '',
};

export function LocalTaxWorkspace() {
  const [data, setData] = useState<TaxWorkspaceData>(defaultData);
  const [savedAt, setSavedAt] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getTaxWorkspace().then((loaded) => {
      if (!mounted) return;
      setData(loaded);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (loading) return;
    saveTaxWorkspace(data).then(() => {
      setSavedAt(new Date().toLocaleString());
    });
  }, [data, loading]);

  const taxableEstimate = useMemo(() => {
    const income = Number(data.income || 0);
    const deductions = Number(data.deductions || 0);
    return Math.max(income - deductions, 0);
  }, [data.deductions, data.income]);

  const updateField = (field: keyof TaxWorkspaceData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
  };

  const handleClear = async () => {
    await clearTaxWorkspace();
    setData(defaultData);
    setSavedAt('');
  };

  if (loading) {
    return (
      <section id="local-workspace" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
          <p className="text-center text-slate-300">Loading SQLite workspace...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="local-workspace" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">SQLite local storage</p>
          <h2 className="mt-3 text-3xl font-bold">Your tax workspace stays in this browser</h2>
          <p className="mt-4 text-slate-300">Data is stored in an in-browser SQLite database persisted via localStorage. No cloud database or backend is required for this demo mode. All data stays on this laptop.</p>
          <div className="mt-6 rounded-2xl bg-slate-950/60 p-4 text-sm text-slate-300">
            <p>Estimated taxable income</p>
            <p className="mt-2 text-3xl font-black text-white">₹{taxableEstimate.toLocaleString('en-IN')}</p>
            <p className="mt-2 text-xs text-slate-400">Saved automatically{savedAt ? ` at ${savedAt}` : ''}</p>
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl bg-slate-950/70 p-5">
          <label className="grid gap-2 text-sm font-semibold text-slate-200">
            PAN
            <input value={data.pan} onChange={(event) => updateField('pan', event.target.value.toUpperCase())} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300" placeholder="ABCDE1234F" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-200">
            Financial year
            <input value={data.financialYear} onChange={(event) => updateField('financialYear', event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-200">
              Annual income
              <input value={data.income} onChange={(event) => updateField('income', event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300" inputMode="numeric" placeholder="1200000" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-200">
              Deductions
              <input value={data.deductions} onChange={(event) => updateField('deductions', event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300" inputMode="numeric" placeholder="200000" />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-slate-200">
            Notes and pending documents
            <textarea value={data.notes} onChange={(event) => updateField('notes', event.target.value)} className="min-h-28 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300" placeholder="Add reminders, deductions to verify, or document checklist" />
          </label>
          <button onClick={handleClear} className="rounded-2xl border border-white/15 px-5 py-3 font-bold text-white">Clear local workspace</button>
        </div>
      </div>
    </section>
  );
}
