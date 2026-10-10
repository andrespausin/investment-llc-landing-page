"use client";

import { useSyncExternalStore } from "react";

import { localeNames, locales, type Locale } from "@/lib/i18n/config";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const getHash = () => window.location.hash;
const getServerHash = () => "";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Switches between locale routes and keeps the current section anchor,
 * so changing language does not send the visitor back to the top.
 */
export function LanguageSwitcher({ currentLocale, label, tone = "light", className = "" }: LanguageSwitcherProps) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const dark = tone === "dark";

  return (
    <div role="group" aria-label={label} className={`flex items-center ${className}`}>
      {locales.map((locale, index) => {
        const active = locale === currentLocale;
        return (
          <span key={locale} className="flex items-center">
            {index > 0 && (
              <span aria-hidden="true" className={`mx-1 h-4 w-px ${dark ? "bg-silver-300/40" : "bg-silver-300"}`} />
            )}
            <a
              href={`/${locale}${hash}`}
              lang={locale}
              hrefLang={locale}
              aria-current={active ? "true" : undefined}
              aria-label={localeNames[locale]}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 font-mono text-[13px] font-medium tracking-[0.08em] uppercase transition-colors ${
                active
                  ? dark
                    ? "text-white underline decoration-accent-soft decoration-2 underline-offset-[6px]"
                    : "text-navy-900 underline decoration-accent decoration-2 underline-offset-[6px]"
                  : dark
                    ? "text-silver-400 hover:text-white"
                    : "text-muted hover:text-navy-900"
              }`}
            >
              {locale}
            </a>
          </span>
        );
      })}
    </div>
  );
}
