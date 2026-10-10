"use client";

import type { ReactNode } from "react";

import type { OptionalCookieCategory } from "@/config/cookies";
import { hasConsent } from "@/lib/cookie-consent/consent";
import { useConsent } from "@/lib/cookie-consent/use-consent";

/**
 * Renders its children only after the visitor has accepted a category.
 * Use it to load analytics or marketing scripts, e.g.:
 *
 *   <ConsentGate category="analytics">
 *     <Script src="https://..." strategy="afterInteractive" />
 *   </ConsentGate>
 */
export function ConsentGate({ category, children }: { category: OptionalCookieCategory; children: ReactNode }) {
  const consent = useConsent();
  if (consent === undefined || !hasConsent(consent, category)) return null;
  return <>{children}</>;
}
