import { DEFAULT_WHATSAPP } from "@/lib/site";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello HaadinGlobal, I would like to discuss your digital marketing services.";

/** Build a wa.me link with a correctly URL-encoded pre-filled message. */
export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE, number: string = DEFAULT_WHATSAPP): string {
  const digits = number.replace(/\D/g, "") || DEFAULT_WHATSAPP;
  const text = message.trim();
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}

/** Turn label/value pairs into a readable WhatsApp/email message. */
export function composeMessage(intro: string, rows: Array<[string, string | undefined | null]>): string {
  const lines = rows.filter(([, v]) => v && String(v).trim()).map(([k, v]) => `• ${k}: ${String(v).trim()}`);
  return [intro, "", ...lines].join("\n");
}

export function mailtoLink(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Opens WhatsApp in a new tab. (Passing "noopener" to window.open makes it
 * return null, so the opener is cleared manually instead.) If pop-ups are
 * blocked, the success panel still shows an "Open WhatsApp" button.
 */
export function openWhatsApp(href: string) {
  const win = window.open(href, "_blank");
  if (win) win.opener = null;
}
