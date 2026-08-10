import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ControlBar } from "@/components/ui/ControlBar";
import { CtaBand } from "@/components/ui/CtaBand";
import { Lead } from "@/components/ui/Lead";
import {
  serviceAreas,
  testimonials,
  testimonialsIntro,
  logo,
  site,
} from "@/content/site";

const description =
  "What importers and wholesalers say about working with Cresc Datasoft, across EDI, accounting, imports, compliance and day-to-day operations.";

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
        center="Client record"
        right={`${testimonials.length} entries`}
      />

      {/*
        Masthead band only. The photograph stops here by design: the spec grid
        below works because every cell is identical, and an image behind or
        between the cells would break that uniformity.
      */}
      <section className="relative isolate flex min-h-[380px] items-center overflow-hidden bg-navy sm:min-h-[420px] lg:min-h-[460px]">
        <Image
          src="/images/client-meeting.webp"
          alt=""
          fill
          sizes="100vw"
          className="photo object-cover"
          style={{ objectPosition: "50% 38%" }}
        />
        <div aria-hidden="true" className="photo-tint absolute inset-0" />
        <div aria-hidden="true" className="photo-scrim-left absolute inset-0" />

        <Container className="relative w-full py-14 sm:py-16">
          <header>
            <h1 className="font-display text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl">
              {testimonialsIntro.heading}
            </h1>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-100">
              {testimonials.length} accounts / {serviceAreas.length} service
              areas
            </p>
            <Lead tone="light" className="mt-6">
              {testimonialsIntro.intro}
            </Lead>
          </header>
        </Container>
      </section>

      <Container className="pt-14 pb-24 sm:pt-16 sm:pb-28">
        {/*
          PLACEHOLDER TESTIMONIALS — the quotes and attributions in
          content/site.ts are illustrative, not real client statements.
          Swap them for approved quotes before launch.

          The grid rules are a rule-colored ground showing through 1px gaps,
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-label">
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
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-label">
                    {t.role}
                    <span className="block">{t.company}</span>
                  </p>
                </div>
              </li>
            );
          })}

          {/*
            The one deliberate break in the grid. Restrained on purpose: it
            keeps the cell dimensions and the hairline rhythm, and sits inside
            the grid rather than competing with the quotes around it.
          */}
          <li className="flex flex-col bg-surface p-6 sm:p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-label">
              Your turn
            </span>
            <p className="mt-7 flex-1 font-display text-lg font-medium leading-[1.4] tracking-[-0.015em] text-navy sm:text-xl">
              Talk to us about handing over your back office.
            </p>
            <div className="mt-8 border-t border-rule pt-5">
              <ArrowLink
                href="/contact"
                className="font-mono text-[11px] uppercase tracking-[0.16em]"
              >
                Get in touch
              </ArrowLink>
            </div>
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
