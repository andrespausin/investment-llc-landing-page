"use client";

import { useSyncExternalStore } from "react";

import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  parseConsent,
  subscribeToConsent,
  type ConsentRecord,
} from "./consent";

/**
 * Current consent in the browser.
 * - `undefined`: not known yet (server render / before hydration)
 * - `null`: the visitor has not decided (or the record is outdated)
 */
export function useConsent(): ConsentRecord | null | undefined {
  const raw = useSyncExternalStore<string | null | undefined>(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  return raw === undefined ? undefined : parseConsent(raw);
}
