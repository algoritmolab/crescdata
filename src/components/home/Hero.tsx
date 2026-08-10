import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/ArrowLink";
import { Lead } from "@/components/ui/Lead";
import { hero } from "@/content/site";

export function Hero() {
  return (
    /*
      Height is fixed by breakpoint (min/max around a viewport value), so the
      hero reserves its box before the photograph loads and nothing shifts.
      `svh` rather than `vh` so the mobile URL bar does not resize the hero.
    */
    <section className="relative isolate flex min-h-[480px] items-center overflow-hidden bg-navy sm:min-h-[540px] lg:h-[72svh] lg:min-h-[580px] lg:max-h-[740px]">
      {/*
        Decorative: the headline carries the meaning, so alt is empty.
        objectPosition 50% 55% keeps the two workers and the aisle vanishing
        point in frame in both the wide desktop crop and the tall 375px crop,
        trimming ceiling rather than the floor.
      */}
      <Image
        src="/images/warehouse-aisle.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="photo object-cover"
        style={{ objectPosition: "50% 55%" }}
      />
      <div aria-hidden="true" className="photo-tint absolute inset-0" />
      <div aria-hidden="true" className="photo-scrim-left absolute inset-0" />

      <Container className="relative w-full py-16 sm:py-20">
        <div className="max-w-3xl animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-100">
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 text-[1.75rem] font-semibold leading-[1.1] text-white sm:text-4xl lg:text-6xl lg:leading-[1.06]">
            {hero.headline}
          </h1>
          <Lead tone="light" className="mt-6">
            {hero.subhead}
          </Lead>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowIcon />
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
