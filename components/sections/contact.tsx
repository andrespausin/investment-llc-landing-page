import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { sectionIds } from "@/components/layout/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { serviceIds, OTHER_SERVICE } from "@/config/services";
import { hasPublicContact, siteConfig } from "@/config/site";
import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";

type ContactProps = {
  dict: Dictionary;
  locale: Locale;
};

export function Contact({ dict, locale }: ContactProps) {
  const { contact, services } = dict;

  const serviceOptions = [
    ...serviceIds.map((id) => ({
      value: id,
      label: services.items.find((item) => item.id === id)?.title ?? id,
    })),
    { value: OTHER_SERVICE, label: contact.form.fields.service.otherOption },
  ];

  const privacyHref = siteConfig.legal.privacyPolicyPath
    ? `/${locale}${siteConfig.legal.privacyPolicyPath}`
    : null;

  return (
    <Section id={sectionIds.contact} labelledBy="contact-title" tone="muted" className="border-t border-silver-200">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SectionHeading
            id="contact-title"
            index="06"
            eyebrow={contact.eyebrow}
            title={contact.title}
            intro={contact.intro}
          />

          <div className="mt-10 border-t border-navy-900/15 pt-8">
            <h3 className="font-mono text-xs font-medium tracking-[0.14em] text-muted uppercase">
              {contact.checklistTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {contact.checklist.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-slate">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {hasPublicContact() && (
            <div className="mt-10 border-t border-navy-900/15 pt-8">
              <h3 className="font-mono text-xs font-medium tracking-[0.14em] text-muted uppercase">
                {contact.directContact.title}
              </h3>
              <ContactDetails copy={contact.directContact} className="mt-5" />
            </div>
          )}
        </div>

        <div className="border border-silver-200 bg-white p-5 sm:p-8 lg:p-10">
          <ContactForm
            locale={locale}
            copy={contact.form}
            serviceOptions={serviceOptions}
            phone={siteConfig.contact.phone}
            privacyHref={privacyHref}
          />
        </div>
      </div>
    </Section>
  );
}
