import { Building2, Factory, Fuel, Landmark, Briefcase, type LucideIcon } from "lucide-react";

import { sectionIds } from "@/components/layout/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Dictionary, IndustryId } from "@/content/dictionaries/types";

const icons: Record<IndustryId, LucideIcon> = {
  "oil-gas": Fuel,
  construction: Building2,
  "corporate-finance": Landmark,
  "industrial-energy": Factory,
  other: Briefcase,
};

export function Industries({ dict }: { dict: Dictionary }) {
  const { industries } = dict;

  return (
    <Section id={sectionIds.industries} labelledBy="industries-title" tone="muted">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="industries-title"
            index="03"
            eyebrow={industries.eyebrow}
            title={industries.title}
            intro={industries.intro}
          />
        </div>

        <ul className="border-t border-navy-900/15">
          {industries.items.map((industry) => {
            const Icon = icons[industry.id];
            return (
              <li key={industry.id} className="flex gap-5 border-b border-navy-900/15 py-8 sm:gap-6">
                <span className="flex size-11 shrink-0 items-center justify-center border border-navy-900/20 bg-white text-navy-800">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-navy-900">{industry.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate">{industry.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
