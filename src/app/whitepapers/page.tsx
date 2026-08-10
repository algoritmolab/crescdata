import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ControlBar } from "@/components/ui/ControlBar";
import { Lead } from "@/components/ui/Lead";
import { FeaturedDocument } from "@/components/whitepapers/FeaturedDocument";
import { IndexRow } from "@/components/whitepapers/IndexRow";
import {
  availablePapers,
  featuredPaper,
  formatFiledDate,
} from "@/content/whitepapers";
import { logo, site } from "@/content/site";

const description =
  "Practical guidance on running a leaner, more accurate supply chain back office for importers and wholesalers: retailer chargebacks, EDI, back-office cost and seasonal capacity.";

export const metadata: Metadata = {
  title: "White Papers",
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `White Papers — ${site.name}`,
    description,
    url: `${site.url}/whitepapers`,
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

export default function WhitePapersPage() {
  const rest = availablePapers.filter((p) => p.slug !== featuredPaper.slug);

  // Derived from the data, so the control bar can never go stale.
  const lastFiled = availablePapers
    .map((p) => p.filedDate)
    .sort()
    .at(-1);

  return (
    <div className="bg-paper">
      <ControlBar
        left={site.name}
        center="Document index"
        right={lastFiled ? `Last filed ${formatFiledDate(lastFiled)}` : undefined}
      />

      <Container className="pt-14 pb-14 sm:pt-20 sm:pb-20">
        <header className="max-w-3xl">
          <h1 className="font-display text-5xl font-semibold leading-[0.94] tracking-[-0.045em] text-navy sm:text-7xl lg:text-8xl">
            White papers
          </h1>
          <Lead className="mt-7">
            Practical guidance on running a leaner, more accurate supply chain
            back office. Written by people who have done the work. Deepest in
            apparel; the same ground applies to home furnishings and other
            consumer products.
          </Lead>
        </header>
      </Container>

      <Container>
        <FeaturedDocument paper={featuredPaper} />
      </Container>

      <Container className="pt-20 pb-24 sm:pt-24 sm:pb-32">
        <h2 className="border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-label">
          All documents
        </h2>
        <ul>
          {rest.map((paper) => (
            <IndexRow key={paper.slug} paper={paper} />
          ))}
        </ul>
      </Container>
    </div>
  );
}
