"use client";

import { useEffect, useState } from "react";
import FormUI from "../forms/[id]/FormUI";

type FormSchema = any;

const FORM_OPTIONS = [
  {
    value: "i130",
    label: "Form I-130 – Petition for Alien Relative",
    tag: "Immigration"
  },
  {
    value: "w2",
    label: "Form W-2 – Wage and Tax Statement",
    tag: "Payroll / Tax"
  },
  {
    value: "1099",
    label: "Form 1099 – Miscellaneous Income",
    tag: "Contractors / Tax"
  }
];

export default function DemoPage() {
  const [selectedForm, setSelectedForm] = useState("i130");
  const [formData, setFormData] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(false);

  // load JSON schema for the currently selected form
  useEffect(() => {
    async function loadForm() {
      try {
        setLoading(true);
        const res = await fetch(`/api/forms/${selectedForm}`);
        const data = await res.json();
        setFormData(data);
      } finally {
        setLoading(false);
      }
    }

    loadForm();
  }, [selectedForm]);

  const activeOption = FORM_OPTIONS.find(o => o.value === selectedForm);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar / branding */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-xs font-semibold text-white">
              CE
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                ClericAI Form Engine
              </p>
              <p className="text-xs text-slate-500">
                One engine for immigration, tax & business forms
              </p>
            </div>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            MVP Demo
          </span>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 lg:flex-row">
        {/* Left side: explanation / investor view */}
        <section className="w-full max-w-sm space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Form Engine Demo
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Upload any government or business form once, convert it to a JSON
              schema, and let the engine render, validate, and export it as a
              clean PDF. The same engine works for{" "}
              <span className="font-medium">immigration</span>,{" "}
              <span className="font-medium">tax</span>, and{" "}
              <span className="font-medium">back-office workflows</span>.
            </p>
          </div>

          {/* Form selector */}
          <div className="space-y-2 rounded-xl bg-white p-4 shadow-sm">
            <label
              htmlFor="form-select"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Select a sample form
            </label>
            <select
              id="form-select"
              value={selectedForm}
              onChange={e => setSelectedForm(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              {FORM_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {activeOption && (
              <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                  {activeOption.tag}
                </span>
                <span>Rendered live from JSON schema.</span>
              </p>
            )}
          </div>

          {/* Value props */}
          <div className="space-y-3 rounded-xl bg-slate-900 px-4 py-4 text-xs text-slate-100">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
              What this demo proves
            </p>
            <ul className="space-y-2">
              <li>• One UI engine for multiple agencies & use-cases.</li>
              <li>• PDF output generated client-side (no heavy backend).</li>
              <li>• Easy to plug into CRMs or client portals later.</li>
            </ul>
            <p className="text-[11px] text-slate-300">
              Next milestones: auto-fill from client data, e-signature, and
              document upload parsing.
            </p>
          </div>
        </section>

        {/* Right side: live form */}
        <section className="flex-1">
          {loading || !formData ? (
            <div className="mt-10 flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-sm text-slate-500">
              Loading form…
            </div>
          ) : (
            <FormUI form={formData} />
          )}
        </section>
      </main>
    </div>
  );
}
