"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Field, Input, Select } from "@/components/forms/fields";
import { FormSent, SubmitButton } from "@/components/forms/FormFeedback";
import { Icon } from "@/components/ui/Icon";
import { AUDIT_SECTORS, auditRequestSchema } from "@/lib/validations/audit";
import { composeMessage, mailtoLink, openWhatsApp, whatsappLink } from "@/lib/whatsapp";

type FormIn = z.input<typeof auditRequestSchema>;
type FormOut = z.output<typeof auditRequestSchema>;

/** Free audit request — validated, then sent to the team via WhatsApp. */
export function AuditForm({ whatsapp, email, tone = "dark" }: { whatsapp: string; email: string; tone?: "light" | "dark" }) {
  const [sent, setSent] = useState<{ wa: string; mail: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormIn, unknown, FormOut>({
    resolver: zodResolver(auditRequestSchema),
    defaultValues: { url: "", sector: "" },
  });

  if (sent) {
    return (
      <FormSent
        tone={tone}
        title="Your audit request is ready to send."
        body="WhatsApp has opened with your website filled in — press send and our team will review it and reply within 24 hours."
        whatsappHref={sent.wa}
        mailHref={sent.mail}
        onReset={() => {
          reset();
          setSent(null);
        }}
      />
    );
  }

  return (
    <form
      noValidate
      className="space-y-3"
      onSubmit={handleSubmit((v) => {
        const sector = AUDIT_SECTORS.find((s) => s.value === v.sector)?.label;
        const message = composeMessage("Hello HaadinGlobal, please run a free website audit for me.", [
          ["Website", v.url],
          ["Business sector", sector],
        ]);
        const wa = whatsappLink(message, whatsapp);
        openWhatsApp(wa);
        setSent({ wa, mail: mailtoLink(email, "Free website audit request", message) });
      })}
    >
      <Field id="a-url" label="Website URL" tone={tone} icon="link" error={errors.url?.message} required>
        <Input id="a-url" tone={tone} hasIcon type="url" inputMode="url" placeholder="https://yourbrand.com" invalid={Boolean(errors.url)} {...register("url")} />
      </Field>
      <Field id="a-sector" label="Business Scale & Sector" tone={tone} icon="domain" error={errors.sector?.message}>
        <Select id="a-sector" tone={tone} hasIcon {...register("sector")}>
          <option value="">Select category</option>
          {AUDIT_SECTORS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </Field>
      <SubmitButton>
        <Icon name="speed" size={18} />
        <span>Request Free Website Audit</span>
      </SubmitButton>
    </form>
  );
}
