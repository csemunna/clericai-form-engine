"use client";

import jsPDF from "jspdf";

export default function FormUI({ form }: { form: any }) {
  if (!form) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-sm text-red-600">Form not found.</p>
      </div>
    );
  }

  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text(form.title || "Form", 20, y);
    y += 10;

    doc.setFontSize(11);

    form.sections.forEach((section: any) => {
      doc.text(section.name, 20, y);
      y += 6;

      section.fields.forEach((field: any) => {
        doc.text(`${field.label}: ____________________`, 24, y);
        y += 6;
      });

      y += 4;
    });

    doc.save(`${form.id || "form"}.pdf`);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        {form.title}
      </h2>

      <div className="space-y-6">
        {form.sections.map((section: any, index: number) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-slate-50/80 p-4"
          >
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              {section.name}
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              {section.fields.map((field: any) => (
                <div key={field.id} className="flex flex-col gap-1">
                  <label
                    htmlFor={field.id}
                    className="text-xs font-medium text-slate-700"
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-0.5 text-red-500">*</span>
                    )}
                  </label>

                  <input
                    id={field.id}
                    type={field.type === "date" ? "date" : "text"}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleGeneratePdf}
          className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Download PDF (demo)
        </button>
      </div>
    </div>
  );
}
