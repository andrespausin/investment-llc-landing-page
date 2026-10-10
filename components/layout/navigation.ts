import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";

/** In-page sections, in the order they appear. IDs match section anchors. */
export const sectionIds = {
  top: "top",
  main: "main-content",
  about: "about",
  services: "services",
  industries: "industries",
  approach: "approach",
  why: "why-us",
  contact: "contact",
} as const;

export type NavItem = { href: string; label: string };

/**
 * Links include the locale path so they also work from pages other than
 * the home page (e.g. the 404 page). On the home page the browser treats
 * them as same-document anchors and only scrolls.
 */
export function sectionHref(locale: Locale, id: string): string {
  return `/${locale}#${id}`;
}

export function getNavItems(dict: Dictionary, locale: Locale): NavItem[] {
  return [
    { href: sectionHref(locale, sectionIds.about), label: dict.nav.about },
    { href: sectionHref(locale, sectionIds.services), label: dict.nav.services },
    { href: sectionHref(locale, sectionIds.industries), label: dict.nav.industries },
    { href: sectionHref(locale, sectionIds.approach), label: dict.nav.approach },
    { href: sectionHref(locale, sectionIds.contact), label: dict.nav.contact },
  ];
}
