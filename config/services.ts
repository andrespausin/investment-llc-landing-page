/**
 * Stable identifiers for the service lines.
 *
 * Texts live in the dictionaries; these IDs are shared by the services
 * section, the contact form select and the server-side validation.
 * Review this list with the company before launch to confirm the real
 * commercial scope.
 */
export const serviceIds = [
  "strategy",
  "project-management",
  "project-controls",
  "corporate-finance",
  "procurement",
  "operational-improvement",
] as const;

export type ServiceId = (typeof serviceIds)[number];

/** Extra option in the contact form for undecided visitors. */
export const OTHER_SERVICE = "other" as const;

export type ServiceOption = ServiceId | typeof OTHER_SERVICE;

export const serviceOptions: readonly ServiceOption[] = [
  ...serviceIds,
  OTHER_SERVICE,
];

export function isServiceOption(value: string): value is ServiceOption {
  return (serviceOptions as readonly string[]).includes(value);
}
