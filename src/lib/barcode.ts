/**
 * Deterministic barcode patterns.
 *
 * The same document reference always produces the same bar pattern, on the
 * server and in the browser, so nothing shifts on hydration and each paper
 * keeps its own mark. Nothing here is a scannable symbology — it is a
 * typographic device built from the reference number.
 */

/** FNV-1a. Small, fast, and stable across runtimes. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — a compact seeded PRNG. */
function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Bar = {
  x: number;
  width: number;
  /** Guard bars run the full height; the rest stop short, as on a real symbol. */
  guard: boolean;
};

export type BarcodePattern = {
  bars: Bar[];
  /** Total width in the same units as `x`/`width`, for the SVG viewBox. */
  width: number;
};

/** Bar widths in narrow units, weighted toward the thin end. */
const WIDTHS = [1, 1, 1, 2, 2, 3, 4];

/**
 * @param code    document reference, e.g. "CD-011"
 * @param symbols how many dark bars to draw between the guards
 */
export function barcode(code: string, symbols = 28): BarcodePattern {
  const next = rng(hash(code));
  const bars: Bar[] = [];
  let x = 0;

  const guard = () => {
    bars.push({ x, width: 1, guard: true });
    x += 3;
    bars.push({ x, width: 1, guard: true });
    x += 4;
  };

  guard();

  for (let i = 0; i < symbols; i++) {
    const width = WIDTHS[Math.floor(next() * WIDTHS.length)];
    bars.push({ x, width, guard: false });
    x += width;
    // Space before the next bar, also variable.
    x += WIDTHS[Math.floor(next() * WIDTHS.length)];
  }

  x += 2;
  guard();

  return { bars, width: x - 1 };
}
