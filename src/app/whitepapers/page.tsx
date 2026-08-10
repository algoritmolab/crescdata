import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FinalCta } from "@/components/home/FinalCta";
import { whitePapers, whitePapersIntro } from "@/content/site";

export const metadata: Metadata = {
  // Root layout appends " — Cresc Datasoft" via the title template.
  title: "White Papers & Insights",
  description:
    "Practical guidance on running a leaner, more accurate apparel supply chain back office — chargebacks, EDI, import management and back-office cost.",
};

export default function WhitePapersPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
            {whitePapersIntro.heading}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {whitePapersIntro.intro}
          </p>
        </div>
      </Container>

      <Section tone="subtle" className="pt-0 sm:pt-0">
        {/*
          PLACEHOLDER WHITE PAPERS — no PDFs exist yet, so every entry in
          content/site.ts has `file: null` and renders a disabled button.
          To publish one: add the PDF under public/whitepapers/ and set the
          entry's `file` to that path — the card becomes a real download.
        */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whitePapers.map((paper) => (
            <article
              key={paper.title}
              className="flex flex-col rounded-2xl border border-hairline bg-surface p-7 transition duration-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600"
              >
                <Icon name="document" className="h-5 w-5" />
              </span>

              <h2 className="mt-5 text-lg font-semibold leading-snug text-ink">
                {paper.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {paper.summary}
              </p>

              <div className="mt-6">
                {paper.file ? (
                  <Button href={paper.file}>
                    Download PDF
                    <Icon name="download" className="h-4 w-4" />
                  </Button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className={buttonClasses({ variant: "disabled" })}
                  >
                    Coming soon
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
