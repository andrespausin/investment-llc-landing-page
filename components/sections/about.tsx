import { sectionIds } from "@/components/layout/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Dictionary } from "@/content/dictionaries/types";

export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;

  return (
    <Section id={sectionIds.about} labelledBy="about-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <SectionHeading id="about-title" index="01" eyebrow={about.eyebrow} title={about.title} />
        <div className="space-y-5 text-[1.0625rem] leading-relaxed text-slate lg:pt-11">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <ol className="mt-16 grid border-t border-navy-900/15 md:grid-cols-3 lg:mt-20">
        {about.pillars.map((pillar, index) => (
          <li
            key={pillar.title}
            className="border-b border-navy-900/15 py-8 md:border-b-0 md:py-10 md:pr-10 md:not-first:border-l md:not-first:pl-10"
          >
            <span aria-hidden="true" className="font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl font-medium text-navy-900">{pillar.title}</h3>
            <p className="mt-3 leading-relaxed text-slate">{pillar.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
