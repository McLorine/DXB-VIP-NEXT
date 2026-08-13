"use client"
import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import FloatingField from "@/components/common/FloatingField";
import GoldButton from "@/components/common/GoldButton";
import type { ConsultationCustomField } from "@/lib/wordpress/types";

interface Props {
  fields: ConsultationCustomField[];
  sourcePage: string;
  submitButtonText: string;
  privacyText: string;
}

export default function CustomLeadForm({ fields, sourcePage, submitButtonText, privacyText }: Props) {
  const emptyForm = Object.fromEntries(fields.map((f) => [f.fieldName, ""]));
  const [form, setForm] = useState<Record<string, string>>(emptyForm);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      await base44.entities.Lead.create({ ...form, source_page: sourcePage });
      setState("done");
      setForm(emptyForm);
    } catch {
      setState("idle");
      setError("We couldn't send that just now. Please try again or WhatsApp us directly.");
    }
  };

  if (state === "done") {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="mx-auto w-12 h-12 text-gold" strokeWidth={1.2} />
        <h3 className="mt-6 text-[1.6rem]">Your consultation is requested</h3>
        <p className="mt-3 text-slatewarm max-w-md mx-auto">
          A senior advisor will contact you within one business day with a structure recommendation
          and a fixed cost breakdown.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const rawFieldType = String(f.fieldType ?? "text").toLowerCase().trim();
          const isTextarea = rawFieldType === "textarea" || rawFieldType === "text area";
          const isSelect = rawFieldType === "select" || rawFieldType === "dropdown" || rawFieldType === "select box";
          const inputType = isTextarea || isSelect ? "text" : rawFieldType;
          const wide = isTextarea || isSelect;
          const options = isSelect ? (f.fieldOptions ?? []).map((o) => o.optionLabel) : undefined;

          return (
            <div key={f.fieldName} className={wide ? "sm:col-span-2" : undefined}>
              <FloatingField
                label={f.fieldLabel}
                name={f.fieldName}
                type={inputType}
                textarea={isTextarea}
                options={options}
                value={form[f.fieldName] ?? ""}
                onChange={onChange}
                required={f.fieldRequired}
              />
            </div>
          );
        })}
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
        <GoldButton type="submit" disabled={state === "loading"} className="disabled:opacity-70">
          {state === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending
            </>
          ) : (
            submitButtonText
          )}
        </GoldButton>
        <p className="flex items-start gap-2 text-[0.76rem] leading-snug text-slatewarm/90 max-w-xs">
          <ShieldCheck className="w-4 h-4 shrink-0 text-gold" strokeWidth={1.4} />
          {privacyText}
        </p>
      </div>
    </form>
  );
}
