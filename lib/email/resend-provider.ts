import "server-only";

import { Resend } from "resend";

import type { EmailMessage, EmailProvider, EmailSendResult } from "./types";

export function createResendProvider(apiKey: string): EmailProvider {
  const client = new Resend(apiKey);

  return {
    name: "resend",
    async send(message: EmailMessage): Promise<EmailSendResult> {
      try {
        const { data, error } = await client.emails.send({
          from: message.from,
          to: message.to,
          subject: message.subject,
          html: message.html,
          text: message.text,
          replyTo: message.replyTo,
        });

        if (error) return { ok: false, reason: `${error.name}: ${error.message}` };
        return { ok: true, id: data?.id ?? null };
      } catch (cause) {
        const reason = cause instanceof Error ? cause.message : "Unknown error";
        return { ok: false, reason };
      }
    },
  };
}
