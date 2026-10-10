export type EmailMessage = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type EmailSendResult = { ok: true; id: string | null } | { ok: false; reason: string };

/**
 * Minimal contract for any email provider. The contact feature depends on
 * this interface only, so Resend can be swapped without touching the form.
 */
export interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<EmailSendResult>;
}
