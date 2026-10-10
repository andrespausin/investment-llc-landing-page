import { isServiceOption, type ServiceOption } from "@/config/services";

/**
 * Contact form validation shared by the client (inline feedback) and the
 * Server Action (source of truth). It returns error codes, never messages,
 * so each locale can phrase them in its own dictionary.
 */

export const contactFields = [
  "fullName",
  "email",
  "company",
  "service",
  "message",
] as const;

export type ContactField = (typeof contactFields)[number];

export type ContactErrorCode = "required" | "invalid" | "tooShort" | "tooLong";

export type ContactFieldErrors = Partial<Record<ContactField, ContactErrorCode>>;

export type ContactInput = Record<ContactField, string>;

export type ContactRequest = {
  fullName: string;
  email: string;
  company: string | null;
  service: ServiceOption;
  message: string;
};

export const CONTACT_LIMITS = {
  fullName: 120,
  email: 254,
  company: 160,
  messageMin: 20,
  messageMax: 3000,
} as const;

/** Name of the hidden anti-spam field. Humans never fill it. */
export const HONEYPOT_FIELD = "website";

// Pragmatic check: one "@", no spaces, and a dot in the domain part.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const emptyContactInput: ContactInput = {
  fullName: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

export function readContactInput(formData: FormData): ContactInput {
  const read = (key: ContactField) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    fullName: read("fullName"),
    email: read("email"),
    company: read("company"),
    service: read("service"),
    message: read("message"),
  };
}

export function validateContactField(
  field: ContactField,
  rawValue: string,
): ContactErrorCode | undefined {
  const value = rawValue.trim();

  switch (field) {
    case "fullName":
      if (!value) return "required";
      if (value.length > CONTACT_LIMITS.fullName) return "tooLong";
      return undefined;
    case "email":
      if (!value) return "required";
      if (value.length > CONTACT_LIMITS.email) return "tooLong";
      if (!EMAIL_PATTERN.test(value)) return "invalid";
      return undefined;
    case "company":
      if (value.length > CONTACT_LIMITS.company) return "tooLong";
      return undefined;
    case "service":
      if (!value) return "required";
      if (!isServiceOption(value)) return "invalid";
      return undefined;
    case "message":
      if (!value) return "required";
      if (value.length < CONTACT_LIMITS.messageMin) return "tooShort";
      if (value.length > CONTACT_LIMITS.messageMax) return "tooLong";
      return undefined;
  }
}

export function validateContactInput(
  input: ContactInput,
):
  | { success: true; data: ContactRequest }
  | { success: false; errors: ContactFieldErrors } {
  const errors: ContactFieldErrors = {};

  for (const field of contactFields) {
    const error = validateContactField(field, input[field]);
    if (error) errors[field] = error;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const company = input.company.trim();

  return {
    success: true,
    data: {
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      company: company || null,
      service: input.service as ServiceOption,
      message: input.message.trim(),
    },
  };
}
