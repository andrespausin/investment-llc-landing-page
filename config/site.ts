/**
 * Central business configuration.
 *
 * Every value marked as `null` is pending confirmation by the company.
 * Components only render these details when a real value is provided,
 * so nothing unverified is ever shown to visitors.
 */
export const siteConfig = {
  /** Exact legal name. Used by the wordmark, metadata, footer and emails. */
  name: "Investments & Services CM, LLC",
  /** Activity descriptor shown next to the name. Not translated on purpose. */
  descriptor: "Consulting & Project Management Services",

  /** Public contact details. Add only verified data; `null` hides the item. */
  contact: {
    email: null as string | null,
    phone: {
      display: "+1 (754) 299-8101",
      /** E.164 format, used for `tel:` links and structured data. */
      e164: "+17542998101",
    } as { display: string; e164: string } | null,
    address: {
      street: "7971 Riviera Blvd, Suite 204",
      locality: "Miramar",
      region: "FL",
      postalCode: "33023",
      /** ISO 3166-1 alpha-2. The display name is translated in the dictionaries. */
      country: "US",
    } as PostalAddress | null,
  },

  /**
   * Legal pages. Leave as `null` until the documents exist.
   * When set, a link is rendered in the footer and next to the contact form.
   * Use a path relative to the locale root, e.g. "/privacy".
   */
  legal: {
    privacyPolicyPath: null as string | null,
    termsPath: null as string | null,
    cookiePolicyPath: null as string | null,
  },
} as const;

export type PostalAddress = {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
};

export function hasPublicContact(): boolean {
  const { email, phone, address } = siteConfig.contact;
  return Boolean(email || phone || address);
}

/** "7971 Riviera Blvd, Suite 204, Miramar, FL 33023" — used for map links. */
export function formatAddressLine(address: PostalAddress): string {
  return `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`;
}

/**
 * Public site URL, read from `SITE_URL`.
 * Used for canonical URLs, Open Graph and the sitemap. When it is not set,
 * the site still works but no absolute URLs are emitted.
 */
export function getSiteUrl(): URL | null {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return null;

  try {
    return new URL(raw);
  } catch {
    return null;
  }
}
