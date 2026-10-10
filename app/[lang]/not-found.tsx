import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getLocale } from "@/lib/i18n/current";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <section aria-labelledby="not-found-title" className="bg-blueprint bg-silver-50 py-24 sm:py-32">
      <Container>
        <p className="font-mono text-xs font-medium tracking-[0.16em] text-accent uppercase">404</p>
        <h1 id="not-found-title" className="mt-5 text-4xl font-medium tracking-[-0.02em] text-navy-900">
          {dict.notFound.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate">{dict.notFound.text}</p>
        <ButtonLink href={`/${locale}`} className="mt-8" withArrow>
          {dict.notFound.back}
        </ButtonLink>
      </Container>
    </section>
  );
}
