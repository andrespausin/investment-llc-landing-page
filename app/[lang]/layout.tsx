import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { CookieConsent } from "@/components/cookies/cookie-consent";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { sectionIds } from "@/components/layout/navigation";
import { getSiteUrl, siteConfig } from "@/config/site";
import { hasLocale, defaultLocale, locales, ogLocales } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/current";
import { getDictionary } from "@/lib/i18n/dictionaries";

import "../globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const siteUrl = getSiteUrl();
  const title = `${siteConfig.name} | ${dict.meta.title}`;

  return {
    // Absolute URLs (canonical, hreflang, Open Graph) are only emitted
    // once SITE_URL is configured.
    metadataBase: siteUrl,
    title: { default: title, template: `%s | ${siteConfig.name}` },
    description: dict.meta.description,
    applicationName: siteConfig.name,
    alternates: siteUrl
      ? {
          canonical: `/${locale}`,
          languages: {
            ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
            "x-default": `/${defaultLocale}`,
          },
        }
      : undefined,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description: dict.meta.description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      url: siteUrl ? `/${locale}` : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} className={`${plexSans.variable} ${plexMono.variable} antialiased`}>
      <body id={sectionIds.top} className="flex min-h-dvh flex-col">
        <OrganizationJsonLd />
        <a
          href={`#${sectionIds.main}`}
          className="sr-only z-50 bg-navy-900 px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.common.skipToContent}
        </a>
        <SiteHeader dict={dict} locale={locale} />
        <main id={sectionIds.main} className="flex-1">
          {children}
        </main>
        <SiteFooter dict={dict} locale={locale} />
        <CookieConsent
          copy={dict.cookies}
          policyHref={siteConfig.legal.cookiePolicyPath ? `/${locale}${siteConfig.legal.cookiePolicyPath}` : null}
        />
      </body>
    </html>
  );
}
