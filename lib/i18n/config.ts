/**
 * Locale configuration. Safe to import from the proxy, server and client code.
 */
export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie that remembers the language chosen by the visitor. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Name of each language in its own language, for the switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

/** Open Graph locale codes. */
export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
};

export function hasLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
