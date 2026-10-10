import { lang } from "next/root-params";
import { notFound } from "next/navigation";

import type { Dictionary } from "@/content/dictionaries/types";
import { hasLocale, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

/**
 * Locale helpers for Server Components, based on the `[lang]` root segment.
 * Not available in Server Actions or Client Components.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getCurrentDictionary(): Promise<Dictionary> {
  return getDictionary(await getLocale());
}
