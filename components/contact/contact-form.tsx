"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ChevronDown, CircleAlert, CircleCheck, Info, LoaderCircle } from "lucide-react";

import type { ContactFormCopy } from "@/content/dictionaries/types";
import { submitContactRequest } from "@/lib/contact/actions";
import { initialContactFormState, type ContactFormState } from "@/lib/contact/form-state";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  contactFields,
  emptyContactInput,
  validateContactField,
  type ContactErrorCode,
  type ContactField,
  type ContactInput,
} from "@/lib/contact/validation";
import type { Locale } from "@/lib/i18n/config";

type ContactFormProps = {
  locale: Locale;
  copy: ContactFormCopy;
  serviceOptions: { value: string; label: string }[];
  /** Fallback offered when the request cannot be sent online. */
  phone: { display: string; e164: string } | null;
  privacyHref: string | null;
};

type Payload = FormData | "reset";

export function ContactForm({ locale, copy, serviceOptions, phone, privacyHref }: ContactFormProps) {
  const successRef = useRef<HTMLHeadingElement>(null);
  const baseId = useId();

  const [values, setValues] = useState<ContactInput>(emptyContactInput);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [showAllErrors, setShowAllErrors] = useState(false);

  const [state, dispatch, pending] = useActionState<ContactFormState, Payload>(
    async (_previous, payload) =>
      payload === "reset" ? initialContactFormState : submitContactRequest(locale, payload),
    initialContactFormState,
  );

  // Move focus to the confirmation so keyboard and screen reader users
  // know the request went through.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const fieldId = (field: ContactField) => `${baseId}-${field}`;

  const errorFor = (field: ContactField): ContactErrorCode | undefined => {
    if (showAllErrors || touched[field]) {
      const clientError = validateContactField(field, values[field]);
      if (clientError) return clientError;
    }
    return state.status === "invalid" ? state.errors[field] : undefined;
  };

  const messageFor = (field: ContactField) => {
    const code = errorFor(field);
    return code ? copy.errors[field][code] : undefined;
  };

  const update = (field: ContactField) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  const markTouched = (field: ContactField) => () => {
    // Only validate on blur once the visitor has typed something, so empty
    // fields are not flagged just for tabbing through them.
    if (values[field].trim() !== "" || touched[field]) {
      setTouched((current) => ({ ...current, [field]: true }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setShowAllErrors(true);
    const firstInvalid = contactFields.find((field) => validateContactField(field, values[field]));
    if (firstInvalid) {
      const element = form.elements.namedItem(firstInvalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    const formData = new FormData(form);
    startTransition(() => dispatch(formData));
  };

  const handleReset = () => {
    setValues(emptyContactInput);
    setTouched({});
    setShowAllErrors(false);
    startTransition(() => dispatch("reset"));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 border-l-4 border-success bg-success-soft p-6 sm:p-8">
        <CircleCheck aria-hidden="true" className="size-7 text-success" strokeWidth={1.75} />
        <h3 ref={successRef} tabIndex={-1} className="text-xl font-medium text-navy-900 focus:outline-none">
          {copy.status.success.title}
        </h3>
        <p className="leading-relaxed text-slate">{copy.status.success.text}</p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-2 inline-flex min-h-11 items-center text-[15px] font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
        >
          {copy.status.sendAnother}
        </button>
      </div>
    );
  }

  const hasVisibleErrors = showAllErrors && contactFields.some((field) => errorFor(field));
  const messageLength = values.message.trim().length;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <p className="text-sm text-muted">{copy.requiredHint}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("fullName")} label={copy.fields.fullName.label} error={messageFor("fullName")}>
          {(describedBy) => (
            <input
              id={fieldId("fullName")}
              name="fullName"
              type="text"
              autoComplete="name"
              required
              maxLength={CONTACT_LIMITS.fullName}
              value={values.fullName}
              onChange={update("fullName")}
              onBlur={markTouched("fullName")}
              aria-invalid={!!errorFor("fullName")}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>

        <Field
          id={fieldId("company")}
          label={copy.fields.company.label}
          optionalLabel={copy.optional}
          error={messageFor("company")}
        >
          {(describedBy) => (
            <input
              id={fieldId("company")}
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={CONTACT_LIMITS.company}
              value={values.company}
              onChange={update("company")}
              onBlur={markTouched("company")}
              aria-invalid={!!errorFor("company")}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <Field
        id={fieldId("email")}
        label={copy.fields.email.label}
        hint={copy.fields.email.hint}
        error={messageFor("email")}
      >
        {(describedBy) => (
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={CONTACT_LIMITS.email}
            value={values.email}
            onChange={update("email")}
            onBlur={markTouched("email")}
            aria-invalid={!!errorFor("email")}
            aria-describedby={describedBy}
            className={inputClass}
          />
        )}
      </Field>

      <Field id={fieldId("service")} label={copy.fields.service.label} error={messageFor("service")}>
        {(describedBy) => (
          <div className="relative">
            <select
              id={fieldId("service")}
              name="service"
              required
              value={values.service}
              onChange={(event) => {
                update("service")(event);
                setTouched((current) => ({ ...current, service: true }));
              }}
              aria-invalid={!!errorFor("service")}
              aria-describedby={describedBy}
              className={`${inputClass} appearance-none pr-11 ${values.service ? "" : "text-muted"}`}
            >
              <option value="" disabled>
                {copy.fields.service.placeholder}
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-ink">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
            />
          </div>
        )}
      </Field>

      <Field
        id={fieldId("message")}
        label={copy.fields.message.label}
        hint={copy.fields.message.hint}
        error={messageFor("message")}
        aside={
          <span aria-hidden="true" className="font-mono text-xs text-muted tabular-nums">
            {messageLength}/{CONTACT_LIMITS.messageMax}
          </span>
        }
      >
        {(describedBy) => (
          <textarea
            id={fieldId("message")}
            name="message"
            rows={6}
            required
            maxLength={CONTACT_LIMITS.messageMax}
            value={values.message}
            onChange={update("message")}
            onBlur={markTouched("message")}
            aria-invalid={!!errorFor("message")}
            aria-describedby={describedBy}
            className={`${inputClass} min-h-40 resize-y py-3 leading-relaxed`}
          />
        )}
      </Field>

      {/* Honeypot: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${baseId}-${HONEYPOT_FIELD}`}>Website</label>
        <input id={`${baseId}-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" aria-atomic="true" className="empty:hidden">
        {hasVisibleErrors && (
          <Notice tone="danger" icon={<CircleAlert aria-hidden="true" className="size-5" strokeWidth={1.75} />}>
            {copy.status.invalid}
          </Notice>
        )}
        {state.status === "unavailable" && !hasVisibleErrors && (
          <Notice tone="notice" icon={<Info aria-hidden="true" className="size-5" strokeWidth={1.75} />}>
            <strong className="font-semibold">{copy.status.unavailable.title}.</strong> {copy.status.unavailable.text}
            {phone && (
              <>
                {" "}
                {copy.status.unavailable.phonePrompt}{" "}
                <a href={`tel:${phone.e164}`} className="font-semibold whitespace-nowrap underline underline-offset-2">
                  {phone.display}
                </a>
                .
              </>
            )}
          </Notice>
        )}
        {state.status === "error" && !hasVisibleErrors && (
          <Notice tone="danger" icon={<CircleAlert aria-hidden="true" className="size-5" strokeWidth={1.75} />}>
            <strong className="font-semibold">{copy.status.error.title}.</strong> {copy.status.error.text}
          </Notice>
        )}
      </div>

      <div className="flex flex-col gap-5 border-t border-silver-200 pt-6">
        <p className="text-sm leading-relaxed text-muted">
          {copy.consent}
          {privacyHref && (
            <>
              {" "}
              <a href={privacyHref} className="text-accent underline underline-offset-2 hover:text-accent-strong">
                {copy.privacyLink}
              </a>
            </>
          )}
        </p>
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[3px] bg-accent px-6 text-[15px] font-medium text-white transition-colors hover:bg-accent-strong disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:self-start"
        >
          {pending && <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />}
          {pending ? copy.submitting : copy.submit}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "block min-h-12 w-full rounded-[3px] border border-silver-300 bg-white px-4 text-base text-ink transition-colors hover:border-navy-700/50 focus:border-accent focus-visible:outline-offset-0 aria-invalid:border-danger";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optionalLabel?: string;
  aside?: ReactNode;
  children: (describedBy: string | undefined) => ReactNode;
};

/** Label, hint and error wiring for a single form control. */
function Field({ id, label, hint, error, optionalLabel, aside, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-medium text-navy-900">
          {label}
          {optionalLabel && <span className="ml-1.5 font-normal text-muted">({optionalLabel})</span>}
        </label>
        {aside}
      </div>
      {children(describedBy)}
      {hint && (
        <p id={hintId} className="mt-2 text-sm leading-snug text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-sm leading-snug font-medium text-danger">
          <CircleAlert aria-hidden="true" className="mt-px size-4 shrink-0" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}

type NoticeProps = {
  tone: "notice" | "danger";
  icon: ReactNode;
  children: ReactNode;
};

function Notice({ tone, icon, children }: NoticeProps) {
  const styles =
    tone === "danger"
      ? "border-danger bg-danger-soft text-danger"
      : "border-notice bg-notice-soft text-notice";

  return (
    <div className={`flex gap-3 border-l-4 p-4 text-sm leading-relaxed ${styles}`}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p>{children}</p>
    </div>
  );
}
