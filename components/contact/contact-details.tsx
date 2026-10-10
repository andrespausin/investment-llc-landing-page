import { Mail, MapPin, Phone } from "lucide-react";

import { formatAddressLine, siteConfig } from "@/config/site";
import type { Dictionary } from "@/content/dictionaries/types";

type ContactDetailsProps = {
  copy: Dictionary["contact"]["directContact"];
  tone?: "light" | "dark";
  className?: string;
};

/** Phone, email and address from `siteConfig.contact`. Renders nothing if empty. */
export function ContactDetails({ copy, tone = "light", className = "" }: ContactDetailsProps) {
  const { email, phone, address } = siteConfig.contact;
  if (!email && !phone && !address) return null;

  const dark = tone === "dark";
  const label = `font-mono text-[11px] font-medium tracking-[0.14em] uppercase ${dark ? "text-silver-400" : "text-muted"}`;
  const value = dark ? "text-silver-100" : "text-navy-900";
  const link = `underline-offset-4 transition-colors hover:underline ${dark ? "hover:text-white" : "hover:text-accent"}`;
  const icon = `mt-0.5 size-4 shrink-0 ${dark ? "text-accent-soft" : "text-accent"}`;

  const mapUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddressLine(address))}`
    : null;

  return (
    <address className={`space-y-5 not-italic ${className}`}>
      {phone && (
        <div className="flex gap-3">
          <Phone aria-hidden="true" className={icon} strokeWidth={1.75} />
          <div>
            <p className={label}>{copy.phone}</p>
            <a href={`tel:${phone.e164}`} className={`mt-1 inline-block ${value} ${link}`}>
              {phone.display}
            </a>
          </div>
        </div>
      )}

      {email && (
        <div className="flex gap-3">
          <Mail aria-hidden="true" className={icon} strokeWidth={1.75} />
          <div>
            <p className={label}>Email</p>
            <a href={`mailto:${email}`} className={`mt-1 inline-block break-all ${value} ${link}`}>
              {email}
            </a>
          </div>
        </div>
      )}

      {address && mapUrl && (
        <div className="flex gap-3">
          <MapPin aria-hidden="true" className={icon} strokeWidth={1.75} />
          <div>
            <p className={label}>{copy.address}</p>
            <p className={`mt-1 leading-relaxed ${value}`}>
              {address.street}
              <br />
              {address.locality}, {address.region} {address.postalCode}
              <br />
              {copy.country}
            </p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 inline-flex min-h-11 items-center text-sm ${dark ? "text-accent-soft" : "text-accent"} ${link}`}
            >
              {copy.viewMap}
              <span className="sr-only"> {copy.newTab}</span>
            </a>
          </div>
        </div>
      )}
    </address>
  );
}
