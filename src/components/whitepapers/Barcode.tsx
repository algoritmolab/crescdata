import { barcode } from "@/lib/barcode";
import { cn } from "@/lib/cn";

/**
 * The recurring mark of the white paper section.
 *
 * Decorative: the reference number it encodes is always shown as text
 * alongside it, so the bars themselves are hidden from assistive tech.
 *
 * Bars inherit `currentColor`, so a parent can recolor the whole strip on
 * hover or focus. `stagger` walks the transition delay along the bars to give
 * a left-to-right sweep; the reduced-motion rule in globals.css cancels both
 * the duration and the delay.
 */
export function Barcode({
  code,
  height = 34,
  symbols,
  stagger = false,
  className,
}: {
  code: string;
  height?: number;
  symbols?: number;
  stagger?: boolean;
  className?: string;
}) {
  const { bars, width } = barcode(code, symbols);
  const short = height - Math.max(5, Math.round(height * 0.16));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("block h-full w-full", className)}
      style={{ shapeRendering: "crispEdges" }}
    >
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={0}
          width={bar.width}
          height={bar.guard ? height : short}
          fill="currentColor"
          className="transition-colors duration-300"
          style={stagger ? { transitionDelay: `${i * 8}ms` } : undefined}
        />
      ))}
    </svg>
  );
}

/**
 * Barcode plus the human-readable reference line beneath it, the way a
 * printed label carries its own digits.
 */
export function BarcodeMark({
  code,
  height = 34,
  symbols,
  stagger = false,
  className,
  barsClassName,
}: {
  code: string;
  height?: number;
  symbols?: number;
  stagger?: boolean;
  className?: string;
  barsClassName?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div style={{ height }} className={cn("w-full", barsClassName)}>
        <Barcode code={code} height={height} symbols={symbols} stagger={stagger} />
      </div>
      <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.32em] text-label">
        {code}
      </span>
    </div>
  );
}
