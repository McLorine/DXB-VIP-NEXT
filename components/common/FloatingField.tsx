import React from "react";

type FloatingFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  textarea?: boolean;
  options?: string[];
};

export default function FloatingField({ label, name, type = "text", value, onChange, required, textarea, options }: FloatingFieldProps) {
  const shared =
    "peer w-full rounded-xl border border-gold/25 bg-white/70 px-4 pt-6 pb-2 text-[0.95rem] text-charcoal outline-none transition-all duration-300 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15";
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={name} name={name} rows={4} value={value} onChange={onChange} required={required} placeholder=" " className={shared} />
      ) : options ? (
        <select id={name} name={name} value={value} onChange={onChange} required={required} className={`${shared} appearance-none`}>
          <option value="">Select…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input id={name} name={name} type={type} value={value} onChange={onChange} required={required} placeholder=" " className={shared} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-2 text-[0.68rem] uppercase tracking-[0.16em] text-slatewarm/70 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.85rem] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[0.68rem] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-gold-deep"
      >
        {label}{required ? " *" : ""}
      </label>
    </div>
  );
}