import { ArrowUp } from "lucide-react";

import { Wordmark } from "@/components/brand/wordmark";
import { ContactDetails } from "@/components/contact/contact-details";
import { CookieSettingsButton } from "@/components/cookies/cookie-settings-button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";

import { CopyrightYear } from "./copyright-year";
import { getNavItems, sectionHref, sectionIds } from "./navigation";

type SiteFooterProps = {
  dict: Dictionary;
  locale: Locale;
};

export function SiteFooter({ dict, locale }: SiteFooterProps) {
  const { privacyPolicyPath, termsPath, cookiePolicyPath } = siteConfig.legal;

  return (
    <footer className="theme-dark bg-navy-950 text-silver-400">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] lg:gap-12">
          <div className="max-w-sm md:col-span-2 lg:col-span-1">
            <Wordmark tone="dark" />
            <p className="mt-5 text-[15px] leading-relaxed">{siteConfig.descriptor}</p>
          </div>

          <ContactDetails copy={dict.contact.directContact} tone="dark" className="text-[15px]" />

          <nav aria-label={dict.common.footerNav}>
            <ul className="grid grid-cols-2 gap-x-10 md:grid-cols-1">
              {getNavItems(dict, locale).map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-11 items-center text-[15px] hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
              {privacyPolicyPath && (
                <li>
                  <a
                    href={`/${locale}${privacyPolicyPath}`}
                    className="inline-flex min-h-11 items-center text-[15px] hover:text-white"
                  >
                    {dict.footer.privacy}
                  </a>
                </li>
              )}
              {cookiePolicyPath && (
                <li>
                  <a
                    href={`/${locale}${cookiePolicyPath}`}
                    className="inline-flex min-h-11 items-center text-[15px] hover:text-white"
                  >
                    {dict.cookies.banner.policyLink}
                  </a>
                </li>
              )}
              <li>
                <CookieSettingsButton
                  label={dict.cookies.settingsLink}
                  className="inline-flex min-h-11 items-center text-left text-[15px] hover:text-white"
                />
              </li>
              {termsPath && (
                <li>
                  <a href={`/${locale}${termsPath}`} className="inline-flex min-h-11 items-center text-[15px] hover:text-white">
                    {dict.footer.terms}
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-silver-300/15 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.name}. {dict.footer.rights}
          </p>
          <a href={sectionHref(locale, sectionIds.top)} className="inline-flex min-h-11 items-center gap-2 hover:text-white">
            {dict.common.backToTop}
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
