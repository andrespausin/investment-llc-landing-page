import { Check } from "lucide-react";

import { sectionIds } from "@/components/layout/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Dictionary } from "@/content/dictionaries/types";

export function WhyUs({ dict }: { dict: Dictionary }) {
  const { why } = dict;

  return (
    <Section id={sectionIds.why} labelledBy="why-title" tone="dark" className="bg-navy-900">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="flex flex-col">
          <SectionHeading
            id="why-title"
            index="05"
            eyebrow={why.eyebrow}
            title={why.title}
            intro={why.intro}
            tone="dark"
          />

          <div className="mt-10 border-t border-silver-300/25 pt-8 lg:mt-auto">
            <p className="text-lg font-medium text-white">{why.ctaTitle}</p>
            <p className="mt-2 leading-relaxed text-silver-400">{why.ctaText}</p>
            <ButtonLink href={`#${sectionIds.contact}`} withArrow className="mt-6 w-full sm:w-auto">
              {dict.cta.primary}
            </ButtonLink>
          </div>
        </div>

        <ul className="border-t border-silver-300/20">
          {why.items.map((item) => (
            <li key={item.title} className="flex gap-5 border-b border-silver-300/20 py-7">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center border border-accent-soft/50 text-accent-soft">
                <Check aria-hidden="true" className="size-4" strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-silver-400">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
