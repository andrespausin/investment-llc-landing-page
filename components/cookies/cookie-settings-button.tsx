"use client";

import { openCookiePreferences } from "@/lib/cookie-consent/consent";

/** Reopens the cookie preferences dialog (required to withdraw consent easily). */
export function CookieSettingsButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {label}
    </button>
  );
}
