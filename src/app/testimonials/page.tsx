import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FinalCta } from "@/components/home/FinalCta";
import { testimonials, testimonialsIntro } from "@/content/site";

export const metadata: Metadata = {
  // Root layout appends " — Cresc Datasoft" via the title template.
  title: "Client Testimonials",
  description:
    "What apparel importers and brands say about working with Cresc Datasoft — order processing, EDI, import management, AR and accounting handled end to end.",
};

export default function TestimonialsPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
            {testimonialsIntro.heading}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {testimonialsIntro.intro}
          </p>
        </div>
      </Container>

      <Section tone="subtle" className="pt-0 sm:pt-0">
        {/*
          PLACEHOLDER TESTIMONIALS — the quotes and attributions in
          content/site.ts are illustrative, not real client statements.
          Swap them for approved quotes before launch.
        */}
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="break-inside-avoid rounded-2xl border border-hairline bg-surface p-7 transition duration-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
            >
              {/* Orange quote mark — the page's single accent moment. */}
              <span
                aria-hidden="true"
                className="block font-serif text-5xl leading-none text-accent-500"
              >
                &ldquo;
              </span>
              <blockquote className="mt-3 text-base leading-relaxed text-ink-soft">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-hairline pt-5">
                <span className="block text-sm font-semibold text-ink">
                  {t.name}
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
