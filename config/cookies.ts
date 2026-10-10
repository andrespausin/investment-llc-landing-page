/**
 * Cookie consent configuration.
 *
 * "necessary" cookies are always active (language preference, consent
 * record). Optional categories are only listed here so future tools can be
 * gated behind consent. Before launch, keep only the categories that match
 * tools actually installed on the site, and describe them accurately.
 */
export const optionalCookieCategories = ["analytics", "marketing"] as const;

export type OptionalCookieCategory = (typeof optionalCookieCategories)[number];

export type CookieCategory = "necessary" | OptionalCookieCategory;

export const cookieConsentConfig = {
  cookieName: "cookie_consent",
  /**
   * Bump this number whenever categories or their purpose change: visitors
   * with an older record are asked again.
   */
  version: 1,
  /** How long a choice is remembered, in days (6 months). */
  maxAgeDays: 180,
} as const;
