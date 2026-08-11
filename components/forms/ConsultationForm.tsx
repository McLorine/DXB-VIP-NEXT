import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import FloatingField from "@/components/common/FloatingField";
import GoldButton from "@/components/common/GoldButton";

const INTERESTS = [
  "Free Zone Company", "Mainland Company", "Offshore Company",
  "Trade License", "E-Commerce License", "Golden Visa / Residency",
  "Corporate Banking", "Tax & Accounting", "Not sure yet"
];

const empty = { full_name: "", email: "", phone: "", nationality: "", interest: "", message: "" };

export default function ConsultationForm({ sourcePage = "home" }) {
  const [form, setForm] = useState(empty);
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      await base44.entities.Lead.create({ ...form, source_page: sourcePage });
      setState("done");
      setForm(empty);
    } catch (err) {
      setState("idle");
      setError("We couldn't send that just now. Please try again or WhatsApp us directly.");
    }
  };

  if (state === "done") {
    return (
      <div className="glass rounded-[20px] p-10 md:p-14 text-center">
        <CheckCircle2 className="mx-auto w-12 h-12 text-gold" strokeWidth={1.2} />
        <h3 className="mt-6 text-[1.6rem]">Your consultation is requested</h3>
        <p className="mt-3 text-slatewarm max-w-md mx-auto">
          A senior advisor will contact you within one business day with a structure recommendation and a fixed cost breakdown.
        </p>
        <button onClick={() => setState("idle")} className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass relative rounded-[20px] p-7 md:p-10 shadow-[0_50px_100px_-60px_rgba(26,26,26,0.5)]">
      <ShieldCheck className="absolute right-7 top-7 w-6 h-6 text-gold/70" strokeWidth={1.2} />
      <span className="eyebrow">Free Consultation</span>
      <h3 className="mt-3 text-[1.7rem] md:text-[2.1rem] leading-tight max-w-md">Speak with a senior UAE advisor</h3>
      <p className="mt-3 text-[0.93rem] text-slatewarm max-w-lg">
        30 minutes, no obligation. You leave with a written recommendation and an all-inclusive cost estimate.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <FloatingField label="Full name" name="full_name" value={form.full_name} onChange={onChange} required />
        <FloatingField label="Email address" name="email" type="email" value={form.email} onChange={onChange} required />
        <FloatingField label="Phone / WhatsApp" name="phone" value={form.phone} onChange={onChange} />
        <FloatingField label="Nationality" name="nationality" value={form.nationality} onChange={onChange} />
        <div className="sm:col-span-2">
          <FloatingField label="What are you interested in?" name="interest" value={form.interest} onChange={onChange} options={INTERESTS} />
        </div>
        <div className="sm:col-span-2">
          <FloatingField label="Tell us about your business" name="message" value={form.message} onChange={onChange} textarea />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
        <GoldButton type="submit" disabled={state === "loading"} className="disabled:opacity-70">
          {state === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending</> : "Request My Free Consultation"}
        </GoldButton>
        <p className="flex items-start gap-2 text-[0.76rem] leading-snug text-slatewarm/90 max-w-xs">
          <ShieldCheck className="w-4 h-4 shrink-0 text-gold" strokeWidth={1.4} />
          Strictly confidential. Your details are never shared, and we don't send marketing spam.
        </p>
      </div>
    </form>
  );
}