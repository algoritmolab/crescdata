/**
 * Small typographic primitives for the document/data visual language used
 * across white papers, services, careers and testimonials.
 */

/** Uppercase mono label sitting above a value. */
export function DataLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-label">
      {children}
    </span>
  );
}

/** The value under a DataLabel. */
export function DataValue({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-1.5 block font-mono text-sm text-navy">{children}</span>
  );
}

/** Small orange square used as a status marker. */
export function Marker({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[7px] w-[7px] shrink-0 bg-accent-500 ${className}`}
    />
  );
}

/** Square bullet marker for lists in the document language. */
export function Bullet() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 top-[0.62em] h-[6px] w-[6px] bg-rule"
    />
  );
}
