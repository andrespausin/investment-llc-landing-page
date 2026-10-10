import {
  cookieConsentConfig,
  optionalCookieCategories,
  type CookieCategory,
  type OptionalCookieCategory,
} from "@/config/cookies";

/**
 * Client-side consent store, backed by a first-party cookie.
 * Shared by the banner, the preferences dialog and any component that must
 * wait for consent before loading a third-party script.
 */

export type ConsentChoices = Record<OptionalCookieCategory, boolean>;

export type ConsentRecord = {
  version: number;
  choices: ConsentChoices;
  updatedAt: string;
};

const CHANGE_EVENT = "cookie-consent:change";
const OPEN_PREFERENCES_EVENT = "cookie-consent:open-preferences";

export const allRejected = Object.fromEntries(
  optionalCookieCategories.map((category) => [category, false]),
) as ConsentChoices;

export const allAccepted = Object.fromEntries(
  optionalCookieCategories.map((category) => [category, true]),
) as ConsentChoices;

function readRawCookie(): string | null {
  const prefix = `${cookieConsentConfig.cookieName}=`;
  const entry = document.cookie.split("; ").find((part) => part.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : null;
}

export function parseConsent(raw: string | null): ConsentRecord | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentRecord>;
    if (value.version !== cookieConsentConfig.version || typeof value.choices !== "object" || !value.choices) {
      return null;
    }
    const choices = { ...allRejected };
    for (const category of optionalCookieCategories) {
      choices[category] = value.choices[category] === true;
    }
    return { version: value.version, choices, updatedAt: String(value.updatedAt ?? "") };
  } catch {
    return null;
  }
}

export function saveConsent(choices: ConsentChoices): void {
  const record: ConsentRecord = {
    version: cookieConsentConfig.version,
    choices,
    updatedAt: new Date().toISOString(),
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${cookieConsentConfig.cookieName}=${encodeURIComponent(
    JSON.stringify(record),
  )}; Path=/; Max-Age=${cookieConsentConfig.maxAgeDays * 24 * 60 * 60}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: record }));
}

/** Subscribe to consent changes (for `useSyncExternalStore`). */
export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

/** Raw cookie snapshot: a string is stable across renders, unlike a parsed object. */
export const getConsentSnapshot = (): string | null => readRawCookie();

/** `undefined` on the server: consent is unknown until the browser renders. */
export const getServerConsentSnapshot = (): string | null | undefined => undefined;

export function hasConsent(record: ConsentRecord | null, category: CookieCategory): boolean {
  if (category === "necessary") return true;
  return record?.choices[category] === true;
}

export function openCookiePreferences(): void {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

export function onOpenCookiePreferences(handler: () => void): () => void {
  window.addEventListener(OPEN_PREFERENCES_EVENT, handler);
  return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handler);
}
