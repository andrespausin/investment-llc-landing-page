import type { ComponentPropsWithoutRef } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "secondary-dark";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  withArrow?: boolean;
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] px-6 text-[15px] font-medium tracking-[0.01em] transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  secondary: "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-900/[0.03]",
  "secondary-dark": "border border-silver-300/40 text-white hover:border-silver-300 hover:bg-white/5",
};

/**
 * Anchor styled as a button. Used for in-page navigation (CTAs), so it stays
 * an `<a>`; real actions use `<button>`.
 */
export function ButtonLink({
  variant = "primary",
  withArrow = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      )}
    </a>
  );
}
