import { sectionIds } from "@/components/layout/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Dictionary } from "@/content/dictionaries/types";

export function Approach({ dict }: { dict: Dictionary }) {
  const { approach } = dict;

  return (
    <Section id={sectionIds.approach} labelledBy="approach-title">
      <SectionHeading
        id="approach-title"
        index="04"
        eyebrow={approach.eyebrow}
        title={approach.title}
        intro={approach.intro}
      />

      {/* Vertical timeline on small screens, horizontal from lg. */}
      <ol className="relative mt-14 grid gap-0 lg:mt-16 lg:grid-cols-5 lg:gap-8">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-navy-900/15 lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
        />
        {approach.steps.map((step, index) => (
          <li key={step.title} className="relative pb-10 pl-10 last:pb-0 lg:pb-0 lg:pl-0">
            <span
              aria-hidden="true"
              className={`absolute top-0 left-0 size-[15px] rotate-45 border-2 ${
                index === approach.steps.length - 1 ? "border-accent bg-accent" : "border-navy-900 bg-white"
              }`}
            />
            <p className="font-mono text-xs tracking-[0.12em] text-accent lg:mt-10">
              <span className="sr-only">{`${index + 1}. `}</span>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </p>
            <h3 className="mt-2 text-xl font-medium text-navy-900">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-slate">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
