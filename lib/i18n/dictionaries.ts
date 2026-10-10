import "server-only";

import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/content/dictionaries/en").then((m) => m.default),
  es: () => import("@/content/dictionaries/es").then((m) => m.default),
};

/** Loads the dictionary for an explicit locale. Safe in Server Actions. */
export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
