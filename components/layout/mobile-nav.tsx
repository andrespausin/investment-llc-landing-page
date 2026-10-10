"use client";

import { useRef } from "react";
import { Menu, X } from "lucide-react";

import { Wordmark } from "@/components/brand/wordmark";
import type { Locale } from "@/lib/i18n/config";

import { LanguageSwitcher } from "./language-switcher";
import type { NavItem } from "./navigation";

type MobileNavProps = {
  items: NavItem[];
  locale: Locale;
  ctaLabel: string;
  ctaHref: string;
  labels: { open: string; close: string; nav: string; language: string };
};

/**
 * Full-screen mobile menu built on the native modal <dialog>: it traps
 * focus, closes with Escape and returns focus to the trigger by default.
 */
export function MobileNav({ items, locale, ctaLabel, ctaHref, labels }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="-mr-2 inline-flex size-11 items-center justify-center text-navy-900 lg:hidden"
      >
        <Menu aria-hidden="true" className="size-6" strokeWidth={1.75} />
        <span className="sr-only">{labels.open}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={labels.nav}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 text-ink backdrop:bg-navy-950/40 lg:hidden"
        onClick={(event) => {
          // Close when an in-page link is chosen; the browser then scrolls to it.
          if ((event.target as HTMLElement).closest("a[href*='#']")) close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-silver-200 px-4 sm:px-6">
            <Wordmark />
            <button
              type="button"
              onClick={close}
              className="-mr-2 inline-flex size-11 items-center justify-center text-navy-900"
            >
              <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>

          <nav aria-label={labels.nav} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <ul className="divide-y divide-silver-200 border-y border-silver-200">
              {items.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex min-h-14 items-center gap-4 py-3 text-lg font-medium text-navy-900"
                  >
                    <span aria-hidden="true" className="font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher currentLocale={locale} label={labels.language} className="mt-6 -ml-2" />
          </nav>

          <div className="shrink-0 border-t border-silver-200 p-4 sm:px-6">
            <a
              href={ctaHref}
              className="flex min-h-12 w-full items-center justify-center rounded-[3px] bg-accent px-6 text-[15px] font-medium text-white hover:bg-accent-strong"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
