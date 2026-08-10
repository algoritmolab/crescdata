import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ControlBar } from "@/components/ui/ControlBar";
import { CtaBand } from "@/components/ui/CtaBand";
import {
  serviceAreas,
  testimonials,
  testimonialsIntro,
  logo,
  site,
} from "@/content/site";

const description =
  "What apparel importers say about working with Cresc Datasoft, across EDI, accounting, imports, compliance and day-to-day operations.";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Client Testimonials — ${site.name}`,
    description,
    url: `${site.url}/testimonials`,
    images: [
      { url: logo.src, width: logo.width, height: logo.height, alt: site.name },
    ],
  },
};

const areaFor = (key: string) =>
  serviceAreas.find((a) => a.key === key) ?? serviceAreas[0];

export default function TestimonialsPage() {
  return (
    <div className="bg-paper">
      <ControlBar
        left={site.name}
        centre="Client record"
        right={`${testimonials.length} entries`}
      />

      <Container className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <header className="max-w-3xl">
          <h1 className="font-display text-5xl font-semibold leading-[0.94] tracking-[-0.045em] text-navy sm:text-7xl">
            {testimonialsIntro.heading}
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {testimonials.length} accounts /{" "}
            {serviceAreas.length} service areas
          </p>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            {testimonialsIntro.intro}
          </p>
        </header>
      </Container>

      <Container className="pb-24 sm:pb-28">
        {/*
          PLACEHOLDER TESTIMONIALS — the quotes and attributions in
          content/site.ts are illustrative, not real client statements.
          Swap them for approved quotes before launch.

          The grid rules are a rule-coloured ground showing through 1px gaps,
          and grid-auto-rows-fr forces every cell to the height of the tallest
          in its row, so cells never size to their own content.
        */}
        <ul className="grid auto-rows-fr gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => {
            const area = areaFor(t.area);
            return (
              <li
                key={t.name}
                className="group flex flex-col bg-paper p-6 transition-colors duration-200 hover:bg-surface sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`block h-3 w-8 shrink-0 transition-all duration-300 group-hover:w-14 ${area.chip}`}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {area.label}
                  </span>
                </div>

                <blockquote className="mt-7 flex-1 font-display text-lg font-medium leading-[1.4] tracking-[-0.015em] text-navy sm:text-xl">
                  {t.quote}
                </blockquote>

                <div className="mt-8 border-t border-rule pt-5">
                  <p className="font-display text-sm font-semibold text-navy">
                    {t.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted">
                    {t.role}
                    <span className="block">{t.company}</span>
                  </p>
                </div>
              </li>
            );
          })}

          {/*
            The one deliberate break in the grid: a solid cell carrying the
            colour master itself, so the chips above have a legend.
          */}
          <li className="flex flex-col justify-between bg-navy p-6 sm:p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-300">
              Colour master
            </span>
            <ul className="mt-8 space-y-3">
              {serviceAreas.map((a) => (
                <li key={a.key} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`block h-3 w-8 shrink-0 ${a.chip}`}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white">
                    {a.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-brand-300">
              One back office
            </p>
          </li>
        </ul>
      </Container>

      <CtaBand
        heading="Talk to us about your back office"
        body="If any of this sounds like your operation, a short call is usually enough to work out where we would start."
      />
    </div>
  );
}
