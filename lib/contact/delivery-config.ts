import "server-only";

/**
 * Contact delivery settings, read from environment variables.
 * See `.env.example` for the full list and expected formats.
 *
 * When any required variable is missing, submissions are not sent: the
 * visitor sees a "temporarily unavailable" message with the phone number,
 * and a warning is logged on the server.
 */
export type ContactDeliveryConfig = {
  resendApiKey: string;
  from: string;
  to: string[];
  sendAcknowledgement: boolean;
};

export function getContactDeliveryConfig(): ContactDeliveryConfig | null {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = (process.env.CONTACT_TO_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (!resendApiKey || !from || to.length === 0) return null;

  return {
    resendApiKey,
    from,
    to,
    sendAcknowledgement: process.env.CONTACT_SEND_ACKNOWLEDGEMENT?.trim() === "true",
  };
}
