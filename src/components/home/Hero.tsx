import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Soft brand wash behind the headline — decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[32rem] bg-[radial-gradient(60%_60%_at_50%_0%,var(--color-brand-50)_0%,transparent_70%)]"
      />
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {hero.subhead}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
