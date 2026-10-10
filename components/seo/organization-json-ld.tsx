import { getSiteUrl, siteConfig } from "@/config/site";

/**
 * schema.org Organization data built only from verified values in
 * `siteConfig`. URL and logo are added once SITE_URL is configured.
 */
export function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  const { phone, address, email } = siteConfig.contact;

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.descriptor,
    ...(siteUrl && {
      url: siteUrl.toString(),
      logo: new URL("/brand/logo-full.png", siteUrl).toString(),
    }),
    ...(phone && { telephone: phone.e164 }),
    ...(email && { email }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address.street,
        addressLocality: address.locality,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
