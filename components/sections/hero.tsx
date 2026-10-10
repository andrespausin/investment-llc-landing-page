import { PlanGraphic } from "@/components/graphics/plan-graphic";
import { sectionIds } from "@/components/layout/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/content/dictionaries/types";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero, cta } = dict;

  return (
    <section aria-labelledby="hero-title" className="bg-blueprint border-b border-silver-200 bg-silver-50">
      <Container className="grid items-center gap-14 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-24 lg:pb-24">
        <div>
          <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.16em] text-accent uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.5rem] leading-[1.05] font-medium tracking-[-0.025em] text-navy-900 sm:text-[3.25rem] lg:text-[3.125rem] xl:text-[3.5rem]"
          >
            <span className="block">{hero.titleLines[0]}</span>
            <span className="block text-navy-700">{hero.titleLines[1]}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">{hero.lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`#${sectionIds.contact}`} withArrow>
              {cta.primary}
            </ButtonLink>
            <ButtonLink href={`#${sectionIds.services}`} variant="secondary">
              {cta.secondary}
            </ButtonLink>
          </div>
        </div>

        <PlanGraphic labels={hero.graphic} className="mx-auto w-full max-w-[560px] lg:mr-0" />
      </Container>

      <div className="border-t border-silver-200 bg-white">
        <Container className="py-6 lg:flex lg:items-center lg:gap-10">
          <p className="shrink-0 font-mono text-xs font-medium tracking-[0.16em] text-muted uppercase">
            {hero.focusLabel}
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 min-[480px]:grid-cols-2 lg:mt-0 lg:flex lg:flex-1 lg:justify-between">
            {hero.focusAreas.map((area) => (
              <li key={area} className="flex items-center gap-3 text-[15px] font-medium text-navy-900">
                <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-accent" />
                {area}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
