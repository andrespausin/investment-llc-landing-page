import type { ContactFieldErrors } from "./validation";

/** Result of a contact form submission, shared by the action and the UI. */
export type ContactFormState =
  | { status: "idle" }
  | { status: "invalid"; errors: ContactFieldErrors }
  | { status: "unavailable" }
  | { status: "success" }
  | { status: "error" };

export const initialContactFormState: ContactFormState = { status: "idle" };
