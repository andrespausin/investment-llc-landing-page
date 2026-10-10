import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";

import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { getNavItems, sectionHref, sectionIds } from "./navigation";

type SiteHeaderProps = {
  dict: Dictionary;
  locale: Locale;
};

export function SiteHeader({ dict, locale }: SiteHeaderProps) {
  const items = getNavItems(dict, locale);
  const ctaHref = sectionHref(locale, sectionIds.contact);

  return (
    <header className="sticky top-0 z-40 border-b border-silver-200 bg-white">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <a href={sectionHref(locale, sectionIds.top)} className="shrink-0">
          <Wordmark />
        </a>

        <nav aria-label={dict.common.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center px-3 text-[15px] text-slate transition-colors hover:text-navy-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher currentLocale={locale} label={dict.common.language} />
          <ButtonLink href={ctaHref} className="min-h-11 px-5 text-sm">
            {dict.cta.primary}
          </ButtonLink>
        </div>

        <MobileNav
          items={items}
          locale={locale}
          ctaLabel={dict.cta.primary}
          ctaHref={ctaHref}
          labels={{
            open: dict.common.openMenu,
            close: dict.common.closeMenu,
            nav: dict.common.primaryNav,
            language: dict.common.language,
          }}
        />
      </Container>
    </header>
  );
}
