"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Field, Input, Select } from "@/components/forms/fields";
import { FormSent, SubmitButton } from "@/components/forms/FormFeedback";
import { Icon } from "@/components/ui/Icon";
import { BUDGET_OPTIONS, OBJECTIVE_OPTIONS, consultationSchema } from "@/lib/validations/lead";
import { composeMessage, mailtoLink, openWhatsApp, whatsappLink } from "@/lib/whatsapp";

type FormIn = z.input<typeof consultationSchema>;
type FormOut = z.output<typeof consultationSchema>;

/** Stitch "Priority Intake — Book Your Free Strategy Audit": validated, then sent via WhatsApp. */
export function ConsultationForm({ whatsapp, email }: { whatsapp: string; email: string }) {
  const [sent, setSent] = useState<{ wa: string; mail: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormIn, unknown, FormOut>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { name: "", phone: "", service: OBJECTIVE_OPTIONS[0], budget: BUDGET_OPTIONS[0] },
  });

  if (sent) {
    return (
      <FormSent
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
      className="space-y-space-sm"
      onSubmit={handleSubmit((v) => {
        const message = composeMessage("Hello HaadinGlobal, I'd like to book a free strategy audit.", [
          ["Name / Company", v.name],
          ["WhatsApp", v.phone],
          ["Objective", v.service],
          ["Monthly budget", v.budget],
        ]);
        const wa = whatsappLink(message, whatsapp);
        openWhatsApp(wa);
        setSent({ wa, mail: mailtoLink(email, "Free strategy audit request", message) });
      })}
    >
      <Field id="c-name" label="Full Name or Company" error={errors.name?.message} required>
        <Input id="c-name" autoComplete="name" placeholder="e.g. Tariq Khan / Apex Retail" invalid={Boolean(errors.name)} {...register("name")} />
      </Field>
      <Field id="c-phone" label="WhatsApp Number (with country code)" error={errors.phone?.message} required>
        <Input id="c-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+92 300 1234567" invalid={Boolean(errors.phone)} {...register("phone")} />
      </Field>
      <Field id="c-objective" label="Primary Growth Objective">
        <Select id="c-objective" {...register("service")}>
          {OBJECTIVE_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </Select>
      </Field>
      <Field id="c-budget" label="Estimated Monthly Marketing Budget">
        <Select id="c-budget" {...register("budget")}>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </Select>
      </Field>
      <SubmitButton className="mt-space-sm">
        <span>Claim Free Performance Audit</span>
        <Icon name="verified" size={18} />
      </SubmitButton>
    </form>
  );
}
