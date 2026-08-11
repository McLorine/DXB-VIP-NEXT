import React from "react";

// Renders **bold** segments within plain copy.
type Props = {
  text?: string | number;
  className?: string;
};

export default function RichText({ text, className = "" }: Props) {
  const parts = String(text ?? "").split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-charcoal">{p.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        )
      )}
    </span>
  );
}