# Launch checklist

Items that must be confirmed or provided by Investments & Services CM, LLC
before the site is published and starts collecting real enquiries.

## 1. Business content to validate

- [ ] **Service lines** (`content/dictionaries/en.ts` / `es.ts` → `services`, IDs in
      `config/services.ts`). They are a *proposed* scope: confirm each service and its
      deliverables reflect what the company actually offers. Remove or edit as needed.
- [ ] **Industries** (`industries`): confirm the sectors and descriptions.
- [ ] **Spanish copy** reviewed by a native speaker from the company's side.
- [ ] No clients, projects, figures, certifications, years of experience, team size or
      locations were added. Add them only if they are real and can be substantiated.

## 2. Brand

- [x] Logo provided. Assets in `public/brand/` (full logo, monogram, light monogram for dark
      backgrounds), favicons in `app/` (`favicon.ico`, `icon.png`, `apple-icon.png`).
- [ ] Ideally obtain the logo as a vector file (SVG) or a high-resolution PNG; the current
      source is 591×422 px, enough for screen use but not for large formats.

## 3. Contact data (`config/site.ts → contact`)

- [x] Phone: +1 (754) 299-8101.
- [x] Address: 7971 Riviera Blvd, Suite 204, Miramar, FL 33023 (taken from the company's
      mailing address). Confirm it is the address the company wants published.
- [ ] Public email, if the company wants one shown (`contact.email`).

## 4. Email delivery (Resend)

- [ ] Create a Resend account and **verify the sending domain** (SPF/DKIM DNS records).
- [ ] Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` in the hosting
      provider (see `.env.example`). Optionally `CONTACT_SEND_ACKNOWLEDGEMENT=true`.
- [ ] Rebuild/redeploy, then send a real test request in both languages and confirm:
      notification received, *Reply-To* is the visitor, acknowledgement (if enabled).
- [ ] Consider adding rate limiting or a CAPTCHA (e.g. Cloudflare Turnstile) if spam
      appears; only a honeypot field is implemented today.

## 5. Legal and privacy (required before collecting personal data)

The form collects name, email, company and a free-text message. Before going live:

- [ ] **Privacy policy** describing: data controller (legal name and contact), purpose
      (answering enquiries), legal basis, retention period, processors (Resend, hosting
      provider) and international transfers, and how to exercise data rights.
      Applicable rules depend on where the company and its visitors are located
      (e.g. GDPR for EU visitors, US state privacy laws). Get legal review.
- [ ] Publish it as a page (e.g. `app/[lang]/privacy/page.tsx`) and set
      `siteConfig.legal.privacyPolicyPath = "/privacy"`. The link then appears in the
      footer and next to the form's consent text.
- [ ] **Legal notice / terms of use** if required, then set `legal.termsPath`.
- [ ] Review the consent sentence above the submit button with the legal advisor.
- [ ] **Cookies**. A consent banner is implemented (`components/cookies/`). Today the site
      only sets necessary cookies (`NEXT_LOCALE` for language, `cookie_consent` for the choice).
      Before launch:
  - [ ] Keep in `config/cookies.ts` only the optional categories that match tools actually
        installed (e.g. remove `marketing` if there is no marketing tool) and adjust the texts
        in the dictionaries (`cookies`).
  - [ ] Load every analytics/marketing script inside `<ConsentGate category="...">` so it only
        runs after consent.
  - [ ] Publish a cookie policy (list of cookies, purpose, duration, provider) and set
        `siteConfig.legal.cookiePolicyPath`; the link appears in the banner and footer.
  - [ ] When categories or their purpose change, bump `cookieConsentConfig.version` so
        visitors are asked again.

## 6. SEO and domain

- [ ] Set `SITE_URL` to the production domain (enables canonical, hreflang, Open Graph
      absolute URLs and `sitemap.xml`).
- [x] Organization structured data (JSON-LD) is generated from `config/site.ts`; URL and
      logo are added automatically once `SITE_URL` is set.
- [ ] After deploy, measure Core Web Vitals / Lighthouse on the real domain.
