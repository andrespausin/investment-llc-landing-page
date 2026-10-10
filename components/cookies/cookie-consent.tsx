"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

import { optionalCookieCategories, type OptionalCookieCategory } from "@/config/cookies";
import type { CookieConsentCopy } from "@/content/dictionaries/types";
import {
  allAccepted,
  allRejected,
  onOpenCookiePreferences,
  parseConsent,
  getConsentSnapshot,
  saveConsent,
  type ConsentChoices,
} from "@/lib/cookie-consent/consent";
import { useConsent } from "@/lib/cookie-consent/use-consent";

type CookieConsentProps = {
  copy: CookieConsentCopy;
  policyHref: string | null;
};

/**
 * Cookie consent banner and preferences dialog.
 *
 * - Shown until the visitor makes a choice; "Reject all" has the same weight
 *   as "Accept all".
 * - Optional categories are off by default.
 * - Choices can be changed at any time from the footer ("Cookie settings").
 * - It does not block the page: the banner is a non-modal region, only the
 *   preferences panel is a modal dialog.
 */
export function CookieConsent({ copy, policyHref }: CookieConsentProps) {
  const consent = useConsent();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [draft, setDraft] = useState<ConsentChoices>(allRejected);

  const openPreferences = () => {
    setDraft(parseConsent(getConsentSnapshot())?.choices ?? allRejected);
    dialogRef.current?.showModal();
  };

  useEffect(() => onOpenCookiePreferences(openPreferences), []);

  const decide = (choices: ConsentChoices) => {
    saveConsent(choices);
    dialogRef.current?.close();
  };

  const toggle = (category: OptionalCookieCategory) =>
    setDraft((current) => ({ ...current, [category]: !current[category] }));

  return (
    <>
      {consent === null && (
        <section
          aria-labelledby={`${titleId}-banner`}
          className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-navy-900 bg-white shadow-[0_-8px_24px_rgb(8_21_42/0.08)]"
        >
          <div className="mx-auto grid w-full max-w-[1200px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:px-8 lg:py-6">
            <div>
              <h2 id={`${titleId}-banner`} className="text-base font-semibold text-navy-900">
                {copy.banner.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">
                {copy.banner.text}
                {/* Shortened on small screens to keep the banner compact; the link is in the footer anyway. */}
                <span className="hidden sm:inline"> {copy.banner.changeHint}</span>
                {policyHref && (
                  <>
                    {" "}
                    <a href={policyHref} className="text-accent underline underline-offset-2 hover:text-accent-strong">
                      {copy.banner.policyLink}
                    </a>
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center lg:flex-nowrap">
              <button type="button" onClick={() => decide(allRejected)} className={choiceButton}>
                {copy.banner.rejectAll}
              </button>
              <button type="button" onClick={() => decide(allAccepted)} className={choiceButton}>
                {copy.banner.acceptAll}
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="col-span-2 inline-flex min-h-11 items-center justify-center px-3 text-sm font-medium text-navy-900 underline underline-offset-4 hover:text-accent sm:order-first"
              >
                {copy.banner.customize}
              </button>
            </div>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby={`${titleId}-dialog`}
        className="m-auto max-h-[88dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto border border-silver-200 bg-white p-0 text-ink backdrop:bg-navy-950/50"
      >
        <div className="flex items-start justify-between gap-4 border-b border-silver-200 px-5 py-4 sm:px-6">
          <h2 id={`${titleId}-dialog`} className="pt-2 text-lg font-semibold text-navy-900">
            {copy.preferences.title}
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center text-navy-900"
          >
            <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            <span className="sr-only">{copy.preferences.close}</span>
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-slate">{copy.preferences.intro}</p>

          <ul className="mt-5 divide-y divide-silver-200 border-y border-silver-200">
            <li className="flex items-start justify-between gap-6 py-4">
              <div>
                <h3 className="font-medium text-navy-900">{copy.preferences.categories.necessary.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate">
                  {copy.preferences.categories.necessary.text}
                </p>
              </div>
              <span className="shrink-0 pt-0.5 font-mono text-[11px] font-medium tracking-[0.08em] text-success uppercase">
                {copy.preferences.alwaysActive}
              </span>
            </li>
            {optionalCookieCategories.map((category) => {
              const inputId = `${titleId}-${category}`;
              const { title, text } = copy.preferences.categories[category];
              return (
                <li key={category} className="flex items-start justify-between gap-6 py-4">
                  <div>
                    <h3 className="font-medium text-navy-900">
                      <label htmlFor={inputId}>{title}</label>
                    </h3>
                    <p id={`${inputId}-desc`} className="mt-1 text-sm leading-relaxed text-slate">
                      {text}
                    </p>
                  </div>
                  <Switch
                    id={inputId}
                    checked={draft[category]}
                    onChange={() => toggle(category)}
                    describedBy={`${inputId}-desc`}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid gap-3 border-t border-silver-200 px-5 py-4 sm:grid-cols-3 sm:px-6">
          <button type="button" onClick={() => decide(allRejected)} className={choiceButton}>
            {copy.banner.rejectAll}
          </button>
          <button type="button" onClick={() => decide(allAccepted)} className={choiceButton}>
            {copy.banner.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => decide(draft)}
            className="inline-flex min-h-11 items-center justify-center rounded-[3px] border border-navy-900/25 px-4 text-sm font-medium text-navy-900 hover:border-navy-900"
          >
            {copy.preferences.save}
          </button>
        </div>
      </dialog>
    </>
  );
}

const choiceButton =
  "inline-flex min-h-11 items-center justify-center rounded-[3px] bg-navy-900 px-5 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-navy-700";

type SwitchProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  describedBy: string;
};

/** Accessible on/off switch: a native checkbox with the switch role. */
function Switch({ id, checked, onChange, describedBy }: SwitchProps) {
  return (
    <span className="relative inline-flex shrink-0 items-center">
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={onChange}
        aria-describedby={describedBy}
        className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        className="flex h-7 w-12 items-center rounded-full border border-silver-300 bg-silver-200 p-0.5 transition-colors peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
      >
        <span
          className={`size-[22px] rounded-full bg-white shadow-sm transition-transform motion-reduce:transition-none ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </span>
    </span>
  );
}
