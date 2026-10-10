import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { getLocale } from "@/lib/i18n/current";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <About dict={dict} />
      <Services dict={dict} />
      <Industries dict={dict} />
      <Approach dict={dict} />
      <WhyUs dict={dict} />
      <Contact dict={dict} locale={locale} />
    </>
  );
}
