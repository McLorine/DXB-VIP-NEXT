"use client"
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import FloatingField from "@/components/common/FloatingField";
import GoldButton from "@/components/common/GoldButton";
import { Switch } from "@/components/ui/switch";
import EstimatorOptionCard from "./estimator/EstimatorOptionCard";
import EstimatorSummary from "./estimator/EstimatorSummary";
import { DEFAULT_ESTIMATOR_STEPS, DEFAULT_COPY } from "./estimator/defaults";
import type { CostEstimatorBlock, EstimatorStep } from "@/lib/wordpress/types";

type SingleSelections = Record<string, string>; // stepKey -> optionId
type ToggleSelections = Record<string, Record<string, boolean>>; // stepKey -> optionId -> on

export default function CostEstimator(block: CostEstimatorBlock) {
function unwrap<T>(value: T | T[]): T {
  return Array.isArray(value) ? value[0] : value;
}

const steps: EstimatorStep[] = useMemo(() => {
  const source = block.estimatorSteps?.length > 0 ? block.estimatorSteps : DEFAULT_ESTIMATOR_STEPS;
  return source.map((s) => ({
    ...s,
    stepType: unwrap(s.stepType),
    stepOptions: (s.stepOptions ?? []).map((o) => ({
      ...o,
      optionIcon: unwrap(o.optionIcon),
    })),
  }));
}, [block.estimatorSteps]);

  const copy = {
    continueText: block.estimatorContinueText || DEFAULT_COPY.continueText,
    backText: block.estimatorBackText || DEFAULT_COPY.backText,
    submitText: block.estimatorSubmitText || DEFAULT_COPY.submitText,
    submittingText: block.estimatorSubmittingText || DEFAULT_COPY.submittingText,
    errorText: block.estimatorErrorText || DEFAULT_COPY.errorText,
    summaryTitle: block.estimatorSummaryTitle || DEFAULT_COPY.summaryTitle,
    nextStepsTitle: block.estimatorNextStepsTitle || DEFAULT_COPY.nextStepsTitle,
    nextStepsText: block.estimatorNextStepsText || DEFAULT_COPY.nextStepsText,
    successHeading: block.estimatorSuccessHeading || DEFAULT_COPY.successHeading,
    successMessage: block.estimatorSuccessMessage || DEFAULT_COPY.successMessage,
    successCallText: block.estimatorSuccessCallText || DEFAULT_COPY.successCallText,
    successWhatsappText: block.estimatorSuccessWhatsappText || DEFAULT_COPY.successWhatsappText,
    sourcePage: block.estimatorSourcePage || DEFAULT_COPY.sourcePage,
    phoneHref: block.estimatorPhoneHref || DEFAULT_COPY.phoneHref,
    whatsappHref: block.estimatorWhatsappHref || DEFAULT_COPY.whatsappHref,
  };

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const [singleSelections, setSingleSelections] = useState<SingleSelections>({});
  const [toggleSelections, setToggleSelections] = useState<ToggleSelections>(() => {
    const init: ToggleSelections = {};
    for (const s of steps) {
      if (s.stepType === "multi_select_toggles") {
        init[s.stepKey] = Object.fromEntries(
          s.stepOptions.map((o) => [o.optionId, o.optionDefaultOn])
        );
      }
    }
    return init;
  });
  const [contact, setContact] = useState({ full_name: "", email: "", phone: "" });

  const current = steps[step];

  function findOption(s: EstimatorStep, optionId: string | undefined) {
    return s.stepOptions.find((o) => o.optionId === optionId);
  }

  function canAdvance(): boolean {
    if (current.stepType === "contact_form") {
      return Boolean(contact.full_name && contact.email);
    }
    if (current.stepType === "multi_select_toggles") {
      return true; // never blocks — matches original "addons" behavior
    }
    if (!current.stepRequired) return true;
    return Boolean(singleSelections[current.stepKey]);
  }

  const next = () => setStep((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStep((i) => Math.max(i - 1, 0));

  const summaryItems = useMemo(
    () =>
      steps
        .filter((s) => s.stepType === "single_select_cards")
        .map((s) => ({
          label: s.stepTitle.replace(/[?？]$/, ""),
          value: findOption(s, singleSelections[s.stepKey])?.optionLabel ?? null,
        })),
    [steps, singleSelections]
  );

  const selectedAddOns = useMemo(() => {
    const addonStep = steps.find((s) => s.stepType === "multi_select_toggles");
    if (!addonStep) return [];
    const on = toggleSelections[addonStep.stepKey] ?? {};
    return addonStep.stepOptions.filter((o) => on[o.optionId]).map((o) => o.optionLabel);
  }, [steps, toggleSelections]);

  async function submit() {
    setSubmitting(true);
    setError("");

    const summary = steps
      .map((s) => {
        if (s.stepType === "contact_form") return null;
        if (s.stepType === "multi_select_toggles") {
          const on = toggleSelections[s.stepKey] ?? {};
          const labels = s.stepOptions.filter((o) => on[o.optionId]).map((o) => o.optionLabel);
          return `${s.stepTitle}: ${labels.length ? labels.join(", ") : "none"}`;
        }
        const label = findOption(s, singleSelections[s.stepKey])?.optionLabel ?? "—";
        return `${s.stepTitle}: ${label}`;
      })
      .filter(Boolean)
      .join(" | ");

    const businessStep = steps.find((s) => s.stepKey === "business") ?? steps[0];
    const interest = findOption(businessStep, singleSelections[businessStep.stepKey])?.optionLabel;

    try {
      await base44.entities.Lead.create({
        full_name: contact.full_name,
        email: contact.email,
        phone: contact.phone,
        interest,
        message: summary,
        source_page: copy.sourcePage,
      });
      setDone(true);
    } catch {
      setError(copy.errorText);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    const message = copy.successMessage.replace("{{name}}", contact.full_name);
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="glass rounded-[20px] p-10 md:p-14 text-center max-w-xl mx-auto">
            <CheckCircle2 className="mx-auto w-14 h-14 text-gold" strokeWidth={1.2} />
            <h3 className="mt-6 text-[1.6rem]">{copy.successHeading}</h3>
            <p className="mt-3 text-slatewarm">{message}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={copy.phoneHref}>
                <GoldButton>
                  <Phone className="w-4 h-4" strokeWidth={1.6} /> {copy.successCallText}
                </GoldButton>
              </a>
              <GoldButton href={copy.whatsappHref} variant="outline" target="_blank" rel="noreferrer">
                {copy.successWhatsappText}
              </GoldButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {(block.estimatorSectionEyebrow || block.estimatorSectionHeading) && (
          <div className="mb-10 text-center">
            {block.estimatorSectionEyebrow && <span className="eyebrow">{block.estimatorSectionEyebrow}</span>}
            {block.estimatorSectionHeading && (
              <h2 className="mt-3 text-[2rem] md:text-[2.6rem]">{block.estimatorSectionHeading}</h2>
            )}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="glass rounded-[20px] p-6 md:p-10 shadow-[0_30px_70px_-50px_rgba(26,26,26,0.4)]">
            <div className="flex items-center gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i <= step ? "bg-gold" : "bg-gold/15"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold-deep">
                Step {step + 1} of {steps.length}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-[1.5rem] md:text-[1.9rem] leading-tight">{current.stepTitle}</h2>
                <p className="mt-2 text-[0.92rem] text-slatewarm">{current.stepSubtitle}</p>
                {current.stepBodyText && (
                  <p className="mt-4 text-[0.92rem] text-slatewarm">{current.stepBodyText}</p>
                )}

                <div className="mt-7">
                  {current.stepType === "single_select_cards" && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {current.stepOptions.map((o) => (
                        <EstimatorOptionCard
                          key={o.optionId}
                          option={o}
                          selected={singleSelections[current.stepKey] === o.optionId}
                          onClick={() =>
                            setSingleSelections((prev) => ({ ...prev, [current.stepKey]: o.optionId }))
                          }
                        />
                      ))}
                    </div>
                  )}

                  {current.stepType === "multi_select_toggles" && (
                    <div className="space-y-3">
                      {current.stepOptions.map((o) => {
                        const on = toggleSelections[current.stepKey]?.[o.optionId] ?? false;
                        return (
                          <div
                            key={o.optionId}
                            className={`flex items-start justify-between gap-4 rounded-2xl border p-5 transition-colors ${
                              on ? "border-gold/60 bg-gold/6" : "border-gold/15 bg-white"
                            }`}
                          >
                            <div className="flex-1">
                              <div className="text-[0.95rem] text-charcoal">{o.optionLabel}</div>
                              <div className="text-[0.82rem] text-slatewarm mt-0.5">
                                {o.optionDescription}
                              </div>
                            </div>
                            <Switch
                              checked={on}
                              onCheckedChange={(val: boolean) =>
                                setToggleSelections((prev) => ({
                                  ...prev,
                                  [current.stepKey]: { ...prev[current.stepKey], [o.optionId]: val },
                                }))
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {current.stepType === "contact_form" && (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FloatingField
                          label="Full name"
                          name="full_name"
                          value={contact.full_name}
                          onChange={(e) => setContact((p) => ({ ...p, full_name: e.target.value }))}
                          required
                        />
                        <FloatingField
                          label="Email"
                          name="email"
                          type="email"
                          value={contact.email}
                          onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                          required
                        />
                        <FloatingField
                          label="Phone / WhatsApp"
                          name="phone"
                          value={contact.phone}
                          onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                        />
                      </div>
                      {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-9 flex items-center justify-between">
              {step > 0 ? (
                <button
                  onClick={back}
                  className="inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-slatewarm hover:text-charcoal transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.6} /> {copy.backText}
                </button>
              ) : (
                <span />
              )}

              {step < steps.length - 1 ? (
                <button
                  onClick={next}
                  disabled={!canAdvance()}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-charcoal transition-all hover:bg-gold-deep disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {copy.continueText} <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canAdvance() || submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-charcoal transition-all hover:bg-gold-deep disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> {copy.submittingText}
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" strokeWidth={1.8} /> {copy.submitText}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <EstimatorSummary
              title={copy.summaryTitle}
              items={summaryItems}
              addOns={selectedAddOns}
              nextStepsTitle={copy.nextStepsTitle}
              nextStepsText={copy.nextStepsText}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
