import type { CSSProperties } from "react";

type PlanGraphicProps = {
  labels: {
    lanes: [string, string, string, string];
    baseline: string;
    progress: string;
    statusDate: string;
  };
  className?: string;
};

// Geometry of the drawing (viewBox units).
const W = 480;
const H = 440;
const TIMELINE_START = 120;
const TIMELINE_END = 456;
const STATUS_X = 330;
const LANE_Y = [76, 122, 168, 214];
const BAR_H = 12;

// Each workstream overlaps the previous one: strategy informs finance,
// finance informs engineering, engineering informs execution.
const BARS = [
  { start: 120, end: 214 },
  { start: 178, end: 300 },
  { start: 250, end: 392 },
  { start: 318, end: 456 },
];

const COLORS = {
  panel: "#0e2240",
  grid: "rgba(195, 202, 213, 0.08)",
  rule: "rgba(195, 202, 213, 0.22)",
  label: "#b4bfcd",
  baseline: "rgba(195, 202, 213, 0.3)",
  done: "#eef1f5",
  accent: "#7fa7f5",
};

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/**
 * Hero composition: a project schedule (strategy → execution) above a
 * cumulative progress "S-curve" compared against its baseline. It
 * illustrates planning, control and execution without inventing data:
 * there are no values, only shapes. Purely decorative.
 */
export function PlanGraphic({ labels, className = "" }: PlanGraphicProps) {
  const columns = Array.from({ length: 9 }, (_, i) => TIMELINE_START + i * 42);

  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      {/* Offset frame, like a drawing sheet laid on a table. */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 border border-navy-900/20" />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        focusable="false"
        className="relative block h-auto w-full font-mono"
      >
        <rect width={W} height={H} fill={COLORS.panel} />

        {/* Column grid */}
        {columns.map((x) => (
          <line key={x} x1={x} x2={x} y1={44} y2={404} stroke={COLORS.grid} />
        ))}

        {/* Lane labels and guides */}
        {LANE_Y.map((y, i) => (
          <g key={y}>
            <text x={24} y={y + 4} fontSize={13} fill={COLORS.label}>
              {labels.lanes[i]}
            </text>
            <line x1={TIMELINE_START} x2={TIMELINE_END} y1={y} y2={y} stroke={COLORS.grid} />
          </g>
        ))}

        {/* Bars: baseline (full length) and completed portion up to the status date */}
        {BARS.map((bar, i) => {
          const y = LANE_Y[i] - BAR_H / 2;
          const doneEnd = Math.min(bar.end, STATUS_X);
          return (
            <g key={i} className="plan-bar" style={delay(150 + i * 140)}>
              <rect x={bar.start} y={y} width={bar.end - bar.start} height={BAR_H} fill={COLORS.baseline} />
              {doneEnd > bar.start && (
                <rect x={bar.start} y={y} width={doneEnd - bar.start} height={BAR_H} fill={COLORS.done} />
              )}
            </g>
          );
        })}

        {/* Dependencies and milestones */}
        <g className="plan-fade" style={delay(800)} stroke={COLORS.label} strokeWidth={1} fill="none">
          {BARS.slice(0, -1).map((bar, i) => (
            <path key={i} d={`M ${bar.end} ${LANE_Y[i] + BAR_H / 2 + 2} V ${LANE_Y[i + 1] - BAR_H / 2 - 4}`} />
          ))}
        </g>
        <g className="plan-fade" style={delay(900)}>
          {BARS.map((bar, i) => (
            <rect
              key={i}
              x={bar.end - 5}
              y={LANE_Y[i] - 5}
              width={10}
              height={10}
              transform={`rotate(45 ${bar.end} ${LANE_Y[i]})`}
              fill={i === BARS.length - 1 ? COLORS.accent : COLORS.panel}
              stroke={i === BARS.length - 1 ? COLORS.accent : COLORS.done}
              strokeWidth={1.5}
            />
          ))}
        </g>

        {/* Divider between schedule and cost/progress view */}
        <line x1={24} x2={TIMELINE_END} y1={250} y2={250} stroke={COLORS.rule} />

        {/* S-curve axes */}
        <line x1={TIMELINE_START} x2={TIMELINE_END} y1={398} y2={398} stroke={COLORS.rule} />
        <line x1={TIMELINE_START} x2={TIMELINE_START} y1={272} y2={398} stroke={COLORS.rule} />
        {columns.map((x) => (
          <line key={`tick-${x}`} x1={x} x2={x} y1={398} y2={404} stroke={COLORS.rule} />
        ))}

        {/* Legend */}
        <line x1={24} x2={38} y1={286} y2={286} stroke={COLORS.label} strokeWidth={1.5} strokeDasharray="3 2" />
        <text x={44} y={290} fontSize={11} fill={COLORS.label}>
          {labels.baseline}
        </text>
        <line x1={24} x2={38} y1={310} y2={310} stroke={COLORS.accent} strokeWidth={2.5} />
        <text x={44} y={314} fontSize={11} fill={COLORS.label}>
          {labels.progress}
        </text>

        {/* Planned cumulative curve */}
        <path
          d={`M ${TIMELINE_START} 396 C 250 396, 300 280, ${TIMELINE_END} 276`}
          fill="none"
          stroke={COLORS.label}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          className="plan-fade"
          style={delay(400)}
        />

        {/* Actual progress up to the status date */}
        <path
          d={`M ${TIMELINE_START} 396 C 232 396, 286 334, ${STATUS_X} 318`}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          className="plan-draw"
        />
        <circle cx={STATUS_X} cy={318} r={4.5} fill={COLORS.accent} className="plan-fade" style={delay(2000)} />

        {/* Status date */}
        <line
          x1={STATUS_X}
          x2={STATUS_X}
          y1={44}
          y2={404}
          stroke={COLORS.accent}
          strokeWidth={1}
          strokeDasharray="2 4"
        />
        <text x={STATUS_X} y={32} fontSize={12} fill={COLORS.accent} textAnchor="middle">
          {labels.statusDate}
        </text>

        {/* Title block corner, as on a technical drawing */}
        <g stroke={COLORS.rule} fill="none">
          <rect x={24} y={414} width={432} height={14} />
          <line x1={336} x2={336} y1={414} y2={428} />
          <line x1={396} x2={396} y1={414} y2={428} />
        </g>
      </svg>
    </div>
  );
}
