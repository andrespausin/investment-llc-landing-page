"use server";

import { createResendProvider } from "@/lib/email/resend-provider";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

import { getContactDeliveryConfig } from "./delivery-config";
import { renderAcknowledgementEmail, renderNotificationEmail } from "./email-templates";
import type { ContactFormState } from "./form-state";
import { HONEYPOT_FIELD, readContactInput, validateContactInput } from "./validation";

/**
 * Handles contact form submissions.
 *
 * Server Actions are public endpoints, so every input is validated here
 * regardless of the client-side checks. Personal data is never logged.
 */
export async function submitContactRequest(
  rawLocale: string,
  formData: FormData,
): Promise<ContactFormState> {
  const locale = hasLocale(rawLocale) ? rawLocale : defaultLocale;

  // Bots tend to fill every field. Drop the submission without sending.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const validation = validateContactInput(readContactInput(formData));
  if (!validation.success) {
    return { status: "invalid", errors: validation.errors };
  }

  const config = getContactDeliveryConfig();
  if (!config) {
    // Delivery not configured yet: never pretend the request was received.
    // The visitor is offered the phone number instead.
    console.warn("[contact] Email delivery is not configured (see .env.example). Submission was not sent.");
    return { status: "unavailable" };
  }

  const request = validation.data;
  const provider = createResendProvider(config.resendApiKey);
  const internalDict = await getDictionary(defaultLocale);
  const notification = renderNotificationEmail(request, internalDict, locale);

  const result = await provider.send({
    from: config.from,
    to: config.to,
    replyTo: request.email,
    ...notification,
  });

  if (!result.ok) {
    console.error(`[contact] Notification email failed via ${provider.name}: ${result.reason}`);
    return { status: "error" };
  }

  if (config.sendAcknowledgement) {
    const visitorDict = await getDictionary(locale);
    const acknowledgement = renderAcknowledgementEmail(request, visitorDict, locale);
    const ackResult = await provider.send({
      from: config.from,
      to: [request.email],
      replyTo: config.to[0],
      ...acknowledgement,
    });

    // The request already reached the company; a failed confirmation
    // should not be reported to the visitor as a failed submission.
    if (!ackResult.ok) {
      console.error(`[contact] Acknowledgement email failed via ${provider.name}: ${ackResult.reason}`);
    }
  }

  return { status: "success" };
}
