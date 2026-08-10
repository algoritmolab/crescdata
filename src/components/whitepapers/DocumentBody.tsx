import type { Block, Section } from "@/content/whitepapers";

/** Reading measure sits at roughly 68 characters. */
const MEASURE = "max-w-[68ch]";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "para":
            return (
              <p
                key={i}
                className={`${MEASURE} mt-6 text-[1.0625rem] leading-[1.75] text-ink-soft`}
              >
                {block.text}
              </p>
            );

          case "subhead":
            return (
              <h3
                key={i}
                className={`${MEASURE} mt-10 font-display text-lg font-semibold tracking-[-0.01em] text-navy sm:text-xl`}
              >
                {block.text}
              </h3>
            );

          case "list":
            return (
              <ul key={i} className={`${MEASURE} mt-6 space-y-3.5`}>
                {block.items.map((item) => (
                  <li key={item} className="relative pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.62em] h-[6px] w-[6px] bg-rule"
                    />
                    <span className="text-[1.0625rem] leading-[1.7] text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "checklist":
            return (
              <div key={i} className="mt-9 border border-rule bg-paper">
                <p className="border-b border-rule px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {block.title}
                </p>
                <ul className="divide-y divide-rule">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-4 px-5 py-4">
                      {/* Hollow square, the way a printed form asks to be ticked. */}
                      <span
                        aria-hidden="true"
                        className="mt-[0.3em] h-3 w-3 shrink-0 border-2 border-accent-500"
                      />
                      <span className="text-[0.95rem] leading-[1.65] text-ink-soft">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "table":
            return (
              <div key={i} className="mt-9 border border-rule">
                <p className="border-b border-rule bg-paper px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {block.title}
                </p>
                <dl className="divide-y divide-rule">
                  {block.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                    >
                      <dt className="text-[0.95rem] text-ink-soft">
                        {row.label}
                      </dt>
                      <dd className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-navy sm:text-right">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );

          case "quote":
            return (
              <figure
                key={i}
                className="mt-11 border-y border-rule py-8 sm:grid sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-8"
              >
                <figcaption className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-600">
                  {block.kicker}
                </figcaption>
                <blockquote className="mt-3 max-w-[54ch] font-display text-xl font-medium leading-[1.4] tracking-[-0.015em] text-navy sm:mt-0 sm:text-2xl">
                  {block.text}
                </blockquote>
              </figure>
            );
        }
      })}
    </>
  );
}

export function DocumentBody({
  sections,
  numbered = false,
}: {
  sections: Section[];
  numbered?: boolean;
}) {
  return (
    <div>
      {sections.map((section, i) => (
        <section
          key={section.id}
          className={i > 0 ? "mt-14 border-t border-rule pt-10" : undefined}
        >
          <h2
            id={section.id}
            className="scroll-mt-28 font-display text-2xl font-semibold tracking-[-0.025em] text-navy sm:text-[1.9rem]"
          >
            {numbered && (
              <span className="mr-3 font-mono text-base text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            {section.heading}
          </h2>
          <Blocks blocks={section.blocks} />
        </section>
      ))}
    </div>
  );
}
