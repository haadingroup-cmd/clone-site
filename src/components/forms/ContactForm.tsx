"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Field, Input, Select, Textarea } from "@/components/forms/fields";
import { FormSent, SubmitButton } from "@/components/forms/FormFeedback";
import { Icon } from "@/components/ui/Icon";
import { BUDGET_OPTIONS, contactSchema } from "@/lib/validations/lead";
import { composeMessage, mailtoLink, openWhatsApp, whatsappLink } from "@/lib/whatsapp";

type FormIn = z.input<typeof contactSchema>;
type FormOut = z.output<typeof contactSchema>;

export function ContactForm({ services, whatsapp, email }: { services: string[]; whatsapp: string; email: string }) {
  const [sent, setSent] = useState<{ wa: string; mail: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormIn, unknown, FormOut>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", business: "", website: "", service: "", budget: "", message: "" },
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
        const message = composeMessage("Hello HaadinGlobal, I'm getting in touch via your website.", [
          ["Name", v.name],
          ["Email", v.email],
          ["Phone / WhatsApp", v.phone],
          ["Business", v.business],
          ["Website", v.website],
          ["Service", v.service],
          ["Budget", v.budget],
          ["Message", v.message],
        ]);
        const wa = whatsappLink(message, whatsapp);
        openWhatsApp(wa);
        setSent({ wa, mail: mailtoLink(email, `Website enquiry — ${v.name}`, message) });
      })}
    >
      <div className="grid gap-space-sm sm:grid-cols-2">
        <Field id="f-name" label="Name" error={errors.name?.message} required>
          <Input id="f-name" autoComplete="name" placeholder="Your full name" invalid={Boolean(errors.name)} {...register("name")} />
        </Field>
        <Field id="f-email" label="Email" error={errors.email?.message} required>
          <Input id="f-email" type="email" autoComplete="email" placeholder="you@company.com" invalid={Boolean(errors.email)} {...register("email")} />
        </Field>
        <Field id="f-phone" label="Phone / WhatsApp" error={errors.phone?.message} required>
          <Input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+92 300 1234567" invalid={Boolean(errors.phone)} {...register("phone")} />
        </Field>
        <Field id="f-business" label="Business" error={errors.business?.message}>
          <Input id="f-business" autoComplete="organization" placeholder="Company or brand name" {...register("business")} />
        </Field>
        <Field id="f-website" label="Website" error={errors.website?.message}>
          <Input id="f-website" type="url" inputMode="url" autoComplete="url" placeholder="yourbrand.com" invalid={Boolean(errors.website)} {...register("website")} />
        </Field>
        <Field id="f-service" label="Service">
          <Select id="f-service" {...register("service")}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="Not sure — need advice">Not sure — need advice</option>
          </Select>
        </Field>
      </div>
      <Field id="f-budget" label="Monthly budget">
        <Select id="f-budget" {...register("budget")}>
          <option value="">Select a range</option>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="f-message" label="Message" error={errors.message?.message} hint="Tell us about your goals, current challenges and timeline (min. 10 characters)." required>
        <Textarea id="f-message" rows={5} placeholder="What would you like to achieve?" invalid={Boolean(errors.message)} {...register("message")} />
      </Field>
      <SubmitButton>
        <Icon name="chat" size={18} />
        <span>Send via WhatsApp</span>
      </SubmitButton>
      <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
        Your message opens in WhatsApp, ready to send. See our{" "}
        <Link href="/privacy-policy" className="text-secondary underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
