import Link from "next/link";
import { BarcodeMark } from "./Barcode";
import { DataLabel, DataValue, Marker } from "@/components/ui/Data";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { formatFiledDate, type WhitePaper } from "@/content/whitepapers";

/**
 * The top slot of the index: the same information as an index row, given a
 * white sheet and considerably more room.
 */
export function FeaturedDocument({ paper }: { paper: WhitePaper }) {
  return (
    <article className="border border-rule bg-surface">
      <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] sm:px-8">
        <span className="flex items-center gap-2 text-accent-800">
          <Marker />
          Featured
        </span>
        <span className="text-muted">{paper.topic}</span>
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="px-5 py-8 sm:px-8 sm:py-12">
          <h2 className="font-display text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.035em] text-navy sm:text-4xl lg:text-[3.1rem]">
            <Link
              href={`/whitepapers/${paper.slug}`}
              className="transition-colors hover:text-brand-700 focus-visible:text-brand-700"
            >
              {paper.title}
            </Link>
          </h2>

          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-ink-soft">
            {paper.summary}
          </p>

          {paper.whoItsFor && (
            <div className="mt-8 border-t border-rule pt-5">
              <DataLabel>Who this is for</DataLabel>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-soft">
                {paper.whoItsFor}
              </p>
            </div>
          )}

          <ArrowLink
            href={`/whitepapers/${paper.slug}`}
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            Open document
          </ArrowLink>
        </div>

        <div className="flex flex-col gap-8 border-t border-rule px-5 py-8 sm:px-8 lg:border-l lg:border-t-0 lg:py-12">
          <div className="text-navy">
            <BarcodeMark code={paper.docRef} height={58} symbols={30} />
          </div>
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
            <div>
              <DataLabel>Filed</DataLabel>
              <DataValue>{formatFiledDate(paper.filedDate)}</DataValue>
            </div>
            <div>
              <DataLabel>Read time</DataLabel>
              <DataValue>{paper.readTime}</DataValue>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}
