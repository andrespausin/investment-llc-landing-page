import type { CookieCategory } from "@/config/cookies";
import type { ServiceId } from "@/config/services";
import type { ContactErrorCode, ContactField } from "@/lib/contact/validation";

export type IndustryId =
  | "oil-gas"
  | "construction"
  | "corporate-finance"
  | "industrial-energy"
  | "other";

export type SectionHeadingCopy = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export type ContactFormCopy = {
  requiredHint: string;
  optional: string;
  fields: {
    fullName: { label: string };
    email: { label: string; hint: string };
    company: { label: string };
    service: { label: string; placeholder: string; otherOption: string };
    message: { label: string; hint: string };
  };
  consent: string;
  privacyLink: string;
  submit: string;
  submitting: string;
  errors: Record<ContactField, Partial<Record<ContactErrorCode, string>>>;
  status: {
    invalid: string;
    unavailable: { title: string; text: string; phonePrompt: string };
    success: { title: string; text: string };
    error: { title: string; text: string };
    sendAnother: string;
  };
};

export type CookieConsentCopy = {
  banner: {
    title: string;
    text: string;
    changeHint: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
    policyLink: string;
  };
  preferences: {
    title: string;
    intro: string;
    alwaysActive: string;
    save: string;
    close: string;
    categories: Record<CookieCategory, { title: string; text: string }>;
  };
  settingsLink: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  common: {
    skipToContent: string;
    primaryNav: string;
    footerNav: string;
    language: string;
    openMenu: string;
    closeMenu: string;
    backToTop: string;
    homeLabel: string;
  };
  nav: {
    about: string;
    services: string;
    industries: string;
    approach: string;
    contact: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
  hero: {
    eyebrow: string;
    titleLines: [string, string];
    lead: string;
    focusLabel: string;
    focusAreas: string[];
    graphic: {
      lanes: [string, string, string, string];
      baseline: string;
      progress: string;
      statusDate: string;
    };
  };
  about: SectionHeadingCopy & {
    paragraphs: string[];
    pillars: { title: string; text: string }[];
  };
  services: SectionHeadingCopy & {
    deliverablesLabel: string;
    items: {
      id: ServiceId;
      title: string;
      summary: string;
      deliverables: string[];
      note?: string;
    }[];
    closing: string;
  };
  industries: SectionHeadingCopy & {
    items: { id: IndustryId; title: string; text: string }[];
  };
  approach: SectionHeadingCopy & {
    steps: { title: string; text: string }[];
  };
  why: SectionHeadingCopy & {
    items: { title: string; text: string }[];
    ctaTitle: string;
    ctaText: string;
  };
  contact: SectionHeadingCopy & {
    checklistTitle: string;
    checklist: string[];
    directContact: {
      title: string;
      phone: string;
      address: string;
      country: string;
      viewMap: string;
      newTab: string;
    };
    form: ContactFormCopy;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
  };
  cookies: CookieConsentCopy;
  notFound: {
    title: string;
    text: string;
    back: string;
  };
  emails: {
    acknowledgement: {
      subject: string;
      greeting: string;
      paragraphs: string[];
      summaryTitle: string;
      signature: string;
    };
    labels: {
      fullName: string;
      email: string;
      company: string;
      service: string;
      message: string;
    };
    notProvided: string;
  };
};
