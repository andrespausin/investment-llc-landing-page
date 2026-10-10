import Image from "next/image";

import { siteConfig } from "@/config/site";
import logoMark from "@/public/brand/logo-mark.png";
import logoMarkLight from "@/public/brand/logo-mark-light.png";

type WordmarkProps = {
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Brand lockup: the CM monogram plus the company name set in the site font.
 * The full stacked logo (`public/brand/logo-full.png`) is too tall to stay
 * legible at header size, so the monogram is used here.
 * `tone="dark"` uses the light version of the monogram for navy backgrounds.
 */
export function Wordmark({ tone = "light", className = "" }: WordmarkProps) {
  const dark = tone === "dark";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={dark ? logoMarkLight : logoMark}
        alt=""
        loading="eager"
        className="h-11 w-auto shrink-0"
        sizes="60px"
      />
      <span
        aria-hidden="true"
        className={`flex flex-col text-[15px] leading-tight font-semibold tracking-[0.005em] sm:flex-row sm:gap-[0.3em] ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        <span>Investments &amp; Services</span>
        <span className={dark ? "text-silver-300" : "text-muted"}>CM, LLC</span>
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </span>
  );
}
