import type { Flow, FlowNode } from "@/content/caseStudies";

/*
  Geometry. Nodes sit on a column/lane grid and everything else is derived,
  so a new case study only has to declare positions, never coordinates.
*/
const COL = 178; // horizontal pitch
const LANE = 158; // vertical pitch
const NODE_W = 152;
const NODE_H = 60;
const DIA_W = 152;
const DIA_H = 82;
const BAND = 92; // vertical band a node is centred in
const PAD = 18;

type Point = { x: number; y: number };

function centre(n: FlowNode): Point {
  return {
    x: PAD + n.col * COL + NODE_W / 2,
    y: PAD + n.lane * LANE + BAND / 2,
  };
}

function halfSize(n: FlowNode) {
  return n.kind === "decision"
    ? { w: DIA_W / 2, h: DIA_H / 2 }
    : { w: NODE_W / 2, h: NODE_H / 2 };
}

/** Orthogonal connector between two nodes on the grid. */
function connector(a: FlowNode, b: FlowNode) {
  const ca = centre(a);
  const cb = centre(b);
  const ha = halfSize(a);
  const hb = halfSize(b);

  // Same lane: straight horizontal run between facing edges.
  if (a.lane === b.lane) {
    return {
      d: `M ${ca.x + ha.w} ${ca.y} H ${cb.x - hb.w}`,
      label: { x: (ca.x + ha.w + cb.x - hb.w) / 2, y: ca.y - 8 },
    };
  }

  // Lane change: leave vertically, travel across the gutter, enter vertically.
  const down = b.lane > a.lane;
  const startY = down ? ca.y + ha.h : ca.y - ha.h;
  const endY = down ? cb.y - hb.h : cb.y + hb.h;
  const midY = down ? startY + (endY - startY) / 2 : startY - (startY - endY) / 2;

  return {
    d: `M ${ca.x} ${startY} V ${midY} H ${cb.x} V ${endY}`,
    label: { x: ca.x + 10, y: startY + (down ? 16 : -8) },
  };
}

function Node({ node }: { node: FlowNode }) {
  const c = centre(node);
  const isDecision = node.kind === "decision";
  const isTerminal = node.kind === "terminal";
  const isEscalation = node.kind === "escalation";

  const stroke = isEscalation ? "var(--color-accent-700)" : "var(--color-navy)";
  const fill = isTerminal ? "var(--color-navy)" : "var(--color-surface)";
  const textFill = isTerminal ? "#ffffff" : "var(--color-navy)";

  const lineH = 12;
  const firstY = c.y - ((node.lines.length - 1) * lineH) / 2 + 4;

  return (
    <g>
      {isDecision ? (
        <polygon
          points={`${c.x},${c.y - DIA_H / 2} ${c.x + DIA_W / 2},${c.y} ${c.x},${c.y + DIA_H / 2} ${c.x - DIA_W / 2},${c.y}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.25}
          vectorEffect="non-scaling-stroke"
        />
      ) : (
        <>
          <rect
            x={c.x - NODE_W / 2}
            y={c.y - NODE_H / 2}
            width={NODE_W}
            height={NODE_H}
            fill={fill}
            stroke={stroke}
            strokeWidth={isTerminal ? 1.25 : 1}
            vectorEffect="non-scaling-stroke"
          />
          {/* Escalation marker: a solid orange edge, the one accent in the drawing. */}
          {isEscalation && (
            <rect
              x={c.x - NODE_W / 2}
              y={c.y - NODE_H / 2}
              width={4}
              height={NODE_H}
              fill="var(--color-accent-500)"
            />
          )}
        </>
      )}

      {node.lines.map((line, i) => (
        <text
          key={i}
          x={c.x + (isEscalation ? 2 : 0)}
          y={firstY + i * lineH}
          textAnchor="middle"
          className="font-mono"
          fontSize="8.5"
          letterSpacing="0.08em"
          fill={textFill}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function FlowDiagram({ flow, label }: { flow: Flow; label: string }) {
  const byId = new Map(flow.nodes.map((n) => [n.id, n]));
  const maxCol = Math.max(...flow.nodes.map((n) => n.col));
  const maxLane = Math.max(...flow.nodes.map((n) => n.lane));
  const width = PAD * 2 + maxCol * COL + NODE_W;
  const height = PAD * 2 + maxLane * LANE + BAND;

  return (
    <div>
      {/*
        Scrolls rather than scaling down: a flowchart squeezed to 375px is
        unreadable, and this is information rather than decoration.
      */}
      <div className="overflow-x-auto border border-rule bg-surface">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={`${label}. The same sequence is written out under "Step by step" below.`}
          className="block max-w-none"
        >
          <defs>
            <marker
              id="cs-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L8 4 L0 8 z" fill="var(--color-navy)" />
            </marker>
          </defs>

          {flow.edges.map((e, i) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b) return null;
            const { d, label: pos } = connector(a, b);
            return (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--color-navy)"
                  strokeWidth={1}
                  markerEnd="url(#cs-arrow)"
                  vectorEffect="non-scaling-stroke"
                />
                {e.label && (
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="8"
                    letterSpacing="0.12em"
                    fill="var(--color-label)"
                  >
                    {e.label.toUpperCase()}
                  </text>
                )}
              </g>
            );
          })}

          {flow.nodes.map((n) => (
            <Node key={n.id} node={n} />
          ))}
        </svg>
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-label">
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-5 border border-navy bg-surface"
          />
          Step
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 rotate-45 border border-navy bg-surface"
          />
          Decision
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-5 border border-accent-700 border-l-4 border-l-accent-500 bg-surface"
          />
          Client decision
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-5 bg-navy"
          />
          Start / end
        </li>
      </ul>
    </div>
  );
}
