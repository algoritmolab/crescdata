import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ControlBar } from "@/components/ui/ControlBar";
import { CtaBand } from "@/components/ui/CtaBand";
import { Bullet } from "@/components/ui/Data";
import {
  coreServices,
  crossCutting,
  servicesHero,
  whyCresc,
} from "@/content/services";
import { logo, site } from "@/content/site";

const description =
  "Order processing, EDI, import management, AR, factor and full accounting for US apparel importers. Cresc runs your back office inside your own systems.";

export const metadata: Metadata = {
  title: "Services",
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Services — ${site.name}`,
    description,
    url: `${site.url}/services`,
    images: [
      { url: logo.src, width: logo.width, height: logo.height, alt: site.name },
    ],
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-paper">
      <ControlBar
        left={site.name}
        centre="Service schedule"
        right={`${coreServices.length} core services`}
      />

      {/* Hero */}
      <Container className="pt-14 pb-16 sm:pt-20 sm:pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {servicesHero.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy sm:text-6xl lg:text-7xl">
          {servicesHero.headline}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          {servicesHero.subhead}
        </p>
      </Container>

      {/* Core services — the order-to-cash spine */}
      <Container className="pb-20 sm:pb-24">
        <h2 className="border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          The order lifecycle
        </h2>

        <ol className="mt-12">
          {coreServices.map((service, i) => {
            const last = i === coreServices.length - 1;
            return (
              <li
                key={service.step}
                className="relative pb-14 last:pb-0 lg:grid lg:grid-cols-[104px_minmax(0,1fr)] lg:gap-12"
              >
                {/* The spine: a hairline joining each step to the next. */}
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[27px] top-14 hidden h-[calc(100%-3.5rem)] w-px bg-rule lg:block"
                  />
                )}

                <div className="mb-6 flex items-center gap-4 lg:mb-0 lg:block">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-rule bg-surface font-mono text-base text-brand-600">
                    {service.step}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted lg:hidden">
                    Step {service.step}
                  </span>
                </div>

                <div className="border-t border-rule pt-6 lg:border-t-0 lg:pt-2">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-[2rem]">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
                    {service.intro}
                  </p>

                  <ul className="mt-7 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="relative pl-6">
                        <Bullet />
                        <span className="text-[0.95rem] leading-relaxed text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>

      {/* Cross-cutting — navy band, deliberately outside the sequence */}
      <section className="bg-navy">
        <Container className="py-20 sm:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Running alongside all of it
          </h2>
          <p className="mt-4 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-brand-300">
            Not a step in the sequence
          </p>

          <div className="mt-12 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2">
            {crossCutting.map((service) => (
              <div key={service.title} className="bg-navy p-7 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-brand-100">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Cresc */}
      <Container className="py-20 sm:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-4xl">
          Why importers hand this to us
        </h2>

        <ul className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {whyCresc.map((reason) => (
            <li key={reason} className="bg-surface p-7">
              <p className="text-[1.0625rem] leading-relaxed text-ink-soft">
                {reason}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      <CtaBand
        heading="Tell us where it hurts."
        body="A short call is usually enough to work out what we'd take off your plate first."
      />
    </div>
  );
}
