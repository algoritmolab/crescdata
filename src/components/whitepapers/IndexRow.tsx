import Link from "next/link";
import { BarcodeMark } from "./Barcode";
import { Marker } from "@/components/ui/Data";
import type { WhitePaper } from "@/content/whitepapers";

const GRID =
  "lg:grid lg:grid-cols-[136px_minmax(0,1fr)_116px_84px_120px] lg:items-center lg:gap-8";

const META = "font-mono text-[11px] uppercase tracking-[0.16em]";

/**
 * One line of the index.
 *
 * Available documents render the entire row as a single link. Forthcoming ones
 * render as plain content with no interactive element at all, so there is
 * nothing for a keyboard or screen reader to land on and nothing that looks
 * like a broken button.
 */
export function IndexRow({ paper }: { paper: WhitePaper }) {
  const available = paper.status === "available";

  if (!available) {
    return (
      <li className="border-b border-rule">
        <div className={`${GRID} px-1 py-8`}>
          <div className="mb-4 w-[136px] text-rule lg:mb-0">
            <BarcodeMark code={paper.docRef} height={26} symbols={22} />
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-muted lg:text-[1.4rem]">
              {paper.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {paper.summary}
            </p>
          </div>

          <div
            className={`${META} mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted lg:contents`}
          >
            <span>{paper.topic}</span>
            {/* Holds the read-time column open on desktop; pointless on mobile. */}
            <span className="hidden lg:block" aria-hidden="true">
              &mdash;
            </span>
            <span className="flex items-center gap-2 lg:justify-end">
              <Marker />
              Not yet filed
            </span>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="border-b border-rule">
      <Link
        href={`/whitepapers/${paper.slug}`}
        className="group relative block px-1 py-8 transition-colors duration-200 hover:bg-white focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-600"
      >
        {/* Blue edge marker that grows out of the rule on hover and focus. */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-brand-600 transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
        />

        <div className={GRID}>
          <div className="mb-4 w-[136px] lg:mb-0">
            <BarcodeMark
              code={paper.docRef}
              height={26}
              symbols={22}
              stagger
              barsClassName="text-navy transition-colors group-hover:text-brand-600 group-focus-visible:text-brand-600"
            />
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-navy transition-colors group-hover:text-brand-600 lg:text-[1.4rem]">
              {paper.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              {paper.summary}
            </p>
          </div>

          <div
            className={`${META} mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted lg:contents`}
          >
            <span>{paper.topic}</span>
            <span>{paper.readTime}</span>
            <span className="text-brand-600 lg:text-right">Filed</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
