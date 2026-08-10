import { BarcodeMark } from "./Barcode";
import { DataLabel, DataValue } from "@/components/ui/Data";
import { formatFiledDate, type WhitePaper } from "@/content/whitepapers";

/**
 * The technical header of a document page: reference, mark, date, topic and
 * read time in ruled cells, with the audience note across the foot.
 *
 * The cell rules come from a rule-coloured background showing through 1px
 * gaps, so they stay correct at one, two and four columns without a pile of
 * per-breakpoint border classes.
 */
export function SpecBlock({ paper }: { paper: WhitePaper }) {
  return (
    <div className="border border-rule bg-rule">
      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-surface p-5">
          <DataLabel>Reference</DataLabel>
          <div className="mt-3 max-w-[150px] text-navy">
            <BarcodeMark code={paper.docRef} height={30} symbols={22} />
          </div>
        </div>

        <div className="bg-surface p-5">
          <DataLabel>Filed</DataLabel>
          <DataValue>{formatFiledDate(paper.filedDate)}</DataValue>
        </div>

        <div className="bg-surface p-5">
          <DataLabel>Topic</DataLabel>
          <DataValue>{paper.topic}</DataValue>
        </div>

        <div className="bg-surface p-5">
          <DataLabel>Read time</DataLabel>
          <DataValue>{paper.readTime}</DataValue>
        </div>
      </div>

      {paper.whoItsFor && (
        <div className="mt-px bg-surface p-5">
          <DataLabel>Who this is for</DataLabel>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            {paper.whoItsFor}
          </p>
        </div>
      )}
    </div>
  );
}
