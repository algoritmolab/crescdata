import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ControlBar } from "@/components/ui/ControlBar";
import { BackLink } from "@/components/ui/BackLink";
import { ArrowIcon } from "@/components/ui/ArrowLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { Lead } from "@/components/ui/Lead";
import { Bullet, Marker } from "@/components/ui/Data";
import { FlowDiagram } from "@/components/casestudies/FlowDiagram";
import {
  REPRESENTATIVE_NOTE,
  caseStudies,
  getCaseStudy,
} from "@/content/caseStudies";
import { logo, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case study not found" };

  const title = `${cs.title} — Case Studies`;
  const description = cs.context.slice(0, 180);

  return {
    title,
    description,
    openGraph: {
      type: "article",
      siteName: site.name,
      title: `${title} — ${site.name}`,
      description,
      url: `${site.url}/case-studies/${cs.slug}`,
      images: [
        { url: logo.src, width: logo.width, height: logo.height, alt: site.name },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const i = caseStudies.findIndex((c) => c.slug === cs.slug);
  const previous = i > 0 ? caseStudies[i - 1] : undefined;
  const next = i < caseStudies.length - 1 ? caseStudies[i + 1] : undefined;

  return (
    <div className="bg-paper">
      <ControlBar
        left={<BackLink href="/case-studies">All case studies</BackLink>}
        right={cs.ref}
      />

      {/* 1 — function area, title, context */}
      <Container className="pt-12 pb-10 sm:pt-16 sm:pb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-label">
          {cs.functionArea}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.15rem] font-semibold leading-[1.03] tracking-[-0.04em] text-navy sm:text-5xl lg:text-6xl">
          {cs.title}
        </h1>
        <p className="mt-6 max-w-prose font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-label">
          {cs.sector}
        </p>
        <Lead className="mt-6">{cs.context}</Lead>
      </Container>

      {/* 2 — metrics strip */}
      <Container>
        <div className="border border-rule bg-rule">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {cs.metrics.map((m) => (
              <div key={m.label} className="bg-surface p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-label">
                  {m.label}
                </p>
                <p className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-navy">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* 3 — process flow */}
      <Container className="pt-16 sm:pt-20">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">
          How the process runs
        </h2>
        <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
          Every step below is carried out by our team, working inside the
          client&rsquo;s own systems on US business hours. Anything that needs a
          commercial call goes back to the client.
        </p>

        <div className="mt-8">
          <FlowDiagram
            flow={cs.flow}
            label={`Process flow for ${cs.title.toLowerCase()}`}
          />
          <p className="mt-5 flex items-start gap-3 border-y border-rule py-4 text-[0.95rem] leading-relaxed text-ink-soft">
            <Marker className="mt-[0.45em]" />
            {REPRESENTATIVE_NOTE}
          </p>
        </div>
      </Container>

      {/* 4 — step by step */}
      <Container className="pt-16 sm:pt-20">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">
          Step by step
        </h2>
        <ol className="mt-8 border-t border-rule">
          {cs.howItWorks.map((step, n) => (
            <li
              key={step}
              className="flex gap-5 border-b border-rule py-4 sm:gap-7"
            >
              <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-brand-700">
                {String(n + 1).padStart(2, "0")}
              </span>
              <span className="max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </Container>

      {/* 5 — before / after */}
      <Container className="pt-16 sm:pt-20">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">
          What changed
        </h2>
        <div className="mt-8 border border-rule">
          <div className="hidden border-b border-rule bg-paper sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            {["Aspect", "Before", "With Cresc"].map((h) => (
              <p
                key={h}
                className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-label"
              >
                {h}
              </p>
            ))}
          </div>
          <div className="divide-y divide-rule">
            {cs.beforeAfter.map((row) => (
              <div
                key={row.aspect}
                className="grid gap-1 bg-surface px-5 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <p className="font-display text-[0.95rem] font-semibold text-navy">
                  {row.aspect}
                </p>
                <p className="text-[0.95rem] leading-relaxed text-muted">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-label sm:hidden">
                    Before:{" "}
                  </span>
                  {row.before}
                </p>
                <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-label sm:hidden">
                    With Cresc:{" "}
                  </span>
                  {row.after}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
          {cs.outcome}
        </p>
      </Container>

      {/* 6 — systems */}
      <Container className="pt-16 sm:pt-20">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">
          Systems we work in
        </h2>
        <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
          All client-side. We operate inside what you already run, so there is
          nothing new to buy or migrate to.
        </p>
        <ul className="mt-7 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {cs.systems.map((s) => (
            <li key={s} className="relative pl-6">
              <Bullet />
              <span className="text-[0.95rem] leading-relaxed text-ink-soft">
                {s}
              </span>
            </li>
          ))}
        </ul>
      </Container>

      {/* 8 — previous / next */}
      <Container className="pt-16 pb-20 sm:pt-20 sm:pb-24">
        {(previous || next) && (
          <nav
            aria-label="Other case studies"
            className="grid gap-px border border-rule bg-rule sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/case-studies/${previous.slug}`}
                className="group bg-paper p-6 transition-colors hover:bg-surface"
              >
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-label">
                  <ArrowIcon direction="left" />
                  Previous
                </span>
                <span className="mt-3 block font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-brand-700">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span className="bg-paper p-6" />
            )}

            {next && (
              <Link
                href={`/case-studies/${next.slug}`}
                className="group bg-paper p-6 transition-colors hover:bg-surface sm:text-right"
              >
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-label sm:justify-end">
                  Next
                  <ArrowIcon direction="right" />
                </span>
                <span className="mt-3 block font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-brand-700">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </Container>

      {/* 7 — CTA */}
      <CtaBand
        heading="Talk to us about your back office"
        body="Tell us which part hurts most and we will walk you through how we would run it."
      />
    </div>
  );
}
