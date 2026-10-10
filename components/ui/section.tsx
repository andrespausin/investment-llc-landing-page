import type { ReactNode } from "react";

import { Container } from "./container";

export type SectionTone = "light" | "muted" | "dark";

const tones: Record<SectionTone, string> = {
  light: "bg-white text-ink",
  muted: "bg-silver-50 text-ink",
  dark: "theme-dark bg-navy-950 text-white",
};

type SectionProps = {
  id: string;
  tone?: SectionTone;
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, tone = "light", labelledBy, className = "", children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-20 sm:py-24 lg:py-28 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: SectionTone;
  className?: string;
};

/**
 * Editorial section heading: numbered eyebrow, H2 and optional intro.
 * The number is decorative and hidden from assistive technology.
 */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  intro,
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className={`max-w-2xl ${className}`}>
      <p
        className={`flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.16em] ${
          dark ? "text-accent-soft" : "text-accent"
        }`}
      >
        <span aria-hidden="true">{index}</span>
        <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-silver-300/40" : "bg-navy-900/25"}`} />
        <span>{eyebrow}</span>
      </p>
      <h2
        id={id}
        className={`mt-5 text-[1.875rem] leading-[1.15] font-medium tracking-[-0.015em] text-balance sm:text-[2.375rem] ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-[1.0625rem] leading-relaxed ${dark ? "text-silver-400" : "text-slate"}`}>{intro}</p>
      )}
    </div>
  );
}
