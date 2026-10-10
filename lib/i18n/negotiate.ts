import { defaultLocale, hasLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * Matches on the base language ("es-MX" -> "es"), respecting q-values.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return { base: tag.toLowerCase().split("-")[0], quality: Number.isNaN(quality) ? 0 : quality, index };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  return ranked.find((entry) => hasLocale(entry.base))?.base as Locale | undefined ?? defaultLocale;
}
