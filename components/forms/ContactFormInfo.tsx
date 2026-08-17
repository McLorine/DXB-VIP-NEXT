"use client"
import React from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Globe, ShieldCheck } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import Cf7Form from "@/components/forms/Cf7Form";
import CustomLeadForm from "@/components/forms/CustomLeadForm";
import type { ContactFormInfoBlock, ContactInfoIcon } from "@/lib/wordpress/types";

const ICON_MAP: Record<ContactInfoIcon, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  location: MapPin,
  clock: Clock,
  globe: Globe,
};

export default function ContactFormInfo({
  contactFormEyebrow,
  contactFormHeading,
  contactFormDescription,
  contactFormSourcePage,
  contactFormFormType,
  contactFormCf7FormId,
  contactFormCustomFields,
  contactFormSubmitButtonText,
  contactFormShowPrivacyNote,
  contactFormPrivacyText,
  contactFormInfoItems,
}: ContactFormInfoBlock) {
  return (
    <section id="consultation" className="scroll-mt-24 pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <Reveal>
          <div className="glass relative rounded-[20px] p-7 md:p-10 shadow-[0_50px_100px_-60px_rgba(26,26,26,0.5)]">
            <ShieldCheck className="absolute right-7 top-7 w-6 h-6 text-gold/70" strokeWidth={1.2} />
            <span className="eyebrow">{contactFormEyebrow}</span>
            <h3 className="mt-3 text-[1.7rem] md:text-[2.1rem] leading-tight max-w-md">
              {contactFormHeading}
            </h3>
            <p className="mt-3 text-[0.93rem] text-slatewarm max-w-lg">{contactFormDescription}</p>

            <div className="mt-8">
              {contactFormFormType === "cf7" ? (
                contactFormCf7FormId ? (
                  <Cf7Form formId={contactFormCf7FormId} submitButtonText={contactFormSubmitButtonText} />
                ) : (
                  <p className="text-sm text-slatewarm">
                    This form isn't set up yet — add a Contact Form 7 form ID in this section.
                  </p>
                )
              ) : contactFormCustomFields.length > 0 ? (
                <CustomLeadForm
                  fields={contactFormCustomFields}
                  sourcePage={contactFormSourcePage}
                  submitButtonText={contactFormSubmitButtonText}
                  privacyText={contactFormShowPrivacyNote ? contactFormPrivacyText : ""}
                />
              ) : (
                <p className="text-sm text-slatewarm">
                  This form isn't set up yet — add at least one field in this section.
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="space-y-4 lg:sticky lg:top-28">
          {contactFormInfoItems.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Phone;
            const inner = (
              <div className="monolith flex items-start gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 text-gold">
                  <Icon className="w-5 h-5" strokeWidth={1.4} />
                </span>
                <div>
                  <div className="text-[0.64rem] uppercase tracking-[0.18em] text-slatewarm/70">
                    {item.label}
                  </div>
                  <div className="mt-1 text-[0.98rem] text-charcoal">{item.value}</div>
                </div>
              </div>
            );
            return item.link ? (
              <a
                key={i}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="block"
              >
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
