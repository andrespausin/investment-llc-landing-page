import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/config/site";
import { locales } from "@/lib/i18n/config";

/** Lists both locale home pages. Empty until SITE_URL is configured. */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const languages = Object.fromEntries(locales.map((l) => [l, new URL(`/${l}`, siteUrl).toString()]));

  return locales.map((locale) => ({
    url: new URL(`/${locale}`, siteUrl).toString(),
    alternates: { languages },
  }));
}
