import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ControlBar } from "@/components/ui/ControlBar";
import { Lead } from "@/components/ui/Lead";
import { Marker } from "@/components/ui/Data";
import {
  REPRESENTATIVE_NOTE,
  caseStudies,
  caseStudiesIntro,
} from "@/content/caseStudies";
import { logo, site } from "@/content/site";

const description =
  "Four representative engagements showing how Cresc Datasoft runs order operations, retailer compliance, receivables and accounting for US importers and wholesalers.";

export const metadata: Metadata = {
  title: "Case Studies",
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Case Studies — ${site.name}`,
    description,
    url: `${site.url}/case-studies`,
    images: [
      { url: logo.src, width: logo.width, height: logo.height, alt: site.name },
    ],
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-paper">
      <ControlBar
        left={site.name}
        center="Engagement index"
        right={`${caseStudies.length} studies`}
      />

      <Container className="pt-14 pb-12 sm:pt-20 sm:pb-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-label">
          {caseStudiesIntro.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.4rem] font-semibold leading-[1] tracking-[-0.045em] text-navy sm:text-6xl lg:text-7xl">
          {caseStudiesIntro.headline}
        </h1>
        <Lead className="mt-7">{caseStudiesIntro.subhead}</Lead>
      </Container>

      {/* Stated plainly and at readable size, not buried. */}
      <Container className="pb-14">
        <p className="flex items-start gap-3 border-y border-rule py-4 text-[0.95rem] leading-relaxed text-ink-soft">
          <Marker className="mt-[0.45em]" />
          {REPRESENTATIVE_NOTE}
        </p>
      </Container>

      <Container className="pb-24 sm:pb-28">
        <h2 className="border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-label">
          Engagements
        </h2>
        <ul>
          {caseStudies.map((cs) => (
            <li key={cs.slug} className="border-b border-rule">
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group relative block px-1 py-8 transition-colors duration-200 hover:bg-surface focus-visible:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-brand-600 transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />

                <div className="lg:grid lg:grid-cols-[96px_minmax(0,1fr)_280px] lg:items-start lg:gap-10">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-label">
                    {cs.ref}
                  </span>

                  <div className="mt-3 lg:mt-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-label">
                      {cs.functionArea}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.025em] text-navy transition-colors group-hover:text-brand-700 lg:text-2xl">
                      {cs.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-soft">
                      {cs.sector}
                    </p>
                  </div>

                  <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 lg:mt-0 lg:block lg:space-y-3">
                    {cs.metrics.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-label">
                          {m.label}
                        </dt>
                        <dd className="font-display text-base font-semibold text-navy">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
