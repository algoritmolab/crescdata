import { Container } from "./Container";

/**
 * The thin ruled strip that runs across the top of a page in the document
 * language, borrowed from the header block of a printed manifest.
 */
export function ControlBar({
  left,
  center,
  right,
}: {
  left: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="border-b border-rule">
      <Container>
        <div className="flex items-center justify-between gap-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-label">
          <span>{left}</span>
          {center && <span className="hidden sm:block">{center}</span>}
          {right && <span className="text-right">{right}</span>}
        </div>
      </Container>
    </div>
  );
}
