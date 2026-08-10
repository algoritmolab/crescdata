import type { Section } from "@/content/whitepapers";

/**
 * Section contents. A sticky rail beside the document on desktop; on smaller
 * screens the same markup sits inline above the body as a short ruled list.
 * No JavaScript, so it works before hydration and costs nothing.
 */
export function Contents({ sections }: { sections: Section[] }) {
  return (
    <nav aria-label="Document contents" className="mb-10 lg:mb-0">
      <div className="lg:sticky lg:top-28">
        <p className="border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-label">
          Contents
        </p>
        <ul className="mt-4 space-y-1 border-l border-rule">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm leading-snug text-ink-soft transition-colors hover:border-brand-600 hover:text-brand-700 focus-visible:border-brand-600 focus-visible:text-brand-700"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
