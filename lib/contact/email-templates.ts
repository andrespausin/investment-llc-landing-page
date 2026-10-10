import "server-only";

import { formatAddressLine, getSiteUrl, siteConfig } from "@/config/site";
import { OTHER_SERVICE, type ServiceOption } from "@/config/services";
import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";

import type { ContactRequest } from "./validation";

type RenderedEmail = { subject: string; html: string; text: string };

const COLORS = {
  navy: "#0E2240",
  text: "#1F2A3A",
  muted: "#5E6B7D",
  rule: "#DCE1E8",
  panel: "#F3F5F8",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapes user text and keeps line breaks. */
function toHtmlText(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

export function getServiceLabel(dict: Dictionary, service: ServiceOption): string {
  if (service === OTHER_SERVICE) return dict.contact.form.fields.service.otherOption;
  return dict.services.items.find((item) => item.id === service)?.title ?? service;
}

function summaryRows(request: ContactRequest, dict: Dictionary) {
  const { labels, notProvided } = dict.emails;
  return [
    [labels.fullName, request.fullName],
    [labels.email, request.email],
    [labels.company, request.company ?? notProvided],
    [labels.service, getServiceLabel(dict, request.service)],
    [labels.message, request.message],
  ] as const;
}

/**
 * Email header. Images in emails need a public absolute URL, so the logo is
 * only used once SITE_URL is configured; otherwise the name is shown as text.
 */
function header(): string {
  const siteUrl = getSiteUrl();
  if (siteUrl) {
    const logoUrl = new URL("/brand/logo-full.png", siteUrl).toString();
    return `<tr><td style="padding:24px 28px;border-bottom:3px solid ${COLORS.navy};text-align:center;">
      <img src="${escapeHtml(logoUrl)}" width="180" height="132" alt="${escapeHtml(siteConfig.name)}" style="display:inline-block;border:0;" />
    </td></tr>`;
  }
  return `<tr><td style="background:${COLORS.navy};color:#ffffff;padding:20px 28px;font-size:15px;font-weight:bold;letter-spacing:0.02em;">${escapeHtml(siteConfig.name)}</td></tr>`;
}

/** Company contact lines for the email footer. */
function footer(): string {
  const { phone, address } = siteConfig.contact;
  const lines = [siteConfig.name, phone?.display, address ? formatAddressLine(address) : null].filter(Boolean);
  return `<tr><td style="padding:16px 28px;background:${COLORS.panel};border-top:1px solid ${COLORS.rule};font-size:12px;line-height:1.6;color:${COLORS.muted};">${lines
    .map((line) => escapeHtml(String(line)))
    .join("<br />")}</td></tr>`;
}

function layout(lang: Locale, title: string, body: string): string {
  return `<!doctype html>
<html lang="${lang}">
  <head><meta charset="utf-8" /><title>${escapeHtml(title)}</title></head>
  <body style="margin:0;padding:24px;background:${COLORS.panel};font-family:Arial,Helvetica,sans-serif;color:${COLORS.text};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid ${COLORS.rule};">
      ${header()}
      <tr><td style="padding:28px;font-size:15px;line-height:1.6;">${body}</td></tr>
      ${footer()}
    </table>
  </body>
</html>`;
}

function summaryTable(rows: ReturnType<typeof summaryRows>): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${COLORS.rule};margin-top:8px;">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:12px 0;border-bottom:1px solid ${COLORS.rule};vertical-align:top;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:${COLORS.muted};">${escapeHtml(label)}</div>
        <div style="margin-top:4px;">${toHtmlText(value)}</div>
      </td></tr>`,
  )
  .join("\n")}
</table>`;
}

/** Internal notification sent to the company inbox. */
export function renderNotificationEmail(
  request: ContactRequest,
  dict: Dictionary,
  submittedLocale: Locale,
): RenderedEmail {
  const rows = summaryRows(request, dict);
  const subject = `New consultation request: ${request.fullName}${
    request.company ? ` (${request.company})` : ""
  }`;
  const intro = `A new request was submitted through the website contact form (language: ${submittedLocale.toUpperCase()}). Reply to this email to answer the sender directly.`;

  const html = layout(
    "en",
    subject,
    `<p style="margin:0 0 16px;">${escapeHtml(intro)}</p>${summaryTable(rows)}`,
  );
  const text = [intro, "", ...rows.map(([label, value]) => `${label}:\n${value}\n`)].join("\n");

  return { subject, html, text };
}

/** Optional automatic confirmation sent to the visitor, in their language. */
export function renderAcknowledgementEmail(
  request: ContactRequest,
  dict: Dictionary,
  locale: Locale,
): RenderedEmail {
  const copy = dict.emails.acknowledgement;
  const rows = summaryRows(request, dict);
  const subject = `${copy.subject} | ${siteConfig.name}`;
  const greeting = copy.greeting.replace("{name}", request.fullName);

  const html = layout(
    locale,
    subject,
    [
      `<p style="margin:0 0 16px;">${escapeHtml(greeting)}</p>`,
      ...copy.paragraphs.map((p) => `<p style="margin:0 0 16px;">${escapeHtml(p)}</p>`),
      `<p style="margin:24px 0 0;font-weight:bold;">${escapeHtml(copy.summaryTitle)}</p>`,
      summaryTable(rows),
      `<p style="margin:24px 0 0;color:${COLORS.muted};">${escapeHtml(copy.signature)}</p>`,
    ].join(""),
  );

  const text = [
    greeting,
    "",
    ...copy.paragraphs.flatMap((p) => [p, ""]),
    copy.summaryTitle,
    "",
    ...rows.map(([label, value]) => `${label}:\n${value}\n`),
    copy.signature,
  ].join("\n");

  return { subject, html, text };
}
