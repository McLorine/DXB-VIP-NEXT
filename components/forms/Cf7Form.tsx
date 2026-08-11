"use client"
import React, { useEffect, useRef, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  formId: string;
  submitButtonText: string;
}

const WORDPRESS_SITE_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;

/**
 * Renders the actual Contact Form 7 markup fetched from WordPress and
 * submits it against CF7's own REST feedback endpoint. This sidesteps the
 * fact that CF7 doesn't expose a field schema over REST — we don't need to
 * know the fields in advance, we just forward whatever the real <form>
 * element contains as FormData.
 */
export default function Cf7Form({ formId, submitButtonText }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading-form" | "idle" | "sending" | "done" | "error">(
    "loading-form"
  );
  const [message, setMessage] = useState("");

  // 1. Fetch the real CF7 form markup on mount.
  useEffect(() => {
    let cancelled = false;
    async function loadForm() {
      try {
        const res = await fetch(
          `${WORDPRESS_SITE_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/render`
        );
        if (!res.ok) throw new Error("Failed to load form");
        const data = await res.json();
        if (!cancelled) {
          setHtml(data.form_html ?? data.form ?? null);
          setStatus("idle");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
          setMessage("This form couldn't be loaded right now. Please WhatsApp us directly instead.");
        }
      }
    }
    loadForm();
    return () => {
      cancelled = true;
    };
  }, [formId]);

  // 2. Intercept the native submit and forward it to CF7's feedback endpoint.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !html) return;

    const formEl = container.querySelector("form");
    if (!formEl) return;

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      setStatus("sending");
      setMessage("");

      const formData = new FormData(formEl as HTMLFormElement);

      try {
        const res = await fetch(
          `${WORDPRESS_SITE_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
          { method: "POST", body: formData }
        );
        const data = await res.json();

        if (data.status === "mail_sent") {
          setStatus("done");
        } else {
          setStatus("error");
          setMessage(data.message || "Please check the form and try again.");
        }
      } catch {
        setStatus("error");
        setMessage("We couldn't send that just now. Please try again or WhatsApp us directly.");
      }
    };

    formEl.addEventListener("submit", onSubmit);
    return () => formEl.removeEventListener("submit", onSubmit);
  }, [html, formId]);

  if (status === "loading-form") {
    return (
      <div className="flex items-center gap-2 text-slatewarm">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading form…
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="mx-auto w-12 h-12 text-gold" strokeWidth={1.2} />
        <h3 className="mt-6 text-[1.6rem]">Your consultation is requested</h3>
        <p className="mt-3 text-slatewarm max-w-md mx-auto">
          A senior advisor will contact you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div>
      {html ? (
        // CF7's own markup — labels, required attrs, and validation come
        // straight from the form as configured in WP admin.
        <div ref={containerRef} className="cf7-embed" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="text-destructive text-sm">{message}</p>
      )}

      {status === "sending" && (
        <p className="mt-3 flex items-center gap-2 text-sm text-slatewarm">
          <Loader2 className="w-4 h-4 animate-spin" /> Sending…
        </p>
      )}
      {status === "error" && message && (
        <p className="mt-3 text-sm text-destructive">{message}</p>
      )}

      {/*
        Minimal styling so the raw CF7 <form> matches the site's inputs.
        Swap for your real input classes / a global .cf7-embed stylesheet.
      */}
      <style jsx global>{`
        .cf7-embed input[type="text"],
        .cf7-embed input[type="email"],
        .cf7-embed input[type="tel"],
        .cf7-embed select,
        .cf7-embed textarea {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 10px;
          padding: 0.9rem 1rem;
          font-size: 0.92rem;
        }
        .cf7-embed p {
          margin-bottom: 1rem;
        }
        .cf7-embed input[type="submit"] {
          background: var(--gold, #b8935a);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 0.9rem 1.8rem;
          font-size: 0.74rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
