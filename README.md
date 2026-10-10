# Investments & Services CM, LLC — Landing page

Bilingual (EN default / ES) landing page for **Consulting & Project Management Services**.
Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Resend.

## Getting started

```bash
npm install
cp .env.example .env.local   # without it, form submissions are not sent (see below)
npm run dev                  # http://localhost:3000 → redirects to /en or /es
```

| Command         | Purpose                     |
| --------------- | --------------------------- |
| `npm run dev`   | Development server          |
| `npm run build` | Production build            |
| `npm start`     | Serve the production build  |
| `npm run lint`  | ESLint                      |

## Project structure

```
app/
  [lang]/                 Root layout per locale (html lang, metadata, header/footer)
    page.tsx              Landing page: composes the sections
    not-found.tsx         Localized 404 ([...rest] routes unknown paths here)
    opengraph-image.tsx   Generated OG image per locale
  globals.css             Design tokens (Tailwind @theme) and base styles
  robots.ts, sitemap.ts, icon.svg
proxy.ts                  Locale redirect (cookie → Accept-Language → en)
config/
  site.ts                 Company name, contact data, legal links, SITE_URL
  services.ts             Service IDs shared by UI, form and validation
content/dictionaries/     All copy: en.ts, es.ts, typed by types.ts
lib/
  i18n/                   Locale config, negotiation, dictionary loaders
  contact/                Validation (shared client/server), Server Action,
                          delivery config, email templates
  email/                  Provider interface + Resend implementation
  cookie-consent/         Consent store (cookie), useConsent hook
components/
  brand/                  Provisional wordmark (replace with final logo)
  layout/                 Header, mobile menu, language switcher, footer
  sections/               One component per landing section
  contact/                Contact form (Client Component)
  cookies/                Consent banner, preferences dialog, ConsentGate
  graphics/               Hero SVG composition
  ui/                     Container, Section/SectionHeading, ButtonLink
docs/LAUNCH_CHECKLIST.md  Content, legal and integrations pending before launch
```

## Editing content

- **Texts** live in `content/dictionaries/en.ts` and `es.ts`. The `Dictionary` type makes the
  build fail if a key is missing in one language.
- **Adding a language**: add the code to `lib/i18n/config.ts`, create the dictionary and
  register it in `lib/i18n/dictionaries.ts`.
- **Adding/removing a service**: update `config/services.ts` and the `services.items`
  arrays in both dictionaries.
- **Company data** (contact details, legal pages): `config/site.ts`. `null` values are
  never rendered.

## Contact form and email

- Validation runs in the browser for inline feedback and again in the Server Action
  (`lib/contact/actions.ts`), which is the source of truth.
- Delivery goes through the `EmailProvider` interface (`lib/email/types.ts`); Resend is the
  current implementation. Swapping provider only touches `lib/email/`.
- **Delivery not configured**: if `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` or `CONTACT_TO_EMAIL` is
  missing, nothing is sent. The visitor sees a "temporarily unavailable" message with the company
  phone number (the form never pretends a request was received) and the server logs a warning.
- On success, the company receives a notification with *Reply-To* set to the visitor. With
  `CONTACT_SEND_ACKNOWLEDGEMENT=true` the visitor also receives a confirmation in their language.
- Pages are prerendered, so environment variables are read at build time: redeploy after
  changing them.

## Cookie consent

A banner asks for consent on the first visit ("Reject all" and "Accept all" with equal weight,
plus "Customize"). Optional categories are off by default; the choice is stored for 180 days
in the `cookie_consent` cookie and can be changed from "Cookie settings" in the footer.
Categories live in `config/cookies.ts`. Wrap any third-party script in
`<ConsentGate category="analytics">…</ConsentGate>` so it only loads after consent.

See `.env.example` for all variables and `docs/LAUNCH_CHECKLIST.md` before going live.
