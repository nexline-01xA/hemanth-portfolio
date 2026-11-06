import { IconChevronRight } from "./Icons.jsx";

/**
 * A tasteful, data-driven pipeline/architecture diagram — not a fabricated
 * screenshot. Renders an ordered list of stages as a horizontal flow on
 * wide screens and a vertical flow on narrow ones.
 */
export default function ArchitectureFlow({ stages, compact = false }) {
  if (!stages?.length) return null;

  return (
    <div
      className={compact ? "flow flow--compact" : "flow"}
      role="img"
      aria-label={`Pipeline: ${stages.map((s) => s.label).join(" to ")}`}
    >
      {stages.map((stage, i) => (
        <div key={stage.label} className="u-contents">
          <div className="flow__stage">
            {!compact && <span className="flow__index">{String(i + 1).padStart(2, "0")}</span>}
            <div className="flow__body">
              <span className="flow__label">{stage.label}</span>
              {stage.sub && !compact && <span className="flow__sub">{stage.sub}</span>}
            </div>
          </div>
          {i < stages.length - 1 && (
            <div className="flow__connector" aria-hidden="true">
              <IconChevronRight size={compact ? 11 : 14} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
