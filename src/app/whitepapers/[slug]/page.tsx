import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ControlBar } from "@/components/ui/ControlBar";
import { SpecBlock } from "@/components/whitepapers/SpecBlock";
import { Contents } from "@/components/whitepapers/Contents";
import { DocumentBody } from "@/components/whitepapers/DocumentBody";
import { CtaBand } from "@/components/ui/CtaBand";
import { availablePapers, getPaper } from "@/content/whitepapers";
import { logo, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

/** Only available papers get a page; forthcoming ones 404 until they are filed. */
export function generateStaticParams() {
  return availablePapers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);

  if (!paper || paper.status !== "available") {
    return { title: "Document not found" };
  }

  return {
    // Absolute, so the layout's " — Cresc Datasoft" suffix is not appended.
    // These titles already run to ~60 characters and several contain a dash of
    // their own, which made the templated version both long and awkward.
    title: { absolute: paper.title },
    description: paper.summary,
    openGraph: {
      type: "article",
      siteName: site.name,
      title: paper.title,
      description: paper.summary,
      url: `${site.url}/whitepapers/${paper.slug}`,
      publishedTime: paper.filedDate,
      images: [
        {
          url: logo.src,
          width: logo.width,
          height: logo.height,
          alt: site.name,
        },
      ],
    },
  };
}

export default async function WhitePaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = getPaper(slug);

  if (!paper || paper.status !== "available" || !paper.sections) {
    notFound();
  }

  // Previous/next walk the available papers only, so neither link can lead to
  // a document that has no page.
  const index = availablePapers.findIndex((p) => p.slug === paper.slug);
  const previous = index > 0 ? availablePapers[index - 1] : undefined;
  const next =
    index < availablePapers.length - 1
      ? availablePapers[index + 1]
      : undefined;

  return (
    <div className="bg-paper">
      <ControlBar
        left={
          <Link
            href="/whitepapers"
            className="transition-colors hover:text-brand-600"
          >
            &larr; Document index
          </Link>
        }
        right={paper.docRef}
      />

      <Container className="pt-12 pb-10 sm:pt-16 sm:pb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {paper.topic}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-navy sm:text-6xl">
          {paper.title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          {paper.summary}
        </p>
      </Container>

      <Container>
        <SpecBlock paper={paper} />
      </Container>

      <Container className="pt-14 pb-20 sm:pt-16 sm:pb-24">
        <div className="lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14">
          <Contents sections={paper.sections} />

          <article className="border border-rule bg-surface px-5 py-10 sm:px-10 sm:py-12 lg:px-14">
            <DocumentBody
              sections={paper.sections}
              numbered={paper.numberSections}
            />
          </article>
        </div>

        {(previous || next) && (
          <nav
            aria-label="Other documents"
            className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/whitepapers/${previous.slug}`}
                className="group bg-paper p-6 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  &larr; Previous
                </span>
                <span className="mt-3 block font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-brand-600">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span className="bg-paper p-6" />
            )}

            {next && (
              <Link
                href={`/whitepapers/${next.slug}`}
                className="group bg-paper p-6 transition-colors hover:bg-surface sm:text-right"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Next &rarr;
                </span>
                <span className="mt-3 block font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-brand-600">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </Container>

      <CtaBand
        heading="Talk to us about your back office"
        body="If any of this matches what you are dealing with, we are happy to go through it with you. No pitch deck required."
      />
    </div>
  );
}
