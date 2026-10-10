import { sectionIds } from "@/components/layout/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Dictionary } from "@/content/dictionaries/types";

export function Services({ dict }: { dict: Dictionary }) {
  const { services } = dict;

  return (
    <Section id={sectionIds.services} labelledBy="services-title" tone="dark" className="bg-blueprint-dark">
      <SectionHeading
        id="services-title"
        index="02"
        eyebrow={services.eyebrow}
        title={services.title}
        intro={services.intro}
        tone="dark"
      />

      <ol className="mt-14 border-t border-silver-300/20 lg:mt-16">
        {services.items.map((service, index) => (
          <li
            key={service.id}
            id={`service-${service.id}`}
            className="grid gap-5 border-b border-silver-300/20 py-9 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,4fr)] lg:py-11"
          >
            <div className="flex gap-5">
              <span aria-hidden="true" className="pt-1 font-mono text-xs text-accent-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl leading-snug font-medium text-white">{service.title}</h3>
            </div>

            <div className="md:col-start-2 md:row-start-1 lg:col-start-auto lg:row-start-auto">
              <p className="leading-relaxed text-silver-400">{service.summary}</p>
              {service.note && (
                <p className="mt-4 border-l-2 border-accent-soft/60 pl-3 text-sm leading-relaxed text-silver-300">
                  {service.note}
                </p>
              )}
            </div>

            <div className="md:col-start-2 lg:col-start-auto">
              <h4 className="font-mono text-[11px] font-medium tracking-[0.14em] text-silver-400 uppercase">
                {services.deliverablesLabel}
              </h4>
              <ul className="mt-3 space-y-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-snug text-silver-100">
                    <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-accent-soft" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-[1.0625rem] leading-relaxed text-silver-300">{services.closing}</p>
        <ButtonLink href={`#${sectionIds.contact}`} withArrow className="shrink-0">
          {dict.cta.primary}
        </ButtonLink>
      </div>
    </Section>
  );
}
