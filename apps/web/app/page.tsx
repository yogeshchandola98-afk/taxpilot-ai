import { LocalTaxWorkspace } from '@/components/local-tax-workspace';

const features = [
  'AI document extraction with confidence scores',
  'AIS, TIS, and Form 26AS mismatch detection',
  'Old vs new tax regime comparison',
  'Capital gains and broker statement analysis',
  'Deduction finder and tax-saving suggestions',
  'Ready-to-review ITR summary exports',
];

const steps = ['Upload documents', 'Review extracted values', 'Compare regimes', 'Validate return', 'Generate summary'];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-8">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
          <div className="text-xl font-bold">TaxPilot AI</div>
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <button className="rounded-full bg-cyan-400 px-5 py-2 font-semibold text-slate-950">Start filing</button>
        </nav>

        <div className="grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">AI tax preparation for India</p>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">File Your Income Tax Return in Minutes with AI.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Upload Form 16, AIS, Form 26AS, broker statements, and investment proofs. TaxPilot AI extracts values, explains rules, compares regimes, finds deductions, and prepares a clean summary for review.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#local-workspace" className="rounded-2xl bg-cyan-400 px-8 py-4 text-center font-bold text-slate-950 shadow-lg shadow-cyan-500/20">Get started</a>
              <a href="#features" className="rounded-2xl border border-white/15 px-8 py-4 text-center font-bold text-white">View demo</a>
            </div>
            <p className="mt-5 text-sm text-slate-400">TaxPilot AI assists in preparation and does not replace advice from a qualified Chartered Accountant for complex tax situations.</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Filing progress</p>
                <h2 className="text-2xl font-bold">FY 2025-26</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm text-emerald-200">64% complete</span>
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl bg-slate-900/70 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 font-bold text-slate-950">{index + 1}</div>
                  <div>
                    <p className="font-semibold">{step}</p>
                    <p className="text-sm text-slate-400">Review required before final summary</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LocalTaxWorkspace />

      <section id="features" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-3xl font-bold">Everything needed for guided ITR preparation</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
              <p className="font-semibold">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
          <h2 className="text-3xl font-bold">Privacy-first and compliance-aware</h2>
          <p className="mt-4 max-w-3xl text-slate-300">Designed for HTTPS, encryption at rest, role-based access, audit logs, secure authentication, no data sharing, and clear human review before generating a return-ready summary.</p>
        </div>
      </section>
    </main>
  );
}
