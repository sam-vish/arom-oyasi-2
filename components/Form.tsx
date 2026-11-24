"use client";

import { useActionState, useEffect, useId, useRef, type ReactNode } from "react";
import Script from "next/script";
import { submitForm } from "@/app/actions";
import { initialFormState, type FormKind, type FormState } from "@/lib/forms";
import { btnClass, type Tone } from "./ui";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function FormShell({
  kind,
  children,
  submitLabel,
  tone = "paper",
  className = "",
}: {
  kind: FormKind;
  children: (state: FormState) => ReactNode;
  submitLabel: string;
  tone?: Tone;
  className?: string;
}) {
  const [state, action, pending] = useActionState(submitForm.bind(null, kind), initialFormState);
  const timeRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Stamp the render time client-side (spam timing check) without a re-render.
  useEffect(() => {
    if (timeRef.current) timeRef.current.value = String(Date.now());
  }, []);
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={`border-l-2 border-copper py-2 pl-6 ${tone === "night" ? "text-bone" : "text-ink"}`}>
        <p className="display text-4xl md:text-5xl">Thank you.</p>
        <p className={`mt-3 ${tone === "night" ? "text-bone-muted" : "text-ink-soft"}`}>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className={className}>
      {/* Spam traps: invisible to people, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={timeRef} type="hidden" name="_t" defaultValue="0" />

      {children(state)}

      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile mt-5" data-sitekey={TURNSTILE_SITE_KEY} data-theme={tone === "night" ? "dark" : "light"} />
        </>
      )}

      {state.status === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className={`mt-5 text-[15px] ${tone === "night" ? "text-[#f2958c]" : "text-copper"}`}>
          {state.message}
        </div>
      )}

      <button type="submit" disabled={pending} className={`${btnClass("solid", tone)} mt-8 disabled:opacity-60`}>
        {pending ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

const inputCls: Record<Tone, string> = {
  paper:
    "w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[17px] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none focus-visible:outline-none",
  night:
    "w-full border-0 border-b border-bone/25 bg-transparent px-0 py-3 text-[17px] text-bone placeholder:text-bone-muted/70 transition-colors focus:border-bone focus:outline-none focus-visible:outline-none [&>option]:text-ink",
};

type FieldProps = {
  name: string;
  label: string;
  state: FormState;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  tone?: Tone;
  className?: string;
  hint?: string;
  as?: "input" | "textarea" | "select";
  options?: string[];
  rows?: number;
};

export function Field({
  name,
  label,
  state,
  required,
  type = "text",
  placeholder,
  autoComplete,
  tone = "paper",
  className = "",
  hint,
  as = "input",
  options,
  rows = 4,
}: FieldProps) {
  const id = useId();
  const err = state.fieldErrors?.[name];
  const describedBy = [hint ? `${id}-hint` : "", err ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
  const errColor = tone === "night" ? "text-[#f2958c]" : "text-copper";
  const common = {
    id,
    name,
    required,
    "aria-invalid": err ? true : undefined,
    "aria-describedby": describedBy,
    className: `${inputCls[tone]} ${err ? (tone === "night" ? "border-[#f2958c]" : "border-copper") : ""}`,
  };
  return (
    <div className={className}>
      <label htmlFor={id} className={`kicker block ${tone === "night" ? "text-bone-muted" : "text-muted"}`}>
        {label}
        {required && <span className="text-copper"> *</span>}
      </label>
      {as === "textarea" ? (
        <textarea {...common} rows={rows} placeholder={placeholder} className={`${common.className} resize-y`} />
      ) : as === "select" ? (
        <select {...common} defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} type={type} placeholder={placeholder} autoComplete={autoComplete} />
      )}
      {hint && (
        <p id={`${id}-hint`} className={`mt-1.5 text-[13px] ${tone === "night" ? "text-bone-muted" : "text-muted"}`}>
          {hint}
        </p>
      )}
      {err && (
        <p id={`${id}-err`} className={`mt-1.5 text-[13px] ${errColor}`}>
          {err}
        </p>
      )}
    </div>
  );
}

export function Check({ name, label, state, required, tone = "paper" }: { name: string; label: ReactNode; state: FormState; required?: boolean; tone?: Tone }) {
  const id = useId();
  const err = state.fieldErrors?.[name];
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          name={name}
          required={required}
          aria-invalid={err ? true : undefined}
          className="mt-1 h-[18px] w-[18px] shrink-0 accent-[#a35b56]"
        />
        <label htmlFor={id} className={`text-[14px] leading-relaxed ${tone === "night" ? "text-bone-muted" : "text-ink-soft"}`}>
          {label}
        </label>
      </div>
      {err && <p className={`mt-1.5 pl-8 text-[13px] ${tone === "night" ? "text-[#f2958c]" : "text-copper"}`}>{err}</p>}
    </div>
  );
}
