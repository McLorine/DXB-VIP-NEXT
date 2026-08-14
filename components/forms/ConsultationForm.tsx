"use client"
import React from "react";
import { ShieldCheck } from "lucide-react";
import Cf7Form from "./Cf7Form";
import CustomLeadForm from "./CustomLeadForm";
import type { ConsultationBlock } from "@/lib/wordpress/types";
import type { ConsultationFormFields } from "@/lib/wordpress/types";

export default function ConsultationForm({ block }: { block: ConsultationFormFields }) {

  const {
    consultationEyebrow,
    consultationHeading,
    consultationDescription,
    consultationFormType,
    consultationCf7FormId,
    consultationCustomFields,
    consultationSourcePage,
    consultationSubmitButtonText,
    consultationPrivacyText,
  } = block;

  return (
    <div className="glass relative rounded-[20px] p-7 md:p-10 shadow-[0_50px_100px_-60px_rgba(26,26,26,0.5)]">
      <ShieldCheck className="absolute right-7 top-7 w-6 h-6 text-gold/70" strokeWidth={1.2} />
      <span className="eyebrow">{consultationEyebrow}</span>
      <h3 className="mt-3 text-[1.7rem] md:text-[2.1rem] leading-tight max-w-md">
        {consultationHeading}
      </h3>
      <p className="mt-3 text-[0.93rem] text-slatewarm max-w-lg">{consultationDescription}</p>

      <div className="mt-8">
        {consultationFormType === "cf7" ? (
          consultationCf7FormId ? (
            <Cf7Form formId={consultationCf7FormId} submitButtonText={consultationSubmitButtonText} />
          ) : (
            <p className="text-sm text-slatewarm">
              This form isn't set up yet — add a Contact Form 7 form ID in the page's Consultation
              section.
            </p>
          )
        ) : consultationCustomFields.length > 0 ? (
          <CustomLeadForm
            fields={consultationCustomFields}
            sourcePage={consultationSourcePage}
            submitButtonText={consultationSubmitButtonText}
            privacyText={consultationPrivacyText}
          />
        ) : (
          <p className="text-sm text-slatewarm">
            This form isn't set up yet — add at least one field in the page's Consultation section.
          </p>
        )}
      </div>
    </div>
  );
}
