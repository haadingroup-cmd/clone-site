import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Shown after a form opens WhatsApp — lets the visitor reopen it or use email instead. */
export function FormSent({
  title = "Thank you! Your request is ready to send.",
  body = "WhatsApp has opened with your details filled in — just press send. If it didn't open, use one of the buttons below.",
  whatsappHref,
  mailHref,
  onReset,
  tone = "light",
}: {
  title?: string;
  body?: string;
  whatsappHref: string;
  mailHref: string;
  onReset?: () => void;
  tone?: "light" | "dark";
}) {
  return (
    <div role="status" aria-live="polite" className={cn("space-y-space-sm rounded-2xl p-space-md", tone === "dark" ? "bg-on-primary/5" : "bg-surface-container-low")}>
      <div className="flex items-start gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-whatsapp/15 text-[#128c4a]">
          <Icon name="check_circle" size={22} filled />
        </span>
        <p className={cn("font-headline-sm text-headline-sm font-bold", tone === "dark" ? "text-on-primary" : "text-on-surface")}>{title}</p>
      </div>
      <p className={cn("font-body-sm text-body-sm", tone === "dark" ? "text-on-primary-container" : "text-on-surface-variant")}>{body}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-space-md py-3 font-label-lg text-label-lg font-bold text-white transition-transform hover:scale-[1.02]"
        >
          <Icon name="chat" size={18} /> Open WhatsApp
        </a>
        <a
          href={mailHref}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl px-space-md py-3 font-label-lg text-label-lg",
            tone === "dark" ? "bg-on-primary/10 text-on-primary hover:bg-on-primary/20" : "bg-surface-container-lowest text-secondary shadow-sm hover:bg-surface-container",
          )}
        >
          <Icon name="mail" size={18} /> Send by email instead
        </a>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className={cn("rounded-xl px-space-md py-3 font-label-lg text-label-lg", tone === "dark" ? "text-on-primary-container hover:text-on-primary" : "text-on-surface-variant hover:text-secondary")}
          >
            Start over
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      className={cn(
        "flex w-full items-center justify-center gap-space-xs rounded-xl bg-secondary py-3.5 font-label-lg text-label-lg font-bold text-on-secondary shadow-md transition-all hover:bg-electric-blue active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </button>
  );
}
